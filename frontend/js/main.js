// MOBILE NAVIGATION TOGGLE
// Handles the hamburger menu functionality for mobile devices
const initializeMobileNavigation = () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    const isOpen = nav.classList.contains("open");
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });
};


// MAIN INITIALIZATION
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Initializing Amara Siivouspalvelu website...");

  // Initialize all components
  initializeMobileNavigation();
});
