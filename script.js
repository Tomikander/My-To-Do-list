document.addEventListener('DOMContentLoaded', () => {
   const input = document.getElementById('todoInput');
   const button = document.getElementById('addButton');
   const todoList = document.getElementById('todoList');

   function checkInput() {
       const value = input.value.trim();
       button.disabled = value.length < 3 || value.length > 200;
   }

   input.addEventListener('input', checkInput);

   button.addEventListener('click', () => {
      if (input.value.trim()) {
         const li = document.createElement('li');

         const checkbox = document.createElement('input');
         checkbox.type = 'checkbox';
         checkbox.className = 'checkbox';
         li.appendChild(checkbox);

         const text = document.createElement('span');
         text.textContent = input.value.trim();
         li.appendChild(text);

         const editButton = document.createElement('button');
         editButton.textContent = 'edit';
         editButton.className = 'edit';
         editButton.addEventListener('click', () => {
            const newValue = promt('Редактировать задачу:', text.textContent);
            if (newValue !== null) {
               text.textContent = newValue.trim();
            }
         });
         li.appendChild(editButton);

         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'delete';
         deleteButton.className = 'delete';
         deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
         });
         li.appendChild(deleteButton);

         todoList.appendChild(li);

         input.value = '';
         checkInput();
      }
   })
   
});