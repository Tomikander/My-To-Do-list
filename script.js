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
           li.textContent = input.value.trim();
           todoList.appendChild(li);
           input.value = '';
           checkInput();
       }
   });
});