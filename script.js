let tasks = [];
const addbtn = document.getElementById("add_btn");
let ip_box = document.getElementById("ip-box");    
const ul = document.querySelector("#task-list");
const cul = document.querySelector("#completed-list")
let tot_count = document.querySelector("#tot-count");
let rem_count = document.querySelector("#rem-count");
let comp_count = document.querySelector("#comp-count");


//SAVING TASKS
function saveTasks(){
    let t = JSON.stringify(tasks);
    localStorage.setItem("tasks",t);
}
//LOADING TASKS
function loadTasks(){
    let savedTasks = localStorage.getItem("tasks");
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}
//RENDERING TASKS
function renderTasks(){
    ul.innerHTML="";
    tasks.forEach((task,index) =>{
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        let span = document.createElement("span");
        span.innerText = task.text;
        if(task.completed == true){
            span.classList.add("completed-text");
        }
        const del = document.createElement("button");
        del.innerText = "X";
        ip_box.value = "";
        del.classList.add("delete-btn");
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(del);
        ul.appendChild(li);

        del.addEventListener("click", function (){
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        })

        checkbox.addEventListener("change",function() {
            if(task.completed == false){
                task.completed = true;
                saveTasks();
                renderTasks();
            }
            else{
                task.completed = false;
                saveTasks();
                renderTasks();
            }
        })
    });
    let tc = tasks.length;
    let rc = tasks.filter(function(task) {
        return !task.completed;
    }).length;
    let cc = tasks.filter(function(task){ 
        return task.completed;
    }).length;
    tot_count.innerText = tc;
    rem_count.innerText = rc;
    comp_count.innerText = cc;
}

//ADD TASK
function addTask() {
    let task = ip_box.value;
    if(task.trim()==""){
        alert("Please enter a task");
        return;
    }
    let task_obj = {
        text: task,
        completed: false
    }
    tasks.push(task_obj);
    saveTasks();
    renderTasks();
    ip_box.value = "";
}

//ENTER KEY FUNCTIONALITY
ip_box.addEventListener("keydown", function(event) {
    if(event.key=="Enter"){
        addTask();
    }
})
addbtn.addEventListener("click", addTask);

loadTasks();