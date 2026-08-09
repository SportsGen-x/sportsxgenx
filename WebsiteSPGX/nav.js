(function () {
  var hamburger = document.querySelector('.nav-hamburger');
  var navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  navLinks.id = 'nav-links';
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-controls', 'nav-links');

  hamburger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close nav when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('nav')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Toggle dropdowns on mobile tap
  document.querySelectorAll('.nav-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        link.closest('.nav-dropdown').classList.toggle('open');
      }
    });
  });
})();
