export const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animation to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly upward
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}; 