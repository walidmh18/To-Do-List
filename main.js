const addNewInp = document.getElementById("addNewinput");
const toDoList = document.querySelector(".toDoList");
const toDoEl = document.querySelectorAll(".toDoEl");
const addNewBtn = document.getElementById("addNewBtn");
const filters = document.querySelectorAll(".filter");
// const todoElements = document.querySelectorAll(".toDoEl");

console.log(localStorage.getItem("tasks"));

let getTasks = localStorage.getItem("tasks");
if (getTasks == null) {
  localStorage.setItem("tasks", "");
}
// let singleEl = {el: {}}
window.onload = () => {
    if (localStorage.getItem("tasks").length == 1 ) {
        loadTasks()
    } else {
        loadTasks();
        
    }
}







function loadTasks() {
    getTasks = localStorage.getItem("tasks");
  toDoList.innerHTML = "";

  if (getTasks != null && getTasks != "") {
    if (JSON.parse(getTasks).length == 1) {
      let El = document.createElement("div");
      El.classList.add("toDoEl");

      let toDoElName = document.createElement("div");
      toDoElName.classList.add("toDoElName");

      let displayName = document.createElement("p");
      displayName.classList.add("name");
      displayName.innerText = JSON.parse(localStorage.getItem("tasks"))[0].name;
      toDoElName.appendChild(displayName);

      let displayStatu = document.createElement("span");
      displayStatu.classList.add("statu");
      displayStatu.innerText = `(${
        JSON.parse(localStorage.getItem("tasks"))[0].statu
      })`;
      toDoElName.appendChild(displayStatu);

      let ElActions = document.createElement("div");
      ElActions.classList.add("actions");
      ElActions.innerHTML = `<button class="completeBtn" onclick="completeEl(this.parentElement.parentElement)"><i class="fa-solid fa-check"></i></button>
            <button class="updateBtn"  onclick="updateEl(this.parentElement.parentElement)"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="deleteBtn" onclick="deleteEl(this.parentElement.parentElement)"><i class="fa-solid fa-x"></i></button>`;

      El.append(toDoElName, ElActions);

      toDoList.insertBefore(El, toDoList.children[0]);



    } else if (JSON.parse(localStorage.getItem("tasks")).length > 1) {

      JSON.parse(localStorage.getItem("tasks")).forEach((element) => {
        let El = document.createElement("div");
        El.classList.add("toDoEl");
        El.dataset.statu = element.statu;

        let toDoElName = document.createElement("div");
        toDoElName.classList.add("toDoElName");

        let displayName = document.createElement("p");
        displayName.classList.add("name");
        displayName.innerText = element.name;
        toDoElName.appendChild(displayName);

        let displayStatu = document.createElement("span");
        displayStatu.classList.add("statu");
        displayStatu.innerText = `(${element.statu})`;
        toDoElName.appendChild(displayStatu);

        let ElActions = document.createElement("div");
        ElActions.classList.add("actions");
        ElActions.innerHTML = `<button class="completeBtn" onclick="completeEl(this.parentElement.parentElement)"><i class="fa-solid fa-check"></i></button>
        <button class="updateBtn"  onclick="updateEl(this.parentElement.parentElement)"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="deleteBtn" onclick="deleteEl(this.parentElement.parentElement)"><i class="fa-solid fa-x"></i></button>`;

        El.append(toDoElName, ElActions);

        toDoList.insertBefore(El, toDoList.children[0]);
      });
    }
  }
}







function loadTasksEx(el) {
    toDoList.innerHTML = "";
  
    let El = document.createElement("div");
    El.classList.add("toDoEl");
  
    let toDoElName = document.createElement("div");
    toDoElName.classList.add("toDoElName");
  
    let displayName = document.createElement("p");
    displayName.classList.add("name");
    displayName.innerText = el.name;
    toDoElName.appendChild(displayName);
  
    let displayStatu = document.createElement("span");
    displayStatu.classList.add("statu");
    displayStatu.innerText = `(${el.statu})`;
    toDoElName.appendChild(displayStatu);
  
    let ElActions = document.createElement("div");
    ElActions.classList.add("actions");
    ElActions.innerHTML = `<button class="completeBtn" onclick="completeEl(this.parentElement.parentElement)"><i class="fa-solid fa-check"></i></button>
              <button class="updateBtn"><i class="fa-solid fa-pen-to-square"></i></button>
              <button class="deleteBtn" onclick="deleteEl(this.parentElement.parentElement)"><i class="fa-solid fa-x"></i></button>`;
  
    El.append(toDoElName, ElActions);
  
    toDoList.insertBefore(El, toDoList.children[0]);
}
  
  
  
  

function addNew() {
  let ElName = addNewInp.value;
  let statu = "active";

  let el = {
    name: ElName,
    statu: statu,
  };
  
  //   console.log(JSON.stringify(getTasks));
  
  if (localStorage.getItem("tasks") == '' ) {
      console.log('i am blank');
      localStorage.setItem('tasks', JSON.stringify([el]))
      loadTasksEx(el)
      let singleEl = el

    } else {
      let tasksArr = [...JSON.parse(localStorage.getItem("tasks")) , el]
      localStorage.setItem('tasks', JSON.stringify(tasksArr))
      loadTasks()
    
  }


  addNewInp.value = "";
}



































function deleteEl(El) {
  let name = El.querySelector(".name").innerText;
  let tasksArr = [...JSON.parse(localStorage.getItem("tasks"))];

  tasksArr.forEach((task) => {
    if (task.name === name) {
      tasksArr.splice(tasksArr.indexOf(task), 1);
      console.log(tasksArr);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  toDoList.removeChild(El);
}

function completeEl(El) {
  let name = El.querySelector(".name").innerText;
  El.dataset.statu = "completed";
  let displayStatu = El.querySelector(".statu");
  displayStatu.innerText = `(${El.dataset.statu})`;
  JSON.parse(localStorage.getItem("tasks")).statu;

  let tasksArr = [...JSON.parse(localStorage.getItem("tasks"))];

  tasksArr.forEach((task) => {
    if (task.name === name) {
      task.statu = "completed";
      let displayStatu = El.querySelector(".statu");
      displayStatu.innerText = `(${task.statu})`;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

function updateEl(El) {
  let name = El.querySelector(".name").innerText;
  addNewInp.value = El.querySelector(".name").innerText;
  addNewInp.focus();

  let tasksArr = [...JSON.parse(localStorage.getItem("tasks"))];
  addNewBtn.onclick = () => {
    let newName = addNewInp.value;
    tasksArr.forEach((task) => {
      if (task.name === name) {
        task.name = newName;
        El.querySelector(".name").innerText = newName;
        addNewInp.value = "";
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  };
}

filterLiWidth = (document.querySelector(".showAll").offsetWidth * 70) / 100;
filterLiStep = `calc(${
  (document.querySelector(".showAll").offsetWidth * 15) / 100
}px + (${filterLiWidth}px/2))`;









function showAll(btn) {
  btn.classList.add("active");
  filters.forEach((filter) => {
    if (filter != btn) {
      filter.classList.remove("active");
    }
  const todoElements = document.querySelectorAll(".toDoEl");

    todoElements.forEach((el) => {
      el.style.display = "flex";
    });
  });
  filterLiWidth = (btn.offsetWidth * 70) / 100;
  filterLiStep = `calc(${
    (btn.offsetWidth * 15) / 100
  }px + (${filterLiWidth}px/2))`;
}




function showActive(btn) {
  btn.classList.add("active");
  filters.forEach((filter) => {
    if (filter != btn) {
      filter.classList.remove("active");
    }
  });
  const todoElements = document.querySelectorAll(".toDoEl");
  todoElements.forEach((el) => {

    if (el.dataset.statu == "active") {
      el.style.display = "flex";
    } else {
      el.style.display = "none";
    }
  });
  filterLiWidth = (btn.offsetWidth * 70) / 100;
  filterLiStep = `calc(${
    (btn.offsetWidth * 15) / 100
  }px + (${filterLiWidth}px/2) + ${
    document.querySelector(".showAll").offsetWidth
  }px)`;
}





function showCompleted(btn) {
  btn.classList.add("active");
  filters.forEach((filter) => {
    if (filter != btn) {
      filter.classList.remove("active");
    }
  });
  const todoElements = document.querySelectorAll(".toDoEl");

  todoElements.forEach((el) => {
    if (el.dataset.statu == "active") {
      el.style.display = "none";
    } else {
      el.style.display = "flex";
    }
  });
  filterLiWidth = (btn.offsetWidth * 70) / 100;
  filterLiStep = `calc(${
    (btn.offsetWidth * 15) / 100
  }px + (${filterLiWidth}px/2) + ${
    document.querySelector(".showAll").offsetWidth
  }px + ${document.querySelector(".showActive").offsetWidth}px)`;
}

let filtersAfterEl = document.createElement("style");
filtersAfterEl.innerHTML = `
.filters::after { 
    width: ${filterLiWidth}px;
    left: ${filterLiStep};
    

}
`;

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filtersAfterEl.innerHTML = `
        .filters::after { 
        width: ${filterLiWidth}px;
    
         left: ${filterLiStep};
    

        }
`;

    document.querySelector("head").appendChild(filtersAfterEl);

    // let VisibleEls = 0
    // todoElements.forEach(el =>{
    //     if(el.style.display == 'flex'){
    //         VisibleEls ++
    //     }
    //     if (VisibleEls == 0) {
    //         toDoList.innerHTML = `
    //             <h2 class="errorMsgEmpty">Nothing is here. <br> Try Adding new tasks, or Make Actions on existing ones.</h2>
    //         `
    //     } else{
    //         loadTasks()
    //     }
    // })
  });
});

document.querySelector("head").appendChild(filtersAfterEl);
