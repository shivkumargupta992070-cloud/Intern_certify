# TaskFlow - Full Stack Task Manager

Mini project made during the Full Stack Development internship at Intern Certify.
Student: Sunny Mahato | Roll No: 26KCTYCS28 | Kishinchand Chellaram College, Mumbai

## Features
- User registration and login with JWT authentication (passwords hashed with bcrypt)
- Protected dashboard with task statistics (Total, Pending, In Progress, Completed)
- Full CRUD: Create, Read, Update and Delete tasks
- Task priority, status and due date, filter by status
- Responsive design (works on mobile and desktop)

## Tech stack
| Layer | Technology |
|---|---|
| Front end | React.js 18 (hooks, React Router, Context API), CSS3, Vite |
| Back end | Node.js, Express.js, REST APIs, JWT, bcryptjs, CORS |
| Database | MongoDB with Mongoose |
| Tools | VS Code, Git, GitHub, Postman |

## How to run (3 steps)
Install Node.js (v18 or newer) and MongoDB Community Server first. Make sure MongoDB is running.
(No local MongoDB? Create a free cluster on MongoDB Atlas and paste its connection string into `server/.env` as MONGO_URI.)

1. Start the back end (Terminal 1)
```
cd server
npm install
npm run dev
```
You should see: MongoDB connected / Server running on http://localhost:5000

2. Start the front end (Terminal 2)
```
cd client
npm install
npm run dev
```
3. Open http://localhost:5173 in the browser, register a new account and start adding tasks.

## Project structure
```
taskflow/
  server/
    server.js            starts Express, connects MongoDB
    models/User.js       user schema + password hashing
    models/Task.js       task schema
    middleware/auth.js   checks the JWT token
    routes/auth.js       /api/auth/register, /login, /me
    routes/tasks.js      /api/tasks  (GET, POST, PUT, DELETE)
    .env                 PORT, MONGO_URI, JWT_SECRET
  client/
    src/App.jsx          routes + navbar + protected routes
    src/api.js           fetch helper that sends the token
    src/context/AuthContext.jsx   login state
    src/pages/           Login, Register, Dashboard
    src/components/TaskForm.jsx   add / edit form
    src/styles.css
```

## API endpoints
| Method | URL | Purpose | Login needed |
|---|---|---|---|
| POST | /api/auth/register | Create account | No |
| POST | /api/auth/login | Login, returns token | No |
| GET | /api/auth/me | Current user | Yes |
| GET | /api/tasks | List my tasks | Yes |
| POST | /api/tasks | Add a task | Yes |
| PUT | /api/tasks/:id | Update a task | Yes |
| DELETE | /api/tasks/:id | Delete a task | Yes |

## Test with Postman (optional)
1. POST http://localhost:5000/api/auth/register with JSON {"name":"Test","email":"t@t.com","password":"123456"}
2. Copy the token from the response.
3. GET http://localhost:5000/api/tasks with header Authorization: Bearer <token>
