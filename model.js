(function (window) {
    function Todo(title) {
    	this.title = title;
    	this.time  = new Date().getTime();
    	this.done  = false;
    }

    function Model(store) {
        var self   = this;
    	self.store = store;
        self.todos = this.store.getTodos();
        self.undos = new app.undos(this);
    }

    Model.prototype.addTodo = function (title) {
    	var self = this;
    	self.todos.push(new Todo(title));
    	self.store.addTodos(self.todos);
    }

    Model.prototype.getTodos = function () {
        return this.todos;
    }

    // index starts from 0
    Model.prototype.getTodo = function (index) {
        return this.todos[index];
    }    

    Model.prototype.setTodo = function (index, propertyName, propertyValue) {
        var self = this;
        if(propertyName === 'title') {
            self.todos[index].title = propertyValue;
        }
        else if(propertyName === 'time') {
            self.todos[index].time = propertyValue;
        }
        else if(propertyName === 'done') {
            self.todos[index].done = propertyValue;
        }
        self.store.addTodos(self.todos);
    }

    Model.prototype.removeTodo = function (index) {
        var self = this;
        self.todos.splice(index, 1);
        self.store.addTodos(self.todos);
    }

    Model.prototype.removeAllTodos = function () {
        var self = this;
        self.todos.splice(0, self.todos.length);
        self.store.addTodos(self.todos);
    }

    Model.prototype.getTodoCount = function () {
        var self = this;
        return this.store.getTodos().length;
    }

    window.app = window.app || {};
    window.app.model = Model;
})(window);
