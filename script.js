document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');
    const doneList = document.createElement('ul');
    doneList.id = 'doneList';
    doneList.innerHTML = '<h2>Готово</h2>';
    document.querySelector('.container').appendChild(doneList);

    let editMode = false;
    let currentEditElement = null;

    // Загружаем задачи из LocalStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const storedDoneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];
        storedTasks.forEach(task => addTaskToDOM(task.text, false));
        storedDoneTasks.forEach(task => addTaskToDOM(task.text, true));
    }

    // Сохраняем задачи в LocalStorage
    function saveTasks() {
        const tasks = [];
        const doneTasks = [];
        todoList.querySelectorAll('li').forEach(li => {
            tasks.push({ text: li.querySelector('span').textContent });
        });
        doneList.querySelectorAll('li').forEach(li => {
            doneTasks.push({ text: li.querySelector('span').textContent });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }

    function checkInput() {
        const value = input.value.trim();
        addButton.disabled = value.length < 3 || value.length > 200;
        updateEditButtons();
    }

    function updateEditButtons() {
        const editButtons = document.querySelectorAll('li button.edit');
        editButtons.forEach(button => {
            button.disabled = editMode;
            button.title = editMode ? 'Очистите поле ввода' : '';
        });
    }

    input.addEventListener('input', () => {
        checkInput();
    });

    addButton.addEventListener('click', () => {
        if (editMode) {
            if (input.value.trim()) {
                currentEditElement.querySelector('span').textContent = input.value.trim();
                addButton.textContent = 'Добавить';
                editMode = false;
                currentEditElement = null;
                input.value = '';
                checkInput();
                saveTasks();  // Сохраняем изменения после редактирования
            }
        } else {
            if (input.value.trim()) {
                addTaskToDOM(input.value.trim(), false);
                input.value = '';
                checkInput();
                saveTasks();  // Сохраняем задачи после добавления
            }
        }
    });

    function addTaskToDOM(text, isCompleted) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.querySelector('span').classList.add('completed');
                doneList.appendChild(li);
            } else {
                li.querySelector('span').classList.remove('completed');
                todoList.appendChild(li);
            }
            updateEditButtons();
            saveTasks();  // Сохраняем задачи после изменения статуса
        });
        li.appendChild(checkbox);

        const textElement = document.createElement('span');
        textElement.textContent = text;
        li.appendChild(textElement);

        const editButton = document.createElement('button');
        editButton.textContent = 'edit';
        editButton.className = 'edit';
        editButton.addEventListener('click', () => {
            input.value = textElement.textContent;
            addButton.textContent = 'Сохранить';
            editMode = true;
            currentEditElement = li;
            checkInput();
        });
        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => {
            li.parentElement.removeChild(li);
            updateEditButtons();
            saveTasks();  // Сохраняем задачи после удаления
        });
        li.appendChild(deleteButton);

        if (isCompleted) {
            doneList.appendChild(li);
        } else {
            todoList.appendChild(li);
        }
    }

    // Загружаем задачи при загрузке страницы
    loadTasks();
    updateEditButtons();
});
