Task Planner Web App
A modern, interactive task management web application built with HTML, CSS, JavaScript, and Python (via Pyodide). Users can add tasks with priorities and categories, mark tasks as complete, and filter by category. The app features smooth animations and persistent storage using localStorage.
Features

Add tasks with a title, priority (Low, Medium, High), and category.
View tasks sorted by priority with a completion animation.
Filter tasks by category.
Responsive design with Tailwind CSS.
Persistent data storage in the browser using localStorage.
Modular code structure with separate HTML, CSS, JavaScript, and Python files.

Setup

Clone the Repository:
git clone https://github.com/<your-username>/<your-repo>.git


Host on GitHub Pages:

Place all files (index.html, style.css, script.js, logic.py) in the repository root or a docs/ folder.
Go to your repository settings on GitHub.
Enable GitHub Pages, selecting the branch (e.g., main) and folder (e.g., / or /docs).
Access the app at https://<your-username>.github.io/<your-repo>.


Local Testing:

Serve the files using a local server (e.g., python -m http.server 8000).
Open http://localhost:8000 in a modern browser (Chrome, Firefox, etc.).



Usage

Add a Task: Enter a title, select a priority, and optionally specify a category. Click "Add Task".
Mark as Complete: Check the box next to a task to mark it as done (with a slide-out animation).
Filter by Category: Use the dropdown to filter tasks by category.
Data Persistence: Tasks are saved in localStorage and persist across page reloads.

Technologies

HTML: Structure with a clean, semantic layout.
CSS: Tailwind CSS for responsive styling, with custom animations in style.css.
JavaScript: Handles UI interactivity and Pyodide integration.
Python: Core logic via Pyodide, running in the browser.
Pyodide: Enables Python execution in the browser via WebAssembly.

Notes

Ensure an internet connection for the Pyodide and Tailwind CDNs.
Clear localStorage (localStorage.removeItem('task_planner_data') in the browser console) to reset tasks.
The app is optimized for GitHub Pages and works without a backend.

Contributing
Feel free to fork the repository, submit issues, or create pull requests to enhance the app!
License
MIT License
