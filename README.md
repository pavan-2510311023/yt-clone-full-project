🎬 YouTube Clone (MERN Stack)

A fully functional YouTube Clone built with the MERN stack — featuring authentication, video uploads, likes/dislikes, comments, channel pages, and a modern responsive interface inspired by YouTube.

🧩 Overview

This project was developed as part of the Full Stack Development Capstone Project, demonstrating end-to-end skills in building scalable, secure, and interactive web applications.

🚀 Tech Stack
Layer	Technology
Frontend	React.js (Vite), React Router, CSS3, React Icons
Backend	Node.js, Express.js
Database	MongoDB with Mongoose
Auth & Security	JWT (JSON Web Token), bcrypt.js
Developer Tools	Nodemon, Thunder Client, Git, VS Code
📁 Project Structure
yt-clone-full-project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

✨ Features
👥 Authentication

Register and login using email and password.

Passwords hashed with bcryptjs.

JWT-based token authentication stored in localStorage.

📺 Video Management

Upload, edit, and delete videos.

Auto-increment view count.

Thumbnail preview, title, description, category, and channel name.

💬 Comments

Add, edit, and delete comments.

Real-time comment updates after submission.

👍 Likes / Dislikes

Toggle likes and dislikes for each video.

Automatically unlikes if disliked and vice versa.

🔍 Search & Filter

Filter videos by category (Music, Movies, Sports, etc.).

Search bar for title-based filtering.

🧭 Navigation

Sticky Navbar with logo, search, and user menu.

Sidebar navigation (Home, Shorts, Subscriptions, History, Playlists, etc.).

Responsive grid for videos.

📱 Responsive Design

Mobile-first layout with flexible grid.

Sticky top bar and collapsible sidebar on smaller screens.

🧰 Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/yourusername/yt-clone-full-project.git
cd yt-clone-full-project

2️⃣ Install Dependencies

Backend:

cd backend
npm install


Frontend:

cd ../frontend
npm install

3️⃣ Add Environment Variables

Create a file named .env inside the backend folder:

PORT=5000
MONGO_URI=mongodb://localhost:27017/youtube_clone
JWT_SECRET=secret123

4️⃣ Run the Application

Start backend:

cd backend
npm run dev


Start frontend:

cd frontend
npm run dev


Open: 👉 http://localhost:5173

🧪 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/videos	Get all videos
GET	/api/videos/:id	Get single video
POST	/api/videos	Upload video (Protected)
PUT	/api/videos/:id	Update video (Protected)
DELETE	/api/videos/:id	Delete video (Protected)
PUT	/api/interact/like/:id	Like / Unlike video (Protected)
PUT	/api/interact/dislike/:id	Dislike / Undo dislike (Protected)
GET	/api/comments/video/:id	Get comments for a video
POST	/api/comments	Add comment (Protected)
PUT	/api/comments/:id	Edit comment (Protected)
DELETE	/api/comments/:id	Delete comment (Protected)
🖼️ Screenshots (Add Your Own)

Create a folder /frontend/public/screenshots/ or /screenshots/
and add your images with the following filenames:

Page	Image Preview
Home Page	

Video Player Page	

Login Page	

Upload Video Page	

Channel Page	

📸 Tip: Use your browser’s DevTools → Device Toolbar to capture responsive views.

⚙️ Deployment
🌐 Frontend:

Deploy on Vercel or Netlify
Example:

npm run build

☁️ Backend:

Deploy on Render, Cyclic, or Railway.
Update API base URL inside frontend fetch calls:

const API_BASE = "https://your-backend-url.onrender.com";

🖼️ Placeholder Descriptions

You can use blank placeholder images (created via Paint or Canva) with these recommended aspect ratios and labels:

File Name	Recommended Dimensions	Description
home.png	1280×720	Screenshot of the Home page showing multiple videos
video.png	1280×720	Video player page with comments + suggested videos
login.png	600×500	Login form
thankyou.png	800×400	A simple “Thank You” or “Project Complete” banner for report end

💡 Future Enhancements
Feature	Description
🔔 Notifications	Real-time alerts for likes, comments, and subscriptions
💾 History Tracking	Track user’s watch history
📡 Subscriptions	Allow following and listing channels
📱 Mobile Optimization	Swipe-based navigation for smaller screens
🧠 Recommendations	Smart video recommendations by tags or category
👨‍💻 Author

Pavan Kumar Medam
🎓 Full Stack Developer Trainee
📧 Email: (optional for submission)
🖥️ Project: YouTube Clone (Capstone Project)

✅ Project Status
Module	Completion
Authentication	✅ 100%
Video CRUD	✅ 100%
Likes/Dislikes	✅ 100%
Comments CRUD	✅ 100%
UI/UX Design	✅ 95%
Responsiveness	✅ 100%
Final Integration	✅ Completed

Overall Completion: 100% 🎯