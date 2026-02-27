# 📋 Work Log – Mohd Sharib

A clean, minimal personal work tracker to log daily working hours, office/remote status, and work updates. Data is stored in **Google Sheets** and accessible from any device.

---

## ✨ Features

- **Log daily hours** – Start time, end time, break duration, auto-calculated total
- **Office / Remote toggle** – Mark each day as in-office or remote
- **Work updates & notes** – Write what you worked on each day
- **Monthly summary** – See total days logged, hours worked, office days, and remote days for the current month
- **Google Sheets backend** – All entries sync to your Google Sheet and persist across devices
- **Works on any device** – Open via GitHub Pages on phone, laptop, or anywhere

---

## 🚀 Live Site

🔗 [https://YOUR-USERNAME.github.io/work-log](https://YOUR-USERNAME.github.io/work-log)

> Replace `YOUR-USERNAME` with your GitHub username after deployment.

---

## 🛠️ Setup Guide

### Step 1 – Create your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name the sheet tab exactly: **Work Log**
3. Add these headers in **Row 1**:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| ID | Date | Location | Start | End | Break | Hours | Notes |

---

### Step 2 – Add the Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete all existing code in the editor
3. Copy the full contents of `apps-script.js` from this repo and paste it
4. Click **Save** 💾 (Ctrl+S)

---

### Step 3 – Deploy as a Web App

1. Click **Deploy → New Deployment**
2. Click the gear icon ⚙️ → select **Web App**
3. Fill in the settings:
   - **Description**: Work Log API
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web App URL** — you'll need it in the next step

> ⚠️ If you edit the Apps Script later, you must click **Deploy → Manage Deployments → Edit → New Version** to apply changes.

---

### Step 4 – Connect the HTML to Google Sheets

1. Open `index.html` in your browser (or via GitHub Pages)
2. A yellow setup banner will appear at the top
3. Paste your **Web App URL** into the input field
4. Click **Connect to Google Sheets ✓**

The URL is saved in your browser — you only need to do this once per device.

---

### Step 5 – Upload to GitHub Pages

1. Create a new GitHub repository (public)
2. Upload `index.html` and `apps-script.js` to the repo
3. Go to **Settings → Pages**
4. Set Branch to `main`, folder to `/ (root)`
5. Click **Save** — your site will be live in ~1 minute at:
   `https://YOUR-USERNAME.github.io/REPO-NAME`

---

## 📁 File Structure

```
work-log/
├── index.html        # Main work log page (open this in browser)
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
Google Sheets (Work Log tab)
```

- **Adding an entry** → POST request to Apps Script → appends a row to Google Sheet
- **Loading entries** → GET request to Apps Script → fetches all rows from Google Sheet
- **Deleting an entry** → POST request → finds row by ID and deletes it

---

## 📱 Usage

1. Open the page in any browser
2. Select the **date** and toggle **Office** or **Remote**
3. Enter your **start time**, **end time**, and **break duration**
4. Write your **work updates/notes**
5. Click **+ Add Entry** — it saves instantly to Google Sheets
6. The **Monthly Summary** at the top updates automatically

---

## 🔒 Notes

- Your Google Sheet is private — only you can access it via your Google account
- The Apps Script Web App URL acts as an API key — keep it private
- Do not share your Web App URL publicly

---

## 👤 Author

**Mohd Sharib**
