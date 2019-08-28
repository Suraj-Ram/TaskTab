const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const siteTitle = document.getElementById('siteTitle')
const deleteAllTasksBtn = document.getElementById("deleteAllTasksBtn")

var taskCloseButtons;
var taskCheckboxes;

tasks = loadTasks()
settings = loadSettings()
changeBg(settings.background[0], settings.background[1])
renderTasks()

//Init popovers
$(function () {   
    $('[data-toggle="popover"]').popover() 
  });

taskInput.addEventListener('keypress', e => {
    // Hide popover that alerts teh user of an empty field
    $('#taskInput').popover('hide')

    if(e.keyCode === 13) {
        addTask(taskInput.value)
    }
})
addBtn.addEventListener('click', e  => {
    addTask(taskInput.value)
})
deleteAllTasksBtn.addEventListener('click', () => deleteAllTasks())

function renderTasks() {
    $('.tasks').html("")
    
    siteTitle.innerHTML = `TaskTab (${tasks.length})`

    tasks.forEach(task => {
        let tagsTemplate = `` 
        if(task.tags) {
            task.tags.forEach(tag => {
                if(tag === "p") {
                    tagsTemplate = `<i class="fas fa-exclamation ${task.completed ? 'text-secondary': 'text-danger'}"></i>`
                }
            })
        }

        

        let taskTemplate = `
            <div class="task">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input taskCheck" id="${task.id}" ${task.completed ? 'checked' : ''} >
                <label class="custom-control-label ${task.completed ? 'task-checked' : ''}" for="${task.id}">${task.title}</label>
            </div>
            <div class="tags">
                ${tagsTemplate}
            </div>
            <button class="btn close taskClose" id=${task.id}>&times</button>
            
            </div>
        `
   
        $('.tasks').append(taskTemplate)
    })

    saveTasks()

    taskCloseButtons = document.getElementsByClassName('taskClose')
    taskCheckboxes = document.getElementsByClassName('taskCheck')
    console.log(taskCheckboxes)

    for(i = 0; i < taskCloseButtons.length; i++) {
        taskCloseButtons[i].onclick = function() {
            deleteTask(this.id)
        }
    }

    for(e = 0; e < taskCheckboxes.length; e++) {
        taskCheckboxes[e].onclick = function() {
            taskChecked(this.id)
        }
    }

}

function addTask(task) {
    console.log(`Adding: ${task}`)

    if(isEmpty(task)) {
        handleEmpty()
    }
    else {
        let taskObj = {}
        let d = new Date()
        taskObj.id = d.getTime()
        taskObj.tags = task.includes("#") ? ["p"] : []
    
        taskObj.title = task.replace("#","")
        taskObj.completed = false
    
        console.log(taskObj)
        tasks.push(taskObj)
    
        taskInput.value = ""
    }


    renderTasks()
}

function taskChecked(id) {
    console.log(`Checking: ${id}`)

    tasks.forEach(task => {
        if(task.id == id) {
            task.completed = !task.completed 
        }
    })

    renderTasks()
}

function deleteTask(id) {
    console.log(`Deleting ${id}`)

    const newTasks = tasks.filter(task => task.id != id)

    tasks = newTasks

    renderTasks()
}

function deleteAllTasks() {
    tasks = [ ]
    renderTasks()
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
    let tasks = JSON.parse( localStorage.getItem('tasks') )

    // First time use
    if(tasks) {
        return tasks
    }
    else {
        return firstTasks
    }
}

// Check if task is empty - returns bool based on string input
function isEmpty(str) {
    let condition = str.replace(/\s/g, '')
    if(condition) {
        return false
    }
    else {
        return true
    }
}

function handleEmpty() {
    // Use a bootstrap popover under the Input field
    $('#taskInput').popover({
        content: 'Enter a task',
        trigger: 'focus',
    })

    $('#taskInput').popover('show')
}