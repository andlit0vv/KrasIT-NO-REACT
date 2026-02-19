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
  let velocity = 0;
  let animationID;

  const cardWidth = () => cards[0].offsetWidth + 30;

  /* ===== POSITION ===== */

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

  /* ===== SMOOTH SNAP ===== */

  function animateTo(target) {
    cancelAnimationFrame(animationID);

    function frame() {
      const diff = target - currentTranslate;

      // более мягкая анимация
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


  /* ===== DRAG ===== */

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    slider.style.cursor = 'grabbing';
    velocity = 0;
    cancelAnimationFrame(animationID);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const delta = e.clientX - startX;
    const next = prevTranslate + delta;

    // мягкое сопротивление по краям
    if (next > 100 || next < -(cards.length * cardWidth())) {
      currentTranslate = next * 0.3;
    } else {
      currentTranslate = next;
    }

    velocity = delta;

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


  /* ===== CLICK ===== */

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      currentIndex = index;

      const target = getCenteredTranslate(currentIndex);

      updateActive();
      animateTo(target);
    });
  });

  /* ===== INIT ===== */

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
