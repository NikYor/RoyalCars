# 🚗 Royal Car — React + Vite + Node.js Server

## 📖 Project Overview
**Royal Car** е уеб приложение за управление на автомобилен каталог, резервации и потребителски профили.  
Frontend е изграден с **React + Vite**, а backend сървърът е отделен Node.js проект, който се стартира паралелно.  
Приложението включва:
- 🔑 Аутентикация и ролево управление (User/Admin)
- 📊 Каталог с автомобили и резервации
- 📝 Surveys и feedback система
- 🌍 Интеграция с карти (Leaflet, Google Maps API)
- ⚡ Real‑time известия чрез **Socket.IO**

---

## 🛠️ Tech Stack
- **Frontend**
  - React 19 + Vite 7
  - React Router DOM 7
  - Redux Toolkit за глобално състояние
  - @react-google-maps/api за Google Maps интеграция
- **Backend**
  - Node.js + Express (в папка `server/`)
  - Socket.IO за real‑time комуникация
  - REST API за CRUD операции
- **Tooling**
  - ESLint + React Hooks rules
  - Concurrently за паралелен старт на client и server
  - Wait‑on за синхронизация при стартиране

---

## ⚙️ Scripts
В `package.json` са дефинирани следните команди:

| Script        | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `npm run dev`     | Стартира Vite dev server (frontend)                                      |
| `npm run build`   | Билдва production bundle                                                 |
| `npm run preview` | Стартира preview на production build                                     |
| `npm run lint`    | Проверява кода с ESLint                                                  |
| `npm run server`  | Инсталира зависимости и стартира backend сървъра от папка `server/`      |
| `npm run start`   | Стартира **SERVER** и **CLIENT** едновременно чрез concurrently          |

---

## 📂 Project Structure
```text
royal-car/
├── server/              # Backend (Node.js, Express, Socket.IO)
├── src/                 # Frontend React code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level views
│   ├── hooks/           # Custom hooks
│   ├── store/           # Redux Toolkit slices
│   ├── services/        # API calls
│   └── main.jsx         # React entry point
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

---

## 🚀 Running the Project
1. **Install dependencies**  
   ```bash
   npm install
2. **Start both server and client concurently**
   ```bash
   npm start
3. ** Or start server & client separately **
    ```bash
    npm run server
    npm run dev

## 🔄 Workflow of Application

```text
User (Regular)
 │
 │ 1. Login / Register
 │    → Authentication via JWT
 │
 ▼
Client (React + Vite)
 │
 │ 2. Browse Car Catalog
 │    → Fetch data from REST API
 │
 │ 3. Book a Car
 │    → Send booking request to Server
 │
 ▼
Server (Node.js + Express)
 │
 │ 4. Process Booking
 │    → Validate request
 │    → Store in Database
 │
 │ 5. Trigger Notifications
 │    → Emit events via Socket.IO
 │
 ▼
Client (React + Redux)
 │
 │ 6. Receive Real‑Time Updates
 │    → Booking confirmation
 │    → Car completion events
 │
 │ 7. Survey & Feedback
 │    → Prompt user for feedback
 │    → Send survey results to Server
 │
 ▼
Server
 │
 │ 8. Store Survey Results
 │    → Aggregate feedback
 │    → Provide analytics
 │
 ▼
Admin (Role‑based Access)
 │
 │ 9. Create Car
 │    → Admin adds new car to catalog
 │
 │ 10. Edit Car
 │    → Admin edits cars created by himself
 │
 │ 11. Manage Users
 │    → Admin distinguishes between regular users and admins
 │    → Only admins can create cars
 │
 ▼
Admin Dashboard
 │
 │ 12. Manage Cars, Manage Users Role
```
---
## 📝 Summary
- **Regular User**: Login, browse catalog, book cars, receive notifications, submit surveys.  
- **Admin User**: Has extended privileges — can **create cars**, **edit cars**, and **manage users**.  
- **Real‑Time Updates**: Socket.IO keeps both users and admins in sync.  
- **Role Management**: JWT + Redux store ensures only admins can access restricted features.  

---


## 👨‍💻 Author

Developed by ***Николай Йорданов* ( SoftUni: Yordanov80 )**