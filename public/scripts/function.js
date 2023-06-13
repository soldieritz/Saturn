function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

 function validateForm() {
    let clientId = document.getElementById("clientId").value;
    let clientPrefix = document.getElementById("clientPrefix").value;
    let clientShortDesc = document.getElementById("clientShortDesc").value;
    let clientDesc = document.getElementById("clientDesc").value;
    let tags = document.getElementById("clientTags");
    const errors = []
    console.log(getSelectValues(tags).length)
    if(clientId == ""){
        errors.push("Ingresar cliente id")
    }
    if(clientPrefix == ""){
        errors.push("Ingresar prefijo")
    }
    if(clientShortDesc == ""){
        errors.push("Ingresar descripcion corta")
    }
    if(clientDesc == ""){
        errors.push("Ingresar descripcion")
    }
    if(getSelectValues(tags).length < 1){
        errors.push("Selecciona 1 tag")
    }
    if(clientShortDesc){
      if(clientShortDesc.length > 168){
        errors.push("Ingresa una descripcion corta de menos de 168 caracteres")
      }
        if(clientShortDesc.length < 100){
          errors.push("Ingresa una descripcion corta de al menos 100 caracteres")
        }
    }

    if(clientPrefix){
      if(clientPrefix.length > 7 ){
        errors.push("Ingresa el prefix de menos de 7 caracteres")
      }
    }
    if(tags){
    if(getSelectValues(tags).length > 5){
      errors.push("Limite de tags sobrepasado, Maximo 5. Tienes " + getSelectValues(tags).length + " seleccionados")
    }
  }

    let t = `<strong> ${errors.join(" <br> ")}. </strong>`
    if (errors.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: t,
            footer: '<a href="">Reportar Bug?</a>'
          })
      return false;
    }
  }
  
  $(document).on('click', '#mm', function(e) {
    let clientId = document.getElementById("clientId").value;
    let clientPrefix = document.getElementById("clientPrefix").value;
    let clientShortDesc = document.getElementById("clientShortDesc").value;
    let clientDesc = document.getElementById("clientDesc").value;
    let tags = document.getElementById("clientTags");
    const errors = []
    if(clientId == ""){
        errors.push("Ingresar cliente id")
    }
    if(clientPrefix == ""){
        errors.push("Ingresar prefijo")
    }
    if(clientShortDesc == ""){
        errors.push("Ingresar descripcion corta")
    }
    if(clientDesc == ""){
        errors.push("Ingresar descripcion")
    }
    if(tags == ""){
        errors.push("Selecciona 1 tag")
    }
    if(clientShortDesc){
      if(clientShortDesc.length > 168){
        errors.push("Ingresa una descripcion corta de menos de 168 caracteres")
      }
        if(clientShortDesc.length < 100){
          errors.push("Ingresa una descripcion corta de al menos 100 caracteres")
        }
    }

    if(clientPrefix){
      if(clientPrefix.length > 7 ){
        errors.push("Ingresa el prefix de menos de 7 caracteres")
      }
    }
    if(getSelectValues(tags).length > 5){
      errors.push("Limite de tags sobrepasado, Maximo 5. Tienes " + getSelectValues(tags).length + " seleccionados")
    }

    let t = `<strong> ${errors.join(" <br> ")}. </strong>`
    if (errors.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: t,
            footer: '<a href="">Reportar Bug?</a>'
          })
      return false;
    } else {
      $('#m').submit();
    }
});

$(document).on('click', '#resend', function(e) {
  e.preventDefault();
      let clientId = document.getElementById("clientId").value;
      let clientPrefix = document.getElementById("clientPrefix").value;
      let clientShortDesc = document.getElementById("clientShortDesc").value;
      let clientDesc = document.getElementById("clientDesc").value;
      let tags = document.getElementById("clientTags");
      const errors = []
      if(clientId == ""){
          errors.push("Ingresar cliente id")
      }
      if(clientPrefix == ""){
          errors.push("Ingresar prefijo")
      }
      if(clientShortDesc == ""){
          errors.push("Ingresar descripcion corta")
      }
      if(clientDesc == ""){
          errors.push("Ingresar descripcion")
      }
      if(tags == ""){
          errors.push("Selecciona 1 tag")
      }
      if(clientShortDesc){
        if(clientShortDesc.length > 168){
          errors.push("Ingresa una descripcion corta de menos de 168 caracteres")
        }
          if(clientShortDesc.length < 100){
            errors.push("Ingresa una descripcion corta de al menos 100 caracteres")
          }
      }
  
      if(clientPrefix){
        if(clientPrefix.length > 7 ){
          errors.push("Ingresa el prefix de menos de 7 caracteres")
        }
      }
      if(getSelectValues(tags).length > 5){
        errors.push("Limite de tags sobrepasado, Maximo 5. Tienes " + getSelectValues(tags).length + " seleccionados")
      }
  
      let t = `<strong> ${errors.join(" <br> ")}. </strong>`
      if (errors.length > 0) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              html: t,
              footer: '<a href="">Reportar Bug?</a>'
            })
        return false;
      } else {
        Swal.fire({
          title: 'Estas seguro de reenviar?',
          text: "Recibiras una sancion si lo reenvias sin haber editado nada de tu bot.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, reenviarlo!'
        }).then((result) => {
          if (result.isConfirmed) {
            $('#res').submit();
          }
        })
      }
});

$(document).on('click', '#btn-d', function(e) {
  e.preventDefault();
  Swal.fire({
      title: 'Estas seguro de borrarlo?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        $('#delte').submit();
      }
    })
});

  $(document).on('click', '#btn-delete', function(e) {
    e.preventDefault();
    Swal.fire({
        title: 'Estas seguro de borrarlo?',
        text: "No podras revertir esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          $('#myForm2').submit();
        }
      })
});
$(document).on('click', '#confirmVote', function(e) {
  e.preventDefault();
  Swal.fire({
      title: 'Estas seguro de votar por este bot',
      text: "Quieres votar por este bot?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        $('#confirmVote').submit();
      }
    })
});
$( document ).ready(function() {
    $('[data-bs-toggle="tooltip"]').tooltip();
});