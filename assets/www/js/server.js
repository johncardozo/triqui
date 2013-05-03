var idProject = '887454835127';

/* Funcion que crea una cuenta en el servidor */
function crearCuenta(){

	// Obtiene los valores
	var nombre = $('#nombre').val();
	var email = $('#email').val();

	// Verifica que se hayan digitado los datos
	if(nombre == '' || email == ''){
		// FIXME: hay que hacer un dialogo javascript. Este dialogo no muestra el CSS.
		//$('#dialogoDatos').popup().popup('open');
		alert('Debe digitar todos los datos');
		return;
	}

	// Recupera el regId de GCM
	var regid = localGet('regid');

	// Verifica que ya exista un registro en GCM
	if(regid == null){
		window.plugins.GCM.register(idProject, "GCM_Event", GCM_Success, GCM_Fail );
	}

	// Recupera el regId de GCM
	var regid = localGet('regid');

	
	if(regid != null){

		var jqxhr = $.post(url + 'registrar', {nombre: nombre, email: email, regid: regid})
		.done(function(data) { 

			// Obtiene los datos recibidos del servidor
			var objetoJSON = JSON.parse(data);
            var idjugador = objetoJSON['data']['idjugador'];

			// Guarda los datos del jugador
			localSave('nombre', nombre); 
			localSave('email', email); 
			localSave('id', idjugador); 
			
			// Oculta el link para crear una cuenta
			$('#linkRegistro').hide();

			// Mensaje al usuario
//			alert('Su cuenta ha sido creada');

			// Navega al home
			$.mobile.changePage( "#home", { transition: "slide", reverse: true });

		})
		.fail(function(data) { 
			console.log('fail... ' + data);
		})
		.always(function(data) { 
			console.log('always... ' + data);
		});

	}else{
		alert('No hay conexion al servidor. Intente de nuevo');
	}

}

/* Funcion crear nuevo juego */
function crearJuego(){

	// Obtiene los valores digitados por el usuario
	var email = $('#emailOponente').val();

	// Verifica que se hayan digitado los datos
	if(email == ''){
		// FIXME: hay que hacer un dialogo javascript. Este dialogo no muestra el CSS.
		//$('#dialogoDatos').popup().popup('open');
		alert('Debe digitar el mail del oponente');
		return;
	}

	// Recupera el id del jugador
	var id = localGet('id');

	if(id != null){

		$.post(url + 'nuevojuego', {idjugador: id, email: email})
		.done(function(data) { 

			// Ejemplo de datos recibidos: {"data":{"idjuego":"2"}}

			// Crea el objeto JSON a partir de los datos recibidos
			var objetoJSON = JSON.parse(data);
            
			// Verifica si hubo error
            if(objetoJSON['error'] !== undefined){ // Hay Error
            	alert(objetoJSON['error']['descripcion']);
            }else{ // No hay error

            	// Guarda el nuevo juego localmente
            	localSaveGame(objetoJSON['data'], 0);

				// Actualiza la lista de juegos del home
				showGamesHome();

				// Navega al home
				$.mobile.changePage( "#home", { transition: "slide", reverse: true });
            }

		})
		.fail(function(data) { 
			console.log('fail... ' + data);
		})
		.always(function(data) { 
			console.log('always... ' + data);
		});

	}else{
		alert('No ha creado una cuenta');
	}

}









