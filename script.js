
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

function showSection(targetId) {
  sections.forEach(sec => {
    sec.classList.add('hidden');
    sec.classList.remove('fade-in', 'fade-out');
  });
  const targetSection = document.getElementById(targetId);
  targetSection.classList.remove('hidden');
  targetSection.classList.add('fade-in');
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('data-target');
    showSection(targetId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

showSection('home');

const floatingBtn = document.getElementById('floatingBackToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    floatingBtn.style.display = 'block';
    requestAnimationFrame(() => {
      floatingBtn.style.opacity = '1';
    });
  } else {
    floatingBtn.style.opacity = '0';
    setTimeout(() => {
      if (window.scrollY <= 300) floatingBtn.style.display = 'none';
    }, 300);
  }
});

floatingBtn.addEventListener('click', () => {
  const currentSection = Array.from(sections).find(sec => !sec.classList.contains('hidden'));
  if (currentSection) {
    currentSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
});

document.querySelector('.contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Your message was sent!');
  this.reset();
});

const scrollFadeElements = document.querySelectorAll('section');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const scrollFadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

scrollFadeElements.forEach(el => {
  el.classList.add('scroll-fade-in');
  scrollFadeObserver.observe(el);
});
