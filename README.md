# 📋 Work Log – Mohd Sharib

A clean, minimal **dark-themed** personal work tracker to log daily working hours, office/remote status, and work updates. Data is stored in **Google Sheets** and accessible from any device.

---

## ✨ Features

- **🌑 Dark theme** – Sleek dark UI with mint green accents and subtle glows
- **🔒 Password protected** – Secure login screen with 24-hour session memory per browser
- **🔌 Connection status on login screen** – See if server is connected before entering password
- **↻ Retry button** – Reconnect instantly on both lock screen and main page
- **Log daily hours** – Start time, end time, break duration, auto-calculated total
- **Office / Remote toggle** – Mark each day as in-office or remote
- **Work updates & notes** – Write what you worked on each day
- **Monthly summary** – Total days, hours worked, office days, and remote days for the current month
- **🔒 Only for Sharib** – Log form is clearly labelled and collapsible so managers can view without accidentally editing
- **Google Sheets backend** – All entries sync automatically and persist across devices
- **Works on any device** – Open via GitHub Pages on phone, laptop, or anywhere

---

## 🚀 Live Site

🔗 [https://YOUR-USERNAME.github.io/work-log](https://YOUR-USERNAME.github.io/work-log)

> Replace `YOUR-USERNAME` with your GitHub username after deployment.

---
## 📱 Usage

1. Open the page — connection status shows automatically on the lock screen
2. Enter your **password** → click **Unlock**
3. The **"Log a Day"** form is labelled **🔒 Only for Sharib** — click the header to collapse/expand it
4. Select the **date** and toggle **🏢 Office** or **🏠 Remote**
5. Enter **start time**, **end time**, and **break duration** (in minutes)
6. Write your **work updates / notes**
7. Click **+ Add Entry** — saves instantly to Google Sheets
8. **Monthly Summary** at the top updates automatically
9. Click **🔒 Lock** in the top right to lock the app manually

---

## 🔒 Security & Password

- Password is stored in the **Config tab** of your Google Sheet (cell B1)
- To change your password — just update cell B1 in the Config tab, no redeployment needed
- After correct login, the browser stays unlocked for **24 hours**
- Each device/browser has its own independent 24-hour timer
- Closing and reopening the browser within 24 hours **will not** ask for password again

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| "Not connected" on lock screen | Click **↻ Retry** button |
| Password not working | Check cell B1 in Config tab — must match exactly (case-sensitive) |
| Config sheet not found | Make sure second tab is named exactly `Config` |
| NaN instead of date | Delete old entries and re-add them through the app |
| Connection failed after redeployment | Update the `scriptUrl` in `index.html` with the new URL |
| No auth popup in Apps Script | Add a dummy function, run it, then authorize |
| Form not visible | Click the "Log a Day" header to expand it |

---

## 🛠️ Setup Guide

### Step 1 – Create your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Your default sheet tab can stay as **`Sheet1`**
3. Add these headers in **Row 1**:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| ID | Date | Location | Start | End | Break | Hours | Notes |

4. Click the **+** button at the bottom to add a second tab
5. Right-click the new tab → **Rename** → type exactly: `Config`
6. In the **Config** tab, add your password:

| A | B |
|---|---|
| Password | YourPasswordHere |

---

### Step 2 – Add the Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete all existing code in the editor
3. Copy the full contents of `apps-script.js` and paste it
4. Click **Save** 💾 (Ctrl+S)

---

### Step 3 – Authorize the Script

1. In Apps Script, select `doGet` from the function dropdown
2. Click ▶️ **Run**
3. A popup appears → click **Review Permissions**
4. Choose your Google account
5. Click **Advanced → Go to (project name) (unsafe) → Allow**

> If no popup appears, add a test function, run it, then authorize when prompted.

---

### Step 4 – Deploy as a Web App

1. Click **Deploy → New Deployment**
2. Click the ⚙️ gear → select **Web App**
3. Fill in the settings:
   - **Execute as**: Me
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. Copy the **Web App URL**

> ⚠️ Every time you edit the Apps Script, go to **Deploy → Manage Deployments → Edit → New Version → Deploy** to apply changes.

---

### Step 5 – Add URL to HTML file

The Web App URL is hardcoded directly in `index.html`. Open the file and find this line:

```javascript
const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

Replace it with your actual Web App URL.

---

### Step 6 – Upload to GitHub Pages

1. Create a new GitHub repository (public)
2. Rename your HTML file to `index.html`
3. Upload `index.html`, `apps-script.js`, and `README.md`
4. Go to **Settings → Pages**
5. Set Branch to `main`, folder to `/ (root)`
6. Click **Save** — your site will be live in ~1 minute at:
   `https://YOUR-USERNAME.github.io/REPO-NAME`

---

## 📁 File Structure

```
work-log/
├── index.html        # Main work log page
├── apps-script.js    # Google Apps Script backend code
└── README.md         # This file
```

---

## 🔧 How It Works

```
Browser (index.html)
      ↕  fetch (GET / POST)
Google Apps Script (Web App)
      ↕  read / write
Google Sheets (Sheet1 + Config tabs)
```

- **Page load** → checks connection and shows status on lock screen
- **Login** → password verified against Config tab in Google Sheet
- **Adding an entry** → POST → appends a row to Sheet1
- **Loading entries** → GET → fetches all rows from Sheet1
- **Deleting an entry** → POST → finds row by ID and deletes it

---

## 👤 Author

**Mohd Sharib**
