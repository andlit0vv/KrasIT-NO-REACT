/* ======================
   PARTNERS AUTO SLIDER
====================== */

const track = document.getElementById("slider-track");
let position = 0;

function animate() {
  if (!track) return;

  position -= 0.5;

  if (Math.abs(position) >= track.scrollWidth / 2) {
    position = 0;
  }

  track.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animate);
}

animate();


/* ======================
   INFRA SLIDER (DRAG)
====================== */

const slider = document.querySelector('.infra-slider');
const infraTrack = document.querySelector('.infra-track');
const cards = document.querySelectorAll('.infra-card');

if (slider && infraTrack && cards.length > 0) {

  let currentIndex = Math.floor(cards.length / 2);

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 30;

    currentTranslate =
      -currentIndex * cardWidth +
      (slider.offsetWidth / 2 - cardWidth / 2);

    infraTrack.style.transform = `translateX(${currentTranslate}px)`;

    cards.forEach((card, i) => {
      card.classList.toggle('active', i === currentIndex);
    });
  }

  /* drag start */
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    slider.style.cursor = 'grabbing';
  });

  /* drag move */
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const delta = e.clientX - startX;

    infraTrack.style.transform = `translateX(${currentTranslate + delta}px)`;
  });

  /* drag end */
  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;

    isDragging = false;
    slider.style.cursor = 'grab';

    const delta = e.clientX - startX;
    const cardWidth = cards[0].offsetWidth + 30;

    if (delta < -50) currentIndex++;
    if (delta > 50) currentIndex--;

    currentIndex = Math.max(0, Math.min(cards.length - 1, currentIndex));

    updateSlider();
  });

  /* адаптация при ресайзе */
  window.addEventListener('resize', updateSlider);

  /* init */
  updateSlider();
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
