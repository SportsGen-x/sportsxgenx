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
    '    <li><a href="pricing.html"' + active('pricing.html') + '>Pricing</a></li>',
    '    <li class="nav-cta-li"><a href="index.html#contact"><svg class="icon" style="margin-right:6px;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Book Demo</a></li>',
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
    '          <a href="https://www.instagram.com/sports_genx/" target="_blank" rel="noopener" aria-label="Instagram" class="footer-social-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>',
    '          <a href="https://www.youtube.com/channel/UC1ugrkIW0YWp_aqqbSfTjEQ" target="_blank" rel="noopener" aria-label="YouTube" class="footer-social-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg></a>',
    '          <a href="#" aria-label="LinkedIn" class="footer-social-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>',
    '          <a href="https://wa.me/919893009057" target="_blank" rel="noopener" aria-label="WhatsApp" class="footer-social-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></a>',
    '        </div>',
    '        <p class="footer-app-label">Download the App</p>',
    '        <div class="footer-app-btns">',
    '          <a href="https://play.google.com/store/apps/details?id=com.dream_shuttlers" target="_blank" rel="noopener" class="store-btn" aria-label="Get it on Google Play">',
    '            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 5.27v13.46c0 .82.9 1.33 1.6.92l11.54-6.73c.7-.41.7-1.43 0-1.84L4.6 4.35A1.06 1.06 0 0 0 3 5.27z"/></svg>',
    '            <span class="store-btn-text"><span class="store-btn-sub">Get it on</span>Google Play</span>',
    '          </a>',
    '          <a href="https://apps.apple.com/us/app/sportsgenx/id6747614361" target="_blank" rel="noopener" class="store-btn" aria-label="Download on the App Store">',
    '            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.68-1.12 1.82-.98 2.92.1.08.2.12.31.12.9 0 2.01-.62 2.5-1.43z"/></svg>',
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
    '          <li><a href="pricing.html">Pricing</a></li>',
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
    '          <li><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg><a href="mailto:hello@sportsgenx.com">hello@sportsgenx.com</a></li>',
    '          <li><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><a href="tel:+919893009057">+91 98930 09057</a></li>',
    '          <li><svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg><a href="https://wa.me/919893009057" target="_blank" rel="noopener">WhatsApp Us</a></li>',
    '          <li><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>Bengaluru, Karnataka, India</span></li>',
    '          <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg><a href="https://webapp.sportsgenx.com" target="_blank">webapp.sportsgenx.com</a></li>',
    '        </ul>',
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
     CONTACT SECTION HTML
  ══════════════════════════════════════════ */
  var CONTACT_SECTION = [
    '<section class="contact-section" id="contact">',
    '  <div class="contact-inner">',
    '    <div class="contact-info-col">',
    '      <span class="eyebrow on-white">Get in Touch</span>',
    '      <h2 class="contact-h2">Contact Us &amp;<br><span>Book a Demo</span></h2>',
    '      <p class="contact-lead">Ready to digitize your tournament? Talk to our team — we\'ll walk you through the platform and get your first event live within the hour.</p>',
    '      <div class="contact-cards">',
    '        <div class="contact-card">',
    '          <div class="contact-card-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" style="width:20px;height:20px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>',
    '          <div class="contact-card-body">',
    '            <div class="contact-card-label">Company Location</div>',
    '            <span class="contact-card-value">B Block 401 Gulmarg Pride, Kanadia Road</span>',
    '            <div class="contact-card-sub">1 Gulmohar Colony, Indore, Madhya Pradesh — 452018</div>',
    '          </div>',
    '        </div>',
    '        <div class="contact-card">',
    '          <div class="contact-card-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" style="width:20px;height:20px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>',
    '          <div class="contact-card-body">',
    '            <div class="contact-card-label">Email Address</div>',
    '            <a href="mailto:cs@dreamshuttlers.com" class="contact-card-value">cs@dreamshuttlers.com</a>',
    '            <div class="contact-card-sub">We typically respond within 2 hours</div>',
    '          </div>',
    '        </div>',
    '        <div class="contact-card">',
    '          <div class="contact-card-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" style="width:20px;height:20px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>',
    '          <div class="contact-card-body">',
    '            <div class="contact-card-label">Call Us</div>',
    '            <a href="tel:+919893009057" class="contact-card-value">+91 98930 09057</a>',
    '            <div class="contact-card-sub">Available 5 AM – 11 PM on tournament days</div>',
    '          </div>',
    '        </div>',
    '        <div class="contact-card">',
    '          <div class="contact-card-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" style="width:20px;height:20px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></div>',
    '          <div class="contact-card-body">',
    '            <div class="contact-card-label">WhatsApp</div>',
    '            <a href="https://wa.me/919893009057" class="contact-card-value">Chat on WhatsApp</a>',
    '            <div class="contact-card-sub">Fastest way to reach us</div>',
    '          </div>',
    '        </div>',
    '      </div>',
    '      <div class="contact-social">',
    '        <a href="https://www.youtube.com/channel/UC1ugrkIW0YWp_aqqbSfTjEQ" class="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="SportsGenX on YouTube"><svg class="icon" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg> YouTube</a>',
    '        <a href="https://www.instagram.com/sports_genx/" class="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="SportsGenX on Instagram"><svg class="icon" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> Instagram</a>',
    '        <a href="https://www.facebook.com/sportsgenx" class="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="SportsGenX on Facebook"><svg class="icon" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> Facebook</a>',
    '      </div>',
    '      <div class="franchise-bar">',
    '        <div class="franchise-text">',
    '          <h3>Franchisee Enquiries</h3>',
    '          <p>Interested in becoming a SportsGenX partner or reseller?</p>',
    '        </div>',
    '        <div class="franchise-contacts">',
    '          <div class="franchise-contact">',
    '            <strong>Email</strong>',
    '            <a href="mailto:support@dreamshuttlers.com">support@dreamshuttlers.com</a>',
    '          </div>',
    '          <div class="franchise-contact">',
    '            <strong>Call</strong>',
    '            <a href="tel:+919893009057">+91 98930 09057</a>',
    '          </div>',
    '        </div>',
    '      </div>',
    '    </div>',
    '    <div class="contact-form-col">',
    '      <div class="form-box">',
    '        <div class="form-title">Book Your Free Demo</div>',
    '        <p class="form-subtitle">Fill in your details and we\'ll set up a personalised walkthrough of SportsGenX for your sport and event type.</p>',
    '        <form id="homepage-demo-form">',
    '          <div id="homepage-form-error" class="form-error" style="background:#fef2f2; border:1px solid #fca5a5; color:#dc2626; padding:10px; border-radius:4px; margin-bottom:16px; font-size:14px; display:none;"></div>',
    '          <div class="form-row">',
    '            <div class="form-group">',
    '              <label for="f-firstname">First Name *</label>',
    '              <input type="text" id="f-firstname" name="first_name" placeholder="First name" autocomplete="given-name" required />',
    '            </div>',
    '            <div class="form-group">',
    '              <label for="f-lastname">Last Name</label>',
    '              <input type="text" id="f-lastname" name="last_name" placeholder="Last name" autocomplete="family-name" />',
    '            </div>',
    '            <div class="form-group">',
    '              <label for="f-phone">Phone Number *</label>',
    '              <input type="tel" id="f-phone" name="phone" class="ait-phone" placeholder="Enter phone" autocomplete="tel" required />',
    '            </div>',
    '            <div class="form-group">',
    '              <label for="f-email">Email Address</label>',
    '              <input type="email" id="f-email" name="email" placeholder="you@email.com" autocomplete="email" />',
    '            </div>',
    '            <div class="form-group">',
    '              <label for="f-city">City</label>',
    '              <input type="text" id="f-city" name="city" placeholder="Your city" autocomplete="address-level2" />',
    '            </div>',
    '            <div class="form-group">',
    '              <label for="f-sport">Your Sport *</label>',
    '              <select id="f-sport" name="your_sport" required>',
    '                <option value="" disabled selected>Select a sport</option>',
    '                <option value="badminton">Badminton</option>',
    '                <option value="cricket">Cricket</option>',
    '                <option value="football">Football</option>',
    '                <option value="tennis">Tennis</option>',
    '                <option value="table_tennis">Table Tennis</option>',
    '                <option value="pickleball">Pickleball</option>',
    '                <option value="squash">Squash</option>',
    '                <option value="basketball">Basketball</option>',
    '                <option value="volleyball">Volleyball</option>',
    '                <option value="other">Other</option>',
    '              </select>',
    '            </div>',
    '            <div class="form-group">',
    '              <label for="f-teams">Expected No of Teams</label>',
    '              <select id="f-teams" name="expected_no_of_teams">',
    '                <option value="" disabled selected>Select teams</option>',
    '                <option value="4-8_teams">4-8 teams</option>',
    '                <option value="9-16_teams">9-16 teams</option>',
    '                <option value="17-32_teams">17-32 teams</option>',
    '                <option value="32+_teams">32+ teams</option>',
    '              </select>',
    '            </div>',
    '          </div>',
    '          <button type="submit" class="form-submit"><svg class="icon" style="margin-right:6px;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Book My Free Demo</button>',
    '        </form>',
    '        <a href="https://wa.me/919893009057" class="form-whatsapp" target="_blank" rel="noopener noreferrer">',
    '          <svg class="icon" style="margin-right:6px;" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> Or reach us instantly on WhatsApp',
    '        </a>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>'
  ].join('\n');

  /* ══════════════════════════════════════════
     INJECT ON DOM READY
  ══════════════════════════════════════════ */
  function inject() {
    var navEl = document.getElementById('site-nav');
    if (navEl) navEl.outerHTML = NAV;

    var contactEl = document.getElementById('crm-contact-section');
    if (contactEl) {
      contactEl.outerHTML = CONTACT_SECTION;
      var homepageForm = document.getElementById('homepage-demo-form');
      if (homepageForm) {
        setupFormHandler(homepageForm);
      }
    }

    var footerEl = document.getElementById('site-footer');
    if (footerEl) footerEl.outerHTML = FOOTER;

    // Floating "Book Demo" CTA button
    if (!document.getElementById('floating-demo-btn')) {
      var btn = document.createElement('a');
      btn.id = 'floating-demo-btn';
      btn.href = 'index.html#contact';
      btn.className = 'floating-demo-btn';
      btn.innerHTML = '<svg class="icon" style="margin-right:6px;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Book Free Demo';
      document.body.appendChild(btn);
    }

    initHamburger();
    initDemoForm();
    initFloatingCTA();
    loadIntlTelInput();
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
     DYNAMICAL LOADING & INIT OF INTL-TEL-INPUT
  ══════════════════════════════════════════ */
  function loadIntlTelInput() {
    if (!document.querySelector('link[href*="intlTelInput.css"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/css/intlTelInput.css';
      document.head.appendChild(link);
    }

    if (!window.intlTelInput) {
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/intlTelInput.min.js';
      script.onload = function() {
        initItiPhoneFields();
      };
      document.head.appendChild(script);
    } else {
      initItiPhoneFields();
    }
  }

  function initItiPhoneFields() {
    var ITI_UTILS = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js';
    var els = document.querySelectorAll('input.ait-phone');
    for (var p = 0; p < els.length; p++) {
      if (!els[p]._iti) {
        els[p]._iti = window.intlTelInput(els[p], {
          initialCountry: 'in',
          separateDialCode: true,
          utilsScript: ITI_UTILS
        });
      }
    }
  }

  /* ══════════════════════════════════════════
     CRM INTEGRATION SETTINGS & HELPERS
  ══════════════════════════════════════════ */
  var API_URL = 'https://app.aiengagecrm.com/cback/api';
  var SLUG = 'spgxpremierleague2';
  var REDIRECT_URL = 'thank-you-landing.html';
  var REDIRECT_TARGET = 'parent';

  function aitRedirect(url) {
    if (!url) return;
    if (REDIRECT_TARGET === 'blank') {
      var opened = null;
      try { opened = window.open(url, '_blank', 'noopener,noreferrer'); } catch (e0) {}
      if (opened) return;
      window.location.href = url;
      return;
    }
    if (REDIRECT_TARGET === 'parent') {
      var framed = false;
      try { framed = window.self !== window.top; } catch (e) { framed = true; }
      if (framed) {
        try { window.top.location.href = url; return; } catch (e2) {}
      }
    }
    window.location.href = url;
  }

  function aitTracking() {
    try {
      var here = window.location.href;
      var t = { form_submitted_url: here };
      if (document.referrer) { t.http_referrer = document.referrer; }

      var qs = new URLSearchParams(window.location.search);
      ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(function(k) {
        var v = qs.get(k); if (v) { t[k] = v; }
      });
      var clickIds = ['gclid','fbclid','msclkid','ttclid','li_fat_id'];
      for (var i = 0; i < clickIds.length; i++) {
        var c = qs.get(clickIds[i]); if (c) { t.click_id = c; break; }
      }

      try {
        var prev = JSON.parse(sessionStorage.getItem('ait_webform_tracking') || 'null');
        t.first_visit_url = (prev && prev.first_visit_url) || here;
        t.last_visit_url = here;
        t.landing_page = t.first_visit_url;
        sessionStorage.setItem('ait_webform_tracking', JSON.stringify({
          first_visit_url: t.first_visit_url, last_visit_url: here
        }));
      } catch (_s) {}

      return t;
    } catch (_e) { return {}; }
  }

  /* ══════════════════════════════════════════
     FORM HANDLER & SUBMISSION
  ══════════════════════════════════════════ */
  function setupFormHandler(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var errEl = form.parentElement.querySelector('.form-error') || document.getElementById('homepage-form-error') || document.getElementById('hero-form-error');
      if (errEl) errEl.style.display = 'none';

      var btn = form.querySelector('[type="submit"]') || form.querySelector('button');
      var originalBtnText = btn ? (btn.textContent || btn.value) : 'Submit';

      var data = {};
      var inputs = form.querySelectorAll('input, textarea, select');
      
      // Basic validation
      var first_name = form.querySelector('[name="first_name"]').value.trim();
      var phoneEl = form.querySelector('[name="phone"]');
      var phone = phoneEl ? phoneEl.value.trim() : '';
      var your_sport_el = form.querySelector('[name="your_sport"]');
      var your_sport = your_sport_el ? your_sport_el.value : '';

      if (!first_name) {
        var fnEl = form.querySelector('[name="first_name"]');
        if (fnEl) {
          fnEl.focus();
          fnEl.style.borderColor = '#C8001A';
          setTimeout(function() { fnEl.style.borderColor = ''; }, 2500);
        }
        return;
      }
      
      if (!phone) {
        if (phoneEl) {
          phoneEl.focus();
          phoneEl.style.borderColor = '#C8001A';
          setTimeout(function() { phoneEl.style.borderColor = ''; }, 2500);
        }
        return;
      }

      if (!your_sport) {
        if (your_sport_el) {
          your_sport_el.focus();
          your_sport_el.style.borderColor = '#C8001A';
          setTimeout(function() { your_sport_el.style.borderColor = ''; }, 2500);
        }
        return;
      }

      for (var i = 0; i < inputs.length; i++) {
        var el = inputs[i];
        var name = el.name;
        if (!name) continue;
        if (el.type === 'checkbox') { data[name] = el.checked; }
        else if (el.tagName === 'SELECT' && el.multiple) {
          data[name] = Array.from(el.selectedOptions).map(function(o) { return o.value; });
        } else if (el._iti) {
          var _num = '';
          try { _num = el._iti.getNumber(); } catch (_e) {}
          if (!_num) {
            try { var _cc = el._iti.getSelectedCountryData().dialCode; var _nat = (el.value || '').replace(/\D/g, ''); if (_nat) _num = '+' + _cc + _nat; } catch (_e2) {}
          }
          data[name] = _num || el.value;
        } else { data[name] = el.value; }
      }

      var payload = { data: data, tracking: aitTracking() };

      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Submitting...';
      }

      fetch(API_URL + '/public/forms/' + SLUG + '/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function(r) { return r.json().then(function(d) { return { ok: r.ok, data: d }; }); })
      .then(function(res) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalBtnText;
        }

        if (res.ok && res.data.status === 'success') {
          if (REDIRECT_URL) { aitRedirect(REDIRECT_URL); return; }
          form.style.display = 'none';
        } else {
          var msg = (res.data && res.data.message) ? res.data.message : 'Submission failed. Please try again.';
          if (errEl) {
            errEl.textContent = msg;
            errEl.style.display = 'block';
            errEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            alert(msg);
          }
        }
      })
      .catch(function() {
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalBtnText;
        }
        var msg = 'Network error. Please try again.';
        if (errEl) {
          errEl.textContent = msg;
          errEl.style.display = 'block';
        } else {
          alert(msg);
        }
      });
    });
  }

  function initDemoForm() {
    var footerForm = document.getElementById('footer-demo-form');
    if (footerForm) {
      setupFormHandler(footerForm);
    }

    var homepageForm = document.getElementById('homepage-demo-form');
    if (homepageForm) {
      setupFormHandler(homepageForm);
    }

    var heroForm = document.getElementById('hero-demo-form');
    if (heroForm) {
      setupFormHandler(heroForm);
    }
  }

  /* ══════════════════════════════════════════
     FLOATING CTA — hide when demo form is in view
  ══════════════════════════════════════════ */
  function initFloatingCTA() {
    var btn = document.getElementById('floating-demo-btn');
    var triggerEl = document.getElementById('contact') || document.getElementById('site-footer-el');
    if (!btn || !triggerEl || !window.IntersectionObserver) return;

    var observer = new IntersectionObserver(function (entries) {
      btn.style.opacity = entries[0].isIntersecting ? '0' : '1';
      btn.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'auto';
    }, { threshold: 0.1 });

    observer.observe(triggerEl);
  }

})();
