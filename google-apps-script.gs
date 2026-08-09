/**
 * SportsGenX — Demo Form Lead Capture
 * ──────────────────────────────────────────────────────────────────
 * SETUP (one-time):
 *  1. Go to https://script.google.com → New Project
 *  2. Delete default code, paste this entire file
 *  3. Deploy → New deployment → Web app
 *       Execute as: Me  |  Who has access: Anyone
 *  4. Authorize all permissions when prompted
 *  5. Copy the Web App URL into components.js  →  DEMO_FORM_ENDPOINT
 *
 * TEST: Visit the Web App URL in a browser — you should see {"status":"ok"}
 * ──────────────────────────────────────────────────────────────────
 */

var SHEET_NAME = 'SGX Demo Leads';

/* ── GET: browser test ── */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'SportsGenX lead endpoint is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ── POST: form submission ── */
function doPost(e) {
  try {
    var data = {};

    // Accept both JSON body and URL-encoded form data
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // Fallback: treat as key=value pairs
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var sheet = getOrCreateSheet();

    // Header row on first use
    if (sheet.getLastRow() === 0) {
      var headers = ['Timestamp', 'Name', 'Phone', 'Email', 'Sport', 'Source Page'];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold')
                 .setBackground('#C8001A')
                 .setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name      || '',
      data.phone     || '',
      data.email     || '',
      data.sport     || '',
      data.page      || ''
    ]);

    sheet.autoResizeColumns(1, 6);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/* ── Helper: find or create the spreadsheet ── */
function getOrCreateSheet() {
  var files = DriveApp.getFilesByName(SHEET_NAME);
  if (files.hasNext()) {
    var ss = SpreadsheetApp.open(files.next());
    return ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
  }
  var newSS = SpreadsheetApp.create(SHEET_NAME);
  var sheet = newSS.getActiveSheet();
  sheet.setName(SHEET_NAME);
  return sheet;
}

/* ── Run this manually once to verify setup ── */
function testSetup() {
  var sheet = getOrCreateSheet();
  Logger.log('✅ Sheet ready: ' + sheet.getParent().getUrl());
}
