const partnerTrack = document.getElementById("slider-track");
const partners = document.querySelectorAll(".partner");

if (partnerTrack && partners.length > 0) {

  let position = 0;

  function updateActivePartner() {
    const center = window.innerWidth / 2;

    partners.forEach(el => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.left + rect.width / 2;

      const dist = Math.abs(center - elCenter);

      if (dist < 80) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  function animatePartners() {
    position -= 0.5;

    if (Math.abs(position) >= partnerTrack.scrollWidth / 2) {
      position = 0;
    }

    partnerTrack.style.transform = `translateX(${position}px)`;

    updateActivePartner();

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

/* project */
document.querySelectorAll('.project-card').forEach(card => {
  const btn = card.querySelector('.project-toggle');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    card.classList.toggle('active');
  });
});
