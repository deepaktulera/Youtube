# 🎥 YouTube Clone (MERN Stack)

A beginner-friendly YouTube Clone built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

This project allows users to register, log in, upload videos, create channels, watch videos, and comment on videos. It was created as a full-stack capstone project to learn how a real-world web application works using the MERN Stack.

---

# 📌 Project Overview

This project contains two parts:

- **Frontend** (React + Vite)
- **Backend** (Node.js + Express + MongoDB)

The frontend is responsible for the user interface, while the backend handles APIs, authentication, and database operations.

---

# 🚀 Features

## 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

---

## 🏠 Home Page

- YouTube Style Header
- Sidebar
- Category Buttons
- Video Grid
- Responsive Layout

---

## 🎥 Video

- Upload Video
- Watch Video
- Edit Video
- Delete Video

---

## 💬 Comments

- Add Comment
- Edit Comment
- Delete Comment
- View All Comments

---

## 📺 Channel

- Create Channel
- Edit Channel
- View Channel
- Show Channel Videos

---

## 🔒 Protected Features

Only logged in users can

- Upload Videos
- Create Channel
- Edit Videos
- Delete Videos
- Add Comments

---

# 🛠️ Technologies Used

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- TailwindCSS

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

# 📁 Project Folder Structure

## Backend

```
Youtube-Backend
│
├── src
│   ├── config
│   │   └── database.js
│   │
│   ├── controllers
│   │   ├── auth.controller.js
│   │   ├── channel.controller.js
│   │   ├── comment.controller.js
│   │   └── video.controller.js
│   │
│   ├── middleware
│   │   └── verifyToken.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Channel.js
│   │   ├── Video.js
│   │   └── Comment.js
│   │
│   └── routes
│       ├── auth.routes.js
│       ├── channel.routes.js
│       ├── comments.routes.js
│       └── video.routes.js
│
├── .env
├── package.json
└── server.js
```

---

## Frontend

```
Youtube-Frontend
│
├── public
│
├── src
│
├── assets
│   └── icons
│
├── components
│   ├── Header.jsx
│   ├── CategoryBar.jsx
│   ├── ChannelVideo.jsx
│   ├── ChannelVideoGrid.jsx
│   ├── ShortCard.jsx
│   ├── Sidebar.jsx
│   ├── VideoGrid.jsx
│   ├── VideoCard.jsx
│   ├── CommentSection.jsx
│   └── Loader.jsx
│
├── layouts
│   └── AppLayout.jsx
│
├── pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── NotFound.jsx
│   ├── VideoPlayer.jsx
│   ├── UploadVideo.jsx
│   ├── Channel.jsx
│   ├── CreateChannel.jsx
│   ├── EditChannel.jsx
│   ├── EditVideo.jsx
│   └── Shorts.jsx
│
├── routes
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── services
│   ├── axios.js
│   ├── authService.js
│   ├── videoService.js
│   ├── commentServices.js
│   └── channelService.js
│
├── styles
│   ├── App.css
│   └── index.css
│
├── App.jsx
├── main.jsx
├── .env
└── package.json
```

---

# ⚙️ Installation

## Step 1

Clone the repository

```bash
git clone https://github.com/deepaktulera/Youtube.git
```

---

## Step 2

Go to backend

```bash
cd Youtube-Backend
```

Install packages

```bash
npm install
```

Start backend

```bash
nodemon
```

---

## Step 3

Go to frontend

```bash
cd Youtube-Frontend
```

Install packages

```bash
npm install
```

Run frontend

```bash
npm run dev
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=3000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/
```

---

# 📡 API Routes

## Authentication

```
POST /auth/register

POST /auth/login
```

---

## Videos

```
GET /videos

GET /videos/:id

POST /videos

PUT /videos/:id

DELETE /videos/:id
```

---

## Channels

```
POST /channel

GET /channel/:id

PUT /channel/:id
```

---

## Comments

```
GET /comments/:videoId

POST /comments

PUT /comments/:id

DELETE /comments/:id
```

---

# 💻 How the Project Works

### 1. User registers.

↓

### 2. User logs in.

↓

### 3. Backend generates JWT Token.

↓

### 4. Token is stored in Local Storage.

↓

### 5. Protected routes verify the token.

↓

### 6. User can upload videos and create channels.

↓

### 7. Videos are stored in MongoDB.

↓

### 8. Users can watch and comment on videos.

---

# 📚 What I Learned

During this project I learned:

- React Components
- React Router
- API Integration
- Axios
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- CRUD Operations
- Protected Routes
- Backend API Development
- Full Stack Project Structure

---

# 📸 Screens Included

Project contains:

- Home Page
- Login Page
- Register Page
- Video Player
- Upload Video
- Create Channel
- Channel Page
- Edit Video
- Comment Section
- Like & Dislike System
- Video Search
- Video Categories
- Video Views Counter

---

# 🎯 Future Improvements

- Subscribe Button
- Notifications
- Dark Mode
- User Profile
- Cloudinary Video Upload

---

# 📖 Project Objective

The objective of this project is to understand how a full-stack application works using the MERN Stack. It includes user authentication, video management, channel management, comments, routing, and MongoDB database integration. :contentReference[oaicite:1]{index=1}

---

# 👨‍💻 Author

**Name:** Deepak Singh

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub.

Thank you for visiting this project.