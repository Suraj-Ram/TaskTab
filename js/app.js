const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')


renderTasks()

taskInput.addEventListener('keypress', e => {
    if(e.keyCode === 13) {
        addTask(taskInput.value)
    }
})
addBtn.addEventListener('click', e  => {
    addTask(taskInput.value)
})

function renderTasks() {
    $('.tasks').html("")
    
    tasks.forEach(task => {
        let taskTemplate = `
            <div class="task">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="${task.id}">
                <label class="custom-control-label ${task.completed ? 'task-checked' : ''}" for="${task.id}">${task.title}</label>
            </div>
            <div class="tags">
                
            </div>
            <button class="btn close">&times</button>
            
            </div>
        `
   
        $('.tasks').append(taskTemplate)
    })
}

function addTask(task) {
    console.log(`Adding: ${task}`)
    let taskObj = {}
    let d = new Date()
    taskObj.id = d.getTime()
    taskObj.title = task
    taskObj.completed = false
    console.log(taskObj)
    tasks.push(taskObj)

}