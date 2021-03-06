gApp = new Array();

gApp.deviceready = false;
gApp.gcmregid = '';

// CODIGOS DE MENSAJE
var NUEVO_JUEGO  = 1;
var NUEVA_JUGADA = 2;

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

/* Funcion que se ejecuta cada vez que se recibe un evento. 
   La definición de la variable e es un objeto JSON definido en GCMIntentService.java */
function GCM_Event(e)
{
    // Verifica el tipo de mensaje
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

        if (objetoJSON.code == NUEVO_JUEGO) { 

          // Guarda el nuevo juego localmente
          // 1: mi turno
          localSaveGame(objetoJSON, 1);

          // Actualiza la lista de juegos del home
          showGamesHome();

          // Navega al home
          $.mobile.changePage( "#home", { transition: "slide", reverse: true });

        }else if (objetoJSON.code == NUEVA_JUGADA) { 

          alert(JSON.stringify(objetoJSON));

          // Obtiene los datos de la jugada
          var idjuego = objetoJSON.idjuego;
          var tablero = objetoJSON.tablero;

          // Obtiene el juego local
          var juego = localGetGameById(idjuego);
alert('ANTES: ' + JSON.stringify(juego));
          // Modifica el juego
          juego.tablero = tablero;
          juego.turno = 1;
alert('DESPUES: ' + JSON.stringify(juego));
          // Actualiza el juego local
          localUpdateGame(juego);

          // Actualiza la lista de juegos del home  
          showGamesHome();

          // Navega al juego
                    

        }
  
        break;

      case 'error':

        console.log(e.msg);
        break;

      default:
        console.log('Desconocido! un evento fue recibido y no se sabe que fue!!!');
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

