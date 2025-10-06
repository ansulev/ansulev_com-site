// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // Lógica para el menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
  
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        // Alterna la visibilidad del menú
        mobileMenu.classList.toggle('hidden');
        
        // Cambia el icono del botón (hamburguesa/cruz)
        const iconOpen = mobileMenuButton.querySelector('.icon-open');
        const iconClose = mobileMenuButton.querySelector('.icon-close');
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
      });
    }
  
    // Futura lógica para el Dark Mode podría ir aquí
    // ...
  
  });
  