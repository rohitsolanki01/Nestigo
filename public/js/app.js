  const toggler = document.querySelector('.navbar-toggler');
  const navbar = document.getElementById('navbarNavAltMarkup');

  toggler.addEventListener('click', () => {
    document.body.classList.toggle('offcanvas-active');
  });
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



   function selectTime(element) {
            // Remove selected class from all time slots
            document.querySelectorAll('.time-slot').forEach(slot => {
                slot.classList.remove('selected');
            });
            
            // Add selected class to clicked element
            element.classList.add('selected');
        }

        function toggleGuestDropdown() {
            // Simple guest counter functionality
            const guestElement = document.getElementById('guestCount');
            const currentCount = parseInt(guestElement.textContent);
            const newCount = currentCount < 8 ? currentCount + 1 : 1;
            guestElement.textContent = `${newCount} guest${newCount !== 1 ? 's' : ''}`;
        }

        function handleReservation() {
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const selectedTime = document.querySelector('.time-slot.selected');
            const guests = document.getElementById('guestCount').textContent;
            
            if (!selectedTime) {
                alert('Please select a preferred time slot');
                return;
            }
            
            alert(`Booking Details:\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nTime: ${selectedTime.textContent}\nGuests: ${guests}`);
        }

        // Auto-update checkout date when checkin changes
        document.getElementById('checkin').addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            const checkoutDate = new Date(checkinDate);
            checkoutDate.setDate(checkoutDate.getDate() + 2);
            
            document.getElementById('checkout').value = checkoutDate.toISOString().split('T')[0];
        });



        // for the navbar display block and more js
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const body = document.body;
        
        // Add body scroll lock when menu opens
        navbarToggler.addEventListener('click', function() {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    body.classList.add('modal-open');
                } else {
                    body.classList.remove('modal-open');
                }
            }, 100);
        });
        
        // Close menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
                body.classList.remove('modal-open');
            });
        });
        
        // Close menu with close button
        const closeBtn = document.querySelector('.mobile-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                body.classList.remove('modal-open');
            });
        }
        
        // Handle escape key to close menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
                body.classList.remove('modal-open');
            }
        });

// for booking card js for the one day gap on single bookings

document.addEventListener('DOMContentLoaded', function () {
    const checkIn = document.getElementById('checkIn');
    const checkOut = document.getElementById('checkOut');
    const nightsCount = document.getElementById('nights-count');
    const totalPrice = document.getElementById('totalPrice');
    const checkoutError = document.getElementById("checkout-error");
    const pricePerNight = `<%= listing.price %>`

    function calculateNights() {
      const checkInDate = new Date(checkIn.value);
      const checkOutDate = new Date(checkOut.value);

      if (checkOutDate <= checkInDate) {
        checkoutError.style.display = 'block';
        nightsCount.textContent = '0';
        return;
      } else {
        checkoutError.style.display = 'none';
      }

      const diffTime = checkOutDate - checkInDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      nightsCount.textContent = diffDays;
      totalPrice.value = pricePerNight * diffDays;

      document.querySelector('.price').textContent = Math.floor(pricePerNight * diffDays);
    }

    checkIn.addEventListener('change', function () {
      const nextDay = new Date(this.value);
      nextDay.setDate(nextDay.getDate() + 1);
      checkOut.min = nextDay.toISOString().split('T')[0];

      if (new Date(checkOut.value) <= new Date(this.value)) {
        checkOut.value = nextDay.toISOString().split('T')[0];
      }
      calculateNights();
    });

    checkOut.addEventListener('change', calculateNights);
    document.getElementById('adults').addEventListener('change', calculateNights);
    document.getElementById('children').addEventListener('change', calculateNights);

    calculateNights();
  });




function togglePassword() {
  const passwordInput = document.getElementById('password');
  const eyeOpen = document.getElementById('eye-open');
  const eyeClosed = document.getElementById('eye-closed');
  
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeOpen.style.display = 'none';
      eyeClosed.style.display = 'block';
  } else {
      passwordInput.type = 'password';
      eyeOpen.style.display = 'block';
      eyeClosed.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.login-form');
  const inputs = form.querySelectorAll('.form-control');

  inputs.forEach(input => {
      input.addEventListener('input', function() {
          validateField(this);
      });
      
      input.addEventListener('blur', function() {
          validateField(this);
      });
  });
  

  form.addEventListener('submit', function(e) {
      let isValid = true;
      
      inputs.forEach(input => {
          if (!validateField(input)) {
              isValid = false;
          }
      });
      
      if (isValid) {
          const submitBtn = form.querySelector('.login-btn');
          const btnText = submitBtn.querySelector('.btn-text');
          const btnLoader = submitBtn.querySelector('.btn-loader');
          
          submitBtn.disabled = true;
          btnText.style.display = 'none';
          btnLoader.style.display = 'block';
      } else {
          e.preventDefault();
      }
  });
  
  function validateField(field) {
      const value = field.value.trim();
      
      if (field.hasAttribute('required') && value === '') {
          field.classList.add('is-invalid');
          return false;
      } else {
          field.classList.remove('is-invalid');
          return true;
      }
  }
});

document.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
  });
});


function togglePassword(fieldId) {
  const passwordInput = document.getElementById(fieldId);
  const eyeOpen = document.getElementById(`eye-open-${fieldId === 'password' ? 'pass' : 'confirm'}`);
  const eyeClosed = document.getElementById(`eye-closed-${fieldId === 'password' ? 'pass' : 'confirm'}`);
  
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeOpen.style.display = 'none';
      eyeClosed.style.display = 'block';
  } else {
      passwordInput.type = 'password';
      eyeOpen.style.display = 'block';
      eyeClosed.style.display = 'none';
  }
}


document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.signup-form');
  const inputs = form.querySelectorAll('.form-control');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  

  inputs.forEach(input => {
      input.addEventListener('input', function() {
          validateField(this);
      });
      
      input.addEventListener('blur', function() {
          validateField(this);
      });
  });

  passwordInput.addEventListener('input', function() {
      updatePasswordStrength(this.value);
  });
  

  confirmPasswordInput.addEventListener('input', function() {
      validatePasswordMatch();
  });
  

  form.addEventListener('submit', function(e) {
      let isValid = true;
      
      inputs.forEach(input => {
          if (!validateField(input)) {
              isValid = false;
          }
      });

      const termsCheckbox = document.getElementById('terms');
      if (!termsCheckbox.checked) {
          termsCheckbox.classList.add('is-invalid');
          isValid = false;
      }
      
      if (isValid) {
          const submitBtn = form.querySelector('.signup-btn');
          const btnText = submitBtn.querySelector('.btn-text');
          const btnLoader = submitBtn.querySelector('.btn-loader');
          
          submitBtn.disabled = true;
          btnText.style.display = 'none';
          btnLoader.style.display = 'block';
      } else {
          e.preventDefault();
      }
  });
  
  function validateField(field) {
      const value = field.value.trim();
      
      if (field.hasAttribute('required') && value === '') {
          field.classList.remove('is-valid');
          field.classList.add('is-invalid');
          hideValidationCheck(field);
          return false;
      }
      

      if (field.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
              field.classList.remove('is-valid');
              field.classList.add('is-invalid');
              hideValidationCheck(field);
              return false;
          }
      }
      
      // Username validation
      if (field.name === 'username' && value.length < 3) {
          field.classList.remove('is-valid');
          field.classList.add('is-invalid');
          hideValidationCheck(field);
          return false;
      }
      
      // Password validation
      if (field.name === 'password' && value.length < 6) {
          field.classList.remove('is-valid');
          field.classList.add('is-invalid');
          hideValidationCheck(field);
          return false;
      }
      
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      showValidationCheck(field);
      return true;
  }
  
  function validatePasswordMatch() {
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      
      if (confirmPassword === '') return;
      
      if (password !== confirmPassword) {
          confirmPasswordInput.classList.remove('is-valid');
          confirmPasswordInput.classList.add('is-invalid');
          hideValidationCheck(confirmPasswordInput);
      } else {
          confirmPasswordInput.classList.remove('is-invalid');
          confirmPasswordInput.classList.add('is-valid');
          showValidationCheck(confirmPasswordInput);
      }
  }
  
  function updatePasswordStrength(password) {
      const strengthFill = document.querySelector('.strength-fill');
      const strengthText = document.querySelector('.strength-text');
      
      let strength = 0;
      let strengthLabel = 'Too weak';
      let strengthColor = '#e53e3e';
      

      if (password.length >= 6) strength += 20;
      if (password.length >= 8) strength += 20;
      if (/[a-z]/.test(password)) strength += 20;
      if (/[A-Z]/.test(password)) strength += 20;
      if (/[0-9]/.test(password)) strength += 10;
      if (/[^A-Za-z0-9]/.test(password)) strength += 10;
      
      if (strength >= 80) {
          strengthLabel = 'Very strong';
          strengthColor = '#38a169';
      } else if (strength >= 60) {
          strengthLabel = 'Strong';
          strengthColor = '#68d391';
      } else if (strength >= 40) {
          strengthLabel = 'Good';
          strengthColor = '#f6ad55';
      } else if (strength >= 20) {
          strengthLabel = 'Weak';
          strengthColor = '#fc8181';
      }
      
      strengthFill.style.width = strength + '%';
      strengthFill.style.background = strengthColor;
      strengthText.textContent = strengthLabel;
      strengthText.style.color = strengthColor;
  }
  
  function showValidationCheck(field) {
      const validationCheck = field.parentElement.querySelector('.validation-check');
      if (validationCheck) {
          validationCheck.style.display = 'block';
      }
  }
  
  function hideValidationCheck(field) {
      const validationCheck = field.parentElement.querySelector('.validation-check');
      if (validationCheck) {
          validationCheck.style.display = 'none';
      }
  }

  document.getElementById('terms').addEventListener('change', function() {
      if (this.checked) {
          this.classList.remove('is-invalid');
      }
  });
});


document.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.01)';
  });
  
  input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
  });
});


