const SPREADSHEET_ID = "11zJdB5K2rGfJM9ZA4cQpFwJh2XGpl2TIDFWdjbrlrqA";
const SHEET_NAME = "Transactions";
const HEADERS = ["user_id", "id", "type", "category", "amount", "date", "note", "created_at"];

function doPost(e) {
  let locked = false;
  try {
    const request = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const sheet = getSheet_();
    const action = String(request.action || "");

    if (action === "list") {
      return json_({ ok: true, entries: readEntries_(sheet) });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    locked = true;

    if (action === "save") {
      const entry = request.entry;
      validateEntry_(entry);
      const row = findRow_(sheet, entry.id);
      const values = [encodeEntry_(entry)];
      if (row) sheet.getRange(row, 1, 1, HEADERS.length).setValues(values);
      else sheet.getRange(sheet.getLastRow() + 1, 1, 1, HEADERS.length).setValues(values);
      return json_({ ok: true });
    }

    if (action === "delete") {
      const row = findRow_(sheet, String(request.id || ""));
      if (row) sheet.deleteRow(row);
      return json_({ ok: true });
    }

    if (action === "sync") {
      const entries = Array.isArray(request.entries) ? request.entries : [];
      const knownIds = new Set(readEntries_(sheet).map((entry) => entry.id));
      const missing = entries.filter((entry) => {
        validateEntry_(entry);
        return !knownIds.has(entry.id);
      });
      if (missing.length) {
        const rows = missing.map(encodeEntry_);
        sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length).setValues(rows);
      }
      return json_({ ok: true, entries: readEntries_(sheet) });
    }

    throw new Error("Unknown action: " + action);
  } catch (error) {
    return json_({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    if (locked) LockService.getScriptLock().releaseLock();
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  return sheet;
}

function readEntries_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues()
    .filter((row) => row[1] && (row[2] === "income" || row[2] === "expense") && Number.isFinite(Number(row[4])))
    .map((row) => ({
      id: String(row[1]),
      type: String(row[2]),
      category: String(row[3]),
      amount: Number(row[4]),
      date: toISODate_(row[5], sheet.getParent().getSpreadsheetTimeZone()),
      note: String(row[6] || ""),
      createdAt: Number(row[7]) || 0,
    }));
}

function toISODate_(value, timezone) {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, timezone, "yyyy-MM-dd");
  }
  const text = String(value || "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const parsed = new Date(text);
  if (!isNaN(parsed.getTime())) return Utilities.formatDate(parsed, timezone, "yyyy-MM-dd");
  return text;
}

function findRow_(sheet, id) {
  if (!id || sheet.getLastRow() < 2) return null;
  const found = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1)
    .createTextFinder(id)
    .matchEntireCell(true)
    .findNext();
  return found ? found.getRow() : null;
}

function validateEntry_(entry) {
  if (!entry || !entry.id || (entry.type !== "expense" && entry.type !== "income") ||
      !Number.isFinite(Number(entry.amount)) || Number(entry.amount) <= 0 || !entry.date) {
    throw new Error("Invalid transaction data");
  }
}

function encodeEntry_(entry) {
  return ["shared", String(entry.id), String(entry.type), String(entry.category),
    Number(entry.amount), String(entry.date), String(entry.note || ""), Number(entry.createdAt) || 0];
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
