// Scroll-reveal for sections
try {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
} catch (e) {}

// Terminal typing effect: whoami -> Vijay V
try {
  const typedEl = document.getElementById('typed');
  const fullText = 'Vijay V';
  if (typedEl) {
    typedEl.innerHTML = '<span class="caret"></span>';
    let i = 0;
    const type = () => {
      if (i <= fullText.length) {
        typedEl.innerHTML = fullText.slice(0, i) + '<span class="caret"></span>';
        i++;
        setTimeout(type, 110);
      }
    };
    setTimeout(type, 500);
  }
} catch (e) {}
