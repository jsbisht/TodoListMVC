(function (window) {
    var todoInputTitle;
    var todoInputButton;
    var todoListTitle;
    var todoListItems;
    var todoCountMsg;
    var todoActionBtns;
    var todoResetBtn;
    var todoDeleteBtn;
    var todoUndoBtn;

    function View() {

    }

    View.prototype.onload = function () {
        todoInputTitle = document.querySelector('.todo-input-title');
        todoInputButton = document.querySelector('.todo-input-button');
        todoListTitle = document.querySelector('.todo-list-title');
        todoListItems = document.querySelector('.todo-list-items');
        todoCountMsg = document.querySelector('.message.size');
        todoErrorMsg = document.querySelector('.message.error');
        todoActionBtns = document.querySelector('.todo-action-btns');
        todoResetBtn = document.querySelector('.action-btn.reset-btn');
        todoDeleteBtn = document.querySelector('.action-btn.delete-btn');
        todoUndoBtn = document.querySelector('.action-btn.undo-btn');
    }

    View.prototype.init = function (count) {
        var self = this;
        self.setView(count);
    }

    View.prototype.addEventListner = function (eventName, callbackFn) {
        if (eventName === 'onAdd') {
            todoInputButton.addEventListener('click', callbackFn);
        }
        if (eventName === 'onResetAll') {
            todoResetBtn.addEventListener('click', callbackFn);
        }
        else if (eventName === 'onDeleteSelected') {
            todoDeleteBtn.addEventListener('click', callbackFn);
        }
        else if (eventName === 'onUndo') {
            todoUndoBtn.addEventListener('click', callbackFn);
        }
    }

    View.prototype.renderTodo = function (todo, index, onDone, onDelete) {
        var self = this;

        // <div class="todo-list-item"></div>
        var todoListItem = document.createElement("div");
        todoListItem.classList.add('todo-list-item');

        // <div class="todo-select"><input type="checkbox"></div>
        var selectElement = document.createElement("div");
        selectElement.classList.add('todo-select');
        var checkElement = document.createElement("input");
        checkElement.type = "checkbox";

        checkElement.setAttribute("id", index);
        checkElement.addEventListener('click', onSelect.bind(self));
        selectElement.appendChild(checkElement);

        // <div class="todo-title"></div>
        var todoTitle = document.createElement("div");
        todoTitle.classList.add('todo-title');
        var title = document.createTextNode(todo.title);
        todoTitle.appendChild(title);

        // <div class="todo-status"><div class="status"></div></div>
        var statusElement = document.createElement("div");
        statusElement.classList.add('todo-status');
        var toggleElement = document.createElement("div");
        toggleElement.classList.add(todo.done ? 'done' : 'none', 'status');
        toggleElement.setAttribute("id", index);
        toggleElement.addEventListener('click', onDone);
        statusElement.appendChild(toggleElement);

        // <div class="action-btn"><button type="submit">X</button></div>
        var actionBtn = document.createElement("div");
        actionBtn.classList.add('todo-action');
        var btnElement = document.createElement("button");
        btnElement.setAttribute("type", 'button');
        btnElement.setAttribute("value", 'X');
        btnElement.setAttribute("id", index);
        btnElement.addEventListener('click', onDelete);
        var btnTitle = document.createTextNode('X');
        btnElement.appendChild(btnTitle);
        actionBtn.appendChild(btnElement);

        // Add items to <div class="todo-list-item"></div>
        todoListItem.appendChild(selectElement);
        todoListItem.appendChild(todoTitle);
        todoListItem.appendChild(statusElement);
        todoListItem.appendChild(actionBtn);

        todoListItems.appendChild(todoListItem);
    }

    View.prototype.clearTodos = function () {
        while (todoListItems.firstChild) {
            todoListItems.removeChild(todoListItems.firstChild);
        }
    }

    View.prototype.setErrorMsg = function (event, message) {
        event.preventDefault();
        event.stopPropagation();
        todoErrorMsg.classList.remove('hide');
        todoErrorMsg.textContent = message;
        setTimeout(function () {
            todoErrorMsg.classList.add('hide');
        }, 2000);
    }

    View.prototype.setView = function (count, undoCount) {
        setTodoCount(count);
        setTable.call(this, count, undoCount);
    }

    function setTodoCount(count) {
        var title;
        if (count === 0) {
            title = 'No todo item created yet';
        }
        else if (count > 0) {
            title = 'Total todo items: ' + count;
        }
        // Replace `textContent` instead of `innerHtml`
        todoCountMsg.textContent = title;
    }

    function setTable(count, undoCount) {
        if (count === 0) {
            todoListTitle.classList.add('hide');
            todoDeleteBtn.classList.add('hide');
            this.hideResetBtn();
        }
        else if (count > 0) {
            todoListTitle.classList.remove('hide');
            this.showResetBtn();
        }
        if (undoCount > 0) {
            this.showUndoBtn();
        }
    }

    /**
     * EVENT LISTENERS
     */
    function onSelect(event) {
        var self = this;
        var count = 0;
        var checkboxes = document.querySelectorAll('.todo-select input[type="checkbox"]');
        for (var checkbox of checkboxes) {
            if (checkbox.checked) {
                count++;
            }
        }

        if (count > 1) {
            self.showDeleteBtn();
        }
    }

    /**
     * UTILITY FUNCTIONS
     */
    View.prototype.clearInputTitle = function () {
        todoInputTitle.value = '';
    }

    View.prototype.getInputTitle = function () {
        return todoInputTitle.value;
    }

    View.prototype.showDeleteBtn = function () {
        todoResetBtn.classList.remove('show-ib');
        todoResetBtn.classList.add('hide');
        todoDeleteBtn.classList.add('show-ib');
        todoDeleteBtn.classList.remove('hide');
    }

    View.prototype.showResetBtn = function () {
        todoResetBtn.classList.add('show-ib');
        todoResetBtn.classList.remove('hide');
        todoDeleteBtn.classList.remove('show-ib');
        todoDeleteBtn.classList.add('hide');
    }

    View.prototype.showUndoBtn = function () {
        todoUndoBtn.classList.add('show-ib');
    }

    View.prototype.hideResetBtn = function () {
        todoResetBtn.classList.remove('show-ib');
        todoResetBtn.classList.add('hide');
    }

    window.app = window.app || {};
    window.app.view = View;
})(window);
