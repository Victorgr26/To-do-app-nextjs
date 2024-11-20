To-Do App
A feature-rich to-do application that allows users to manage their tasks efficiently. The app supports task creation, updating, searching, and toggling between dark and light themes. Built with React, Flowbite React, and a PostgreSQL database.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Features
Task Management: Add, edit, delete, and search tasks.
Task Status Toggle: Mark tasks as completed or incomplete.
Dark Mode: Toggle between light and dark themes.
Responsive Design: Ensures a seamless experience on all devices.
Persistent Storage: Tasks are saved in a PostgreSQL database.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------Tech Stack
Frontend: React, Flowbite React, Tailwind CSS
Backend: Node.js, Express.js (if used)
Database: PostgreSQL
Tools: Vercel for deployment
Installation and Setup
Follow these steps to run the project locally:
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------Prerequisites
Node.js and npm installed
PostgreSQL database set up
Git installed
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Clone the Repository:
git clone https://github.com/yourusername/todo-app.git
cd todo-app
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Install Dependencies
npm install
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Environment Variables
Create a .env file in the root directory and add the following variables:
env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
Replace your_postgresql_connection_string with your actual database connection URL.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Run the App
Development Mode
npm run dev
Production Build
npm run build
npm start
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Usage
Open the app in your browser.
Add tasks using the input field and manage them via the task table.
Use the dark mode toggle for a comfortable viewing experience.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Contributing
Contributions are welcome! To contribute:
Fork the repository.
Create a new branch: git checkout -b feature-name.
Commit your changes: git commit -m 'Add feature-name'.
Push the changes: git push origin feature-name.
Submit a pull request.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
License
This project is licensed under the MIT License. See the LICENSE file for details.
