
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
      document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute("href");
          if (href.startsWith("#") || href.startsWith("javascript:")) {
            return; 
          }
          e.preventDefault();
          document.getElementById('loader-container').style.display = 'flex';
          setTimeout(() => {
            window.location.href = href;
          }, 200);
        });
      });