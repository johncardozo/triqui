package co.edu.usbbog.triqui; //Edit this to match the name of your application

import com.google.android.gcm.*;
import org.json.JSONException;
import org.json.JSONObject;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.TaskStackBuilder;
import android.util.Log;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;

import com.plugin.GCM.GCMPlugin;

public class GCMIntentService extends GCMBaseIntentService {

	public static final String ME = "GCMReceiver";

	public GCMIntentService() {
		super("GCMIntentService");
	}

	private static final String TAG = "GCMIntentService";

	@Override
	public void onRegistered(Context context, String regId) {

		Log.v(ME + ":onRegistered", "Registration ID arrived!");
		Log.v(ME + ":onRegistered", regId);

		JSONObject json;

		try {
			json = new JSONObject().put("event", "registered");
			json.put("regid", regId);

			Log.v(ME + ":onRegisterd", json.toString());

			// Send this JSON data to the JavaScript application above EVENT
			// should be set to the msg type
			// In this case this is the registration ID
			GCMPlugin.sendJavascript(json);

		} catch (JSONException e) {
			// No message to the user is sent, JSON failed
			Log.e(ME + ":onRegistered", "JSON exception");
		}
	}

	@Override
	public void onUnregistered(Context context, String regId) {
		Log.d(TAG, "onUnregistered - regId: " + regId);
	}

	@Override
	protected void onMessage(Context context, Intent intent) {
		Log.d(TAG, "onMessage - context: " + context);

		// Extract the payload from the message
		Bundle extras = intent.getExtras();
		if (extras != null) {
			try {
				Log.v(ME + ":onMessage extras ", extras.getString("data"));

				JSONObject json;
				json = new JSONObject().put("event", "data");

				// My application on my host server sends back to "EXTRAS"
				// variables message and msgcnt
				// Depending on how you build your server app you can specify
				// what variables you want to send
				//
				if (extras.getString("data") != null) {
					json.put("data", extras.getString("data"));
				}
				if (extras.getString("error") != null) {
					json.put("error", extras.getString("error"));
				}

				// Muestra la notificación
				mostrarNotificacion(context, extras);

				Log.v(ME + ":onMessage ", json.toString());

				// Send the MESSAGE to the Javascript application
				GCMPlugin.sendJavascript(json);

			} catch (JSONException e) {
				Log.e(ME + ":onMessage", "JSON exception");
			}
		}

	}

	private void mostrarNotificacion(Context context, Bundle extras) {
/*		
			String message = "data: " + extras.getString("data");
		String title = "Triqui";
		Notification notif = new Notification(android.R.drawable.btn_star_big_on, message, System.currentTimeMillis());
		notif.flags = Notification.FLAG_AUTO_CANCEL;
		notif.defaults |= Notification.DEFAULT_SOUND;
		notif.defaults |= Notification.DEFAULT_VIBRATE;

		Intent notificationIntent = new Intent(context, MainActivity.class);
		notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
		PendingIntent contentIntent = PendingIntent.getActivity(context, 0,
				notificationIntent, 0);

		notif.setLatestEventInfo(context, title, message, contentIntent);
		String ns = Context.NOTIFICATION_SERVICE;
		NotificationManager mNotificationManager = (NotificationManager) context
				.getSystemService(ns);
		mNotificationManager.notify(1, notif);
	
*/		
		
		NotificationCompat.Builder mBuilder =
		        new NotificationCompat.Builder(this)
		        .setSmallIcon(android.R.drawable.btn_star_big_on)
		        .setContentTitle("Triqui")
		        .setContentText("Hello World!");
		
		// Creates an explicit intent for an Activity in your app
		Intent resultIntent = new Intent(this, MainActivity.class);

		// The stack builder object will contain an artificial back stack for the
		// started Activity.
		// This ensures that navigating backward from the Activity leads out of
		// your application to the Home screen.
		TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);
		
		// Adds the back stack for the Intent (but not the Intent itself)
		stackBuilder.addParentStack(MainActivity.class);

		// Adds the Intent that starts the Activity to the top of the stack
		stackBuilder.addNextIntent(resultIntent);
		PendingIntent resultPendingIntent = stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);
		mBuilder.setContentIntent(resultPendingIntent);
		NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

		// mId (1) allows you to update the notification later on.
		mNotificationManager.notify(1, mBuilder.build());		
		
	}

	@Override
	public void onError(Context context, String errorId) {
		Log.e(TAG, "onError - errorId: " + errorId);
	}

}
