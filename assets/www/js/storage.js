/* Funcion que guarda datos localmente */
function localSave(id, data){

	// Verifica si localStorage es soportado
	if(typeof(Storage)!=="undefined")
	{
        // Guarda el resultado
        localStorage.setItem(id, data);
    } else {
        log('No se soporta localstorage...');
    }
}

/* Funcion que obtiene datos almacenados localmente */
function localGet(id){

	// Verifica si localStorage es soportado
	if(typeof(Storage)!=="undefined")
	{
        // Retorna el resultado
        return localStorage.getItem(id);
    } else {
        //log('No se soporta localstorage...');
    }
	
}

/* Funcion que guarda un nuevo juego localmente
    0: turno del oponente
    1: mi turno
*/
function localSaveGame(nuevoJuego, turno){

    // Verifica si localStorage es soportado
    if(typeof(Storage)!=="undefined")
    {
        // Modifica el nuevo juego con turno para el oponente
        // 0: turno de oponente
        // 1: mi turno
        nuevoJuego.turno = turno;
        nuevoJuego.tablero = [0,0,0,0,0,0,0,0,0]; // tablero vacio

        //localStorage.removeItem("juegos");

        // Obtiene la lista de juegos
        var juegos = localStorage.getItem("juegos");

        // Verifica si existe es el primer juego en el dispositivo
        if (juegos == null) {

            // Crea la lista de juegos
            var listaJuegos = { juegos: [] };

            // Agrega el nuevo elemento a la lista
            listaJuegos.juegos.push(nuevoJuego);

            // Guarda la lista localmente
            localStorage.setItem("juegos", JSON.stringify(listaJuegos));

        }else{

            // Obtiene los juegos del sistema
            var juegosJSON = JSON.parse(localStorage.getItem("juegos"));

            // Agrega el nuevo elemento a la lista
            juegosJSON.juegos.push(nuevoJuego);

            // Guarda la lista localmente
            localStorage.setItem("juegos", JSON.stringify(juegosJSON));

        }

    } else {
        //log('No se soporta localstorage...');
    }

}

/* Funcion que actualiza el juego local */
function localUpdateGame(nuevoJuego){

    // Verifica si localStorage es soportado
    if(typeof(Storage)!=="undefined")
    {
        // Obtiene la lista de juegos
        var juegos = localStorage.getItem("juegos");

        // Verifica si existe es el primer juego en el dispositivo
        if (juegos == null) {

            // Crea la lista de juegos
            var listaJuegos = { juegos: [] };

            // Agrega el nuevo elemento a la lista
            listaJuegos.juegos.push(nuevoJuego);

            // Guarda la lista localmente
            localStorage.setItem("juegos", JSON.stringify(listaJuegos));

        }else{

            // Obtiene los juegos del sistema
            var juegosJSON = JSON.parse(localStorage.getItem("juegos"));

            // Recorre el tablero para mostrarlo
            var tam = juegosJSON['juegos'].length;

            for (var i = 0; i < tam; i++){

                // Encuentra el juego buscado
                if (juegosJSON['juegos'][i].idjuego == nuevoJuego.idjuego){ 
                    juegosJSON['juegos'][i] = nuevoJuego;
                    break;
                }

            }

            // Guarda la lista localmente
            localStorage.setItem("juegos", JSON.stringify(juegosJSON));

        }

    } else {
        //log('No se soporta localstorage...');
    }

}

/* Funcion que obtiene todos los juegos actuales
{
    juegos: 
        [ 
            { idjuego: 92, nombre="John", turno:0, tablero:[0,0,0,0,0,0,0,0,0] },
            { idjuego: 38, nombre="Cata", turno:1, tablero:[0,1,0,0,-1,0,0,1,0] }
        ]
}
*/
function localGetAllGames(){

    // Verifica si localStorage es soportado
    if(typeof(Storage)!=="undefined")
    {

        // Obtiene los juegos del sistema
        var juegosJSON = JSON.parse(localStorage.getItem("juegos"));

        // Verifica si existe la lista
        if (juegosJSON == null) {
            return { juegos: [] };
        }else{
            return juegosJSON;
        }

    } else {
        //log('No se soporta localstorage...');
    }

} 

/* Obtiene un juego almacenado localmente dado su id */
function localGetGameById(id){

    // Verifica si localStorage es soportado
    if(typeof(Storage)!=="undefined")
    {

        // Obtiene los juegos del sistema
        var juegosJSON = JSON.parse(localStorage.getItem("juegos"));

        // Verifica si existe la lista
        if (juegosJSON == null) {
            return null;
        }else{

            // Busca el juego con el identificador recibido
            var juego = $.grep(juegosJSON['juegos'], function(i){
                            return i.idjuego == id;
                        });

            // Retorna la primera (y unica) posición del arreglo resultante
            return juego[0];
        }

    } else {
        //log('No se soporta localstorage...');
    }

}
















