$(document).ready(function() {
    var tableBody = $('#cursos-table tbody');
    $.ajax({
        url: 'http://localhost:8081/cursos',
        method: 'GET',
        success: function(data) {
            $.each(data, function(index, curso) {
                obtenerNombreDocente(curso.codDocente, function(nombreDocente) {
                    var row = $('<tr>');
                    row.append($('<td>').text(curso.cod));
                    row.append($('<td>').text(curso.nombre));
                    row.append($('<td>').text(nombreDocente)); 
                    tableBody.append(row);
                });
            });
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
});


function cargarDocentes() {
    $.ajax({
        url: 'http://localhost:8081/docentes',
        method: 'GET',
        success: function(data) {
            var selectDocente = $('#docente');
            selectDocente.empty();
            $.each(data, function(index, docente) {
                selectDocente.append($('<option>').text(docente.nombre).val(docente.cod));
            });
        },
        error: function(error) {
            console.error('Error al cargar los docentes:', error);
        }
    });
}



$(document).ready(function() {
    cargarDocentes();
});

function registrarCurso(event) {
    event.preventDefault();

    var cod = $('#codigo').val();
    var nombre = $('#nombre').val();
    var docente = $('#docente').val();

    $.ajax({
        url: "http://localhost:8081/cursos",
        method: 'post',
        data: { cod: cod, nombre: nombre, codDocente: docente },
    }).done((response) => {
        console.log(response);
        mostrarMensaje('mensajeExito', 'Curso registrado exitosamente!');
    }).fail((err) => {
        console.error(err);
            mostrarMensaje('mensajeError', 'Error: Este código ya existe. Por favor, elija otro.');
    });
}
function mostrarMensaje(elementoId, mensaje) {
    $('#' + elementoId).text(mensaje);
    setTimeout(function() {
        $('#' + elementoId).text('');
    }, 5000);
}



function obtenerNombreDocente(codDocente, callback) {
    $.ajax({
        url: `http://localhost:8081/docentes/${codDocente}`,
        method: 'get',
        success: function(response) {
            callback(response.nombre);
        },
    });
}

