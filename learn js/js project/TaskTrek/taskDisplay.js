// Functions for rendering tasks and managing pagination

import { tasks, deleteTask, editTask, copyTask } from './taskUtils.js';

export function renderTasks(taskList, visibleTasks) {
    taskList.innerHTML = visibleTasks.map((task, index) => {
        return `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <span class="badge bg-${getPriorityColor(task.Priority)} rounded-pill">${task.Priority}</span>
                    ${task.Task}
                </div>
                <div>
                    <button class="btn btn-primary btn-sm" onclick="handleEditTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="handleDeleteTask(${index})"><i class="fas fa-trash"></i></button>
                    <button class="btn btn-success btn-sm" onclick="handleCopyTask(${index})"><i class="fas fa-copy"></i></button>
                </div>
            </li>
        `;
    }).join("");
}

function getPriorityColor(priority) {
    switch (priority) {
        case "low":
            return "info";
        case "medium":
            return "warning";
        case "high":
            return "danger";
        default:
            return "secondary";
    }
}

export function updatePagination(taskList, pageDetails, pagination) {
    const recordsPerPage = parseInt(document.getElementById('recodes_size').value);
    const totalPages = Math.ceil(tasks.length / recordsPerPage);
    
    const pageLinks = Array.from(pagination.querySelectorAll('.page-item'));
    pageLinks.forEach(link => {
        link.addEventListener('click', () => {
            const pageIndex = parseInt(link.getAttribute('data-index'));
            showPage(pageIndex, taskList, pageDetails, pagination);
        });
    });

    // Show the first page by default
    showPage(1, taskList, pageDetails, pagination, totalPages);
}

function showPage(pageIndex, taskList, pageDetails, pagination, totalPages) {
    const recordsPerPage = parseInt(document.getElementById('recodes_size').value);
    const startIdx = (pageIndex - 1) * recordsPerPage;
    const endIdx = Math.min(startIdx + recordsPerPage, tasks.length);
    const visibleTasks = tasks.slice(startIdx, endIdx);

    renderTasks(taskList, visibleTasks);

    pageDetails.innerHTML = `Showing ${startIdx + 1} to ${endIdx} of ${tasks.length}`;

    updatePaginationButtons(pageIndex, totalPages, pagination);
}

function updatePaginationButtons(currentPage, totalPages, pagination) {
    const prevBtn = pagination.querySelector('#prevBtn');
    const nextBtn = pagination.querySelector('#nextBtn');
    const pageItems = Array.from(pagination.querySelectorAll('.page-item'));

    prevBtn.parentElement.classList.toggle('disabled', currentPage === 1);
    nextBtn.parentElement.classList.toggle('disabled', currentPage === totalPages);

    pageItems.forEach(item => {
        const pageIndex = parseInt(item.getAttribute('data-index'));
        item.classList.toggle('active', pageIndex === currentPage);
    });
}
