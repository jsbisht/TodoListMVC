(function (window) {
    var onDoneEvntLtnr;
    var onDeleteEvntLtnr;

    function Controller(model, view) {
        var self = this;
        self.model = model;
        self.view = view;
        self.view.onload();
        self.view.init(self.model.getTodoCount());
        self.view.addEventListner('onAdd', onAdd.bind(self));
        self.view.addEventListner('onResetAll', onResetAll.bind(self));
        self.view.addEventListner('onDeleteSelected', onDeleteSelected.bind(self));
        self.view.addEventListner('onUndo', onUndo.bind(self));
        onDoneEvntLtnr = onDone.bind(self);
        onDeleteEvntLtnr = onDelete.bind(self);

        self.renderAllTodos(self.model.getTodos());
    }

    Controller.prototype.renderAllTodos = function (todos) {
        var self = this;
        self.view.clearTodos();
        if(todos.length > 0) {
            self.view.showResetBtn();
        }
        todos.forEach(function (todo, index) {
            self.view.renderTodo(todo, index, onDoneEvntLtnr, onDeleteEvntLtnr);
        });
    }

    /**
     * EVENT LISTENERS
     * Event listeners that work with both model and view.
     */
    function onAdd(event) {
        var self = this;
        var title = self.view.getInputTitle();
        // Get length of title excluding spaces
        if(title.replace(/ /g,"").length <= 30) {
            self.view.clearInputTitle();
        }
        else {
            self.view.setErrorMsg(event, 'Todo title can have maximum 30 charecters');
            return;
        }

        if(self.model.getTodoCount() === 10) {
            self.view.setErrorMsg(event, 'Only ten todos can be created');
        } else {
            self.model.addTodo(title);
            self.renderAllTodos(self.model.getTodos());
            var index = self.model.getTodoCount() - 1;
            self.model.undos.addAction('ADD', index, self.model.getTodo(index));
            self.view.setView(self.model.getTodoCount(), self.model.undos.getActionsCount());
        }
    }

    function onDone(event) {
        var self = this;
        var index = event.target.id;
        var value = !(event.target.classList.contains('done'));
        self.model.undos.addAction('SET', index, self.model.getTodo(index));
        self.model.setTodo(index, 'done', value);
        self.renderAllTodos(self.model.getTodos());
    }


    function onDelete(event) {
        var self = this;
        var index = event.target.id;
        self.model.undos.addAction('SET', index, self.model.getTodo(index));
        self.model.removeTodo(index);
        self.view.setView(self.model.getTodoCount(), self.model.undos.getActionsCount());
        self.renderAllTodos(self.model.getTodos());
    }

    function onDeleteSelected(event) {
        var self = this;
        var checkboxes = document.querySelectorAll('.todo-select input[type="checkbox"]');
        for(var index = 0, removedCount = 0; index < checkboxes.length; index++) { 
            var checkbox = checkboxes[index];
            if(checkbox.checked) {
                self.model.removeTodo(index - removedCount);
                removedCount++;
            } 
        }
        self.view.setView(self.model.getTodoCount(), self.model.undos.getActionsCount());
        self.renderAllTodos(self.model.getTodos());
    }

    function onResetAll(event) {
        var self = this;
        self.model.undos.addAction('ALL', null, self.model.getTodos());
        self.model.removeAllTodos();
        self.renderAllTodos(self.model.getTodos());
        self.view.setView(self.model.getTodoCount(), self.model.undos.getActionsCount());
    }

    function onUndo(event) {
        var self = this;
        self.model.undos.undoAction();
        self.view.setView(self.model.getTodoCount(), self.model.undos.getActionsCount());
        self.renderAllTodos(self.model.getTodos());
    }
    
    window.app = window.app || {};
    window.app.controller = Controller;
})
(window);