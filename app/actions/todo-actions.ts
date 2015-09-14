import Dispatcher from "../cores/dispatcher";
import TodoConstants from "../constants/todo-constants";
import TodoSevice from "../services/todo-services";

class TodoActions {
  async getTodos() {
    let todos = await TodoSevice.getTodos();

    Dispatcher.dispatch({
      type: TodoConstants.TODO_LOAD_COMPLETE,
      todos: todos
    });
  }

  toggleTodo(todoId: string) {
    Dispatcher.dispatch({
      type: TodoConstants.TODO_TOGGLE,
      todoId
    });
  }

  filterTodosByText(filterText: string) {
    Dispatcher.dispatch({
      type: TodoConstants.TODO_FILTER_TEXT,
      filterText
    });
  }

  filterTodosByType(filterType) {
    Dispatcher.dispatch({
      type: TodoConstants.TODO_FILTER_TYPE,
      filterType
    });
  }

  toggleAllTodos() {
    Dispatcher.dispatch({
      type: TodoConstants.TODO_TOGGLE_ALL,
    });
  }

  addTodo(text) {
    Dispatcher.dispatch({
      type: TodoConstants.TODO_ADD,
      text
    });
  }

  removeTodo(todoId) {
    Dispatcher.dispatch({
      type: TodoConstants.TODO_REMOVE,
      todoId
    });
  }

  clearCompletedTodos() {
    Dispatcher.dispatch({
      type: TodoConstants.TODO_CLEAR_COMPLETED
    });
  }
}

export default new TodoActions();
