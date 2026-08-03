(() => {
  const countdowns = document.querySelectorAll('[data-countdown]');

  const updateCountdowns = () => {
    const now = Date.now();

    countdowns.forEach((countdown) => {
      const output = countdown.querySelector('[data-countdown-value]');
      const deadline = Date.parse(countdown.dataset.deadline || '');
      if (!output || Number.isNaN(deadline)) return;

      const remaining = deadline - now;
      if (remaining <= 0) {
        output.textContent = 'Submission deadline has passed';
        return;
      }

      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      output.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    });
  };

  if (countdowns.length) {
    updateCountdowns();
    window.setInterval(updateCountdowns, 1000);
  }

  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px' });

  items.forEach((item) => observer.observe(item));
})();
