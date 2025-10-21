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
 }
