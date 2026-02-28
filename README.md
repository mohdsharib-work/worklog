# 📋 Work Log – Mohd Sharib

A clean, minimal personal work tracker connected to **Google Sheets**. Log daily hours, office/remote status, and work updates — accessible from any device.

## 🚀 Live Site
🔗 [https://mohdsharib-work.github.io/worklog](https://mohdsharib-work.github.io/worklog)

---

## ✨ Features

- 🔒 Password protected with 24-hour session memory
- 📊 Monthly summary — days, hours, office vs remote count
- 🏢 Office / 🏠 Remote toggle per day
- ⏱ Auto-calculates working hours minus break
- 📝 Work notes/updates per entry
- 🔌 Connection status on login screen with retry button
- 📱 Works on any device via GitHub Pages

---

## 📱 Usage

1. Open the page — connection status shows on the lock screen
2. Enter your **password** → click **Unlock**
3. Click **"Log a Day"** header to expand the form *(labelled 🔒 Only for Sharib)*
4. Pick the **date** and toggle **🏢 Office** or **🏠 Remote**
5. Enter **start time**, **end time**, and **break** in minutes
6. Write your **work updates/notes**
7. Click **+ Add Entry** — saves instantly to Google Sheets
8. View all entries below — monthly summary updates automatically
9. Click **🔒 Lock** in the top right to lock the app manually

---

## 🛠️ Setup

### 1 – Google Sheet
- Create a spreadsheet, keep default tab as `Sheet1`
- Row 1 headers: `ID | Date | Location | Start | End | Break | Hours | Notes`
- Add a second tab named exactly `Config` with:

| A | B |
|---|---|
| Password | YourPassword |

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

## 🔒 Password

- Stored in **Config sheet cell B1** — change anytime, no redeployment needed
- Session stays unlocked for **24 hours** per browser

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| Not connected | Click **↻ Retry** |
| Password fails | Check cell B1 — case-sensitive |
| Config not found | Tab must be named exactly `Config` |
| NaN date on entries | Delete old rows, re-enter through app |
| No auth popup | Run a function manually in Apps Script |

---

**Author: Mohd Sharib**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) © 2026 Mohd Sharib.
