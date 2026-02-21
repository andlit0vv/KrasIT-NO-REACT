/* ======================
   PARTNERS AUTO SLIDER
====================== */

const partnerTrack = document.getElementById("slider-track");
const partners = document.querySelectorAll(".partner");

if (partnerTrack && partners.length > 0) {
  let position = 0;

  function animatePartners() {
    position -= 0.5;

    if (Math.abs(position) >= partnerTrack.scrollWidth / 2) {
      position = 0;
    }

    partnerTrack.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animatePartners);
  }

  animatePartners();
}

/* ======================
   HEADER SCROLL EFFECT
====================== */

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (!header) return;

  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ======================
   SOLUTION SLIDER
====================== */

const solutionsData = [
  {
    number: "1",
    title: "ИНФРАСТРУКТУРА ЦОД",
    desc: "Инженерная инфраструктура дата-центров",
    list: [
      "Вентиляция и кондиционирование",
      "Электропитание и освещение",
      "Кабельные системы",
      "Инженерная безопасность"
    ]
  },
  {
    number: "2",
    title: "СЛАБОТОЧНЫЕ СИСТЕМЫ",
    desc: "Проектирование и обслуживание",
    list: [
      "Контроль доступа",
      "Видеонаблюдение",
      "Пожарная сигнализация",
      "СКС и телефония"
    ]
  },
  {
    number: "3",
    title: "ПРОТИВОПОЖАРНЫЕ СИСТЕМЫ",
    desc: "Полный цикл внедрения",
    list: [
      "Пожарная сигнализация",
      "Оповещение",
      "Автоматика"
    ]
  },
  {
    number: "4",
    title: "ВЕНТИЛЯЦИЯ И КОНДИЦИОНИРОВАНИЕ",
    desc: "Системы климат-контроля",
    list: [
      "Вентиляция",
      "Отопление",
      "Сплит-системы"
    ]
  },
  {
    number: "5",
    title: "ЭЛЕКТРОСНАБЖЕНИЕ",
    desc: "Комплексные решения",
    list: [
      "Бесперебойное питание",
      "Освещение",
      "Заземление"
    ]
  }
];

const slide = document.querySelector('.solution-slide');
const prevBtn = document.getElementById('sol-prev');
const nextBtn = document.getElementById('sol-next');
const vsBox = document.querySelector('.solutions-slider');

let current = 0;
let isAnimating = false;

const ANIMATION_TIME = 350;

function renderSlide(index) {
  const data = solutionsData[index];

  slide.style.opacity = "0";
  slide.style.transform = "translateY(20px) scale(0.98)";

  setTimeout(() => {
    slide.innerHTML = `
      <div class="solution-left">
        <span class="solution-number">${data.number}</span>
        <div class="solution-line"></div>

        <h3>${data.title}</h3>
        <p class="solution-desc">${data.desc}</p>

        <ul>
          ${data.list.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;

    slide.style.opacity = "1";
    slide.style.transform = "translateY(0) scale(1)";
  }, 150);
}

function next() {
  if (isAnimating) return;
  isAnimating = true;

  current = (current + 1) % solutionsData.length;
  renderSlide(current);

  setTimeout(() => isAnimating = false, ANIMATION_TIME);
}

function prev() {
  if (isAnimating) return;
  isAnimating = true;

  current = (current - 1 + solutionsData.length) % solutionsData.length;
  renderSlide(current);

  setTimeout(() => isAnimating = false, ANIMATION_TIME);
}

nextBtn?.addEventListener('click', next);
prevBtn?.addEventListener('click', prev);

let wheelTimeout;

vsBox?.addEventListener('wheel', (e) => {
  e.preventDefault();

  clearTimeout(wheelTimeout);

  wheelTimeout = setTimeout(() => {
    if (e.deltaY > 0) next();
    else prev();
  }, 50);
});

/* INIT */
renderSlide(current);

/* ======================
   PROJECT CARDS
====================== */
document.querySelectorAll('.project-card').forEach(card => {
  const btn = card.querySelector('.project-toggle');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    card.classList.toggle('active');
  });
});

/* ======================
   BURGER MENU
====================== */

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

function openMenu() {
  burger.classList.add('active');
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  burger.classList.remove('active');
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

burger?.addEventListener('click', () => {
  if (mobileMenu.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay?.addEventListener('click', closeMenu);

/* ======================
   INFRA CAROUSEL (MOBILE ONLY)
====================== */

let infraCarousel = null;

function initInfraCarousel() {
  const infraTrack = document.querySelector('.infra-track');
  const infraWrapper = document.querySelector('.infra-wrapper');
  
  if (!infraTrack || !infraWrapper) return;

  // Очищаем предыдущую версию
  if (infraCarousel && infraCarousel.originalHTML) {
    infraTrack.innerHTML = infraCarousel.originalHTML;
    infraTrack.style.transform = '';
    infraTrack.style.transition = '';
  }

  let cards = Array.from(document.querySelectorAll('.infra-card'));
  
  if (cards.length === 0) return;

  // Сохраняем оригинальный HTML
  infraCarousel = {
    originalHTML: infraTrack.innerHTML
  };

  // Инициализируем ТОЛЬКО для мобильных (<= 600px)
  if (window.innerWidth <= 600) {
    // 🔁 Клонируем для бесконечной карусели
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);

    infraTrack.appendChild(firstClone);
    infraTrack.insertBefore(lastClone, cards[0]);

    // Обновляем список карточек
    cards = document.querySelectorAll('.infra-card');
    
    let currentIndex = 1; // старт с первой "реальной"

    function updateCarousel(animate = true) {
      const wrapperWidth = infraWrapper.offsetWidth;
      const cardWidth = wrapperWidth * 0.75; // 75% ширина карточки
      const margin = wrapperWidth * 0.125; // 12.5% margin с каждой стороны
      
      if (!animate) {
        infraTrack.style.transition = 'none';
      } else {
        infraTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }

      // Сдвигаем трек так, чтобы активная карточка была по центру
      const offset = (currentIndex * cardWidth) + (currentIndex * margin * 2);
      infraTrack.style.transform = `translateX(-${offset}px)`;

      // active класс
      cards.forEach(c => c.classList.remove('active'));
      if (cards[currentIndex]) {
        cards[currentIndex].classList.add('active');
      }
    }

    // Swipe обработка
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    infraTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, {passive: true});

    infraTrack.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    }, {passive: true});

    infraTrack.addEventListener('touchend', () => {
      if (!isDragging) return;
      
      const diff = startX - currentX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          currentIndex++;
        } else {
          currentIndex--;
        }

        updateCarousel(true);

        // 🔁 Бесконечная карусель
        setTimeout(() => {
          if (currentIndex === cards.length - 1) {
            currentIndex = 1;
            updateCarousel(false);
          }

          if (currentIndex === 0) {
            currentIndex = cards.length - 2;
            updateCarousel(false);
          }
        }, 500);
      }

      isDragging = false;
    });

    // Init
    updateCarousel(false);

    // Сохраняем данные для очистки
    infraCarousel.currentIndex = currentIndex;
    infraCarousel.cards = cards;
    infraCarousel.updateCarousel = updateCarousel;
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initInfraCarousel);

// Перезапуск при изменении размера окна
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initInfraCarousel();
  }, 250);
});
