window.addEventListener('scroll', () => {
   const logo = document.getElementById('logo');
   const links = document.querySelector('nav > ul');

   if (window.scrollY > 100) {
      menu.classList.add('scrolled');
   } else {
      menu.classList.remove('scrolled');
   }

})

const burgerMenu = document.querySelector('.header-burger');
const quitIconMenu = document.querySelector('.quit-icon');
const mobileMenu = document.querySelector('.mobile-menu');

function toggleBurgerMenu() {
   if (window.innerWidth > 768) {
      burgerMenu.classList.remove('show');
   } else if (!mobileMenu.classList.contains('open')) {
      burgerMenu.classList.add('show');
   }
}

burgerMenu.addEventListener('click', (e) => {
   e.stopPropagation();
   mobileMenu.classList.add('open');
   burgerMenu.classList.remove('show');
});

quitIconMenu.addEventListener('click', () => {
   mobileMenu.classList.remove('open');
   setTimeout(() => {
      burgerMenu.classList.add('show');
   }, 300);
});

document.addEventListener('click', (e) => {
   if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && e.target !== mobileMenu && e.target !== burgerMenu) {
      const clickEvent = new Event('click');
      quitIconMenu.dispatchEvent(clickEvent);
      // console.log('ITSOKER');
   }
});

window.addEventListener('resize', toggleBurgerMenu);


toggleBurgerMenu();