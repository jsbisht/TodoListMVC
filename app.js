(function (window) {
    window.onload = function () {
        var todoList = new TodoList();
    }

    function TodoList() {
        this.store = new app.store();
        this.model = new app.model(this.store);
        this.view  = new app.view();
        this.controller = new app.controller(this.model, this.view);
    }
})(window)