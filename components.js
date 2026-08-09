(function () {

  /* ────────────────────────────────────────────────────
     GOOGLE SHEETS ENDPOINT
     1. Go to https://script.google.com — create a new project.
     2. Paste the code from google-apps-script.gs.
     3. Deploy → "New deployment" → type "Web app" →
        Execute as: Me  |  Who has access: Anyone
     4. Copy the Web App URL and paste it below.
  ──────────────────────────────────────────────────── */
  var WEB3FORMS_KEY = '9b0b5880-470c-4c95-941c-a83aa559d40e';

  /* ── Active-page detection ── */
  var page = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];

  function active(href) {
    return page === href ? ' class="active"' : '';
  }
  function ddActive(href) {
    return page === href ? ' class="active"' : '';
  }

  /* ══════════════════════════════════════════
     NAV HTML
  ══════════════════════════════════════════ */
  var NAV = [
    '<nav role="navigation" aria-label="Main navigation">',
    '  <a href="index.html" class="nav-logo">',
    '    <img src="sportsgenxlogored.png" alt="SportsGenX"/>',
    '  </a>',
    '  <ul class="nav-links" id="nav-links">',
    '    <li><a href="index.html"' + active('index.html') + '>Home</a></li>',
    '    <li class="nav-dropdown">',
    '      <a href="#">Tournament Management <span class="chevron"></span></a>',
    '      <div class="dropdown-menu">',
    '        <a href="knockout-tournament-management.html"' + ddActive('knockout-tournament-management.html') + '><span class="dd-icon">🏆</span> Knockout Tournaments</a>',
    '        <a href="premier-league-management.html"' + ddActive('premier-league-management.html') + '><span class="dd-icon">🥇</span> Premier Leagues</a>',
    '        <div class="dropdown-divider"></div>',
    '        <a href="tournament-draw-making.html"' + ddActive('tournament-draw-making.html') + '><span class="dd-icon">📊</span> Draw Making</a>',
    '        <a href="live-player-auction.html"' + ddActive('live-player-auction.html') + '><span class="dd-icon">🔨</span> Live Auction</a>',
    '      </div>',
    '    </li>',
    '    <li><a href="for-organisers.html"' + active('for-organisers.html') + '>For Organisers</a></li>',
    '    <li><a href="for-academies.html"' + active('for-academies.html') + '>For Academies</a></li>',
    '    <li><a href="for-associations.html"' + active('for-associations.html') + '>For Associations</a></li>',
    '    <li><a href="for-communities.html"' + active('for-communities.html') + '>For Communities</a></li>',
    '    <li class="nav-cta-li"><a href="#demo-form">📅 Book Demo</a></li>',
    '  </ul>',
    '  <button class="nav-hamburger" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-links">',
    '    <span></span><span></span><span></span>',
    '  </button>',
    '</nav>'
  ].join('\n');

  /* ══════════════════════════════════════════
     FOOTER HTML
  ══════════════════════════════════════════ */
  var FOOTER = [
    '<footer class="site-footer" id="site-footer-el">',
    '  <div class="footer-top">',
    '    <div class="footer-inner">',

    '      <!-- Brand -->',
    '      <div class="footer-brand">',
    '        <a href="index.html"><img src="sportsgenxlogored.png" alt="SportsGenX" class="footer-logo"/></a>',
    '        <p class="footer-tagline">The complete tournament management platform for sports organisers, academies, associations, and communities.</p>',
    '        <div class="footer-social">',
    '          <a href="#" aria-label="Instagram" class="social-btn">📸</a>',
    '          <a href="#" aria-label="YouTube" class="social-btn">▶️</a>',
    '          <a href="#" aria-label="LinkedIn" class="social-btn">💼</a>',
    '          <a href="#" aria-label="WhatsApp" class="social-btn">💬</a>',
    '        </div>',
    '        <p class="footer-app-label">Download the App</p>',
    '        <div class="footer-app-btns">',
    '          <a href="https://play.google.com/store/apps/details?id=com.dream_shuttlers" target="_blank" rel="noopener" class="store-btn" aria-label="Get it on Google Play">',
    '            <span class="store-btn-icon">▶</span>',
    '            <span class="store-btn-text"><span class="store-btn-sub">Get it on</span>Google Play</span>',
    '          </a>',
    '          <a href="https://apps.apple.com/us/app/sportsgenx/id6747614361" target="_blank" rel="noopener" class="store-btn" aria-label="Download on the App Store">',
    '            <span class="store-btn-icon">🍎</span>',
    '            <span class="store-btn-text"><span class="store-btn-sub">Download on the</span>App Store</span>',
    '          </a>',
    '        </div>',
    '      </div>',

    '      <!-- Platform links -->',
    '      <div class="footer-links">',
    '        <h4 class="footer-h4">Platform</h4>',
    '        <ul>',
    '          <li><a href="for-organisers.html">For Organisers</a></li>',
    '          <li><a href="for-academies.html">For Academies &amp; Clubs</a></li>',
    '          <li><a href="for-associations.html">For Associations</a></li>',
    '          <li><a href="for-communities.html">For Communities</a></li>',
    '        </ul>',
    '      </div>',

    '      <!-- Tournament tools -->',
    '      <div class="footer-links">',
    '        <h4 class="footer-h4">Tournament Tools</h4>',
    '        <ul>',
    '          <li><a href="premier-league-management.html">Premier League</a></li>',
    '          <li><a href="knockout-tournament-management.html">Knockout Tournament</a></li>',
    '          <li><a href="tournament-draw-making.html">Draw Making</a></li>',
    '          <li><a href="live-player-auction.html">Live Player Auction</a></li>',
    '        </ul>',
    '      </div>',

    '      <!-- Contact -->',
    '      <div class="footer-contact">',
    '        <h4 class="footer-h4">Contact Us</h4>',
    '        <ul class="contact-list">',
    '          <li><span class="contact-icon">📧</span><a href="mailto:hello@sportsgenx.com">hello@sportsgenx.com</a></li>',
    '          <li><span class="contact-icon">📞</span><a href="tel:+919893009057">+91 98930 09057</a></li>',
    '          <li><span class="contact-icon">💬</span><a href="https://wa.me/919893009057" target="_blank">WhatsApp Us</a></li>',
    '          <li><span class="contact-icon">📍</span><span>Bengaluru, Karnataka, India</span></li>',
    '          <li><span class="contact-icon">🌐</span><a href="https://webapp.sportsgenx.com" target="_blank">webapp.sportsgenx.com</a></li>',
    '        </ul>',
    '      </div>',

    '    </div>',
    '  </div>',

    '  <!-- ════ DEMO FORM BAND ════ -->',
    '  <div class="footer-demo-band" id="demo-form">',
    '    <div class="footer-demo-inner">',

    '      <div class="footer-demo-text">',
    '        <span class="demo-badge">🔥 Free Demo — Limited Slots Available</span>',
    '        <h3 class="footer-demo-h3">Book a Free <span>Demo Session</span></h3>',
    '        <p class="footer-demo-sub">See SportsGenX live — we\'ll walk you through the full platform in under 30 minutes. Run your first tournament the same day.</p>',
    '        <div class="demo-trust-stats">',
    '          <div class="dts"><span class="dts-num">500+</span><span class="dts-label">Tournaments</span></div>',
    '          <div class="dts"><span class="dts-num">5 min</span><span class="dts-label">Setup</span></div>',
    '          <div class="dts"><span class="dts-num">Free</span><span class="dts-label">Demo</span></div>',
    '          <div class="dts"><span class="dts-num">24hr</span><span class="dts-label">Response</span></div>',
    '        </div>',
    '      </div>',

    '      <div class="footer-demo-right">',
    '        <form class="footer-form" id="footer-demo-form" novalidate>',
    '          <div class="footer-form-row">',
    '            <input type="text"  class="footer-input" name="name"  placeholder="Full Name *"          required/>',
    '            <input type="tel"   class="footer-input" name="phone" placeholder="Phone Number *"        required/>',
    '            <input type="email" class="footer-input" name="email" placeholder="Email Address"/>',
    '            <input type="text"  class="footer-input" name="city"  placeholder="Your City"/>',
    '            <select class="footer-input" name="sport">',
    '              <option value="">Your Sport *</option>',
    '              <option>Badminton</option>',
    '              <option>Cricket</option>',
    '              <option>Football</option>',
    '              <option>Tennis</option>',
    '              <option>Table Tennis</option>',
    '              <option>Pickleball</option>',
    '              <option>Basketball</option>',
    '              <option>Squash</option>',
    '              <option>Volleyball</option>',
    '              <option>Other</option>',
    '            </select>',
    '            <select class="footer-input" name="role">',
    '              <option value="">I Am A *</option>',
    '              <option>Tournament Organiser</option>',
    '              <option>Sports Association</option>',
    '              <option>Academy / Club</option>',
    '              <option>League Organiser</option>',
    '              <option>Sports Community</option>',
    '              <option>Franchisee Enquiry</option>',
    '            </select>',
    '            <textarea class="footer-input footer-textarea" name="message" placeholder="Tell us about your event, player count, format — anything that helps us prepare for your demo"></textarea>',
    '            <button type="submit" class="footer-submit">📅 Book My Free Demo →</button>',
    '          </div>',
    '          <p class="footer-form-note">✅ No credit card &nbsp;·&nbsp; 📞 We call within 24 hrs &nbsp;·&nbsp; 🔒 Your info stays private</p>',
    '        </form>',
    '        <a href="https://wa.me/919893009057" target="_blank" rel="noopener" class="footer-whatsapp">💬 &nbsp;Or reach us instantly on WhatsApp</a>',
    '        <div class="footer-form-success" id="demo-success" style="display:none">',
    '          <span class="success-icon">✅</span>',
    '          <div>',
    '            <strong>Thank you! We\'ll be in touch within 24 hours.</strong>',
    '            <p>Meanwhile, explore our <a href="https://webapp.sportsgenx.com" target="_blank">web app</a> or check out our features.</p>',
    '          </div>',
    '        </div>',
    '      </div>',

    '    </div>',
    '  </div>',

    '  <!-- Bottom bar -->',
    '  <div class="footer-bottom">',
    '    <div class="footer-bottom-inner">',
    '      <p>© 2026 SportsGenX / Dream Shuttlers LLP. All rights reserved.</p>',
    '      <div class="footer-bottom-nav">',
    '        <a href="privacy-policy.html">Privacy Policy</a>',
    '        <a href="terms-and-conditions.html">Terms &amp; Conditions</a>',
    '        <a href="#">Refund Policy</a>',
    '        <a href="index.html">Home</a>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</footer>'
  ].join('\n');

  /* ══════════════════════════════════════════
     INJECT ON DOM READY
  ══════════════════════════════════════════ */
  function inject() {
    var navEl = document.getElementById('site-nav');
    if (navEl) navEl.outerHTML = NAV;

    var footerEl = document.getElementById('site-footer');
    if (footerEl) footerEl.outerHTML = FOOTER;

    // Floating "Book Demo" CTA button
    if (!document.getElementById('floating-demo-btn')) {
      var btn = document.createElement('a');
      btn.id = 'floating-demo-btn';
      btn.href = '#demo-form';
      btn.className = 'floating-demo-btn';
      btn.innerHTML = '📅 Book Free Demo';
      document.body.appendChild(btn);
    }

    initHamburger();
    initDemoForm();
    initFloatingCTA();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  /* ══════════════════════════════════════════
     HAMBURGER / MOBILE NAV
  ══════════════════════════════════════════ */
  function initHamburger() {
    var hamburger = document.querySelector('.nav-hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      // Close all open dropdowns when nav is closed
      if (!open) {
        navLinks.querySelectorAll('.nav-dropdown.open').forEach(function (dd) {
          dd.classList.remove('open');
        });
      }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('nav')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.querySelectorAll('.nav-dropdown.open').forEach(function (dd) {
          dd.classList.remove('open');
        });
      }
    });

    navLinks.querySelectorAll('.nav-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 960) {
          e.preventDefault();
          e.stopPropagation();
          var dd = link.closest('.nav-dropdown');
          var wasOpen = dd.classList.contains('open');
          // Close any other open dropdowns first
          navLinks.querySelectorAll('.nav-dropdown.open').forEach(function (other) {
            other.classList.remove('open');
          });
          if (!wasOpen) dd.classList.add('open');
        }
      });
    });
  }

  /* ══════════════════════════════════════════
     DEMO FORM — submit → Google Sheets + localStorage → thank-you.html
  ══════════════════════════════════════════ */
  function setupFormHandler(form, subject) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('[name="name"]').value.trim();
      var phone = form.querySelector('[name="phone"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var city = form.querySelector('[name="city"]').value.trim();
      var sport = form.querySelector('[name="sport"]').value;
      var role = form.querySelector('[name="role"]').value;
      var message = form.querySelector('[name="message"]').value.trim();

      // Basic validation
      if (!name || !phone) {
        var first = !name ? form.querySelector('[name="name"]') : form.querySelector('[name="phone"]');
        if (first) {
          first.focus();
          first.style.borderColor = '#C8001A';
          first.style.boxShadow = '0 0 0 3px rgba(200,0,26,.25)';
          setTimeout(function () {
            first.style.borderColor = '';
            first.style.boxShadow = '';
          }, 2500);
        }
        return;
      }

      // Submit to Web3Forms then redirect
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: subject || 'New Demo Request — SportsGenX',
          from_name: 'SportsGenX Website',
          name: name,
          phone: phone,
          email: email || 'Not provided',
          city: city || 'Not provided',
          sport: sport || 'Not selected',
          role: role || 'Not selected',
          message: message || 'No message',
          source_page: window.location.href
        })
      })
        .catch(function () { })
        .finally(function () {
          window.location.href = 'thank-you.html';
        });
    });
  }

  function initDemoForm() {
    var footerForm = document.getElementById('footer-demo-form');
    if (footerForm) {
      setupFormHandler(footerForm, 'New Demo Request — SportsGenX (Footer)');
    }

    var homepageForm = document.getElementById('homepage-demo-form');
    if (homepageForm) {
      setupFormHandler(homepageForm, 'New Demo Request — SportsGenX (Homepage)');
    }

    var heroForm = document.getElementById('hero-demo-form');
    if (heroForm) {
      setupFormHandler(heroForm, 'New Demo Request — SportsGenX (Hero)');
    }
  }

  /* ══════════════════════════════════════════
     FLOATING CTA — hide when demo form is in view
  ══════════════════════════════════════════ */
  function initFloatingCTA() {
    var btn = document.getElementById('floating-demo-btn');
    var demoForm = document.getElementById('demo-form');
    if (!btn || !demoForm || !window.IntersectionObserver) return;

    var observer = new IntersectionObserver(function (entries) {
      btn.style.opacity = entries[0].isIntersecting ? '0' : '1';
      btn.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'auto';
    }, { threshold: 0.1 });

    observer.observe(demoForm);
  }

})();
