Welcome to the Portfolio Backend! 🎉

Hey there! This is the backend for my personal portfolio website, built with love using Node.js, Express, and MongoDB with Mongoose. It powers a sleek set of APIs to manage my education, skills, projects, work experience, and contact details. Let’s get you set up to explore or contribute!

What You’ll Need Before Starting 🚀
- Node.js (version 14.0.0 or higher)
- MongoDB (a local instance or a remote database)
- Postman (to test the APIs like a pro)

Getting Started - Let’s Dive In! 🛠️
1. Clone the Repo  
   Grab the code with:
   git clone https://github.com/adbrownladd/portfolio-backend.git
   cd portfolio-backend

2. Install Dependencies  
   Get everything set up with:
   npm install

3. Set Up Your Environment  
   Create a `.env` file by copying `.env.example` and fill in your details:
   MONGODB_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   (Keep your MongoDB URI secure—don’t share it publicly!)

4. Run the Server  
   Fire it up with:
   npm run dev
   You should see "Server running on port 5000" in your terminal—yay!

Explore the APIs 🌐
Here’s a quick guide to the endpoints you can play with:

Education 📚
- GET /api/education - See all my education entries
- POST /api/education - Add a new one (e.g., {"degree":"BSCS","institution":"ITU","year":"2021"})
- GET /api/education/:id - Check a specific entry
- PUT /api/education/:id - Update it
- DELETE /api/education/:id - Remove it

Skills 💻
- GET /api/skills - List all skills
- POST /api/skills - Add a skill (e.g., {"name":"JavaScript","progress":75})
- GET /api/skills/:id - View a skill
- PUT /api/skills/:id - Edit it
- DELETE /api/skills/:id - Delete it

Projects 🚀
- GET /api/projects - Get all projects
- POST /api/projects - Create one (e.g., {"title":"Test","description":"Test Desc","link":"https://test.com"})
- GET /api/projects/:id - See a project
- PUT /api/projects/:id - Update it
- DELETE /api/projects/:id - Remove it

Experience 👷‍♂️
- GET /api/experience - View all experiences
- POST /api/experience - Add one (e.g., {"company":"ABC","duration":"2021-2023","role":"Developer"})
- GET /api/experience/:id - Check a specific experience
- PUT /api/experience/:id - Modify it
- DELETE /api/experience/:id - Delete it

Contact 📧
- GET /api/contact - Get all contact messages
- POST /api/contact - Send a new message (e.g., {"name":"Test","email":"test@example.com","message":"Hello"})
- GET /api/contact/:id - View a message
- PUT /api/contact/:id - Update it
- DELETE /api/contact/:id - Delete it

Testing Made Easy ✅
- Use Postman: Import the `postman_collection.json` file from this repo to test all endpoints.
- Screenshots: Check out the `postman_screenshots/` folder for proof of CRUD operations (e.g., `get_education.png`, `post_project.png`). Feel free to add your own!

Deploying to the World 🌍
Want to show this off online? Deploy it to Render or Railway:
- Set up `MONGODB_URI` and `PORT` as environment variables in your deployment dashboard.
- Point to `server.js` as the entry point.
- Follow your provider’s docs for the rest—happy deploying!

Peek Inside the Folder Structure 📂
portfolio-backend/
  controllers/         # Where the API magic happens
  models/             # Mongoose schemas
  routes/             # Route definitions
  config/             # Database connection setup
  utils/              # Handy shared utilities (like validation)
  server.js           # The heart of the app
  package.json        # Dependencies and scripts
  .env.example        # Template for your environment file
  .gitignore          # Keeps the mess out of Git
  README.txt          # This very file!
  postman_collection.json # Your Postman testing buddy
  postman_screenshots/ # Visual proof of testing

License 📜
This project is licensed under the MIT License—feel free to use, modify, and share!

Thanks for Stopping By! 🙌
If you have questions, suggestions, or just want to chat about code, drop me a line. Happy coding!
