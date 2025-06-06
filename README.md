Admin Dashboard Panel
A full-stack admin dashboard application with separate frontend and backend modules. Built with React + TailwindCSS on the frontend and Node.js + Express on the backend. It supports features like entry logging, repair status tracking, payments, and user management.

📁 Project Structure

Admin_Dashboard_pannel/
├── backend/             # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/            # React + TailwindCSS admin dashboard
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
🛠️ Technologies Used
Frontend: React, Vite, TailwindCSS, Axios, React Router

Backend: Node.js, Express.js, MongoDB/Mongoose (or your DB)

Others: JWT for authentication (if implemented), RESTful API architecture

🚀 Getting Started
Prerequisites
Node.js v14+

npm or yarn

MongoDB running locally or cloud connection URL

1. Setup Backend
Navigate to backend folder:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the backend folder with your environment variables (example):

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key
Start the backend server:

bash
Copy
Edit
npm run dev
Backend API will run on http://localhost:5000

2. Setup Frontend
Navigate to frontend folder:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Configure API base URL if needed (usually in Axios instance config)

Start the frontend server:

bash
Copy
Edit
npm run dev
The frontend will be available at http://localhost:3000 (or port shown in terminal)

🔗 Connecting Frontend & Backend
The frontend uses Axios to connect to backend API endpoints at /api/...

Make sure both servers are running simultaneously for full functionality.

Check /frontend/src/api/axios.js (or equivalent) for backend base URL configuration.

📝 Features
Inward Entry Logging with payment tracking

Repair Status Management

Outward Entry with pending payment tracking

Admin Dashboard with pages for Inward, Repair, and Outward

User authentication (if implemented)

Responsive UI with React and TailwindCSS

🤝 Contributing
Feel free to open issues or submit pull requests for improvements or bug fixes!

📄 License
MIT License. See LICENSE for details.
