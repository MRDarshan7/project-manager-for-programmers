// Priority colors
const PRIORITY_COLORS = {
  low: '#6b7280',
  medium: '#f59e0b',
  high: '#ef4444'
};

// State Management
let projects = [];
let tasks = [];
let snippets = [];
let isDarkMode = true;
let userName = '';
let userProfilePicture = null;
let editingProjectId = null;

// In-memory storage (persists during session only)
// Note: Data will be lost on page refresh
function loadFromStorage() {
  // Data is already in memory, no action needed
}

function saveToStorage() {
  // Data is already saved in memory variables
  // In a production app, this would sync to a backend
}

// Dummy task data for reference (removed)
const sampleTasks_REMOVED = [
  {
    id: 1,
    title: "Implement user authentication",
    description: "Set up JWT-based auth system with refresh tokens",
    project_id: 1,
    status: "done",
    priority: "high",
    deadline: "2025-11-10",
    assigned: "Alex Chen",
    github_link: "https://github.com/project/commit/abc123"
  },
  {
    id: 2,
    title: "Design product catalog UI",
    description: "Create responsive product grid with filters",
    project_id: 1,
    status: "in-progress",
    priority: "high",
    deadline: "2025-11-20",
    assigned: "Sarah Kim"
  },
  {
    id: 3,
    title: "Integrate payment gateway",
    description: "Connect Stripe API for payment processing",
    project_id: 1,
    status: "todo",
    priority: "high",
    deadline: "2025-11-25",
    assigned: "Mike Johnson"
  },
  {
    id: 4,
    title: "Optimize database queries",
    description: "Add indexes and refactor N+1 queries",
    project_id: 1,
    status: "in-review",
    priority: "medium",
    deadline: "2025-11-18",
    assigned: "Alex Chen"
  },
  {
    id: 5,
    title: "Setup CI/CD pipeline",
    description: "Configure GitHub Actions for automated deployment",
    project_id: 1,
    status: "done",
    priority: "medium",
    deadline: "2025-11-08",
    assigned: "DevOps Team"
  },
  {
    id: 6,
    title: "Build REST endpoints",
    description: "Create CRUD operations for posts and comments",
    project_id: 2,
    status: "done",
    priority: "high",
    deadline: "2025-11-12",
    assigned: "Jordan Lee",
    github_link: "https://github.com/project/commit/def456"
  },
  {
    id: 7,
    title: "Implement rate limiting",
    description: "Add request throttling middleware",
    project_id: 2,
    status: "in-progress",
    priority: "high",
    deadline: "2025-11-22",
    assigned: "Jordan Lee"
  },
  {
    id: 8,
    title: "Write API documentation",
    description: "Document all endpoints with Swagger",
    project_id: 2,
    status: "todo",
    priority: "medium",
    deadline: "2025-11-28",
    assigned: "Taylor Smith"
  },
  {
    id: 9,
    title: "Add caching layer",
    description: "Implement Redis for frequently accessed data",
    project_id: 2,
    status: "in-review",
    priority: "low",
    deadline: "2025-11-26",
    assigned: "Chris Park"
  },
  {
    id: 10,
    title: "Data preprocessing pipeline",
    description: "Clean and augment training dataset",
    project_id: 3,
    status: "done",
    priority: "high",
    deadline: "2025-11-14",
    assigned: "Dr. Emma Wilson"
  },
  {
    id: 11,
    title: "Model architecture design",
    description: "Design CNN architecture for image classification",
    project_id: 3,
    status: "in-progress",
    priority: "high",
    deadline: "2025-11-30",
    assigned: "Dr. Emma Wilson"
  },
  {
    id: 12,
    title: "Setup GPU training environment",
    description: "Configure cloud GPU instances for model training",
    project_id: 3,
    status: "todo",
    priority: "high",
    deadline: "2025-12-05",
    assigned: "DevOps Team"
  },
  {
    id: 13,
    title: "Hyperparameter tuning",
    description: "Optimize learning rate, batch size, and epochs",
    project_id: 3,
    status: "todo",
    priority: "medium",
    deadline: "2025-12-15",
    assigned: "Dr. Emma Wilson"
  }
];

const codeSnippets_REMOVED = [
  {
    id: 1,
    title: "JWT Token Generation",
    language: "javascript",
    code: `const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}`,
    tags: ["auth", "jwt", "node"]
  },
  {
    id: 2,
    title: "React Custom Hook - useFetch",
    language: "javascript",
    code: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading };
}`,
    tags: ["react", "hooks", "fetch"]
  },
  {
    id: 3,
    title: "MongoDB Aggregation Pipeline",
    language: "javascript",
    code: `db.collection.aggregate([
  { $match: { status: "active" } },
  { $group: {
    _id: "$category",
    total: { $sum: "$amount" }
  }},
  { $sort: { total: -1 } }
])`,
    tags: ["mongodb", "database", "aggregation"]
  },
  {
    id: 4,
    title: "Python Data Validation",
    language: "python",
    code: `from pydantic import BaseModel, validator

class User(BaseModel):
  username: str
  email: str
  
  @validator('email')
  def email_valid(cls, v):
    if '@' not in v:
      raise ValueError('Invalid email')
    return v`,
    tags: ["python", "validation", "pydantic"]
  }
];

const recentCommits_REMOVED = [
  {
    id: 1,
    message: "feat: Add user authentication endpoints",
    author: "Alex Chen",
    timestamp: "2 hours ago",
    project: "E-Commerce Platform"
  },
  {
    id: 2,
    message: "fix: Resolve payment processing bug",
    author: "Mike Johnson",
    timestamp: "5 hours ago",
    project: "E-Commerce Platform"
  },
  {
    id: 3,
    message: "docs: Update API documentation",
    author: "Taylor Smith",
    timestamp: "1 day ago",
    project: "Mobile App Backend"
  },
  {
    id: 4,
    message: "refactor: Optimize database queries",
    author: "Alex Chen",
    timestamp: "1 day ago",
    project: "E-Commerce Platform"
  },
  {
    id: 5,
    message: "feat: Implement rate limiting middleware",
    author: "Jordan Lee",
    timestamp: "2 days ago",
    project: "Mobile App Backend"
  }
];

// Current state
let currentSection = 'overview';
let currentProject = null;

// Initialize App
function initApp() {
  // Initialize with empty state
  // All data is stored in memory during the session
  
  // Check if user has name stored
  if (userName) {
    // User already onboarded, show main app
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    updateUserNameDisplay();
  }
  
  // Set theme
  if (isDarkMode) {
    enableDarkMode();
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  renderDashboardOverview();
  renderProjects();
  renderTasks();
  renderAnalytics();
  renderSnippets();
  renderCommits();
}

// Navigation
function navigateTo(section) {
  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  event.target.closest('.nav-item').classList.add('active');
  
  // Hide all sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  const sectionElement = document.getElementById(`${section}-section`);
  if (sectionElement) {
    sectionElement.classList.add('active');
    currentSection = section;
  }
}

// Show Dashboard
function showDashboard() {
  // Show name input modal instead of going directly to dashboard
  document.getElementById('landing-page').classList.add('hidden');
  document.getElementById('name-input-modal').classList.add('active');
}

// Theme Toggle
function toggleTheme() {
  if (isDarkMode) {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
    isDarkMode = false;
  } else {
    enableDarkMode();
  }
  saveToStorage();
}

function enableDarkMode() {
  document.documentElement.setAttribute('data-theme', 'dark');
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  isDarkMode = true;
  
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) darkModeToggle.checked = true;
}

// Name Input Functions
function submitName() {
  const nameInput = document.getElementById('user-name-input');
  const name = nameInput.value.trim();
  
  if (!name) {
    showToast('Please enter your name', 'error');
    return;
  }
  
  userName = name;
  saveToStorage();
  updateUserNameDisplay();
  
  // Close modal and show dashboard
  document.getElementById('name-input-modal').classList.remove('active');
  document.getElementById('main-app').classList.remove('hidden');
  
  showToast(`Welcome, ${userName}!`, 'success');
}

function cancelNameInput() {
  // Go back to landing page
  document.getElementById('name-input-modal').classList.remove('active');
  document.getElementById('landing-page').classList.remove('hidden');
}

function updateUserNameDisplay() {
  // Update welcome message
  const welcomeMessage = document.getElementById('welcome-message');
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome back, ${userName}! 👋`;
  }
  
  // Update header user name
  const userNameDisplay = document.getElementById('user-name-display');
  if (userNameDisplay) {
    userNameDisplay.textContent = userName;
  }
  
  // Update avatar with initials or image
  const avatar = document.getElementById('user-avatar');
  if (avatar) {
    if (userProfilePicture) {
      avatar.style.backgroundImage = `url(${userProfilePicture})`;
      avatar.style.backgroundSize = 'cover';
      avatar.style.backgroundPosition = 'center';
      avatar.textContent = '';
    } else {
      avatar.style.backgroundImage = '';
      const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
      avatar.textContent = initials;
    }
  }
  
  // Update settings name input
  const settingsNameInput = document.getElementById('settings-name-input');
  if (settingsNameInput) {
    settingsNameInput.value = userName;
  }
}

function updateProfileName() {
  const settingsNameInput = document.getElementById('settings-name-input');
  const newName = settingsNameInput.value.trim();
  
  if (!newName) {
    showToast('Name cannot be empty', 'error');
    return;
  }
  
  userName = newName;
  saveToStorage();
  updateUserNameDisplay();
  showToast('Profile updated successfully!', 'success');
}

function handleProfilePictureUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  if (file.size > 2 * 1024 * 1024) {
    showToast('Image size must be less than 2MB', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    userProfilePicture = e.target.result;
    saveToStorage();
    updateUserNameDisplay();
    showToast('Profile picture updated!', 'success');
  };
  reader.readAsDataURL(file);
}

// Dashboard Overview
function renderDashboardOverview() {
  // Update stats
  const statsElements = document.querySelectorAll('.stat-card h3');
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const pendingTasks = tasks.filter(t => t.status !== 'done').length;
  const productivity = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  
  if (statsElements[0]) statsElements[0].textContent = projects.length;
  if (statsElements[1]) statsElements[1].textContent = pendingTasks;
  if (statsElements[2]) statsElements[2].textContent = completedTasks;
  if (statsElements[3]) statsElements[3].textContent = `${productivity}%`;
  
  // Render recent activity
  const activityTimeline = document.getElementById('activity-timeline');
  const recentTasks = tasks.slice(-5).reverse();
  
  if (recentTasks.length === 0) {
    activityTimeline.innerHTML = '<div class="empty-state"><p>No recent activity</p></div>';
  } else {
    activityTimeline.innerHTML = recentTasks.map(task => {
      const project = projects.find(p => p.id === task.project_id);
      return `
        <div class="activity-item">
          <div class="activity-icon" style="color: ${project?.color || '#3b82f6'}">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="activity-content">
            <h4>${task.title}</h4>
            <p class="activity-time">${project?.name || 'Project'} • ${task.assigned}</p>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Render upcoming deadlines
  const deadlineList = document.getElementById('deadline-list');
  const upcomingTasks = tasks
    .filter(task => task.status !== 'done' && task.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);
  
  if (upcomingTasks.length === 0) {
    deadlineList.innerHTML = '<div class="empty-state"><p>No upcoming deadlines</p></div>';
  } else {
    deadlineList.innerHTML = upcomingTasks.map(task => `
      <div class="deadline-item">
        <div class="deadline-info">
          <h4>${task.title}</h4>
          <p class="deadline-date"><i class="fas fa-calendar"></i> ${formatDate(task.deadline)}</p>
        </div>
        <span class="priority-badge priority-${task.priority}">${task.priority}</span>
      </div>
    `).join('');
  }
}

// Projects
function renderProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  
  if (projects.length === 0) {
    projectsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon"><i class="fas fa-folder-open"></i></div>
        <h3>No projects yet</h3>
        <p>Create your first project to get started</p>
        <button class="btn btn-primary" onclick="showAddProjectModal()"><i class="fas fa-plus"></i> Create Project</button>
      </div>
    `;
    return;
  }
  
  projectsGrid.innerHTML = projects.map(project => {
    const projectTasks = tasks.filter(t => t.project_id === project.id);
    const completedTasks = projectTasks.filter(t => t.status === 'done').length;
    const progress = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0;
    const color = PRIORITY_COLORS[project.priority] || '#3b82f6';
    
    return `
      <div class="project-card" style="--project-color: ${color}" onclick="openKanban(${project.id})">
        <div class="project-actions">
          <button class="project-action-btn" onclick="event.stopPropagation(); editProject(${project.id})" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="project-action-btn delete" onclick="event.stopPropagation(); deleteProject(${project.id})" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="project-header">
          <h3>${project.name}</h3>
        </div>
        <p class="project-description">${project.description || 'No description'}</p>
        <div class="project-progress">
          <div class="progress-label">
            <span>Progress</span>
            <span>${progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%; background-color: ${color}"></div>
          </div>
        </div>
        <div class="project-footer">
          <span class="priority-badge priority-${project.priority}">${project.priority}</span>
          <span><i class="fas fa-tasks"></i> ${completedTasks}/${projectTasks.length}</span>
          ${project.files && project.files.length > 0 ? `<span><i class="fas fa-paperclip"></i> ${project.files.length}</span>` : ''}
          ${project.deadline ? `<span><i class="fas fa-calendar"></i> ${formatDate(project.deadline)}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// Project CRUD Operations
function showAddProjectModal() {
  editingProjectId = null;
  document.getElementById('project-modal-title').textContent = 'Add New Project';
  document.getElementById('project-submit-btn').textContent = 'Add Project';
  document.getElementById('project-name').value = '';
  document.getElementById('project-description').value = '';
  document.getElementById('project-priority').value = 'medium';
  document.getElementById('project-deadline').value = '';
  document.getElementById('project-files').value = '';
  document.getElementById('project-files-list').innerHTML = '';
  document.getElementById('project-modal').classList.add('active');
}

function editProject(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  
  editingProjectId = projectId;
  document.getElementById('project-modal-title').textContent = 'Edit Project';
  document.getElementById('project-submit-btn').textContent = 'Save Changes';
  document.getElementById('project-name').value = project.name;
  document.getElementById('project-description').value = project.description || '';
  document.getElementById('project-priority').value = project.priority;
  document.getElementById('project-deadline').value = project.deadline || '';
  
  // Display existing files
  const filesList = document.getElementById('project-files-list');
  if (project.files && project.files.length > 0) {
    filesList.innerHTML = project.files.map((file, index) => `
      <div class="file-item">
        <div class="file-info">
          <i class="fas fa-file file-icon"></i>
          <span class="file-name">${file.name}</span>
          <span class="file-size">(${formatFileSize(file.size)})</span>
        </div>
        <button class="file-remove" onclick="removeExistingFile(${index})">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');
  } else {
    filesList.innerHTML = '';
  }
  
  document.getElementById('project-modal').classList.add('active');
}

function removeExistingFile(index) {
  if (editingProjectId) {
    const project = projects.find(p => p.id === editingProjectId);
    if (project && project.files) {
      project.files.splice(index, 1);
      editProject(editingProjectId);
    }
  }
}

function deleteProject(projectId) {
  if (!confirm('Are you sure you want to delete this project? All associated tasks will also be deleted.')) {
    return;
  }
  
  projects = projects.filter(p => p.id !== projectId);
  tasks = tasks.filter(t => t.project_id !== projectId);
  saveToStorage();
  renderProjects();
  renderTasks();
  renderDashboardOverview();
  showToast('Project deleted successfully', 'success');
}

function submitProject() {
  const name = document.getElementById('project-name').value.trim();
  const description = document.getElementById('project-description').value.trim();
  const priority = document.getElementById('project-priority').value;
  const deadline = document.getElementById('project-deadline').value;
  const filesInput = document.getElementById('project-files');
  
  if (!name) {
    showToast('Project name is required', 'error');
    return;
  }
  
  // Handle files
  const files = [];
  if (filesInput.files.length > 0) {
    let totalSize = 0;
    for (let file of filesInput.files) {
      totalSize += file.size;
      if (totalSize > 10 * 1024 * 1024) {
        showToast('Total file size must be less than 10MB', 'error');
        return;
      }
    }
    
    // Convert files to base64 for storage
    const filePromises = Array.from(filesInput.files).map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            data: e.target.result
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(filePromises).then(fileData => {
      saveProjectData(name, description, priority, deadline, fileData);
    }).catch(err => {
      showToast('Error processing files', 'error');
    });
  } else {
    // Keep existing files if editing
    let existingFiles = [];
    if (editingProjectId) {
      const project = projects.find(p => p.id === editingProjectId);
      existingFiles = project.files || [];
    }
    saveProjectData(name, description, priority, deadline, existingFiles);
  }
}

function saveProjectData(name, description, priority, deadline, files) {
  if (editingProjectId) {
    // Update existing project
    const project = projects.find(p => p.id === editingProjectId);
    if (project) {
      project.name = name;
      project.description = description;
      project.priority = priority;
      project.deadline = deadline;
      project.files = files;
      showToast('Project updated successfully!', 'success');
    }
  } else {
    // Create new project
    const newProject = {
      id: Date.now(),
      name,
      description,
      priority,
      deadline,
      files,
      created: new Date().toISOString().split('T')[0]
    };
    projects.push(newProject);
    showToast('Project created successfully!', 'success');
  }
  
  saveToStorage();
  closeModal('project-modal');
  renderProjects();
  renderDashboardOverview();
}

// Kanban Board
function openKanban(projectId) {
  currentProject = projects.find(p => p.id === projectId);
  if (!currentProject) return;
  
  document.getElementById('projects-grid').classList.add('hidden');
  document.getElementById('kanban-view').classList.remove('hidden');
  document.getElementById('kanban-project-name').textContent = currentProject.name;
  
  renderKanbanBoard();
}

function hideKanban() {
  document.getElementById('kanban-view').classList.add('hidden');
  document.getElementById('projects-grid').classList.remove('hidden');
  currentProject = null;
}

function renderKanbanBoard() {
  if (!currentProject) return;
  
  const projectTasks = tasks.filter(t => t.project_id === currentProject.id);
  const statuses = ['todo', 'in-progress', 'in-review', 'done'];
  
  statuses.forEach(status => {
    const statusTasks = projectTasks.filter(t => t.status === status);
    const container = document.getElementById(`tasks-${status}`);
    const countElement = document.getElementById(`count-${status}`);
    
    if (countElement) countElement.textContent = statusTasks.length;
    
    if (!container) return;
    
    if (statusTasks.length === 0) {
      container.innerHTML = '<div class="empty-state" style="padding: 16px;"><p style="font-size: 12px;">No tasks</p></div>';
    } else {
      container.innerHTML = statusTasks.map(task => `
        <div class="task-card" draggable="true" data-task-id="${task.id}" ondragstart="dragStart(event)" ondragend="dragEnd(event)">
          <div class="task-header">
            <span class="priority-badge priority-${task.priority}">${task.priority}</span>
            <button class="file-remove" onclick="event.stopPropagation(); deleteTask(${task.id})" style="position: absolute; top: 8px; right: 8px;">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <h4 class="task-title">${task.title}</h4>
          <p class="task-description">${task.description || ''}</p>
          <div class="task-footer">
            <div class="task-meta">
              ${task.assigned ? `<span class="task-assigned"><i class="fas fa-user"></i> ${task.assigned}</span>` : ''}
              ${task.deadline ? `<span class="task-deadline"><i class="fas fa-calendar"></i> ${formatDate(task.deadline)}</span>` : ''}
            </div>
            ${task.github_link ? `<a href="${task.github_link}" class="github-link" target="_blank" onclick="event.stopPropagation()"><i class="fab fa-github"></i></a>` : ''}
          </div>
        </div>
      `).join('');
    }
  });
  
  // Setup drag and drop
  setupDragAndDrop();
}

function deleteTask(taskId) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }
  
  tasks = tasks.filter(t => t.id !== taskId);
  saveToStorage();
  
  if (currentProject) {
    renderKanbanBoard();
  }
  renderTasks();
  renderDashboardOverview();
  showToast('Task deleted successfully', 'success');
}

// Drag and Drop
let draggedTask = null;

function dragStart(e) {
  draggedTask = e.target;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function dragEnd(e) {
  e.target.classList.remove('dragging');
}

function setupDragAndDrop() {
  const columns = document.querySelectorAll('.column-tasks');
  
  columns.forEach(column => {
    column.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(column, e.clientY);
      const draggable = document.querySelector('.dragging');
      
      if (afterElement == null) {
        column.appendChild(draggable);
      } else {
        column.insertBefore(draggable, afterElement);
      }
      
      column.closest('.kanban-column').classList.add('drag-over');
    });
    
    column.addEventListener('dragleave', e => {
      column.closest('.kanban-column').classList.remove('drag-over');
    });
    
    column.addEventListener('drop', e => {
      e.preventDefault();
      const taskId = parseInt(draggedTask.dataset.taskId);
      const newStatus = column.parentElement.dataset.status;
      
      // Update task status
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.status = newStatus;
        saveToStorage();
        renderKanbanBoard();
        renderTasks();
        renderDashboardOverview();
        showToast('Task moved successfully!', 'success');
      }
      
      column.closest('.kanban-column').classList.remove('drag-over');
    });
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];
  
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Tasks List
function renderTasks() {
  if (tasks.length === 0) {
    const tasksList = document.getElementById('tasks-list');
    if (tasksList) {
      tasksList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fas fa-tasks"></i></div>
          <h3>No tasks yet</h3>
          <p>Create a project and add tasks to get started</p>
        </div>
      `;
    }
    
    const progressFill = document.getElementById('progress-fill');
    const progressPercentageEl = document.getElementById('progress-percentage');
    if (progressFill) progressFill.style.width = '0%';
    if (progressPercentageEl) progressPercentageEl.textContent = '0%';
    
    return;
  }
  
  filterTasks();
}

function filterTasks() {
  const priorityFilter = document.getElementById('filter-priority')?.value || 'all';
  const statusFilter = document.getElementById('filter-status')?.value || 'all';
  const sortBy = document.getElementById('sort-tasks')?.value || 'newest';
  
  let filteredTasks = [...tasks];
  
  // Apply filters
  if (priorityFilter !== 'all') {
    filteredTasks = filteredTasks.filter(t => t.priority === priorityFilter);
  }
  if (statusFilter !== 'all') {
    filteredTasks = filteredTasks.filter(t => t.status === statusFilter);
  }
  
  // Apply sorting
  filteredTasks.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return a.id - b.id;
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline);
      default: // newest
        return b.id - a.id;
    }
  });
  
  // Update progress
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const progressPercentage = Math.round((completedTasks / tasks.length) * 100);
  const progressFill = document.getElementById('progress-fill');
  const progressPercentageEl = document.getElementById('progress-percentage');
  
  if (progressFill) progressFill.style.width = `${progressPercentage}%`;
  if (progressPercentageEl) progressPercentageEl.textContent = `${progressPercentage}%`;
  
  // Render tasks
  const tasksList = document.getElementById('tasks-list');
  if (!tasksList) return;
  
  if (filteredTasks.length === 0) {
    tasksList.innerHTML = `
      <div class="empty-state">
        <p>No tasks match the selected filters</p>
      </div>
    `;
    return;
  }
  
  tasksList.innerHTML = filteredTasks.map(task => {
    const project = projects.find(p => p.id === task.project_id);
    return `
      <div class="task-item">
        <input type="checkbox" class="task-checkbox" ${task.status === 'done' ? 'checked' : ''} onchange="toggleTaskComplete(${task.id})">
        <div class="task-details">
          <div class="task-item-header">
            <h4 class="task-item-title">${task.title}</h4>
            <span class="priority-badge priority-${task.priority}">${task.priority}</span>
          </div>
          <p class="task-item-description">${task.description}</p>
          <div class="task-footer" style="margin-top: 8px;">
            <span class="text-secondary" style="font-size: 12px;"><i class="fas fa-folder"></i> ${project?.name || 'Project'}</span>
            <span class="text-secondary" style="font-size: 12px;"><i class="fas fa-user"></i> ${task.assigned}</span>
            <span class="text-secondary" style="font-size: 12px;"><i class="fas fa-calendar"></i> ${formatDate(task.deadline)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleTaskComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = task.status === 'done' ? 'todo' : 'done';
    saveToStorage();
    renderTasks();
    renderDashboardOverview();
  }
}

// Analytics
function renderAnalytics() {
  // Calculate real data
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const inReviewCount = tasks.filter(t => t.status === 'in-review').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;
  
  const highPriorityCount = tasks.filter(t => t.priority === 'high').length;
  const mediumPriorityCount = tasks.filter(t => t.priority === 'medium').length;
  const lowPriorityCount = tasks.filter(t => t.priority === 'low').length;
  
  // Tasks completed over time chart
  const tasksCtx = document.getElementById('tasks-chart');
  if (tasksCtx && !tasksCtx.chart) {
    tasksCtx.chart = new Chart(tasksCtx, {
      type: 'line',
      data: {
        labels: ['Nov 09', 'Nov 10', 'Nov 11', 'Nov 12', 'Nov 13', 'Nov 14', 'Nov 15'],
        datasets: [{
          label: 'Tasks Completed',
          data: [0, 0, 0, 0, 0, 0, doneCount],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
  
  // Project status distribution chart
  const statusCtx = document.getElementById('status-chart');
  if (statusCtx && !statusCtx.chart) {
    statusCtx.chart = new Chart(statusCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'To Do', 'In Review'],
        datasets: [{
          data: [doneCount, inProgressCount, todoCount, inReviewCount],
          backgroundColor: [
            '#10b981',
            '#3b82f6',
            '#f59e0b',
            '#8b5cf6'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}

// Code Snippets
function renderSnippets() {
  const snippetsGrid = document.getElementById('snippets-grid');
  if (!snippetsGrid) return;
  
  if (snippets.length === 0) {
    snippetsGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon"><i class="fas fa-code"></i></div>
        <h3>No code snippets yet</h3>
        <p>Save your frequently used code snippets for quick access</p>
      </div>
    `;
    return;
  }
  
  snippetsGrid.innerHTML = snippets.map(snippet => `
    <div class="snippet-card">
      <div class="snippet-header">
        <h4 class="snippet-title">${snippet.title}</h4>
        <span class="snippet-language">${snippet.language}</span>
      </div>
      <div class="snippet-body">
        <pre><code class="language-${snippet.language}">${escapeHtml(snippet.code)}</code></pre>
        <button class="copy-btn" onclick="copyToClipboard(${snippet.id})"><i class="fas fa-copy"></i> Copy</button>
      </div>
      <div class="snippet-tags">
        ${snippet.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
  
  // Highlight code
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }
}

function filterSnippets() {
  const searchTerm = document.getElementById('snippet-search').value.toLowerCase();
  const filteredSnippets = snippets.filter(snippet => 
    snippet.title.toLowerCase().includes(searchTerm) ||
    snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    snippet.language.toLowerCase().includes(searchTerm)
  );
  
  const snippetsGrid = document.getElementById('snippets-grid');
  snippetsGrid.innerHTML = filteredSnippets.map(snippet => `
    <div class="snippet-card">
      <div class="snippet-header">
        <h4 class="snippet-title">${snippet.title}</h4>
        <span class="snippet-language">${snippet.language}</span>
      </div>
      <div class="snippet-body">
        <pre><code class="language-${snippet.language}">${escapeHtml(snippet.code)}</code></pre>
        <button class="copy-btn" onclick="copyToClipboard(${snippet.id})"><i class="fas fa-copy"></i> Copy</button>
      </div>
      <div class="snippet-tags">
        ${snippet.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
  
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }
}

function copyToClipboard(snippetId) {
  const snippet = snippets.find(s => s.id === snippetId);
  if (snippet) {
    const textArea = document.createElement('textarea');
    textArea.value = snippet.code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Code copied to clipboard!', 'success');
  }
}

// GitHub Commits
function renderCommits() {
  const commitsList = document.getElementById('commits-list');
  if (!commitsList) return;
  
  commitsList.innerHTML = `
    <div class="empty-state">
      <p>GitHub integration coming soon</p>
    </div>
  `;
  
  /* For future implementation:
  commitsList.innerHTML = recentCommits.map(commit => `
    <div class="commit-item">
      <div class="commit-message">${commit.message}</div>
      <div class="commit-meta">
        <span><i class="fas fa-user"></i> ${commit.author}</span>
        <span><i class="fas fa-clock"></i> ${commit.timestamp}</span>
        <span><i class="fas fa-folder"></i> ${commit.project}</span>
      </div>
    </div>
  `).join('');
  */
}

// Modals
function showAddTaskModal() {
  const modal = document.getElementById('add-task-modal');
  modal.classList.add('active');
}



function showAddSnippetModal() {
  showToast('Snippet creation feature coming soon!', 'info');
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('active');
}

// Add Task
function addTask() {
  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-description').value.trim();
  const priority = document.getElementById('task-priority').value;
  const deadline = document.getElementById('task-deadline').value;
  const assigned = document.getElementById('task-assigned').value.trim();
  
  if (!title) {
    showToast('Task title is required', 'error');
    return;
  }
  
  if (!currentProject) {
    showToast('Please select a project first', 'error');
    return;
  }
  
  const newTask = {
    id: Date.now(),
    title,
    description,
    project_id: currentProject.id,
    status: 'todo',
    priority,
    deadline,
    assigned
  };
  
  tasks.push(newTask);
  saveToStorage();
  
  // Clear form
  document.getElementById('task-title').value = '';
  document.getElementById('task-description').value = '';
  document.getElementById('task-deadline').value = '';
  document.getElementById('task-assigned').value = '';
  
  closeModal('add-task-modal');
  
  if (currentProject) {
    renderKanbanBoard();
  }
  renderTasks();
  renderDashboardOverview();
  
  showToast('Task added successfully!', 'success');
}

// Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'":  '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Close modal when clicking outside (except name input modal)
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal') && e.target.id !== 'name-input-modal') {
    e.target.classList.remove('active');
  }
});

// Handle Enter key in name input
document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('user-name-input');
  if (nameInput) {
    nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submitName();
      }
    });
  }
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}