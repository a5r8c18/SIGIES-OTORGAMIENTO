(function () {
  "use strict";
  const forms = document.querySelectorAll(".requires-validation");

  Array.from(forms).forEach(function (form) {
    // Evento de envío del formulario
    form.addEventListener(
      "submit",
      function (event) {
        // Verificar la validez del formulario
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

  
  // document.getElementById('toastbtn').onclick = function () {
  //   var toastElList = [].slice.call(document.querySelectorAll('.toast'));
  //   var toastList = toastElList.map(function (toastEl) {
  //     return new bootstrap.Toast(toastEl);
  //   });
  //   toastList.forEach((toast) => toast.show());
  // };  
  