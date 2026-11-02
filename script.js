// Contato confirmado pelo responsável pelo projeto.
const contact = {
  phone: '5581998893216',
  message: 'Olá, Adriana! Vim pelo seu site e gostaria de saber mais sobre o atendimento de podologia.',
};

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  link.href = `https://wa.me/${contact.phone}?text=${encodeURIComponent(contact.message)}`;
});

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu.classList.toggle('is-open', !isOpen);
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header-inner')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

// Carrossel com cartões laterais, animação e reprodução automática controlável.
const carousel = document.querySelector('.review-carousel');
const reviewSlides = [...document.querySelectorAll('.review-slide')];
const status = document.querySelector('#review-status');
const autoplayButton = document.querySelector('#review-autoplay');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let reviewIndex = 0;
let autoplayPaused = reducedMotion.matches;
let carouselVisible = false;
let pointerInside = false;
let timer = null;
const dots = reviewSlides.map((slide, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Mostrar avaliação ${index + 1}`);
  dot.addEventListener('click', () => showReview(index, true));
  document.querySelector('.review-dots').append(dot);
  return dot;
});
function scheduleAutoplay() {
  clearInterval(timer);
  timer = null;
  if (!autoplayPaused && carouselVisible && !pointerInside && !document.hidden && !carousel.contains(document.activeElement)) {
    timer = setInterval(() => showReview(reviewIndex + 1), 6500);
  }
}
function updateAutoplayButton() {
  autoplayButton.textContent = autoplayPaused ? 'Retomar reprodução automática' : 'Pausar reprodução automática';
  autoplayButton.setAttribute('aria-pressed', String(autoplayPaused));
}
function showReview(index, manual = false) {
  reviewIndex = (index + reviewSlides.length) % reviewSlides.length;
  const previous = (reviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
  const next = (reviewIndex + 1) % reviewSlides.length;
  reviewSlides.forEach((slide, position) => {
    const active = position === reviewIndex;
    const side = position === previous || position === next;
    slide.classList.toggle('is-active', active);
    slide.classList.toggle('is-previous', position === previous);
    slide.classList.toggle('is-next', position === next);
    slide.classList.toggle('is-away', !active && !side);
    slide.setAttribute('aria-hidden', String(!active && !side));
    slide.setAttribute('role', side ? 'button' : 'group');
    slide.tabIndex = side ? 0 : -1;
    slide.setAttribute('aria-label', `${side ? 'Mostrar: ' : ''}avaliação de ${slide.querySelector('.review-author').textContent}, ${position + 1} de ${reviewSlides.length}`);
    dots[position].setAttribute('aria-current', active ? 'true' : 'false');
  });
  // A navegação automática não anuncia mudanças repetidas para leitores de tela.
  status.setAttribute('aria-live', manual ? 'polite' : 'off');
  status.textContent = `${reviewIndex + 1} de ${reviewSlides.length}`;
  if (manual) scheduleAutoplay();
}
reviewSlides.forEach((slide, index) => {
  function selectCard() {
    if (!slide.classList.contains('is-active')) {
      showReview(index, true);
      slide.focus({ preventScroll: true });
    }
  }
  slide.addEventListener('click', selectCard);
  slide.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectCard(); }
  });
});
document.querySelector('#review-prev').addEventListener('click', () => showReview(reviewIndex - 1, true));
document.querySelector('#review-next').addEventListener('click', () => showReview(reviewIndex + 1, true));
autoplayButton.addEventListener('click', () => {
  autoplayPaused = !autoplayPaused;
  updateAutoplayButton();
  scheduleAutoplay();
});
carousel.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showReview(reviewIndex + (event.key === 'ArrowRight' ? 1 : -1), true);
  }
});
carousel.addEventListener('mouseenter', () => { pointerInside = true; scheduleAutoplay(); });
carousel.addEventListener('mouseleave', () => { pointerInside = false; scheduleAutoplay(); });
carousel.addEventListener('focusin', scheduleAutoplay);
carousel.addEventListener('focusout', () => setTimeout(scheduleAutoplay, 0));
document.addEventListener('visibilitychange', scheduleAutoplay);
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) autoplayPaused = true;
  updateAutoplayButton();
  scheduleAutoplay();
});
new IntersectionObserver(([entry]) => {
  carouselVisible = entry.isIntersecting;
  scheduleAutoplay();
}, { threshold: 0.35 }).observe(carousel);
let touchOrigin = null;
carousel.addEventListener('touchstart', (event) => {
  if (event.touches.length !== 1) { touchOrigin = null; return; }
  touchOrigin = { x: event.touches[0].clientX, y: event.touches[0].clientY };
}, { passive: true });
carousel.addEventListener('touchend', (event) => {
  if (!touchOrigin || !event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - touchOrigin.x;
  const dy = event.changedTouches[0].clientY - touchOrigin.y;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showReview(reviewIndex + (dx < 0 ? 1 : -1), true);
  touchOrigin = null;
}, { passive: true });
carousel.addEventListener('touchcancel', () => { touchOrigin = null; });
showReview(0);
updateAutoplayButton();

// Conteúdo sensível: sem imagem carregada ou exposta até a escolha do visitante.
document.querySelectorAll('.reveal-result').forEach((button) => {
  button.addEventListener('click', () => {
    const content = document.getElementById(`result-${button.dataset.case}`);
    content.querySelectorAll('img[data-src]').forEach((image) => {
      if (!image.getAttribute('src')) image.src = image.dataset.src;
    });
    button.setAttribute('aria-expanded', 'true');
    document.getElementById(`notice-${button.dataset.case}`).hidden = true;
    content.hidden = false;
    content.querySelector('.hide-result').focus({ preventScroll: true });
  });
});
document.querySelectorAll('.hide-result').forEach((button) => {
  button.addEventListener('click', () => {
    const content = document.getElementById(`result-${button.dataset.case}`);
    const notice = document.getElementById(`notice-${button.dataset.case}`);
    content.hidden = true;
    notice.hidden = false;
    const reveal = notice.querySelector('.reveal-result');
    reveal.setAttribute('aria-expanded', 'false');
    reveal.focus({ preventScroll: true });
  });
});

// Preferência de aparência; localStorage pode estar indisponível em modo privado.
const themeToggle = document.querySelector('.theme-toggle');
function updateThemeControl() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
  themeToggle.querySelector('.theme-label').textContent = dark ? 'Modo claro' : 'Modo escuro';
  themeToggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#14221b' : '#244e3d';
}
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('adriana-theme', theme); } catch {}
  updateThemeControl();
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  let saved = null;
  try { saved = localStorage.getItem('adriana-theme'); } catch {}
  if (saved !== 'dark' && saved !== 'light') {
    document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
    updateThemeControl();
  }
});
updateThemeControl();
