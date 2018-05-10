(function (window) { 
	function Stack () {
		var stack = [];

		this.push = function(value) {
			stack.push(value);
		}

		this.pop = function() {
			return stack.splice(stack.length - 1, 1)[0];
		}

        this.print = function() {
            console.log(stack);
        }

        this.size = function () {
            return stack.length;
        }
	}

	function LastAction(type, index, todo) {
        // ALL - removed all
        // ADD - added todo, 
        // DEL - deleted todo, 
        // SET - set as done/undone, 
        // SEL - selected todo
        this.type  = type;
        this.index = index;
        this.todo  = todo;
    }

    function Undos(model) {
    	var self = this;
        self.model = model;
    	self.actions = new Stack();
    }

    Undos.prototype.addAction = function (type, index, todo) {
    	var self = this;
    	self.actions.push(new LastAction(type, index, JSON.parse(JSON.stringify(todo))));
    }

    Undos.prototype.undoAction = function () {
    	var self = this;
    	var action = self.actions.pop();
    	if(action) {
            if (action.type === 'ALL') {
                self.model.todos = action.todo;
            }
            else if(action.type === 'ADD') {
                self.model.todos.splice(action.index, 1);
            }
            else if(action.type === 'DEL') {
                self.model.todos.splice(action.index, 0, action.todo);
            }
            else if(action.type === 'SET' || action.type === 'SEL') {
                self.model.todos[action.index] = action.todo;
            }
            self.model.store.addTodos(self.model.todos);
        }
    }

    Undos.prototype.print = function () {
        var self = this;
        self.actions.print();
    }

    Undos.prototype.getActionsCount = function () {
        var self = this;
        return self.actions.size();
    }

    window.app = window.app || {};
    window.app.undos = Undos;
})(window);
