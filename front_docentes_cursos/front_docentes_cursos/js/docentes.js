$(document).ready(function() {
    var tableBody = $('#docentes-table tbody');
    $.ajax({
        url: 'http://localhost:8081/docentes',
        method: 'GET',
        success: function(data) {
            $.each(data, function(index, docente) {
                obtenerNombreOcupacion(docente.idOcupacion, function(nombreOcupacion) {
                    var row = $('<tr>');
                    row.append($('<td>').text(docente.cod));
                    row.append($('<td>').text(docente.nombre));
                    row.append($('<td>').text(nombreOcupacion)); 
                    tableBody.append(row);
                });
            });
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
});

function obtenerNombreOcupacion(idOcupacion, callback) {
    $.ajax({
        url: `http://localhost:8081/ocupaciones/${idOcupacion}`,
        method: 'get',
        success: function(response) {
            callback(response.nombre);
        },
    });
}

function cargarOcupaciones() {
    $.ajax({
        url: 'http://localhost:8081/ocupaciones',
        method: 'GET',
        success: function(data) {
            var selectOcupacion = $('#ocupacion');
            selectOcupacion.empty();
            $.each(data, function(index, ocupacion) {
                selectOcupacion.append($('<option>').text(ocupacion.nombre).val(ocupacion.id));
            });
        },
        error: function(error) {
            console.error('Error al cargar las ocupaciones:', error);
        }
    });
}
function mostrarMensaje(elementoId, mensaje) {
    $('#' + elementoId).text(mensaje);
    setTimeout(function() {
        $('#' + elementoId).text('');
    }, 5000);
}

$(document).ready(function() {
    cargarOcupaciones();
});

function registrarDocente(event) {
    event.preventDefault();

    var cod = $('#codigo').val();
    var nombre = $('#nombre').val();
    var ocupacion = $('#ocupacion').val();

    $.ajax({
        url: "http://localhost:8081/docentes",
        method: 'post',
        data: { cod: cod, nombre: nombre, idOcupacion: ocupacion },
    }).done((response) => {
        console.log(response);
        mostrarMensaje('mensajeExito', '¡Docente registrado exitosamente!');
    }).fail((err) => {
        console.error(err);
            mostrarMensaje('mensajeError', 'Error: Este código ya existe. Por favor, elija otro.');
    });
}


