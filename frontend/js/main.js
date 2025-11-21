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

// CONTACT FORM WITH EMAILJS
// Handles form submission, validation, and email delivery
const initializeContactForm = async () => {
  // Get form elements
  const contactForm = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-status");
  const submitBtn = document.getElementById("submit-btn");

  // Exit if form doesn't exist or EmailJS not loaded
  if (!contactForm || !submitBtn || typeof emailjs === "undefined") {
    return;
  }
  // handles loading stage
  const setFormLoadingState = (isLoading) => {
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? "Sending..." : "Submit Your Inquiry";

    if (statusEl && !isLoading) {
      statusEl.textContent = "";
    }
  };

  const showStatusMessage = (message, type = "info") => {
    if (!statusEl) return;

    statusEl.textContent = message;
    statusEl.className = `contact-status ${type}`;
  };

  const validateForm = () => {
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return false;
    }
    return true;
  };

  const initializeEmailService = async () => {
    try {
      await emailjs.init("ya0eBRQpfA7pF9nUh");
      console.log("EmailJS initialized successfully");
      return true;
    } catch (error) {
      console.error("EmailJS initialization failed:", error);
      showStatusMessage("Form temporarily unavailable. Please try again later.", "error");
      submitBtn.disabled = true;
      return false;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate form before sending
    if (!validateForm()) {
      return;
    }

    // Set loading state
    setFormLoadingState(true);
    showStatusMessage("Sending your message...", "info");

    try {
      await emailjs.sendForm("service_1233x6i", "template_jiwiven", contactForm);

      showStatusMessage(
        "Thank you! Your message has been sent. We'll get back to you soon.",
        "success"
      );
      contactForm.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      showStatusMessage(
        "Sorry, something went wrong. Please try again later or contact us directly.",
        "error"
      );
    } finally {
      // Always reset loading state
      setFormLoadingState(false);
    }
  };

  // INITIALIZATION

  // Initialize EmailJS service
  const emailJSReady = await initializeEmailService();
  if (!emailJSReady) return;

  // submits form
  contactForm.addEventListener("submit", handleFormSubmit);
};

// MAIN INITIALIZATION
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Initializing Amara Siivouspalvelu website...");

  // Initialize all components
  initializeMobileNavigation();
  await initializeContactForm();
});
