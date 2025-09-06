// 🎨 Adds a radial gradient behind the cursor on the page
const overlay = document.getElementById("gradient-overlay");

document.addEventListener("mousemove", (e) => {
  overlay.style.backgroundImage = `
    radial-gradient(350px at ${e.clientX}px ${e.clientY}px, rgba(224, 224, 224, 0.22), transparent 100%)
  `;
});

document.addEventListener("mouseleave", () => {
  overlay.style.backgroundImage = "none";
});

// 🖱️ Toggle gradient overlay
document.querySelector(".mouseHighlightToggle").addEventListener("click", () => {
  const target = document.querySelector(".toggleGradient");

  if (target.id === "gradient-overlay") {
    target.removeAttribute("id");
  } else {
    target.setAttribute("id", "gradient-overlay");
  }
});


// 🔍 Zoom-based visibility and text resizing
function toggleVisibilityAtZoom() {
  const zoom = window.devicePixelRatio;
  const elements = document.querySelectorAll('.zoom-toggle');

  elements.forEach(el => {
    if (zoom >= 1.5 || zoom <= .80) {
      el.classList.remove('visible');
      el.classList.add('hidden');
    } else {
      el.classList.remove('hidden');
      el.classList.add('visible');
    }
  });
}

function toggleTextResize() {
  const aboutMe = document.querySelector('.aboutMe');
  const skillsContainer = document.querySelector('.skills-column');
  const textBlock = document.querySelectorAll('.text-block');
  const zoomText = document.querySelector('.zoom-text');
  if (!aboutMe || !skillsContainer) return;

  const zoomLevel = window.devicePixelRatio;

  if (zoomLevel >= 5) {
    aboutMe.style.fontSize = '0.2rem';
    skillsContainer.style.transform = 'scale(0.3)';
    textBlock.forEach(text => {
      text.style.transform = 'scale(0.3)';
    })
  } else if (zoomLevel >= 4) {
    aboutMe.style.fontSize = '0.3rem';
    skillsContainer.style.transform = 'scale(0.5)';
    textBlock.forEach(text => {
      text.style.transform = 'scale(0.5)';
    })
  } else if (zoomLevel >= 3) {
    aboutMe.style.fontSize = '0.4rem';
    skillsContainer.style.transform = 'scale(0.7)';
    textBlock.forEach(text => {
      text.style.transform = 'scale(0.7)';
    })
  } else if (zoomLevel >= 1.5) {
    aboutMe.style.fontSize = '0.5rem';
    skillsContainer.style.transform = 'scale(0.6)';
    textBlock.forEach(text => {
      text.style.transform = 'scale(0.6)';
    })
  } else if (zoomLevel >= 1.2) {
    aboutMe.style.fontSize = '0.5rem';
    skillsContainer.style.transform = 'scale(0.8)';
    textBlock.forEach(text => {
      text.style.transform = 'scale(0.8)';
    })
  } else if (zoomLevel >= 1) {
    aboutMe.style.fontSize = '';
    skillsContainer.style.transform = 'scale(1)';
    zoomText.style.fontSize = null;


  } else if (zoomLevel <= 0.5) {
    aboutMe.style.fontSize = '4rem';
    skillsContainer.style.transform = 'scale(1.5)';
    zoomText.style.fontSize = '4rem';

  } else if (zoomLevel <= 0.67) {
    aboutMe.style.fontSize = '2rem';
    skillsContainer.style.transform = 'scale(1.2)';
  }
}

function checkZoomOverlay() {
  const zoomOverlay = document.querySelector('.zoom-warning-overlay');
  const zoomLevel = window.devicePixelRatio;
  if (!zoomOverlay) return;

  if (zoomLevel <= .5) {
    zoomOverlay.classList.remove('hidden');
  } else {
    zoomOverlay.classList.add('hidden');
  }
}

window.addEventListener('load', () => {
  toggleTextResize();
  toggleVisibilityAtZoom();
  checkZoomOverlay();
});

window.addEventListener('resize', () => {
  toggleTextResize();
  toggleVisibilityAtZoom();
  checkZoomOverlay();
});

const map = document.querySelector('.experience-map');
let isDragging = false;
let startX;
let scrollStart;

map.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - map.offsetLeft;
  scrollStart = map.scrollLeft;
  map.classList.add('active');
});

map.addEventListener('mouseup', () => {
  isDragging = false;
  map.classList.remove('active');
});

map.addEventListener('mouseleave', () => {
  isDragging = false;
  map.classList.remove('active');
});

map.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - map.offsetLeft;
  const walk = (x - startX) * 1.5;
  map.scrollLeft = scrollStart - walk;
});
