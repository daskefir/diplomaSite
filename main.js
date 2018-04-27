var timeClock = setInterval(function() {
    showClock();
}, 1000);

function showClock() {
    var date = new Date();
    var day = date.getDay();
    var dayMonth = date.getDate();
    var month = date.getUTCMonth();
    month = (month == 0) ? "January" : (month == 1) ? "February" : (month == 2) ? "March" : (month == 3) ? "April" : (month == 4) ? "May" : (month == 5) ? "June" : (month == 6) ? "July" : (month == 7) ? "August" : (month == 8) ? "September" : (month == 9) ? "October" : (month == 10) ? "November" : "December";
    day = (day == 1) ? "Monday" : (day == 2) ? "Tueday" : (day == 3) ? "Wednesday" : (day == 4) ? "Thursday" : (day == 5) ? "Friday" : (day == 6) ? "Saturday" : "Sunday";
    var year = date.getFullYear();
    var hour = date.getHours();
    hour = (hour < 10) ? "0" + hour : hour;
    var minute = date.getUTCMinutes();
    minute = (minute < 10) ? "0" + minute : minute;
    var second = date.getSeconds();
    second = (second < 10) ? "0" + second : second;
    var time = hour + ":" + minute + ":" + second + " " + day + " " + dayMonth + " " + month + " " + year;
    var timeTable = document.getElementById("clock");
    timeTable.innerHTML = time;
};

var tasks = [];
var taskbar = document.getElementById("taskBar");

function CreateTask(name, start, finish, status = "ready", priority) {
    let i = { name, start, finish, status, priority };
    this.name = name;
    this.start = start;
    this.finish = finish;
    this.status = status;
    this.priority = priority;
    addTask(i);
    tasks.push(i);
    console.log(tasks);
}

function addTask(task) {
    let divtask = document.createElement("div");
    divtask.id = task.name + task.priority;

    let spantask = document.createElement("h2");
    let buttonComplete = document.createElement("input");
    let buttonDelete = document.createElement("input");
    let priorityTask = document.getElementById(task.priority);
    priorityTask.appendChild(divtask);
    divtask.appendChild(spantask);
    divtask.appendChild(buttonDelete);
    divtask.appendChild(buttonComplete);
    buttonComplete.type = "button";
    buttonComplete.value = "About task";
    buttonComplete.id = task.name + "complete";

    buttonComplete.addEventListener('click', function() {
        let modal = document.querySelector(".modal");
        modal.style.display = "flex";
        let modalBody = document.getElementById("modal-body");

        let closeBtn = document.querySelector(".closeModal");

        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
            modalBody.innerHTML = "";
        });

        window.addEventListener("click", function(tap) {
            if (tap.target == modal) {
                modal.style.display = "none";
                modalBody.innerHTML = "";
            }
        })

        modalBody.appendChild(createTaskModal(task));
    });
    buttonDelete.type = "button";
    buttonDelete.value = "Удалить задание";
    buttonDelete.id = task.name + "delete";
    buttonDelete.addEventListener('click', function() {
        deleteElementFromTaskBoard(task.name, task.priority, task.status);
        let complete = document.getElementById("completedList");
        let completespan = document.createElement("li");
        complete.appendChild(completespan);
        completespan.innerHTML = task.name + " удалено";
        task.status = "deleted";
    });
    spantask.className = "tasksToDo";
    spantask.innerHTML = task.name;
};

var taskName = document.getElementById("task");
var taskStart = document.getElementById("taskStartTime");
var taskFinish = document.getElementById("taskFinishTime");

var createSubmit = document.getElementById("createTask");

createSubmit.onclick = function() {
    let taskPriority = document.querySelector('input[name="Priority"]:checked');
    let name = taskName.value;
    let start = Number(taskStart.value);
    let finish = Number(taskFinish.value);
    let priority = taskPriority.value;
    CreateTask(name, start, finish, "ready", priority);
    document.getElementById('win').style.display = 'none';
};

function lookForCurrentTask() {
    var current = tasks.filter(function(numb) {
        for (let key in numb) {
            let date = new Date();
            let hour = date.getHours();
            if (numb.start == hour && numb.finish > hour && numb.status == "ready") {
                return numb.name;
            }
        }
    })
    console.log(current);
    var names = getNames(current);
    var showName = showNames(names);
    let i = document.getElementById("progres");
    i.innerHTML = "Tasks in progress..." + showName;
    let taskEnded = taskFinished(current);
};

function getNames(current) {
    let names = current.map(function(element) {
        let key = "name";
        for (key in element) {
            return element.name;
        }
    })
    return names;
};

function taskFinished(current) {
    var complete = document.getElementById("completedList");

    var finished = current.filter(function(numb) {
        for (let key in numb) {
            let date = new Date();
            let hour = date.getHours();
            if (numb.finish == hour && numb.status == "ready") {
                numb.status = "inprogress";
                let completespan = document.createElement("li");
                complete.appendChild(completespan);
                completespan.innerHTML = numb.name + " - выполнено";
                deleteElementFromTaskBoard(numb.name, numb.priority, numb.stat);
                return numb.name;
            }
        }
    })

};


function showNames(names) {
    let showName = names.join(", ");
    return showName;
};

var timeCurrentTask = setInterval(function() {
    lookForCurrentTask();
}, 1000);

function statusChangeComplete(taskNames) {
    tasks.forEach(function(one) {
        for (let key in one) {
            if (key == "name" && one.name == taskNames) {
                one.status = "complete";
            }
        }
    })
    return tasks;
};


function deleteElementFromTaskBoard(name, prio, status) {
    document.getElementById(name + prio).remove();
    console.log(name + prio);
}

let deleteComletedTasks = document.getElementById("completedTask");
deleteComletedTasks.onclick = function() {
    document.getElementById("completedList").innerHTML = "";

};

function createTaskModal(x) {
    let modalDiv = document.createElement("div");
    modalDiv.id = x.name + x.priority + x.start;
    let modalUl = document.createElement("ul");
    modalDiv.appendChild(modalUl);
    let modalLiName = document.createElement("li");
    modalLiName.innerHTML = "Наименование задания:   " + x.name;
    modalUl.appendChild(modalLiName);
    let modalLiStart = document.createElement("li");
    modalLiStart.innerHTML = "Время начала   " + x.start;
    modalUl.appendChild(modalLiStart);
    let modalLiFinish = document.createElement("li");
    modalLiFinish.innerHTML = "Время завершения   " + x.finish;
    modalUl.appendChild(modalLiFinish);
    return modalDiv;
};








/*
var i = document.getElementById("progres");
current.forEach(element => {
    let key = "name";
    for (key in element){
let b = document.createElement("b");
i.appendChild(b);
b.innerHTML = current.name;
    }
});
};*/



/*function lookForCurrentTask(){
tasks.forEach(element => {
    for(let key in element){
       let date = new Date();
        let hour = date.getHours();
if (key == "start" && element.start == hour)
{
let names = [];
names.push(element.name);
let i = document.getElementById("progres");
i.innerHTML = "Tasks in progress..." + names;
console.log(names);
}
    }
});
}; */