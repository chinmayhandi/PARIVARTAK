document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Sticky Header
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Set Active Navigation Link based on URL
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(item => {
    const itemPath = item.getAttribute('href');
    if (currentPath.endsWith(itemPath) || (currentPath.endsWith('/') && itemPath === 'index.html')) {
      item.classList.add('active');
    }
  });

  // Contact Form Submission (EmailJS Integration)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    if (typeof emailjs !== 'undefined') {
      emailjs.init({
        publicKey: "hzA3NAoEIoNA6My6l"
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      const formMessage = document.getElementById('formMessage');
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Disable submit button while sending
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formMessage.style.display = 'none';
      
      emailjs.send("service_2abnifr", "template_d1mri9i", {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
      })
      .then(function(response) {
         formMessage.textContent = "Thank you! Your enquiry has been sent successfully.";
         formMessage.style.color = "#155724";
         formMessage.style.backgroundColor = "#d4edda";
         formMessage.style.display = "block";
         contactForm.reset();
         submitBtn.disabled = false;
         submitBtn.textContent = 'Send Message';
      }, function(error) {
         console.error("EmailJS Error:", error);
         formMessage.textContent = "Sorry, message not sent. Please try again or contact us on WhatsApp. (" + (error.text || "Unknown Error") + ")";
         formMessage.style.color = "#721c24";
         formMessage.style.backgroundColor = "#f8d7da";
         formMessage.style.display = "block";
         submitBtn.disabled = false;
         submitBtn.textContent = 'Send Message';
      });
    });
  }
});
