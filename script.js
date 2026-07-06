const inputTask = document.getElementById("inputTask");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function createTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    let pressTimer;

    function completeTask() {
        li.classList.toggle("completed");

        if (li.classList.contains("completed")) {
            setTimeout(function () {
                if (li.classList.contains("completed")) {
                    const index = tasks.indexOf(taskText);

                    if (index !== -1) {
                        tasks.splice(index, 1);
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                    }

                    li.remove();
                }
            }, 10000);
        }
    }

    // Desktop: Double-click
    li.addEventListener("dblclick", completeTask);

    // Mobile: Long press
    li.addEventListener("touchstart", function () {
        pressTimer = setTimeout(function () {
            completeTask();
        }, 1000); // Hold for 1 second
    });

    li.addEventListener("touchend", function () {
        clearTimeout(pressTimer);
    });

    li.addEventListener("touchmove", function () {
        clearTimeout(pressTimer);
    });

    taskList.appendChild(li);
}

inputTask.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

addBtn.addEventListener("click", function () {
    const taskText = inputTask.value.trim();

    if (taskText === "") return;

    createTask(taskText);

    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    inputTask.value = "";
});

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}

tasks.forEach(function (task) {
    createTask(task);
});