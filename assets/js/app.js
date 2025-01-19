document.addEventListener('DOMContentLoaded', function () {
    const text = document.querySelector('.copy');
    const content = text.textContent;
    text.textContent = '';

    let i = 0;
    function type() {
        if (i < content.length) {
            text.textContent += content.charAt(i);
            i++;
            setTimeout(type, 80);
        }
    }
    
    type();
});


function gestionCorreo() {
    let camposValidados = validarCampos();
    if (camposValidados) {
        enviarCorreo(camposValidados);    
    }
}

function enviarCorreo(dataForm) {
    $.ajax({
        'method':   'POST',
        'url':      './mail/enviarCorreo.php',
        'data':     dataForm,
        'dataType': 'json',
        'success': function(response){
            if (response.status == true) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: response.mensaje,
                    showConfirmButton: false,
                    timer: 5000
                  });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.mensaje,
                  });
            }
        }
    });
}

function validarCampos() {
    let campos = obtenerCampos();
    
    if (!campos.nombre || !campos.email || !campos.mensaje) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Favor llene todo los campos obligatorios marcados con un *",
          });

        return false
    }

    if (!validarFormatoCorreo(campos.email)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El email no es valido",
          });

        return false
    }

    return campos;
}

function obtenerCampos() {
    return {
        'nombre' :      $("#nombre").val(),
        'telefono':     $("#telefono").val(),
        'email':        $("#email").val(),
        'mensaje':      $("#mensaje").val()
    }
}

function validarFormatoCorreo(email) {
    const exprecionCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;
    return exprecionCorreo.test(email);
}