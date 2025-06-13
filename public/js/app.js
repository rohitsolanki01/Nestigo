
  // Bootstrap 5 client-side validation
  (function () {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();

  setTimeout(() => {
    const alertElement = document.querySelector('.alert');
    if (alertElement) {
      const alert = bootstrap.Alert.getOrCreateInstance(alertElement);
      alert.close();
    }
  }, 3000); 

  //loader 
  window.addEventListener("load", function () {
    const loader = document.getElementById("preloader");
    loader.style.transition = "opacity 0.5s";
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 600);
  });
  