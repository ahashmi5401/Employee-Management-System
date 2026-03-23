# ⚡ Smart EMS — Employee Management System

<div align="center">

![Smart EMS](https://img.shields.io/badge/Smart-EMS-dc2626?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A modern, real-time Employee Management System built for teams that move fast.**

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## ✨ Why Smart EMS?

Managing a team shouldn't be complicated. Smart EMS gives admins and employees a clean, fast, and real-time workspace — from task assignment to submission review, all in one dashboard.

---

## 🚀 Features at a Glance

### 🔴 Super Admin
- Create **Admin** and **Employee** accounts
- Full platform access and control
- Role-based permission management

### 🟠 Admin
- Real-time **dashboard** with live stats
- **Employee management** — add, edit, delete
- **Task assignment** with priority levels & due dates
- **Submission review** — approve or reject with detailed feedback
- **PDF report generation** — Task, Employee, Submission reports
- Real-time **online/offline** employee status
- Secure data access with **Firebase Security Rules**

### 🟢 Employee
- Personal **dashboard** with task & performance stats
- View assigned tasks with **progress tracking**
- **Submit work** with description, hours & completion %
- **Submission history** with admin feedback
- Real-time **notifications** — task assigned, approved, rejected
- **Profile page** with live performance metrics

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Database | Firebase Realtime Database |
| Auth | Firebase Authentication |
| PDF | jsPDF |
| Routing | React Router DOM v6 |
| Hosting | Vercel |

---

## 👥 Role System

| Role | Permissions |
|------|------------|
| `superadmin` | Create admins + employees, full platform access |
| `admin` | Create employees, manage tasks & submissions |
| `employee` | View tasks, submit work, track history |

---

## 📁 Project Structure

```
smart-ems/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin UI components
│   │   └── employee/       # Employee UI components
│   ├── pages/
│   │   ├── admin/          # Admin pages
│   │   └── employee/       # Employee pages
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Firebase utility functions
│   ├── data/               # Static data & config
│   ├── firebase.js         # Firebase setup
│   └── App.jsx             # Routing & auth
└── public/
    └── favicon.io.svg      # App favicon
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- Firebase project (Realtime Database + Authentication)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/smart-ems.git
cd smart-ems
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create `.env` in root:
```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_DATABASE_URL=your_database_url
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

### 4. Run locally
```bash
npm run dev
```

---

## 🔥 Firebase Setup

### Database Structure
```json
{
  "users": {},
  "tasks": {},
  "submissions": {},
  "notifications": {},
  "reports": {},
  "status": {}
}
```

### Security Rules
```json
{
  "rules": {
    "users": {
      ".read": "auth != null",
      "$uid": {
        ".write": "auth != null && (auth.uid === $uid || root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'superadmin')"
      }
    },
    "tasks": {
      ".read": "auth != null",
      ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'admin' || root.child('users').child(auth.uid).child('role').val() === 'superadmin')"
    },
    "submissions": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "notifications": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null"
      }
    },
    "reports": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "status": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
```

---

## 🚀 Deployment

**Vercel** — Recommended

1. Push to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

---

## 🔮 Upcoming Features

### 💬 Admin to Employee Chat
> Real-time messaging on each task. Admins can guide employees, leave feedback, and resolve blockers — without switching tools.

### 🤖 AI-Powered Task Analytics
> Smart insights powered by AI — detect overdue patterns, predict workload, suggest priorities, and surface performance trends automatically.

---

## 📸 Screenshots

> Coming soon — deployment in progress

---

## 📄 License

## 📄 License

This project is **proprietary software**.

All rights reserved © 2026 Muhammad Ayan Hashmi

Unauthorized copying, modification, distribution, or use of this software,
via any medium, is strictly prohibited without explicit written permission
from the author.

For licensing inquiries, contact: ayan@smart-ems.com
---

<div align="center">

**Built with ❤️ by Muhammad Ayan Hashmi**

⭐ Star this repo if you found it helpful!

</div>