(function () {
    function Store() {
        
    }

    Store.prototype.addTodos = function (todos) {
    	localStorage.setItem('todoList', JSON.stringify(todos));
    }

    Store.prototype.getTodos = function () {
    	return JSON.parse(localStorage.getItem('todoList')) || [];
    }

    window.app = window.app || {};
    app.store = Store;
})(window)