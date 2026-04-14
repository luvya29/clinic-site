const section = document.querySelector('.department-carousel');

// Read from CSS custom property
let cssImages = getComputedStyle(section)
  .getPropertyValue('--carousel-images')
  .split(',')
  .map(url => url.trim().replace(/^url\(["']?/, '').replace(/["']?\)$/, ''));

let current = 0;

function changeBackground() {
  section.style.backgroundImage = `url('${cssImages[current]}')`;
  current = (current + 1) % cssImages.length;
}

// Set first image immediately
changeBackground();

// Change every 5 seconds
setInterval(changeBackground, 5000);
