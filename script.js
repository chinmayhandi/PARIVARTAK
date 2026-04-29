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

  // Contact Form Submission (WhatsApp Integration)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Format message for WhatsApp
      const whatsappNumber = "918884445983";
      let whatsappMessage = `*New Inquiry from Parivartak Website*%0A%0A`;
      whatsappMessage += `*Name:* ${name}%0A`;
      whatsappMessage += `*Email:* ${email}%0A`;
      whatsappMessage += `*Phone:* ${phone}%0A`;
      whatsappMessage += `*Subject:* ${subject}%0A`;
      whatsappMessage += `*Message:* ${message}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      contactForm.reset();
      alert('Thank you! You are being redirected to WhatsApp to complete your message.');
    });
  }
});
