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
           }
       } else {
           if (input.value.trim()) {
               const li = document.createElement('li');

               const checkbox = document.createElement('input');
               checkbox.type = 'checkbox';
               checkbox.className = 'checkbox';
               checkbox.addEventListener('change', () => {
                   if (checkbox.checked) {
                       li.querySelector('span').classList.add('completed');
                       doneList.appendChild(li);
                   } else {
                       li.querySelector('span').classList.remove('completed');
                       todoList.appendChild(li);
                   }
                   updateEditButtons();
               });
               li.appendChild(checkbox);

               const text = document.createElement('span');
               text.textContent = input.value.trim();
               li.appendChild(text);

               const editButton = document.createElement('button');
               editButton.textContent = 'edit';
               editButton.className = 'edit';
               editButton.addEventListener('click', () => {
                   input.value = text.textContent;
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
               });
               li.appendChild(deleteButton);

               todoList.appendChild(li);

               input.value = '';
               checkInput();
           }
       }
   });


   updateEditButtons();
});
