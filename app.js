const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) :
 [] ;

const tasksList = document.getElementById("tasks-list");
 const taskForm = document.getElementById("taskForm");

 taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
 })

 function addTask() {
    const taskTitleValue = document.getElementById("taskTitle").value;

    if (taskTitleValue.trim() == "") {
        alert("Judul Tugas Tidak Boleh Kosong");
        return;
    }

    const newTask = {
        id: tasks.length + 1,
        title: taskTitleValue.trim(),

    };

    tasks.push(newTask);
    document.getElementById("taskTitle").value = "";
    localStorage.setItem("tasks",JSON.stringify(tasks));

    renderTask()
 }

 function renderTask() {
  tasksList.innerHTML = ""; 

  if (tasks.length == 0) {
    const li = document.createElement("li");
        li.classList.add("tasks-list-item");
            li.innerHTML = `
                <div class="tasks">
                    <div class="tasks-list">
                        Tidak Ada Kegiatan
                    </div>
                </div>
            `;
            tasksList.appendChild(li);
            return;
        }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("tasks-list-item");

    if (task.checked) {
      li.classList.add("checked");
    }

    li.innerHTML = `
      <div class="task">
        <input type="checkbox" onchange="checkTask(${index})" id="checkTask${index}" ${task.checked ? "checked" : ""}>
        <span class="task-title">${task.title}</span>
        <button class="button" onclick="deleteTask(${index})">Hapus</button>
      </div>
    `;

    li.id = `task${index}`;
    tasksList.appendChild(li);
  });
 }
 renderTask();
