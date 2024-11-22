  const sections = document.querySelectorAll("section");
  let currentSectionIndex = 0;
  let isScrolling = false; // To debounce multiple wheel events

  function scrollToSection(index) {
    sections[index].scrollIntoView({ behavior: "smooth" });
    isScrolling = true; // Start debounce
    setTimeout(() => (isScrolling = false), 400); // Debounce delay to match smooth scroll duration
  }

  document.addEventListener("wheel", (event) => {
    if (!isScrolling) {
      if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
      } else if (event.deltaY < 0 && currentSectionIndex > 0) {
        currentSectionIndex--;
      }
      scrollToSection(currentSectionIndex);
    }
  });

  document.getElementById("homeButton").addEventListener("click", () => {
    currentSectionIndex = 0;
    scrollToSection(currentSectionIndex);
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



const carousel = document.querySelector('.projects-carousel');

// Scroll to the next project
function scrollNext() {
  carousel.scrollBy({
    left: carousel.offsetWidth,
    behavior: 'smooth',
  });
}

// Scroll to the previous project
function scrollPrev() {
  carousel.scrollBy({
    left: -carousel.offsetWidth,
    behavior: 'smooth',
  });
}

const typedText = document.getElementById("typed-text");
const textArray = [
  "Hi, This is Venkata Sainath.",
  "Building intelligent systems.",
  "Creating scalable AI solutions.",
  "Empowering data-driven decisions.",
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
