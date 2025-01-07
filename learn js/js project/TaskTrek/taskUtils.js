// Utility functions for task operations

export let tasks = JSON.parse(localStorage.getItem('Tasks')) || [];
export let editIndex = null;

export function saveTasks() {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

export function addTask(taskInput, prioritySelect) {
    if (taskInput.value.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Please enter a task",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        if (editIndex !== null) {
            tasks.splice(editIndex, 1, { 'Task': taskInput.value, 'Priority': prioritySelect.value });
            editIndex = null;
        } else {
            tasks.push({ 'Task': taskInput.value, 'Priority': prioritySelect.value });
        }
        saveTasks();
        taskInput.value = '';
    }
}

export function clearTasks(taskList) {
    taskList.innerHTML = '';
    tasks = [];
    saveTasks();
    taskList.innerHTML = "<p class='mx-auto'>NO DATA FOUND</p>";
}

export function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

export function editTask(index, taskInput) {
    editIndex = index;
    taskInput.value = tasks[editIndex].Task;
}

export function copyTask(index) {
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = tasks[index].Task;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    Swal.fire({
        icon: "success",
        title: "Task copied to clipboard!",
        showConfirmButton: false,
        timer: 1500
    });
}
