import BaseStore from "./base-store";
import TodoConstants from "../constants/todo-constants";
import handle from "../decorators/handle-decorator";

interface TodoAction {
  filterText?: string;
  todoId: string;
  todos: Todo[];
}

class TodoStore extends BaseStore {
  private _todos: Map<string, Todo> = new Map<string, Todo>();
  private _filterText: string = "";

  constructor() {
    super(TodoConstants.TODO_CHANGE_EVENT);
  }

  get todos() {
    return [...this._todos.values()]
      .filter(todo => todo.text.toUpperCase().indexOf(this._filterText.toUpperCase()) >= 0 );
  }

  @handle(TodoConstants.TODO_LOAD_COMPLETE)
  private convertTodosToViewModel(action: TodoAction) {
    let kv: any = action.todos.map(todo => [todo.id, todo]);

    this._todos = new Map<any, Todo>(kv);
    this.emitChange();
  }

  @handle(TodoConstants.TODO_FILTER_TEXT)
  private filterTodosByText(action: TodoAction) {
    this._filterText = action.filterText;
    this.emitChange();
  }

  @handle(TodoConstants.TODO_TOGGLE)
  private toggleTodo(action: TodoAction) {
    let todo = this._todos.get(action.todoId);

    todo.isDone = !todo.isDone;
    this.emitChange();
  }

  @handle(TodoConstants.TODO_TOGGLE_ALL)
  private toggleAllTodos(action: TodoAction) {
    let todos = this._todos,
      allDone = [...todos.values()].every(todo => todo.isDone);

    [...todos.values()].forEach(todo => todo.isDone = !allDone);
    this.emitChange();
  }

  @handle(TodoConstants.TODO_REMOVE)
  private removeTodo(action: TodoAction) {
    this._todos.delete(action.todoId);
    this.emitChange();
  }
}

export default new TodoStore();
