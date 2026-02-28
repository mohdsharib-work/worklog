# 📋 Work Log – Mohd Sharib - Version 1.7.1

A clean, minimal personal work tracker connected to **Google Sheets**. Log daily hours, office/remote status, and work updates — accessible from any device.

## 🚀 Live Site
🔗 [https://mohdsharib-work.github.io/worklog](https://mohdsharib-work.github.io/worklog)

---

## ✨ Features

- 🔒 **Two-layer password protection** — separate lock password & entry save password
- 🔌 Connection status on login screen with auto-retry
- 📊 Monthly summary — days, hours, office vs remote count
- 🏢 Office / 🏠 Remote toggle per day
- ⏱ Auto-calculates working hours minus break
- 📝 Work notes/updates per entry
- 🔐 Password modal on every entry save
- 🍞 Toast notifications — no ugly popups
- 📱 Works on any device via GitHub Pages

---

## 📱 Usage

1. Open the page — connection status shows on the lock screen
2. Enter your **lock password** → click **Unlock**
3. Click **"Log a Day"** header to expand the form *(🔒 Only for Sharib)*
4. Pick the **date** and toggle **🏢 Office** or **🏠 Remote**
5. Enter **start time**, **end time**, and **break** in minutes
6. Write your **work updates/notes**
7. Click **+ Add Entry** → password modal appears
8. Enter your **entry password** → click **Save Entry**
9. Entry saves to Google Sheets, green toast confirms ✅
10. Monthly summary updates automatically
11. Click **🔒 Lock** in the top right to lock the app manually

---

## 🛠️ Setup

### 1 – Google Sheet
- Create a spreadsheet, keep default tab as `Sheet1`
- Row 1 headers: `ID | Date | Location | Start | End | Break | Hours | Notes`
- Add a second tab named exactly `Config` with:

| A | B |
|---|---|
| Password | YourLockPassword |
| EntryPassword | YourEntryPassword |

> **B1** = app lock password &nbsp;|&nbsp; **B2** = entry save password

### 2 – Apps Script
- Go to **Extensions → Apps Script**
- Paste contents of `apps-script.js` → Save 💾
- Run any function to trigger authorization → Allow permissions

### 3 – Deploy
- **Deploy → New Deployment → Web App**
- Execute as: **Me** | Who has access: **Anyone**
- Copy the Web App URL

### 4 – Add URL to HTML
Find this line in `index.html` and replace with your URL:
```javascript
const scriptUrl = 'YOUR_WEB_APP_URL';
```

### 5 – GitHub Pages
- Upload `index.html`, `apps-script.js`, `README.md` to a public repo
- **Settings → Pages → Branch: main** → Save
- Live at: `https://YOUR-USERNAME.github.io/REPO-NAME`

---

## 🔒 Password System

| Password | Stored In | Purpose |
|---|---|---|
| Lock Password | Config sheet **B1** | Opens the app |
| Entry Password | Config sheet **B2** | Confirms every new entry save |

- Change either password anytime by editing the Config sheet — no redeployment needed
- Lock session stays active for **24 hours** per browser
- Entry password is required **every time** — no session memory

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| Not connected | Click **↻ Retry** on lock screen |
| Lock password fails | Check Config sheet B1 — case-sensitive |
| Entry password fails | Check Config sheet B2 — case-sensitive |
| Config not found | Tab must be named exactly `Config` |
| NaN date on entries | Delete old rows, re-enter through app |
| Changes not reflected | Redeploy as New Version in Apps Script |

---

## 📁 File Structure

```
work-log/
├── index.html        # Main work log page
├── apps-script.js    # Google Apps Script backend
├── README.md         # This file
└── LICENSE           # MIT License
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE) © 2026 Mohd Sharib.

**Author: Mohd Sharib**
