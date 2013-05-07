/*
Events: 
bc = pagebeforecreate
c  = pagecreate
i  = pageinit

bs = pagebeforeshow
s  = pageshow

bh = pagebeforehide
h  = pagehide
*/

var router = new $.mobile.Router({
          //"#tablero(?:[?](.*))?": {handler: "tablero", events: "bc,c,i,bs,s,bh,h"},
          "#tablero(?:[?](.*))?": {handler: "tablero", events: "bs"},
          "#home": { handler: function(type){
            //console.log("Se ha mostrado el home: " + (type=="pagehide"?"hidden":"shown"));
            //alert("Se ha mostrado el home: " + (type=="pagehide"?"hidden":"shown"));
          }, events: "h,s" }
        },
        {
          tablero: function(type, match, ui){

            // Obtiene el parametro (objeto JSON)
            var params = router.getParams(match[1]);
            
            // Obtiene el id del juego
            var idjuego = params['idjuego'];

            // Muestra el juego
            showBoard(idjuego);

          }
        }, 
        { 
          defaultHandler: function(type, ui, page) {
            //console.log("Default handler called due to unknown route (" + type + ", " + ui + ", " + page + ")"
            );
          },
          defaultHandlerEvents: "s"
        });
