Excellent 👏 — here’s a **professional, polished README.md** for your **React + Redux + Bootstrap frontend (Task Management System)**.

It’s fully aligned with your backend API (Node + Express + PostgreSQL) and ready for GitHub.

---

# 🧩 Task Management System – Frontend (React + Redux)

This is the **frontend application** for the **Task Management System**, built using **React**, **Redux Toolkit**, and **Bootstrap**.
It provides a clean, responsive UI for managing tasks, with authentication, filtering, drag-and-drop task board, and real-time updates (optional).

---

## 🚀 Tech Stack

**Frontend:**

* React (Vite)
* Redux Toolkit
* React Router DOM
* Axios
* React Bootstrap & Bootstrap Icons
* React Toastify (notifications)
* React Beautiful DnD (drag & drop)
* Context API for theme toggle (Dark/Light mode)

**Backend:**

* Node.js + Express
* PostgreSQL (via Sequelize ORM)
* JWT authentication (Access + Refresh tokens)

---

## ⚙️ Folder Structure

```
task-mgmt-frontend/
│
├── src/
│   ├── api/                 # Axios client & API service modules
│   │   ├── axiosClient.js
│   │   ├── authApi.js
│   │   └── taskApi.js
│   │
│   ├── app/                 # Redux store
│   │   └── store.js
│   │
│   ├── components/          # Reusable UI components
│   │   ├── AppNavbar.jsx
│   │   ├── DarkModeToggle.jsx
│   │   ├── Loader.jsx
│   │   ├── PaginationBar.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskFormModal.jsx
│   │   └── FilterBar.jsx
│   │
│   ├── features/            # Redux slices
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   └── tasks/
│   │       └── taskSlice.js
│   │
│   ├── pages/               # App pages
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx
│   │   └── Tasks/
│   │       ├── TaskList.jsx
│   │       ├── TaskDetail.jsx
│   │       └── TaskBoard.jsx
│   │
│   ├── routes/
│   │   ├── AppRouter.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── main.jsx
│   └── App.jsx
│
├── .env.example
├── package.json
└── README.md
```

---

## 🧠 Features

✅ **Authentication**

* Register / Login via JWT
* Access + Refresh token handling
* Protected routes using React Router

✅ **Task Management**

* Create, edit, delete tasks
* Filter by status or priority
* Pagination and search
* Change status (Pending / In Progress / Completed)

✅ **Dashboard**

* Task statistics overview
* Quick links and status badges

✅ **Task Board (Kanban)**

* Drag and drop tasks between statuses (via `react-beautiful-dnd`)

✅ **UI & Experience**

* Responsive, modern Bootstrap design
* Dark mode toggle
* Toast notifications for success/error
* Loading spinners during API calls

✅ **Bonus**

* Modular Redux structure
* Axios interceptors for automatic token refresh
* Elegant dropdowns and priority/status color badges

---

## 🧰 Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

Adjust the backend URL if you’ve deployed it to Render, Railway, or AWS.

---

## 🧩 Installation & Setup

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/Gokul1019gj/stackmod_FE.git
cd stackmod_FE
```

### **2️⃣ Install dependencies**

```bash
npm install
```

### **3️⃣ Run the app**

```bash
npm run dev
```

Your app will be available at
👉 [http://localhost:5173](http://localhost:5173)

---

## 🔐 Authentication Flow

1. On login, the backend returns:

   * `accessToken` (short-lived)
   * `refreshToken` (long-lived)
   * `user` object
2. Tokens are stored in `localStorage`.
3. Axios interceptors automatically refresh access tokens when expired.
4. Logout revokes the refresh token from the backend.

---

## 🧾 API Reference

### **Auth**

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| `POST` | `/api/auth/register` | Register a new user               |
| `POST` | `/api/auth/login`    | Login and get tokens              |
| `POST` | `/api/auth/logout`   | Logout (invalidate refresh token) |

### **Tasks**

| Method   | Endpoint                | Description                         |
| -------- | ----------------------- | ----------------------------------- |
| `GET`    | `/api/tasks`            | Get all tasks (pagination, filters) |
| `POST`   | `/api/tasks`            | Create new task                     |
| `GET`    | `/api/tasks/:id`        | Get task details                    |
| `PUT`    | `/api/tasks/:id`        | Update task                         |
| `PATCH`  | `/api/tasks/:id/status` | Update only status                  |
| `DELETE` | `/api/tasks/:id`        | Delete task                         |
| `GET`    | `/api/tasks/stats`      | Task count by status                |

---

## 🧪 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run dev server (Vite)    |
| `npm run build`   | Build production bundle  |
| `npm run preview` | Preview production build |
| `npm run lint`    | Lint source files        |

---

## 🌐 Deployment

### **Frontend:**

You can deploy easily on:

* **Vercel**
* **Netlify**
* **Render (static site)**

Build command:

```bash
npm run build
```

Output folder:

```
dist/
```

Set the environment variable:

```
VITE_API_BASE_URL=https://your-backend-url/api
```

---

## 💡 AI Tools Used

* **ChatGPT (GPT-5)** – assisted in structuring Redux slices, API integration, and UI layout refinements.
* **GitHub Copilot** – used for autocompletion during form validation logic.

---

