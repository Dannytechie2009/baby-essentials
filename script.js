// SIDEBAR MENU
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.style.display = 'none';
});

// HERO SLIDER
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide() {
  slides.forEach((s, i) => {
    s.classList.remove('active');
  });
  slides[slideIndex].classList.add('active');
  document.querySelector('.slides').style.transform = `translateX(-${slideIndex * 100}%)`;
  slideIndex = (slideIndex + 1) % slides.length;
}

setInterval(showSlide, 4000);

// SCROLL ANIMATIONS
const fadeEls = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});
z