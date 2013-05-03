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
        log('No se soporta localstorage...');
    }
	
}

/* Funcion que guarda un nuevo juego localmente */
function localSaveGame(nuevoJuego){

    // Verifica si localStorage es soportado
    if(typeof(Storage)!=="undefined")
    {
        // Modifica el nuevo juego con turno para el oponente
        // 0: turno de oponente, 1: mi turno
        nuevoJuego.turno = 0;

        //localStorage.removeItem("juegos");

        // Obtiene la lista de juegos
        var juegos = localStorage.getItem("juegos");

        // Verifica si existe la lista
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
        log('No se soporta localstorage...');
    }

}

/* Funcion que obtiene todos los juegos actuales */
function localGetAllGames(){

    // Verifica si localStorage es soportado
    if(typeof(Storage)!=="undefined")
    {

        // Obtiene los juegos del sistema
        var juegosJSON = JSON.parse(localStorage.getItem("juegos"));

        // Verifica si existe la lista
        if (juegosJSON == null) {
            alert('no hay juegos');
            return { juegos: [] };
        }else{
            return juegosJSON;
        }

    } else {
        log('No se soporta localstorage...');
    }

} 
















