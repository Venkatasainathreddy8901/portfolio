document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // You can integrate an actual email service or backend here if needed
  alert("Thank you for reaching out!");
  event.target.reset();
});
