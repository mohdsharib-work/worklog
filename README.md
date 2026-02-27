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

🔗 [https://mohdsharib-work.github.io/worklog/](https://mohdsharib-work.github.io/worklog/)


---

## 🛠️ Setup Guide

### Step 1 – Create your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name the sheet tab exactly: **Sheet1**
3. Add these headers in **Row 1**:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| ID | Date | Location | Start | End | Break | Hours | Notes |



## 📁 File Structure

```
work-log/
├── index.html        # Main work log page (open this in browser)
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
