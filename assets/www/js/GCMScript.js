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

    switch( e.event )  {
      case 'registered':
        // the definition of the e variable is json return defined in GCMReceiver.java
        // In my case on registered I have EVENT and REGID defined
        gApp.gcmregid = e.regid;
        if ( gApp.gcmregid.length > 0 )
        {
          // Guarda el regId localmente
          localSave('regid', e.regid);
        }

        break

      case 'message':

        // Crea el objeto JSON a partir de los datos recibidos
        var objetoJSON = JSON.parse(e.data);

        // Guarda el nuevo juego localmente
        // 1: mi turno
        localSaveGame(objetoJSON, 1);

        // Actualiza la lista de juegos del home
        showGamesHome();

        // Navega al home
        $.mobile.changePage( "#home", { transition: "slide", reverse: true });

        // the definition of the e variable is json return defined in GCMIntentService.java
        // In my case on registered I have EVENT, MSG and MSGCNT defined

        // You will NOT receive any messages unless you build a HOST server application to send
        // Messages to you, This is just here to show you how it might work

     //   $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.message + '</li>');
     //   $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.msgcnt + '</li>');

        log('El mensaje recibido es: ' + e.data);


        break;


      case 'error':

        $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');

        break;



      default:
        //$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
        log("???");
        break;
    }
}

/* Funcion que se ejecuta cuando hay un registro exitoso en GCM */
function GCM_Success(e)
{
}

/* Funcion que se ejecuta cuando hay un error en el registro en GCM */
function GCM_Fail(e)
{
}

