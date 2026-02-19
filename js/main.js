const track = document.getElementById("slider-track");
let position = 0;

function animate() {
  position -= 0.5;
  if (Math.abs(position) >= track.scrollWidth / 2) {
    position = 0;
  }
  track.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animate);
}

animate();

// Header shadow on scroll
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const infraTrack = document.querySelector('.infra-track');
const infraCards = document.querySelectorAll('.infra-card');

let currentIndex = 0;

function updateSlider() {
    const cardWidth = infraCards[0].offsetWidth + 30;

    infraTrack.style.transform = `translateX(calc(50% - ${cardWidth / 2}px - ${currentIndex * cardWidth}px))`;

    infraCards.forEach((card, i) => {
        card.classList.toggle('active', i === currentIndex);
    });
}

function autoSlide() {
    currentIndex++;
    if (currentIndex >= infraCards.length) {
        currentIndex = 0;
    }
    updateSlider();
}

setInterval(autoSlide, 2500);
// init
updateSlider();
