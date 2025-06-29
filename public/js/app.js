
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