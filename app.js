let pyodide;

async function loadPyodideAndRun() {
    try {
        pyodide = await loadPyodide();
        await pyodide.loadPackage('micropip');
        const response = await fetch('logic.py');
        const pythonCode = await response.text();
        await pyodide.runPythonAsync(pythonCode);
        console.log("Pyodide loaded and Python code initialized");
        updateCategoryFilter();
        updateTaskList();
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        showStatus("Error initializing the application.");
    }
}

function showStatus(message) {
    const status = document.getElementById("status");
    status.innerText = message;
    setTimeout(() => status.innerText = "", 3000);
}

async function addTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const priority = document.getElementById("taskPriority").value;
    const category = document.getElementById("taskCategory").value.trim() || "Uncategorized";
    if (!title) {
        showStatus("Please enter a task title.");
        return;
    }
    try {
        const result = await pyodide.runPythonAsync(`add_task("${title}", "${priority}", "${category}")`);
        showStatus(result);
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskCategory").value = "";
        updateCategoryFilter();
        updateTaskList();
    } catch (error) {
        console.error("Error adding task:", error);
        showStatus("Error adding task.");
    }
}

async function markTaskDone(index) {
    try {
        const result = await pyodide.runPythonAsync(`mark_task_done(${index})`);
        const taskItem = document.getElementById(`task-${index}`);
        taskItem.classList.add("completed");
        setTimeout(() => {
            showStatus(result);
            updateTaskList();
        }, 300);
    } catch (error) {
        console.error("Error marking task done:", error);
        showStatus("Error marking task done.");
    }
}

async function updateTaskList() {
    try {
        const filter = document.getElementById("categoryFilter").value;
        const tasks = await pyodide.runPythonAsync(`json.dumps(get_tasks("${filter}"))`);
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = tasks === "[]" ? "<p class='text-gray-500'>No tasks available.</p>" : "";
        JSON.parse(tasks).forEach((task, index) => {
            const taskDiv = document.createElement("div");
            taskDiv.id = `task-${index}`;
            taskDiv.className = `task-item priority-${task.priority.toLowerCase()}`;
            taskDiv.innerHTML = `
                <span>${index + 1}. ${task.title} [${task.priority}] (${task.category})</span>
                <input type="checkbox" ${task.done ? "checked" : ""} onchange="markTaskDone(${index})">
            `;
            taskList.appendChild(taskDiv);
        });
    } catch (error) {
        console.error("Error updating task list:", error);
        showStatus("Error loading tasks.");
    }
}

async function updateCategoryFilter() {
    try {
        const categories = await pyodide.runPythonAsync("json.dumps(get_categories())");
        const filter = document.getElementById("categoryFilter");
        const currentValue = filter.value;
        filter.innerHTML = "<option value=''>All</option>";
        JSON.parse(categories).forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.text = category;
            filter.appendChild(option);
        });
        filter.value = currentValue;
    } catch (error) {
        console.error("Error updating category filter:", error);
        showStatus("Error loading categories.");
    }
}

loadPyodideAndRun();