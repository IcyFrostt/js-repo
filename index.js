const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", gettodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", DeleteAndCheck);

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-items");
    todoDiv.appendChild(newTodo);

    savedata(todoInput.value);

    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"> </i>'
    checkButton.classList.add("check-button");
    todoDiv.appendChild(checkButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-minus-circle"></i>'
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function DeleteAndCheck(e) {
    const item = e.target;
    if (item.classList[0] === "delete-button") {
        const todo = item.parentElement;
        removeTodoFromStorage(todo);
        todo.remove();
    }
    if (item.classList[0] === "check-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function savedata(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function gettodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo")

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-items");
        todoDiv.appendChild(newTodo);

        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="fas fa-check"> </i>'
        checkButton.classList.add("check-button");
        todoDiv.appendChild(checkButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-minus-circle"></i>'
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    });
}

function removeTodoFromStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoWord = todo.children[0].innerText
    todos.splice(todos.indexOf(todoWord), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
