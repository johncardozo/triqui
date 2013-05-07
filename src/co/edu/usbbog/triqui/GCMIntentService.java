package co.edu.usbbog.triqui; //Edit this to match the name of your application

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.google.android.gcm.GCMBaseIntentService;
import com.plugin.GCM.GCMPlugin;

public class GCMIntentService extends GCMBaseIntentService {

	public static final String ME = "GCMReceiver";
	public static final int PETICION_NUEVO_JUEGO = 1;

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
				json = new JSONObject().put("event", "message");

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

	/**
	 * Muestra la notificacion en el status bar
	 * @param context
	 * @param extras
	 */
	private void mostrarNotificacion(Context context, Bundle extras) {
		
		// Variables de la notificación
		String titulo = "Triqui";
		String mensaje = "";
        try {
        	// Obtiene el objeto JSON
			JSONObject json = new JSONObject(extras.getString("data"));
			
			// Obtiene el codigo del mensaje
			int codigo = Integer.parseInt( (String) json.get("code") );
			
			// Verifica el código
			switch(codigo){
				case PETICION_NUEVO_JUEGO: 
					mensaje = json.get("nombre") + " te ha invitado a un nuevo juego";
					break;
				case 2: 
					break;
				default:
					Log.v("Triqui", "Llego un codigo no valido");
			}
			
			
		} catch (JSONException e) {
			Log.v("Triqui", e.getMessage());
		}		

		Notification notif = new Notification(R.drawable.ic_launcher, mensaje, System.currentTimeMillis());
		notif.flags = Notification.FLAG_AUTO_CANCEL;
		notif.defaults |= Notification.DEFAULT_SOUND;
		notif.defaults |= Notification.DEFAULT_VIBRATE;

		Intent notificationIntent = new Intent(context, MainActivity.class);
		notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
		PendingIntent contentIntent = PendingIntent.getActivity(context, 0,
				notificationIntent, 0);

		notif.setLatestEventInfo(context, titulo, mensaje, contentIntent);
		String ns = Context.NOTIFICATION_SERVICE;
		NotificationManager mNotificationManager = (NotificationManager) context.getSystemService(ns);
		mNotificationManager.notify(1, notif);
	

	}

	@Override
	public void onError(Context context, String errorId) {
		Log.e(TAG, "onError - errorId: " + errorId);
	}

}
