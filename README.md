# DevFlow – Modern Developer Project Management App

DevFlow is a beautiful, fully-functional single-page web application designed for programmers and developer teams. Manage projects, track tasks with Kanban boards, store code snippets, and monitor productivity—all with smooth animations and a developer-friendly dark mode.

---

## 🚀 Features

✅ **Project Management**
- Create, edit, and delete projects
- Set project deadlines with date picker
- Assign priority levels (Low/Medium/High)
- Upload and manage multiple files per project
- Track project progress

✅ **Task Management**
- Kanban board with drag-and-drop functionality (To Do → In Progress → In Review → Done)
- Add, edit, and remove tasks
- Set task deadlines and priorities
- Visual priority badges with color coding

✅ **Profile & Settings**
- Personalized name input on first launch
- Optional profile picture upload
- Edit name anytime
- Theme toggle (Dark/Light mode)

✅ **Code Snippet Library**
- Save code snippets with syntax highlighting
- Organize by language and tags
- Search and filter functionality
- Copy-to-clipboard support

✅ **Analytics Dashboard**
- View project and task statistics
- Track productivity metrics
- Monitor task completion rates

✅ **Developer Experience**
- Dark mode by default (optimized for extended coding sessions)
- Smooth animations and micro-interactions
- Responsive design for desktop and mobile
- Persistent data storage (localStorage—no backend needed)
- Clean, intuitive UI

---

## 📋 Quick Start

### 1. Open the App

1. Extract the `devflow-pm.zip` file
2. Open `index.html` in your web browser
3. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using VS Code Live Server
   # Right-click index.html → Open with Live Server
   ```
4. Visit `http://localhost:8000` (or your server port)

### 2. First Time Setup

1. Landing page appears in **dark mode** by default
2. Click **"Get Started"** button
3. Enter your name in the modal popup
4. Dashboard loads—start building your projects!

---

## 📖 Usage Guide

### Adding a Project

1. Click **"Add Project"** button (on Dashboard or Projects section)
2. Fill in the form:
   - **Project Name** (required) - e.g., "E-Commerce Platform"
   - **Description** (optional) - Project details
   - **Deadline** (optional) - Click date picker to select
   - **Priority** (required) - Choose Low, Medium, or High
   - **Files** (optional) - Click to upload one or more files
3. Click **"Create Project"** or **"Add"**
4. Project appears in your projects list with all details

### Removing a Project

1. In the Projects section, locate the project card
2. Click the **Delete** or **Trash** icon on the card
3. Confirm deletion in the popup
4. Project and all associated tasks are permanently removed

### Managing Tasks (Kanban Board)

1. Click on any project to open its **Kanban board**
2. The board has 4 columns: **To Do**, **In Progress**, **In Review**, **Done**
3. To **add a task**: Click **"Add Task"** button and fill:
   - **Task Title** (required)
   - **Description** (optional)
   - **Priority** (Low/Medium/High)
   - **Deadline** (optional)
4. To **move a task**: Drag the task card between columns
5. To **edit a task**: Click the task card, modify, and save
6. To **remove a task**: Click the **Delete** icon and confirm

### Viewing All Tasks

1. Go to **Tasks** section from the sidebar
2. See all tasks across all projects in list view
3. **Filter** by: Project, Priority, Status
4. **Sort** by: Deadline, Priority, Date Created
5. Check off completed tasks or manage them individually

### Adding Code Snippets

1. Navigate to **Code Snippets** section
2. Click **"Add Snippet"** or **"New Snippet"**
3. Fill in:
   - **Title** - Name of your snippet
   - **Language** - Programming language (JavaScript, Python, SQL, etc.)
   - **Code** - Paste your code
   - **Tags** (optional) - Add tags for filtering
4. Click **"Save"**
5. Snippet appears in your library with syntax highlighting
6. Use **Copy** button to copy to clipboard
7. Use **Search/Filter** to find snippets by language or tags

### Profile Management

1. Click your **profile icon** in the top-right
2. Navigate to **Settings**
3. Options:
   - **Edit Name** - Change your name
   - **Upload Profile Picture** (optional) - Add a custom avatar
   - **Theme Toggle** - Switch between dark and light mode
   - **Other Preferences** - Customize as needed
4. Changes save automatically

### Analytics

1. Go to **Analytics** section
2. View:
   - Total projects and tasks
   - Tasks by priority (pie chart)
   - Tasks by status breakdown
   - Completion rates
   - Team productivity metrics

---

## 🎨 Design & Interface

### Theme
- **Default:** Dark Mode (deep navy #0f172a, cool blue accents #3b82f6)
- **Light Mode:** Clean white with blue accents
- **Toggle:** Click sun/moon icon in header to switch

### Priority Color Coding
- 🔴 **High** - Red (#ef4444)
- 🟡 **Medium** - Amber (#f59e0b)
- ⚪ **Low** - Gray (#6b7280)

### Animations
- Smooth page transitions (fade-in/slide-in)
- Hover effects on cards (scale + shadow)
- Drag-and-drop feedback
- Modal popups with scale animations
- Button click ripple effects

---

## 💾 Data Storage

- **All data stored locally** using browser localStorage
- **No backend server needed** - fully self-contained
- **No login required** - just enter your name once
- **Persistent across sessions** - data survives browser close/reopen
- **No dummy data** - app starts empty, you build it up

### Data Structure
```
DevFlow Storage:
├── userData (name, profile picture, theme preference)
├── projects (with files, deadlines, priorities)
├── tasks (with status, priority, deadlines)
└── codeSnippets (with language and tags)
```

---

## 🛠 Technical Details

### Tech Stack
- **Frontend:** Vanilla JavaScript (ES6+)
- **Styling:** CSS3 with CSS Variables for theming
- **Storage:** Browser LocalStorage API
- **Drag & Drop:** HTML5 Drag and Drop API
- **Animations:** CSS transitions + JavaScript timing functions

### Folder Structure
```
devflow-pm/
├── index.html           # Main HTML file
├── css/
│   ├── style.css       # Main styles and layout
│   ├── theme.css       # Dark/light theme definitions
│   └── animations.css  # Animation keyframes
├── js/
│   ├── app.js          # Core app logic and state management
│   ├── ui.js           # UI rendering and DOM manipulation
│   └── utils.js        # Helper functions and localStorage management
└── README.md           # This file
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Data not saving** | Ensure localStorage is enabled in browser settings |
| **Projects not appearing** | Refresh page; check browser console for errors |
| **Drag-and-drop not working** | Try different browser; clear browser cache |
| **Animations stuttering** | Check system resources; enable hardware acceleration |
| **File upload fails** | Check file size; ensure browser allows file uploads |
| **Dark mode not default** | Clear localStorage, refresh page |

---

## ✨ Tips & Best Practices

1. **Use Priority Levels** - Mark urgent tasks as "High" for quick identification
2. **Set Deadlines** - Keep track of project timelines
3. **Organize Files** - Upload relevant project files for easy reference
4. **Tag Snippets** - Add meaningful tags to find code quickly
5. **Regular Updates** - Move tasks through the Kanban board as you progress
6. **Backup Data** - Periodically export your projects (if export feature available)

---

## 🚀 Advanced Usage

### Exporting Data
1. Go to Settings
2. Click **"Export Data"** (if available)
3. JSON file downloads with all your projects, tasks, snippets

### Clearing All Data
1. Go to Settings
2. Click **"Clear All Data"**
3. Confirm deletion
4. App resets to initial state

### Browser Compatibility
- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- Mobile browsers: ✅ Responsive design

---

## 📱 Responsive Design

DevFlow works seamlessly on:
- 🖥 **Desktop** (1920px and up)
- 💻 **Laptop** (1366px to 1920px)
- 📱 **Tablet** (768px to 1024px)
- 📱 **Mobile** (320px to 768px)

Sidebar collapses on smaller screens for better usability.

---

## 🎯 Key Highlights

✨ **Zero Configuration** - Open and start using immediately  
⚡ **Lightning Fast** - All operations instant with smooth animations  
🎨 **Beautiful UI** - Modern, minimalist design optimized for developers  
🔒 **Private** - All data stays on your device  
📊 **Productive** - Built-in analytics to track your work  
🌙 **Dark Mode** - Default dark theme for extended work sessions  

---

## 📝 License

MIT License - Feel free to use, modify, and distribute.

---

## 💬 Support

For issues or questions:
1. Check the **Troubleshooting** section above
2. Review browser console for error messages
3. Clear localStorage and restart the app
4. Try a different browser if issues persist

---

## 🎉 Get Started Now!

Your modern developer project management app is ready to use. Organize your projects, track tasks, store code snippets, and boost your productivity—all in one beautiful, animated workspace!

**Happy coding! 🚀**

---

*Created with ❤️ for developers, by developers.*  
*Last Updated: November 2025*