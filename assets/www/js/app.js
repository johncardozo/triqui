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


});

/* Funcion que inicializa la aplicación */
function init(){

	// Muestra u oculta el panel de Log
	if(logActivo){ $('#panelLog').show(); } else { $('#panelLog').hide(); } 

	// Obtiene el nombre del usuario actual
	var id = localGet('id');

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
			cadenaMisJuegos += '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#tablero" class="ui-link-inherit">' + valor.nombre + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
		}else{
			cadenaSusJuegos += '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#tablero" class="ui-link-inherit">' + valor.nombre + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
		}
	});

	$("#listaJuegosMiTurno").html(cadenaMisJuegos);
	$("#listaJuegosSuTurno").html(cadenaSusJuegos);

}

/* Funcion que muestra un indicador de espera en la interfaz */
function loader(mensaje){

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

/* Funcion que permite mostrar los mensajes de log en el home */

function log(mensaje){

	// Verifica si se debe hacer log
	if(logActivo){
		$('#listaLog').append('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child" data-mini="true">' +  mensaje + '</li>');		
	}
} 





