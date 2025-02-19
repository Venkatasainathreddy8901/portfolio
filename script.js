const sections = document.querySelectorAll("section");
let currentSectionIndex = 0;
let isScrolling = false;

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
    currentSectionIndex = index;
    
    // Reduced from 1000ms to 700ms for faster transitions
    isScrolling = true;
    setTimeout(() => {
      isScrolling = false;
    }, 700); // Faster scroll speed
  }
}

// Debounce function to limit scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle scroll events with debouncing
document.addEventListener("wheel", debounce((event) => {
  if (isScrolling) return;

  // Determine scroll direction
  if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
    // Scrolling down
    scrollToSection(currentSectionIndex + 1);
  } else if (event.deltaY < 0 && currentSectionIndex > 0) {
    // Scrolling up
    scrollToSection(currentSectionIndex - 1);
  }
}, 50)); // Reduced from 100ms to 50ms for quicker response

// Optional: Add touch support for mobile devices
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
  if (isScrolling) return;
  
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;
  
  if (Math.abs(deltaY) > 50) { // Minimum swipe distance
    if (deltaY > 0 && currentSectionIndex < sections.length - 1) {
      // Swipe up
      scrollToSection(currentSectionIndex + 1);
    } else if (deltaY < 0 && currentSectionIndex > 0) {
      // Swipe down
      scrollToSection(currentSectionIndex - 1);
    }
  }
});

document.getElementById("contact-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Your message has been sent successfully!");
      form.reset(); // Reset all form fields to their initial state
    } else {
      alert("Failed to send the message. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An unexpected error occurred.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector('.projects-carousel');
  const projects = document.querySelectorAll('.project-card');
  const dotsContainer = document.querySelector('.carousel-dots');
  let currentProjectIndex = 0;

  if (carousel && projects.length && dotsContainer) {
    // Clear any existing dots
    dotsContainer.innerHTML = '';
    
    // Create dots
    projects.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => scrollToProject(index));
      dotsContainer.appendChild(dot);
    });

    // Add scroll event listener with throttling
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
        if (currentProjectIndex !== index) {
          currentProjectIndex = index;
          updateDots(index);
        }
      }, 100);
    });
  }

  function scrollToProject(index) {
    currentProjectIndex = index;
    carousel.scrollTo({ 
      left: carousel.offsetWidth * index, 
      behavior: 'smooth' 
    });
    updateDots(index);
  }

  function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
});

const typedText = document.getElementById("typed-text");
const textArray = [
  "Hi, This is Venkata Sainath Reddy Pedaballi",
  "Building intelligent systems",
  "Creating scalable AI solutions",
  "Empowering data-driven decisions",
];
const typingSpeed = 100; // Speed of typing
const erasingSpeed = 50; // Speed of erasing
const delayBetweenTexts = 1500; // Delay between typing a new sentence
let textIndex = 0; // Index of the current text in textArray
let charIndex = 0; // Index of the current character being typed

function typeText() {
  if (charIndex < textArray[textIndex].length) {
    typedText.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(eraseText, delayBetweenTexts);
  }
}

function eraseText() {
  if (charIndex > 0) {
    typedText.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, erasingSpeed);
  } else {
    textIndex = (textIndex + 1) % textArray.length; // Move to the next text
    setTimeout(typeText, typingSpeed);
  }
}

// Start the typing effect
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeText, delayBetweenTexts);
});

