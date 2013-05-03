gApp = new Array();

gApp.deviceready = false;
gApp.gcmregid = '';


window.onbeforeunload  =  function(e) {

    if ( gApp.gcmregid.length > 0 )
    {
      // The same routines are called for success/fail on the unregister. You can make them unique if you like
      window.GCM.unregister( GCM_Success, GCM_Fail );      // close the GCM

    }
};

/* Evento que es ejecutado cuando Phonegap está cargado en el dispositivo */
document.addEventListener('deviceready', function() {

  //log('Evento deviceready recibido');
  //log('Invocando GCMRegistrar.register: Proyecto=' + idProject);
  
  // Bandera para saber si Phonegap está listo en el dispositivos
  gApp.DeviceReady = true;

  // Registro de la aplicación en CGM
  // GCM_Success: función que se ejecuta si el registro fue exitoso
  // GCM_Fail:    función que se ejecuta si falló el registro
  // GCM_Event:   función que se ejecuta cada vez que se recibe un evento como recibir mensajes o resultado del registro
  window.plugins.GCM.register(idProject, "GCM_Event", GCM_Success, GCM_Fail );

}, false );

/* Funcion que se ejecuta cada vez que se recibe un evento */
function GCM_Event(e)
{
    //log('Evento recibido: ' + e.event);

    switch( e.event )  {
      case 'registered':
        // the definition of the e variable is json return defined in GCMReceiver.java
        // In my case on registered I have EVENT and REGID defined
        gApp.gcmregid = e.regid;
        if ( gApp.gcmregid.length > 0 )
        {
      //    log('Dispositivo registrado: regid = <br>' + e.regid);

          // Guarda el regId localmente
          localSave('regid', e.regid);

          // ==============================================================================
          // This is where you would code to send the REGID to your server for this device
          // ==============================================================================
        }

        break

      case 'message':
        // the definition of the e variable is json return defined in GCMIntentService.java
        // In my case on registered I have EVENT, MSG and MSGCNT defined

        // You will NOT receive any messages unless you build a HOST server application to send
        // Messages to you, This is just here to show you how it might work

        $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.message + '</li>');
        $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.msgcnt + '</li>');

        log('El mensaje recibido es: ' + e.message);


        break;


      case 'error':

        $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');

        break;



      default:
        $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');

        break;
    }
}

/* Funcion que se ejecuta cuando hay un registro exitoso en GCM */
function GCM_Success(e)
{
  //log('GCM_Success -> Registro exitoso...');
  //log('Esperando por la respuesta del regId de Google');
}

/* Funcion que se ejecuta cuando hay un error en el registro en GCM */
function GCM_Fail(e)
{
    //log('GCM_Success -> El plugin falló en el registro...');  
    //log('GCM_Success -> '+ e.msg);  
}

