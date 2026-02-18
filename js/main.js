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
