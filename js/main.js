/* ======================
   PARTNERS AUTO SLIDER
====================== */

const partnerTrack = document.getElementById("slider-track");

if (partnerTrack) {
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
   INFRA SLIDER (SMOOTH + FOCUS + CLICK)
====================== */

const slider = document.querySelector('.infra-slider');
const trackInfra = document.querySelector('.infra-track');
const cards = document.querySelectorAll('.infra-card');

if (slider && trackInfra && cards.length > 0) {

  let currentIndex = Math.floor(cards.length / 2);

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  const cardWidth = () => cards[0].offsetWidth + 30;

  function setPosition(translate) {
    trackInfra.style.transform = `translateX(${translate}px)`;
  }

  function getCenteredTranslate(index) {
    return -index * cardWidth() + (slider.offsetWidth / 2 - cardWidth() / 2);
  }

  function updateActive() {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === currentIndex);
    });
  }

  function animateTo(target) {
    cancelAnimationFrame(animationID);

    function frame() {
      const diff = target - currentTranslate;

      currentTranslate += diff * 0.08;
      setPosition(currentTranslate);

      if (Math.abs(diff) > 0.3) {
        animationID = requestAnimationFrame(frame);
      } else {
        currentTranslate = target;
        setPosition(currentTranslate);
      }
    }

    frame();
  }

  function snapToClosest(delta = 0) {
    if (delta < -50) currentIndex += 1;
    else if (delta > 50) currentIndex -= 1;

    currentIndex = Math.max(0, Math.min(cards.length - 1, currentIndex));

    const target = getCenteredTranslate(currentIndex);

    updateActive();
    animateTo(target);
  }

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    slider.style.cursor = 'grabbing';
    cancelAnimationFrame(animationID);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const delta = e.clientX - startX;
    const next = prevTranslate + delta;

    if (next > 100 || next < -(cards.length * cardWidth())) {
      currentTranslate = next * 0.3;
    } else {
      currentTranslate = next;
    }

    setPosition(currentTranslate);
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;

    isDragging = false;
    slider.style.cursor = 'grab';

    const delta = e.clientX - startX;
    prevTranslate = currentTranslate;

    snapToClosest(delta);
  });

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      currentIndex = index;
      const target = getCenteredTranslate(currentIndex);

      updateActive();
      animateTo(target);
    });
  });

  function init() {
    currentTranslate = getCenteredTranslate(currentIndex);
    prevTranslate = currentTranslate;
    setPosition(currentTranslate);
    updateActive();
  }

  window.addEventListener('resize', init);
  init();
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
   SOLUTION SLIDER (SMOOTH VERSION)
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
