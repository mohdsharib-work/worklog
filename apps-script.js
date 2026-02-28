// =============================================
// WORK LOG - Google Apps Script Backend
// v1.3.4 — final reviewed version
// =============================================
//
// SETUP:
//   Sheet1  → work log entries (columns: id, date, location, start, end, break, hours, notes)
//   Config  → B1 = lock screen password, B2 = entry/save password
//
// DEPLOY: Extensions > Apps Script > Deploy > New deployment
//   Type: Web app | Execute as: Me | Who has access: Anyone
// =============================================

const SHEET_NAME = "Sheet1";
const CONFIG_SHEET_NAME = "Config";

function doGet(e) {
  const action = e.parameter.action;
  if (action === "getAll")        return getAll();
  if (action === "checkPassword") return checkPassword(e.parameter.password, e.parameter.type);
  return respond({ error: "Unknown action" });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    if (action === "add") return addEntry(data.entry);
    return respond({ error: "Unknown action" });
  } catch(err) {
    return respond({ success: false, error: "Invalid request: " + err.message });
  }
}

// ── PASSWORD CHECK ────────────────────────────
// type "lock"  → checks B1 (lock screen password)
// type "entry" → checks B2 (save/entry password)
function checkPassword(inputPassword, type) {
  try {
    const config = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG_SHEET_NAME);
    if (!config) return respond({ success: false, error: "Config sheet not found" });
    const cell = (type === "entry") ? "B2" : "B1";
    const storedPassword = config.getRange(cell).getValue().toString().trim();
    return respond({ success: inputPassword.trim() === storedPassword });
  } catch(err) {
    return respond({ success: false, error: err.message });
  }
}

// ── HELPERS ───────────────────────────────────

// FIX: use Utilities.formatDate() to avoid timezone-shift bugs
// when Google Sheets returns Date objects from date-formatted cells
function formatDate(val) {
  if (!val) return '';
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  if (typeof val === 'string' && val.match(/^\d{4}-\d{2}-\d{2}$/)) return val;
  // Fallback: try parsing as string
  const d = new Date(val);
  if (!isNaN(d.getTime())) {
    return Utilities.formatDate(d, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return String(val);
}

// FIX: same timezone-safe approach for time values
function formatTime(val) {
  if (!val) return '';
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone(), 'HH:mm');
  }
  if (typeof val === 'string' && val.match(/^\d{2}:\d{2}$/)) return val;
  const d = new Date(val);
  if (!isNaN(d.getTime())) {
    return Utilities.formatDate(d, Session.getScriptTimeZone(), 'HH:mm');
  }
  return String(val);
}

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

// ── GET ALL ENTRIES ───────────────────────────
function getAll() {
  try {
    const sheet = getSheet();
    if (!sheet) return respond({ entries: [] });
    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) return respond({ entries: [] });

    // FIX: removed .reverse() — frontend now owns sort order
    const entries = rows.slice(1).map(r => ({
      id:       String(r[0]),
      date:     formatDate(r[1]),
      location: String(r[2]),
      start:    formatTime(r[3]),
      end:      formatTime(r[4]),
      break:    String(r[5] || ''),
      hours:    r[6] ? (() => { try { return JSON.parse(r[6]); } catch(_) { return null; } })() : null,
      notes:    String(r[7] || '')
    }));

    return respond({ entries });
  } catch(err) {
    return respond({ success: false, error: err.message, entries: [] });
  }
}

// ── ADD ENTRY ─────────────────────────────────
function addEntry(entry) {
  try {
    const sheet = getSheet();
    if (!sheet) return respond({ success: false, error: "Sheet not found" });

    sheet.appendRow([
      entry.id,
      entry.date,
      entry.location,
      entry.start,
      entry.end,
      entry.break || '',
      entry.hours ? JSON.stringify(entry.hours) : '',
      entry.notes || ''
    ]);

    // Force date & time columns as plain text so Sheets doesn't auto-convert them
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 2).setNumberFormat('@STRING@'); // date
    sheet.getRange(lastRow, 4).setNumberFormat('@STRING@'); // start
    sheet.getRange(lastRow, 5).setNumberFormat('@STRING@'); // end

    return respond({ success: true });
  } catch(err) {
    return respond({ success: false, error: err.message });
  }
}

// ── RESPOND ───────────────────────────────────
function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
