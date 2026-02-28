// =============================================
// WORK LOG - Google Apps Script Backend
// =============================================

const SHEET_NAME = "Sheet1";
const CONFIG_SHEET_NAME = "Config";

function doGet(e) {
  const action = e.parameter.action;
  if (action === "getAll") return getAll();
  if (action === "checkPassword") return checkPassword(e.parameter.password, e.parameter.type);
  return respond({ error: "Unknown action" });
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  if (action === "add") return addEntry(data.entry);
  return respond({ error: "Unknown action" });
}

// Password check — type: "lock" (B1) or "entry" (B2)
function checkPassword(inputPassword, type) {
  try {
    const config = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG_SHEET_NAME);
    if (!config) return respond({ success: false, error: "Config sheet not found" });
    // B1 = lock password, B2 = entry password
    const cell = (type === "entry") ? "B2" : "B1";
    const storedPassword = config.getRange(cell).getValue().toString().trim();
    return respond({ success: inputPassword.trim() === storedPassword });
  } catch (e) {
    return respond({ success: false, error: e.message });
  }
}

// Helper: format date as YYYY-MM-DD string
function formatDate(val) {
  if (!val) return '';
  if (typeof val === 'string' && val.match(/^\d{4}-\d{2}-\d{2}$/)) return val;
  const d = new Date(val);
  if (isNaN(d.getTime())) return String(val);
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const dy = String(d.getDate()).padStart(2, '0');
  return yr + '-' + mo + '-' + dy;
}

// Helper: format time as HH:MM string
function formatTime(val) {
  if (!val) return '';
  if (typeof val === 'string' && val.match(/^\d{2}:\d{2}$/)) return val;
  const d = new Date(val);
  if (isNaN(d.getTime())) return String(val);
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

// Entries
function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function getAll() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return respond({ entries: [] });
  const entries = rows.slice(1).map(r => ({
    id: String(r[0]),
    date: formatDate(r[1]),
    location: String(r[2]),
    start: formatTime(r[3]),
    end: formatTime(r[4]),
    break: String(r[5] || ''),
    hours: r[6] ? JSON.parse(r[6]) : null,
    notes: String(r[7] || '')
  }));
  return respond({ entries: entries.reverse() });
}

function addEntry(entry) {
  const sheet = getSheet();
  sheet.appendRow([
    entry.id, entry.date, entry.location, entry.start,
    entry.end, entry.break,
    entry.hours ? JSON.stringify(entry.hours) : "", entry.notes
  ]);
  // Force date & time columns as plain text so Sheets doesn't auto-convert
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 2).setNumberFormat('@');
  sheet.getRange(lastRow, 4).setNumberFormat('@');
  sheet.getRange(lastRow, 5).setNumberFormat('@');
  return respond({ success: true });
}


function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
