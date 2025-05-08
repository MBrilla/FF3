export const initScrollAnimations = () => {
  const sections = document.querySelectorAll('.aboutus-hero, .aboutus-mission, .aboutus-quote, .aboutus-vision');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust the bottom margin to trigger slightly earlier
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}; 