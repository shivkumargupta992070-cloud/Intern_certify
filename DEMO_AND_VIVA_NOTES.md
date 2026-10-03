# Demo script and viva answers (read this before presenting)

## 2-minute demo flow
1. Show both terminals running (server: "MongoDB connected", client: Vite on 5173).
2. Open the app, click Register, create an account -> you land on the Dashboard (JWT login).
3. Add 3 tasks with different priority and status -> stats cards update.
4. Edit one task, mark one as Done, delete one.
5. Use the filter chips (Pending / In Progress / Completed).
6. Logout, then try opening the dashboard URL again -> redirected to Login (protected route).
7. Optional: show the API in Postman and the data in MongoDB Compass (taskflow database: users and tasks).

## Likely questions and short answers
- **What is full stack?** Front end (what the user sees: React), back end (logic and APIs: Node/Express) and database (MongoDB).
- **Why React?** Reusable components and state management; the page updates without reloading.
- **What is a REST API?** URLs plus HTTP methods: GET reads, POST creates, PUT updates, DELETE removes data. Data is exchanged as JSON.
- **How does login work?** Password is hashed with bcrypt and stored. On login the server checks it and returns a JWT. The React app stores the token and sends it in the Authorization header; middleware/auth.js verifies it on every protected route.
- **Why hash passwords?** So that even if the database leaks, real passwords are not exposed.
- **Why MongoDB?** Flexible JSON-like documents that match JavaScript objects; Mongoose gives schemas and validation.
- **What is CORS and how did you solve it?** Browsers block calls between different origins (5173 and 5000). I used the cors package in Express and a Vite proxy in development.
- **What are hooks you used?** useState for form and list state, useEffect to load tasks when the page opens, useContext for the login state.
- **What is middleware?** A function that runs between the request and the route; mine checks the JWT.
- **How is each user's data kept separate?** Every task stores the user id, and every query filters by req.userId.
- **What would you add next?** Search, due-date reminders, deployment on Render/Vercel, unit tests.
