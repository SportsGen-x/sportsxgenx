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
     LUCIDE-STYLE ICON PATHS (consistent stroke)
  ══════════════════════════════════════════ */
  var ICONS = {
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .67.52 1.07 1.03 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    medal: '<path d="M7.21 15 2.66 7.6a2 2 0 0 1 .13-2.6L4.4 3.4a2 2 0 0 1 2.6-.13L12 6.5"/><path d="m16.79 15 4.55-7.4a2 2 0 0 0-.13-2.6L19.6 3.4a2 2 0 0 0-2.6-.13L12 6.5"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    gavel: '<path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
    clipboard: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    dice: '<rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    swords: '<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" y1="14" x2="9" y2="18"/><line x1="7" y1="17" x2="4" y2="20"/><line x1="3" y1="19" x2="5" y2="21"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    creditcard: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    puzzle: '<path d="M19.439 7.85c-.313.37-.688.665-1.109.877C17.622 9.013 17 9.5 17 10.5c0 .828.672 1.5 1.5 1.5H20v2a2 2 0 0 1-2 2h-1.5c-.828 0-1.5.672-1.5 1.5 0 .828.672 1.5 1.5 1.5H20a2 2 0 0 0 2-2v-7.5a2 2 0 0 0-2-2h-.561z"/><path d="M9.5 14.5c0-.828-.672-1.5-1.5-1.5H4v-2a2 2 0 0 1 2-2h1.5c.828 0 1.5-.672 1.5-1.5S8.328 6 7.5 6H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h1.5c.828 0 1.5-.672 1.5-1.5z"/><rect x="7" y="7" width="10" height="10" rx="1"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>',
    megaphone: '<path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    checkcircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    radio: '<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    ban: '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    frown: '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    meh: '<circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
    apple: '<path d="M12 2C11.38 2 10.19 3.09 9.8 3.7c-.52-.3-.93-.4-1.3-.4c-1.3 0-2.5 1.1-2.5 2.8c0 2.2 1.6 4.9 3.6 4.9c.7 0 1.25-.47 1.9-.47c.56 0 1 .47 1.7.47c1.8 0 3.5-2.7 3.5-4.5c0-1.8-1.2-2.8-2.5-2.8c-.44 0-1 .18-1.3.4c-.45-.73-1.63-1.8-2.4-1.8z" fill="currentColor" stroke="none"/><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83" fill="currentColor" stroke="none"/>',
    playstore: '<path d="M3 5.27v13.46c0 .82.9 1.33 1.6.92l11.54-6.73c.7-.41.7-1.43 0-1.84L4.6 4.35A1.06 1.06 0 0 0 3 5.27z" fill="currentColor" stroke="none"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    mapPin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    circle: '<circle cx="12" cy="12" r="10"/>',
    undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    tree: '<path d="M12 22v-7l-2-2"/><path d="M17 8v.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0Z"/><path d="M12 15l2-2"/>',
    handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>'
  };

  function iconSvg(name, cls) {
    var paths = ICONS[name] || ICONS.star;
    return '<svg class="' + (cls || 'icon') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  }

  function uiIcon(name, extraClass) {
    return '<span class="ui-icon' + (extraClass ? ' ' + extraClass : '') + '" data-icon="' + name + '" aria-hidden="true">' + iconSvg(name) + '</span>';
  }

  /* Official-style store badges (App Store / Google Play) */
  var PLAY_URL = 'https://play.google.com/store/apps/details?id=com.dream_shuttlers';
  var APPLE_URL = 'https://apps.apple.com/us/app/sportsgenx/id6747614361';

  function storeBadgeGoogle(variant) {
    var v = variant ? ' store-badge--' + variant : '';
    return '<a href="' + PLAY_URL + '" target="_blank" rel="noopener" class="store-badge' + v + '" aria-label="Get it on Google Play">' +
      '<svg class="store-badge-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.18 23.7c.25.14.55.16.83.05l13.5-5.9L12.1 12 3 23.55c-.05.05-.08.1-.1.15-.08.2-.05.43.08.6.07.1.14.18.2.25zM20.8 10.4l-2.8-1.6-5.7 3.2 5.7 3.2 2.9-1.6c.7-.4.7-1.4-.1-1.8zM3.08.25C2.9.4 2.8.65 2.8.95v22.1c0 .2.05.4.15.55L12 12 3.08.25zM16.7 5.15 3.9.15c-.2-.1-.4-.15-.6-.1L12.1 12l4.6-6.85z"/></svg>' +
      '<span class="store-badge-text"><span class="store-badge-sub">Get it on</span><span class="store-badge-name">Google Play</span></span></a>';
  }

  function storeBadgeApple(variant) {
    var v = variant ? ' store-badge--' + variant : '';
    return '<a href="' + APPLE_URL + '" target="_blank" rel="noopener" class="store-badge' + v + '" aria-label="Download on the App Store">' +
      '<svg class="store-badge-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.68-1.12 1.82-.98 2.92.1.08.2.12.31.12.9 0 2.01-.62 2.5-1.43z"/></svg>' +
      '<span class="store-badge-text"><span class="store-badge-sub">Download on the</span><span class="store-badge-name">App Store</span></span></a>';
  }

  function hydrateIcons(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-icon]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var name = el.getAttribute('data-icon');
      if (!name || !ICONS[name]) continue;
      if (el.querySelector('svg')) continue;
      el.innerHTML = iconSvg(name);
      if (!el.classList.contains('ui-icon') && !el.classList.contains('dd-icon')) {
        el.classList.add('ui-icon');
      }
    }
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
    '        <a href="knockout-tournament-management.html"' + ddActive('knockout-tournament-management.html') + '><span class="dd-icon" data-icon="trophy"></span> Knockout Tournaments</a>',
    '        <a href="premier-league-management.html"' + ddActive('premier-league-management.html') + '><span class="dd-icon" data-icon="medal"></span> Premier Leagues</a>',
    '        <div class="dropdown-divider"></div>',
    '        <a href="tournament-draw-making.html"' + ddActive('tournament-draw-making.html') + '><span class="dd-icon" data-icon="chart"></span> Draw Making</a>',
    '        <a href="live-player-auction.html"' + ddActive('live-player-auction.html') + '><span class="dd-icon" data-icon="gavel"></span> Live Auction</a>',
    '      </div>',
    '    </li>',
    '    <li><a href="for-organisers.html"' + active('for-organisers.html') + '>For Organisers</a></li>',
    '    <li><a href="for-academies.html"' + active('for-academies.html') + '>For Academies</a></li>',
    '    <li><a href="for-associations.html"' + active('for-associations.html') + '>For Associations</a></li>',
    '    <li><a href="for-communities.html"' + active('for-communities.html') + '>For Communities</a></li>',
    '    <li><a href="pricing.html"' + active('pricing.html') + '>Pricing</a></li>',
    '    <li class="nav-cta-li"><a href="#contact"><svg class="icon" style="margin-right:6px;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Book Demo</a></li>',
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
    '          ' + storeBadgeGoogle(),
    '          ' + storeBadgeApple(),
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
    '      <h2 class="contact-h2">Have a Project or<br><span>Requirement in Mind?</span></h2>',
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
    '        <a href="https://www.youtube.com/channel/UC1ugrkIW0YWp_aqqbSfTjEQ" class="contact-social-btn" target="_blank" rel="noopener noreferrer">',
    '          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>',
    '          <span>YouTube</span>',
    '        </a>',
    '        <a href="https://www.instagram.com/sports_genx/" class="contact-social-btn" target="_blank" rel="noopener noreferrer">',
    '          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
    '          <span>Instagram</span>',
    '        </a>',
    '        <a href="https://www.facebook.com/sportsgenx" class="contact-social-btn" target="_blank" rel="noopener noreferrer">',
    '          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
    '          <span>Facebook</span>',
    '        </a>',
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
    '        <p class="form-subtitle">Get a personalised walkthrough — live today. See auction, live scoring &amp; format setup in action — most leagues go live same day.</p>',
    '        <form id="homepage-demo-form">',
    '          <div id="homepage-form-error" class="form-error" style="background:#fef2f2; border:1px solid #fca5a5; color:#dc2626; padding:10px; border-radius:4px; margin-bottom:16px; font-size:14px; display:none;"></div>',
    '          <input type="hidden" name="page_url" class="ait-page-url" value="" />',
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
    '              <label for="f-phone">Phone *</label>',
    '              <input type="tel" id="f-phone" name="phone" class="ait-phone" placeholder="Enter phone" autocomplete="tel" required />',
    '            </div>',
    '            <div class="form-group">',
    '              <label for="f-email">Email</label>',
    '              <input type="email" id="f-email" name="email" placeholder="you@email.com" autocomplete="email" />',
    '            </div>',
    '            <div class="form-group">',
    '              <label for="f-city">City</label>',
    '              <input type="text" id="f-city" name="city" placeholder="Your city" autocomplete="address-level2" />',
    '            </div>',
    '            <div class="form-group">',
    '              <label for="f-sport">Your Sport *</label>',
    '              <select id="f-sport" name="your_sport" required>',
    '                <option value="" disabled selected>Select...</option>',
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
    '                <option value="" disabled selected>Select...</option>',
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

    // Hydrate data-icon placeholders (pages + injected nav/footer)
    hydrateIcons(document);

    // Floating "Book Demo" CTA button — scroll to on-page Get in Touch
    var hasContact = !!document.getElementById('contact');
    var contactHref = hasContact ? '#contact' : 'index.html#contact';
    if (!document.getElementById('floating-demo-btn')) {
      var btn = document.createElement('a');
      btn.id = 'floating-demo-btn';
      btn.href = contactHref;
      btn.className = 'floating-demo-btn';
      btn.innerHTML = '<svg class="icon" style="margin-right:6px;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Book Free Demo';
      document.body.appendChild(btn);
    }
    // Ensure nav Book Demo points to local contact when present
    var navCta = document.querySelector('.nav-cta-li a');
    if (navCta) navCta.setAttribute('href', contactHref);

    // Inject store badges into any placeholder mounts
    document.querySelectorAll('[data-store-badges]').forEach(function (el) {
      var variant = el.getAttribute('data-store-badges') || '';
      el.innerHTML = storeBadgeGoogle(variant) + storeBadgeApple(variant);
    });

    initHamburger();
    initDemoForm();
    initFloatingCTA();
    loadIntlTelInput();
  }

  // Expose helpers for pages that need store badges in static HTML
  window.SPGX = window.SPGX || {};
  window.SPGX.storeBadgeGoogle = storeBadgeGoogle;
  window.SPGX.storeBadgeApple = storeBadgeApple;
  window.SPGX.hydrateIcons = hydrateIcons;
  window.SPGX.iconSvg = iconSvg;

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
  var REDIRECT_URL = 'https://sportsgenx.com/thank-you-landing.html';
  var REDIRECT_TARGET = 'parent';

  function stampPageUrl(form) {
    if (!form) return;
    var field = form.querySelector('[name="page_url"]');
    if (!field) {
      field = document.createElement('input');
      field.type = 'hidden';
      field.name = 'page_url';
      field.className = 'ait-page-url';
      form.insertBefore(field, form.firstChild);
    }
    field.value = window.location.href;
  }

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
    stampPageUrl(form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      stampPageUrl(form);

      var errEl = form.parentElement.querySelector('.form-error') || document.getElementById('homepage-form-error') || document.getElementById('hero-form-error');
      if (errEl) errEl.style.display = 'none';

      var btn = form.querySelector('[type="submit"]') || form.querySelector('button');
      var originalBtnHtml = btn ? btn.innerHTML : 'Submit';

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
        if (!name || name === 'captcha_token' || name === 'captcha_answer' || name === 'g-recaptcha-response') continue;
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

      // Always include current page URL in CRM data payload
      data.page_url = window.location.href;

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
          btn.innerHTML = originalBtnHtml;
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
          btn.innerHTML = originalBtnHtml;
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
