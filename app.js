// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter');
let todos = [];

// Events
document.addEventListener('DOMContentLoaded', getLocalStorage);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkTodo);
todoList.addEventListener('click', removeTodo);
filterOption.addEventListener('change', filter);



// Functions
function createHtml() {
    // Create Todo container Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create Todo Item
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerText = todoInput.value;
    todoDiv.appendChild(todoItem);

    // Create Completed Button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
    completedBtn.classList.add('checked-btn');
    todoDiv.appendChild(completedBtn);

    // Create Trash Button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    // Add Todo Div to Todo List
    todoList.appendChild(todoDiv);
}

function addTodo(e) {
    e.preventDefault();
    if (!todoInput.value) return;
    createHtml();
    setLocalStorage(todoInput.value);
}

function checkTodo(e) {
    if (e.target.classList.contains('checked-btn')) {
        e.target.closest('.todo').classList.toggle('completed');
    }
}

function removeTodo(e) {
    if (e.target.classList.contains('trash-btn')) {
        const todo = e.target.closest('.todo');
        todo.classList.add('fall');
        removeLocalStorage(todo);
        todo.addEventListener('transitionend', () => todo.remove());
    }
}

function filter(e) {
    const todos = todoList.childNodes;

    todos.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none';
                break;
            case "uncompleted":
                !todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none';
                break;
        }
    });
}

function checkLocalStorage() {
    if (!localStorage.getItem('todos')) return;
    todos = JSON.parse(localStorage.getItem('todos'));
}

function setLocalStorage(todo) {
    checkLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalStorage() {
    checkLocalStorage();
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create Todo Item
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.innerText = todo;
        todoDiv.appendChild(todoItem);

        // Create Completed Button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = `<i class="fas fa-check"></i>`
        completedBtn.classList.add('checked-btn');
        todoDiv.appendChild(completedBtn);

        // Create Trash Button
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);

        // Add Todo Div to Todo List
        todoList.appendChild(todoDiv);
    })
}

function removeLocalStorage(todo) {
    checkLocalStorage();
    let todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

