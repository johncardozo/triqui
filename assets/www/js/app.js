var url = "http://www.epsilondx.com/triqui/index.php?r=site/";
var logActivo = true;

// Asegura que el DOM este listo
$(document).ready(function(){

	// Inicializa la aplicación
	init();

	// Click en el boton crear cuenta
	$('#botonCrearCuenta').click( crearCuenta );

	// Click en el boton crear juego
	$('#botonCrearJuego').click( crearJuego );

	// Click en una celda del tablero
	$('.celda').click( hacerJugada );

});

/* Funcion que inicializa la aplicación */
function init(){

	// Muestra u oculta el panel de Log
	if(logActivo){ $('#panelLog').show(); } else { $('#panelLog').hide(); } 

	// Obtiene los datos del nombre del usuario actual
	var id = localGet('id');
	var nombre = localGet('nombre');
	var email = localGet('email');

	if (id != null) {
		$('#tituloNombreJugador').text(nombre);
		$('#tituloMailJugador').text(email);
	}

	// Configura la barra superior del juego
	// FIXME: No esta funcionado
/*	if(id == null){
		$('#linkRegistro').show();
		$('#linkNuevoJuego').hide();
	}else{
		$('#linkRegistro').hide();
		$('#linkNuevoJuego').show();		
	}
*/
	// Muestra los juegos en la pantalla de inicio
	showGamesHome();

}

/* Funcion que muestra los juegos del jugador en la pagina de inicio */
function showGamesHome(){

	// Obtiene los juegos 
	var juegosObtenidos = localGetAllGames();

	// Inicializa las cadenas HTML
	var cadenaMisJuegos = "";
	var cadenaSusJuegos = "";

	// Recorre los juegos
	$.each(juegosObtenidos['juegos'], function(indice, valor){

		// Verifica si es MI turno (1) o SU turno (0)
		if(valor.turno == 1){
			cadenaMisJuegos += '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#tablero?idjuego=' + valor.idjuego + '" class="ui-link-inherit">' + valor.nombre + ' (' +  valor.idjuego + ')</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
		}else{
			cadenaSusJuegos += '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#tablero?idjuego=' + valor.idjuego + '" class="ui-link-inherit">' + valor.nombre + ' (' +  valor.idjuego + ')</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
		}
	});

	$("#listaJuegosMiTurno").html(cadenaMisJuegos);
	$("#listaJuegosSuTurno").html(cadenaSusJuegos);

}

/* Funcion que muestra un indicador de espera en la interfaz */
function showLoader(mensaje){

	// Genera el mensaje a mostrar
	var html = "<span class='ui-icon ui-icon-loading'>" + mensaje + "</span>";

	// Muestra el indicador de espera...
	$.mobile.loading( "show", {
		text: "cargando",
		textVisible: true,
		theme: "a",
		html: html
	});
}

/* Funcion que oculta el indicador de espera */
function hideLoader(){
	$.mobile.loading( "hide" );
}

/* Muestra el tablero de un juego */
function showBoard(idjuego){

	// Obtiene el juego local
	var juego = localGetGameById(idjuego);

	// Muestra el nombre del oponente
	$('#tituloOponente').text(juego.nombre);

	// Guarda el id del juego
	$('#spanIdJuego').text(idjuego);

	// Verifica si es mi turno
	if(juego.turno == 0){
		$('#explicacionTurno').text('Es mi turno de jugar');
	}else{
		$('#explicacionTurno').text('Es el turno de ' + juego.nombre);
	}

	// Muestra las jugadas
	var tablero = juego.tablero;

	// Recorre el tablero para mostrarlo
	$.each(tablero, function(indice, valor){
		// Genera el nombre de la celda
		var nombreCelda = '#celda' + indice;
		
		// Genera el simbolo a mostrar en la celda
		var simbolo = '';
		if(valor == 0){
			simbolo = '';
		}else if(valor == 1){
			simbolo = 'X';
		}else{
			simbolo = 'O';
		}

		// Escribe el simbolo en la celda
		$(nombreCelda).text(simbolo);

	});
}

/* Funcion que permite hacer una jugada */
function hacerJugada(){

	// Obtiene el contenido de la celda
	var valor = $(this).text();

	// Verifica si la celda esta vacia
	if ( valor === '' ) {

		// Obtiene el identificador del juego
		var idjuego = $('#spanIdJuego').text();

		// Obtiene el juego
		var juego = localGetGameById(idjuego);

		// Verifica que sea MI turno de jugar
		if ( juego.turno == 1 ) {

			// Obtiene el numero de celda en que se hizo clic
			var celda = this.id.substr(5);

			// Obtiene el identifidor del jugador
			var idjugador = localGet('id');

			// Crea la jugada en el servidor
			crearJugada(idjugador, idjuego, celda);

		} else{
			alert('Es el turno del oponente');
		}

	}else{
		alert('No se puede jugar en esa posición!!!');
	}

}

/* Funcion que permite mostrar los mensajes de log en el home */

function log(mensaje){

	// Verifica si se debe hacer log
	if(logActivo){
		$('#listaLog').append('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child" data-mini="true">' +  mensaje + '</li>');		
	}
} 





