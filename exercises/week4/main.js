// Week 4 – JavaScript for mobile menu + FAQ accordion

// MOBILE NAV
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// FAQ ACCORDION
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  if (!question || !answer) return;

  question.addEventListener("click", () => {
    // Close any other open FAQ items
    faqItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove("open");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherAnswer) {
          otherAnswer.style.maxHeight = "0";
        }
      }
    });

    // Toggle the clicked one
    const isOpen = item.classList.toggle("open");
    if (isOpen) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = "0";
    }
  });
});
