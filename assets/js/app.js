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

function organizarSkills(option) {
    
    console.log(option);
    
    let skill = document.querySelectorAll('.all');
    
    skill.forEach(element => {
        if (option == 'all') {
            console.log('entro1');
            
            element.classList.remove('skill-inactiva');    
            element.classList.add('skill-activa');    
        }else{
            console.log('entro2');
            
            if (element.classList.contains(option)) {
                element.classList.remove('skill-inactiva');    
                element.classList.add('skill-activa');    
            }else{
                element.classList.add('skill-inactiva');    
                element.classList.remove('skill-activa')
            }
        }
    });
    
}