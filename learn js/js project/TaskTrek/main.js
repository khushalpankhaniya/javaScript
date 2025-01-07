let Task = document.querySelector('#taskInput');
let Priority = document.querySelector("#prioritySelect");
let searchInput = document.querySelector("#searchInput");
let taskList = document.querySelector("#taskList");
let recodes_size = document.getElementById('recodes_size');
let TaskArray = JSON.parse(localStorage.getItem('Tasks')) || [];
let edit_index = null;

displayData();
if (TaskArray.length === 0) {
    taskList.innerHTML = "<p class='mx-auto'>NO DATA FOUND</p>";
}

function addTask() {
    if (Task.value.trim() == "") {
        Swal.fire({
            icon: "error",
            title: "Please enter task",
            showConfirmButton: false,
            timer: 1500
        });

    } else {
        if (edit_index != null) {
            TaskArray.splice(edit_index , 1, {'Task': Task.value, 'Priority': Priority.value, });
            edit_index = null;
        } else {
            TaskArray.push({ 'Task': Task.value, 'Priority': Priority.value, })
        }
        saveInfo(TaskArray);
        Task.value = null;
     
    }
 
}

function clearCompleted() {
    taskList.innerHTML = ''; // Clear the innerHTML of taskList
    TaskArray = []; // Clear TaskArray
    saveInfo(TaskArray); // Save updated TaskArray to localStorage
    taskList.innerHTML = "<p class='mx-auto'>NO DATA FOUND</p>";
}

function saveInfo() {
    localStorage.setItem('Tasks', JSON.stringify(TaskArray))
   displayData();
   
  generatePriorityPieChart(TaskArray);
}

function displayData() {
    taskList.innerHTML = TaskArray.map((element, index) => {
        return `
            <li class="list-group-item d-flex justify-content-between align-items-center " id="lis">
                    <div>
                        <span class="badge bg-${getPriorityColor(element.Priority)} rounded-pill ">${element.Priority}</span>
                        ${element.Task}
                    </div>
                    <div>
                        <button class="btn btn-primary btn-sm" onclick="updateTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="removeTask(${index})"><i class="fas fa-trash"></i></button>
                        <button class="btn btn-success btn-sm" onclick="copyTask(${index})"><i class="fas fa-copy"></i></button>
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

function removeTask(index) {
    TaskArray.splice(index, 1);
    saveInfo(TaskArray);
    generatePriorityPieChart(TaskArray);
}

function updateTask(index) {
    edit_index = index;
    Task.value = TaskArray[edit_index].Task; 
}

var allLI = document.querySelectorAll("#taskList > li");
searchInput.addEventListener('input', function (e) {
    if (TaskArray.length === 0) {
        Swal.fire({
            icon: "error",
            title: "No task available to search",
            showConfirmButton: false,
            timer: 1500
        });
    }
    else {
        let searchValue = e.target.value.toUpperCase();
        taskList.innerHTML = '';
        allLI.forEach((li) => {
            let taskElement = li.querySelector('.list-group-item  div');
            let elementTaskValue = taskElement.childNodes[2].textContent.toUpperCase().trim();
            if (elementTaskValue.indexOf(searchValue) > -1) {
                taskList.appendChild(li);
            }
        })
    }
})

function downloadTXT() {
    if (TaskArray.length === 0) {
        Swal.fire({
            icon: "error",
            title: "No task available to download",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        const tasksText = TaskArray.map((element, index) => {
            return `${index + 1}. Priority: ${element.Priority}, Task: ${element.Task}`;
        }).join('\n');

        const blob = new Blob([tasksText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'task_list.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function copyTask(index) {
    var tempTextarea = document.createElement("textarea");
    tempTextarea.value = TaskArray[index].Task;
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

// Pagination

let total_recodes_li = document.querySelectorAll("#taskList li");
let recodes_per_page = 5;
let page_number = 1;
const total_recodes = total_recodes_li.length;
let total_page = Math.ceil(total_recodes / recodes_per_page);

genratePage();
DisplayRecords();

function DisplayRecords() {
    let start_index = (page_number - 1) * recodes_per_page;
    let end_index = start_index + (recodes_per_page - 1);
    if (end_index >= total_recodes ) { end_index = total_recodes - 1 };
    let statment = '';
    for (let i = start_index; i <= end_index && i < total_recodes; i++) {
        statment += `<li class="list-group-item d-flex justify-content-between align-items-center">${total_recodes_li[i].innerHTML}</li>`;
    }
    taskList.innerHTML = statment;
    document.querySelectorAll('.dynamic-item').forEach((item) => {
        item.classList.remove('active');
    })
    document.getElementById(`page${page_number}`).classList.add('active');

    if (page_number == 1) {
        document.getElementById('prevBtn').parentElement.classList.add('disabled');
    } else {
        document.getElementById('prevBtn').parentElement.classList.remove('disabled');
    }

    if (page_number == total_page) {
        document.getElementById('nextBtn').parentElement.classList.add('disabled');
    } else {
        document.getElementById('nextBtn').parentElement.classList.remove('disabled');
    }

    document.getElementById('page-details').innerHTML = `Showing ${start_index + 1} to ${end_index + 1} of ${total_recodes}`;

}

function genratePage() {
    let prevBtn = `<li class="page-item" >
            <a class="page-link " id="prevBtn" onclick="PrevPage()" href="javascript:void(0)">Previous</a> 
            </li>`;
    let nextbtn = `<li class="page-item">
            <a class="page-link" id="nextBtn" onclick="nextPage()" href="javascript:void(0)">Next</a> 
            </li>`;
    let Buttons = '';
    let activeClass = '';

    for (let i = 1; i <= total_page; i++) {
        i == 1 ? (activeClass = 'active') : (activeClass = '');
        Buttons += ` <li class="page-item ${activeClass} dynamic-item" id="page${i}"><a class="page-link" onclick="page(${i})"  href="javascript:void(0)">${i}</a></li>`;
    }
    document.getElementById('pagination').innerHTML = `${prevBtn} ${Buttons} ${nextbtn}`;
}

function nextPage() {
    page_number++;
    DisplayRecords();
}

function PrevPage() {
    page_number--;
    DisplayRecords();
}

function page(index) {
    page_number = parseInt(index);
    DisplayRecords();
}

recodes_size.addEventListener('change', function (e) {
    recodes_per_page = parseInt(recodes_size.value);
    total_page = Math.ceil(total_recodes / recodes_per_page);
    page_number = 1;
    genratePage();
    DisplayRecords();
});

// chart logic 

  let myChart = null; // Declare a variable to store the chart instance globally

  function generatePriorityPieChart(TaskArray) {
    const priorityCounts = {
      low: 0,
      medium: 0,
      high: 0
    };
  
    TaskArray.forEach(task => {
      const priority = task.Priority.toLowerCase(); // Convert to lowercase for consistency
      if (priorityCounts.hasOwnProperty(priority)) {
        priorityCounts[priority]++;
      }
    });
  
    const ctx = document.getElementById('myChart');
  
    // Destroy the existing chart if it exists
    if (myChart) {
      myChart.destroy();
    }
  
    myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Low', 'High', 'Medium'], 
        datasets: [{
          label: ' Numbers of Tasks',
          data: [
            priorityCounts.low,
            priorityCounts.high,
            priorityCounts.medium,
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generatePriorityPieChart(TaskArray);
  

