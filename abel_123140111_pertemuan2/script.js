class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentTheme = this.loadTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.renderTasks();
        this.setupEventListeners();
        this.updateStats();
        this.updateCourseFilter();
        this.checkDeadlines();
        this.loadMotivationalQuote(); // Load quote dengan async/await
    }

    // === FITUR ASYNC/AWAIT: Fetch Motivational Quote dari API ===
    async loadMotivationalQuote() {
        const quoteContainer = document.getElementById('quoteContainer');
        
        // Loading state
        quoteContainer.innerHTML = `
            <div class="quote-content">
                <div class="quote-icon">⏳</div>
                <div class="quote-text">Loading inspirational quote...</div>
            </div>
        `;

        try {
            const response = await fetch('https://api.quotable.io/random?tags=inspirational');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.displayQuote(data.content, data.author);
            
        } catch (error) {
            console.error('Error loading quote:', error);
            // Fallback quote jika API gagal
            this.displayQuote(
                'Kesuksesan adalah hasil dari persiapan, kerja keras, dan belajar dari kegagalan.',
                'Colin Powell'
            );
        }
    }

    displayQuote(content, author) {
        const quoteContainer = document.getElementById('quoteContainer');
        quoteContainer.className = 'quote-container';
        quoteContainer.innerHTML = `
            <div class="quote-content">
                <div class="quote-icon">💡</div>
                <div class="quote-text">"${content}"</div>
                <div class="quote-author">— ${author}</div>
            </div>
            <button class="quote-refresh" onclick="taskManager.loadMotivationalQuote()">
                🔄 Quote Baru
            </button>
        `;
    }

    // === LOCAL STORAGE METHODS ===
    loadTasks() {
        try {
            const tasks = localStorage.getItem('tasks');
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }

    saveTasks() {
        try {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }

    loadTheme() {
        return localStorage.getItem('theme') || 'dark';
    }

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    // === THEME METHODS ===
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
    }

    // === EVENT LISTENERS ===
    setupEventListeners() {
        document.getElementById('themeBtn').addEventListener('click', () => {
            this.toggleTheme();
        });

        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateTask();
        });

        document.getElementById('searchInput').addEventListener('input', () => {
            this.renderTasks();
        });

        document.getElementById('statusFilter').addEventListener('change', () => {
            this.renderTasks();
        });

        document.getElementById('priorityFilter').addEventListener('change', () => {
            this.renderTasks();
        });

        document.getElementById('courseFilter').addEventListener('change', () => {
            this.renderTasks();
        });

        document.getElementById('sortBy').addEventListener('change', () => {
            this.renderTasks();
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideAddForm();
                this.closeEditModal();
            }
        });
    }

    // === FORM VALIDATION ===
    validateForm(taskName, course, deadline) {
        let isValid = true;

        document.getElementById('nameError').textContent = '';
        document.getElementById('courseError').textContent = '';
        document.getElementById('deadlineError').textContent = '';

        if (!taskName.trim()) {
            document.getElementById('nameError').textContent = 'Nama tugas tidak boleh kosong';
            isValid = false;
        } else if (taskName.trim().length < 3) {
            document.getElementById('nameError').textContent = 'Nama tugas minimal 3 karakter';
            isValid = false;
        }

        if (!course.trim()) {
            document.getElementById('courseError').textContent = 'Mata kuliah tidak boleh kosong';
            isValid = false;
        }

        if (!deadline) {
            document.getElementById('deadlineError').textContent = 'Deadline harus diisi';
            isValid = false;
        } else if (new Date(deadline) < new Date()) {
            document.getElementById('deadlineError').textContent = 'Deadline tidak boleh di masa lalu';
            isValid = false;
        }

        return isValid;
    }

    // === MODAL METHODS ===
    showAddForm() {
        document.getElementById('addFormModal').style.display = 'block';
    }

    hideAddForm() {
        document.getElementById('addFormModal').style.display = 'none';
        document.getElementById('taskForm').reset();
        
        document.getElementById('nameError').textContent = '';
        document.getElementById('courseError').textContent = '';
        document.getElementById('deadlineError').textContent = '';
    }

    closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
    }

    // === TASK CRUD OPERATIONS ===
    addTask() {
        const taskName = document.getElementById('taskName').value;
        const course = document.getElementById('course').value;
        const deadline = document.getElementById('deadline').value;
        const priority = document.getElementById('priority').value;
        const description = document.getElementById('description').value;

        if (!this.validateForm(taskName, course, deadline)) {
            return;
        }

        const newTask = {
            id: Date.now(),
            name: taskName.trim(),
            course: course.trim(),
            deadline: deadline,
            priority: priority,
            description: description.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.updateCourseFilter();
        
        this.hideAddForm();
        this.showNotification('Tugas berhasil ditambahkan!', 'success');
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTaskName').value = task.name;
        document.getElementById('editCourse').value = task.course;
        document.getElementById('editDeadline').value = task.deadline;
        document.getElementById('editPriority').value = task.priority;
        document.getElementById('editDescription').value = task.description || '';

        document.getElementById('editModal').style.display = 'block';
    }

    updateTask() {
        const id = parseInt(document.getElementById('editTaskId').value);
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        
        if (taskIndex === -1) return;

        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            name: document.getElementById('editTaskName').value.trim(),
            course: document.getElementById('editCourse').value.trim(),
            deadline: document.getElementById('editDeadline').value,
            priority: document.getElementById('editPriority').value,
            description: document.getElementById('editDescription').value.trim()
        };

        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.updateCourseFilter();
        this.closeEditModal();
        
        this.showNotification('Tugas berhasil diperbarui!', 'success');
    }

    toggleTask = (id) => {
        this.tasks = this.tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        
        const task = this.tasks.find(t => t.id === id);
        const message = task.completed ? 'Tugas ditandai selesai! 🎉' : 'Tugas dikembalikan ke belum selesai';
        this.showNotification(message, 'info');
    }

    deleteTask = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.updateCourseFilter();
            this.showNotification('Tugas berhasil dihapus', 'warning');
        }
    }

    clearCompleted() {
        const completedTasks = this.tasks.filter(task => task.completed);
        if (completedTasks.length === 0) {
            this.showNotification('Tidak ada tugas yang selesai untuk dihapus', 'info');
            return;
        }

        if (confirm(`Apakah Anda yakin ingin menghapus ${completedTasks.length} tugas yang sudah selesai?`)) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.updateCourseFilter();
            this.showNotification(`${completedTasks.length} tugas selesai telah dihapus`, 'success');
        }
    }

    // === FILTERING & SORTING ===
    getFilteredTasks() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const priorityFilter = document.getElementById('priorityFilter').value;
        const courseFilter = document.getElementById('courseFilter').value;
        const sortBy = document.getElementById('sortBy').value;

        let filtered = this.tasks.filter(task => {
            const matchesSearch = task.name.toLowerCase().includes(searchTerm) || 
                                task.course.toLowerCase().includes(searchTerm) ||
                                (task.description && task.description.toLowerCase().includes(searchTerm));
            const matchesStatus = statusFilter === 'all' || 
                                (statusFilter === 'completed' && task.completed) ||
                                (statusFilter === 'pending' && !task.completed);
            const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
            const matchesCourse = courseFilter === 'all' || task.course === courseFilter;

            return matchesSearch && matchesStatus && matchesPriority && matchesCourse;
        });
        
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'deadline':
                    return new Date(a.deadline) - new Date(b.deadline);
                case 'priority':
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                case 'created':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        return filtered;
    }

    // === RENDER METHODS ===
    renderTasks() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            taskList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        taskList.style.display = 'grid';
        emptyState.style.display = 'none';

        taskList.innerHTML = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''} priority-${task.priority} ${this.isDeadlineUrgent(task.deadline) ? 'urgent' : ''}">
                <div class="task-header">
                    <div class="task-info">
                        <div class="task-name">${task.name}</div>
                        <div class="task-meta">
                            <strong>📚 ${task.course}</strong> | 
                            🎯 ${this.getPriorityLabel(task.priority)} | 
                            📅 Deadline: 
                            <span class="task-deadline ${this.getDeadlineClass(task.deadline)}">
                                ${this.formatDate(task.deadline)}
                            </span>
                        </div>
                        ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                    </div>
                    <div class="task-status">
                        ${task.completed ? '✅ Selesai' : '⏳ Belum Selesai'}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn btn-complete" onclick="taskManager.toggleTask(${task.id})">
                        ${task.completed ? '❌ Batal Selesai' : '✅ Tandai Selesai'}
                    </button>
                    <button class="btn btn-edit" onclick="taskManager.editTask(${task.id})">
                        ✏️ Edit
                    </button>
                    <button class="btn btn-delete" onclick="taskManager.deleteTask(${task.id})">
                        🗑️ Hapus
                    </button>
                </div>
            </div>
        `).join('');
    }

    // === STATS & UPDATES ===
    updateStats() {
        const totalTasks = this.tasks.length;
        const pendingCount = this.tasks.filter(task => !task.completed).length;
        const completedCount = this.tasks.filter(task => task.completed).length;
        const urgentCount = this.tasks.filter(task => !task.completed && this.isDeadlineUrgent(task.deadline)).length;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('pendingCount').textContent = pendingCount;
        document.getElementById('completedCount').textContent = completedCount;
        document.getElementById('urgentCount').textContent = urgentCount;
    }

    updateCourseFilter() {
        const courseFilter = document.getElementById('courseFilter');
        const courses = [...new Set(this.tasks.map(task => task.course))].sort();
        
        const currentSelection = courseFilter.value;
        
        courseFilter.innerHTML = '<option value="all">📚 Semua Mata Kuliah</option>' +
            courses.map(course => `<option value="${course}">${course}</option>`).join('');
        
        if (courses.includes(currentSelection)) {
            courseFilter.value = currentSelection;
        }
    }

    // === HELPER METHODS ===
    getPriorityLabel = (priority) => {
        const labels = {
            high: '🔴 Tinggi',
            medium: '🟡 Sedang', 
            low: '🟢 Rendah'
        };
        return labels[priority] || priority;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let relativeTime = '';
        if (diffDays === 0) {
            relativeTime = ' (Hari ini)';
        } else if (diffDays === 1) {
            relativeTime = ' (Besok)';
        } else if (diffDays > 1 && diffDays <= 7) {
            relativeTime = ` (${diffDays} hari lagi)`;
        } else if (diffDays < 0) {
            relativeTime = ' (Terlewat!)';
        }

        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) + relativeTime;
    }

    getDeadlineClass(deadline) {
        const now = new Date();
        const taskDeadline = new Date(deadline);
        const timeDiff = taskDeadline - now;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        if (daysDiff < 0) return 'deadline-urgent';
        if (daysDiff <= 1) return 'deadline-urgent';
        if (daysDiff <= 3) return 'deadline-warning';
        return '';
    }

    isDeadlineUrgent(deadline) {
        const now = new Date();
        const taskDeadline = new Date(deadline);
        const timeDiff = taskDeadline - now;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return daysDiff <= 1 && daysDiff > 0;
    }

    checkDeadlines() {
        const urgentTasks = this.tasks.filter(task => 
            !task.completed && this.isDeadlineUrgent(task.deadline)
        );

        if (urgentTasks.length > 0) {
            this.showNotification(
                `🚨 ${urgentTasks.length} tugas mendekati deadline!`,
                'warning'
            );
        }
    }

    // === NOTIFICATION SYSTEM ===
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--bg-card);
                    color: var(--text-primary);
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: var(--shadow);
                    border-left: 4px solid var(--accent-primary);
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                }
                .notification-success { border-left-color: var(--success); }
                .notification-warning { border-left-color: var(--warning); }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 1.2em;
                    cursor: pointer;
                    color: var(--text-secondary);
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // === EXPORT DATA ===
    exportData() {
        const data = {
            exportedAt: new Date().toISOString(),
            totalTasks: this.tasks.length,
            tasks: this.tasks
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `studyflow-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Data berhasil di-export!', 'success');
    }
}

// Initialize TaskManager
const taskManager = new TaskManager();