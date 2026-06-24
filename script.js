const addbtn = document.getElementById("add_btn");
let ip_box = document.getElementById("ip-box");    
const ul = document.querySelector("#task-list");
const cul = document.querySelector("#completed-list")
let tot_count = document.querySelector("#tot-count");
let rem_count = document.querySelector("#rem-count");
let comp_count = document.querySelector("#comp-count");

//ADD TASK
function addTask() {
    let task = ip_box.value;
    if(task.trim()==""){
        alert("Please enter a task");
        return;
    }
    let li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let span = document.createElement("span");
    span.innerText = task;
    li.appendChild(checkbox);
    li.appendChild(span);
    ul.appendChild(li);
    const del = document.createElement("button");
    del.innerText = "X";
    li.appendChild(del);
    ip_box.value = "";
    del.classList.add("delete-btn");
    tot_count.innerText = parseInt(tot_count.innerText)+1;
    rem_count.innerText = parseInt(rem_count.innerText)+1;

    del.addEventListener("click", function () {
        li.remove();
        del.remove();
        tot_count.innerText = parseInt(tot_count.innerText)-1;
        rem_count.innerText = parseInt(rem_count.innerText)-1;
        if(parseInt(comp_count.innerText)>0){
            comp_count.innerText = parseInt(comp_count.innerText)-1;
        }
    })

    checkbox.addEventListener("change", function() {
        span.classList.toggle("completed-text");
        if(checkbox.checked){
            rem_count.innerText = parseInt(rem_count.innerText)-1;
            comp_count.innerText = parseInt(comp_count.innerText)+1;
        }
        else{
            rem_count.innerText = parseInt(rem_count.innerText)+1;
            comp_count.innerText = parseInt(comp_count.innerText)-1;
        }
    })
    
    
}
ip_box.addEventListener("keydown", function(event) {
    if(event.key=="Enter"){
        addTask();
    }
})
addbtn.addEventListener("click", addTask);
