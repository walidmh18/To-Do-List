const addNewInp = document.getElementById('addNewinput')
const toDoList = document.querySelector('.toDoList')
const toDoEl = document.querySelectorAll('.toDoEl')



window.onload = loadTasks()

function addNew(){
    let ElName = addNewInp.value
    let statu = 'active'

    
  
    let el = {
        name: ElName,
        statu: statu,
    }
    if (localStorage.getItem('tasks') == null) {
       localStorage.setItem('tasks', JSON.stringify([el]))
        loadTasksEx(el)

    } else {
        localStorage.setItem('tasks', JSON.stringify([...JSON.parse(localStorage.getItem('tasks')), el]))
        loadTasks()

    }



    // loadTasks()

    addNewInp.value = ''

}


function toLocalStorage(el) {
    
}

function loadTasksEx(el) {
    toDoList.innerHTML = ''

    let El = document.createElement('div')
            El.classList.add('toDoEl')
        
            let toDoElName = document.createElement('div')
            toDoElName.classList.add('toDoElName')
        
            let displayName = document.createElement('p')
            displayName.classList.add('name')
            displayName.innerText = el.name
            toDoElName.appendChild(displayName)
        
            let displayStatu = document.createElement('span')
            displayStatu.classList.add('statu')
            displayStatu.innerText = `(${el.statu})`
            toDoElName.appendChild(displayStatu)
    
            let ElActions = document.createElement('div')
            ElActions.classList.add('actions')
            ElActions.innerHTML = `<button class="completeBtn" onclick="completeEl(this.parentElement.parentElement)"><i class="fa-solid fa-check"></i></button>
            <button class="updateBtn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="deleteBtn" onclick="deleteEl(this.parentElement.parentElement)"><i class="fa-solid fa-x"></i></button>`
            
            El.append(toDoElName, ElActions)
            console.log(toDoList);
            
        toDoList.insertBefore(El, toDoList.children[0]);
}

function loadTasks() {
    toDoList.innerHTML = ''

   
    if (JSON.parse(localStorage.getItem('tasks')).length == 1) {
        {
            let El = document.createElement('div')
            El.classList.add('toDoEl')
        
            let toDoElName = document.createElement('div')
            toDoElName.classList.add('toDoElName')
        
            let displayName = document.createElement('p')
            displayName.classList.add('name')
            displayName.innerText = JSON.parse(localStorage.getItem('tasks')).name
            toDoElName.appendChild(displayName)
        
            let displayStatu = document.createElement('span')
            displayStatu.classList.add('statu')
            displayStatu.innerText = `(${JSON.parse(localStorage.getItem('tasks')).statu})`
            toDoElName.appendChild(displayStatu)
    
            let ElActions = document.createElement('div')
            ElActions.classList.add('actions')
            ElActions.innerHTML = `<button class="completeBtn" onclick="completeEl(this.parentElement.parentElement)"><i class="fa-solid fa-check"></i></button>
            <button class="updateBtn"  onclick="updateEl(this.parentElement.parentElement)"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="deleteBtn" onclick="deleteEl(this.parentElement.parentElement)"><i class="fa-solid fa-x"></i></button>`
            
            El.append(toDoElName, ElActions)
            console.log(toDoList);
            
        toDoList.insertBefore(El, toDoList.children[0]);
        }
    } else if (JSON.parse(localStorage.getItem('tasks')).length > 1) {
        JSON.parse(localStorage.getItem('tasks')).forEach(element => {
        let El = document.createElement('div')
        El.classList.add('toDoEl')
        El.dataset.statu = element.statu
    
        let toDoElName = document.createElement('div')
        toDoElName.classList.add('toDoElName')
    
        let displayName = document.createElement('p')
        displayName.classList.add('name')
        displayName.innerText = element.name
        toDoElName.appendChild(displayName)
    
        let displayStatu = document.createElement('span')
        displayStatu.classList.add('statu')
        displayStatu.innerText = `(${element.statu})`
        toDoElName.appendChild(displayStatu)

        let ElActions = document.createElement('div')
        ElActions.classList.add('actions')
        ElActions.innerHTML = `<button class="completeBtn" onclick="completeEl(this.parentElement.parentElement)"><i class="fa-solid fa-check"></i></button>
        <button class="updateBtn"  onclick="updateEl(this.parentElement.parentElement)"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="deleteBtn" onclick="deleteEl(this.parentElement.parentElement)"><i class="fa-solid fa-x"></i></button>`
        
        El.append(toDoElName, ElActions)
        console.log(toDoList);
        
        toDoList.insertBefore(El, toDoList.children[0]);

        
        
        
        });
    } 
    
}
const addNewBtn = document.getElementById('addNewBtn')
function deleteEl(El) {
    let name = El.querySelector('.name').innerText
    let tasksArr = [...JSON.parse(localStorage.getItem('tasks'))]


    tasksArr.forEach(task =>{
        if (task.name === name) {
            tasksArr.splice(tasksArr.indexOf(task), 1)
            console.log(tasksArr);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasksArr))
    toDoList.removeChild(El)
}

function completeEl(El) {
    let name = El.querySelector('.name').innerText
    El.dataset.statu = 'completed'
    let displayStatu = El.querySelector('.statu')
    displayStatu.innerText = `(${El.dataset.statu})`
    JSON.parse(localStorage.getItem('tasks')).statu

    let tasksArr = [...JSON.parse(localStorage.getItem('tasks'))]


    tasksArr.forEach(task =>{
        if (task.name === name) {
            task.statu = 'completed'
            let displayStatu = El.querySelector('.statu')
            displayStatu.innerText = `(${task.statu})`
        }

    })
    localStorage.setItem('tasks', JSON.stringify(tasksArr))


}

function updateEl(El) {
    let name = El.querySelector('.name').innerText
    addNewInp.value = El.querySelector('.name').innerText
    addNewInp.focus()

    let tasksArr = [...JSON.parse(localStorage.getItem('tasks'))]
    addNewBtn.onclick = ()=>{
        let newName = addNewInp.value
        tasksArr.forEach(task =>{
        if (task.name === name) {
            task.name = newName
            El.querySelector('.name').innerText = newName
            addNewInp.value = ''
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasksArr))
    }

    
}

filterLiWidth = (document.querySelector('.showAll').offsetWidth * 70 / 100 ) 
filterLiStep = `calc(${document.querySelector('.showAll').offsetWidth * 15 / 100}px + (${filterLiWidth}px/2))`

const filters = document.querySelectorAll('.filter')
const todoElements = document.querySelectorAll('.toDoEl')
function showAll(btn) {
    btn.classList.add('active')
    filters.forEach(filter => {
        if (filter!= btn) {
            filter.classList.remove('active')
        }
        todoElements.forEach(el =>{
            el.style.display = 'flex'
            
        })
    })
    filterLiWidth = (btn.offsetWidth * 70 / 100 ) 
    filterLiStep = `calc(${btn.offsetWidth * 15 / 100}px + (${filterLiWidth}px/2))`
}
function showActive(btn) {
    btn.classList.add('active')
    filters.forEach(filter => {
        if (filter!= btn) {
            filter.classList.remove('active')
        }
        
    })
    todoElements.forEach(el =>{
        if (el.dataset.statu == 'active') {
            el.style.display = 'flex'
        } else{
            el.style.display = 'none'
        }
    })
    filterLiWidth = (btn.offsetWidth * 70 / 100 ) 
    filterLiStep = `calc(${btn.offsetWidth * 15 / 100}px + (${filterLiWidth}px/2) + ${document.querySelector('.showAll').offsetWidth}px)`
}
function showCompleted(btn) {
    btn.classList.add('active')
    filters.forEach(filter => {
        if (filter!= btn) {
            filter.classList.remove('active')
        }
    })
    todoElements.forEach(el =>{
        if (el.dataset.statu == 'active') {
            el.style.display = 'none'
        } else{
            el.style.display = 'flex'
        }
    })
    filterLiWidth = (btn.offsetWidth * 70 / 100 ) 
    filterLiStep = `calc(${btn.offsetWidth * 15 / 100}px + (${filterLiWidth}px/2) + ${document.querySelector('.showAll').offsetWidth}px + ${document.querySelector('.showActive').offsetWidth}px)`

}




let filtersAfterEl = document.createElement('style')
filtersAfterEl.innerHTML = `
.filters::after { 
    width: ${filterLiWidth}px;
    left: ${filterLiStep};
    

}
`

filters.forEach(filter =>{
    filter.addEventListener('click', () => {
        filtersAfterEl.innerHTML = `
        .filters::after { 
        width: ${filterLiWidth}px;
    
         left: ${filterLiStep};
    

        }
`
    
    document.querySelector('head').appendChild(filtersAfterEl)

    
})
})

document.querySelector('head').appendChild(filtersAfterEl)
