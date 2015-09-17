import BaseStore from "./base-store";
import TodoConstants from "../constants/todo-constants";
import handle from "../decorators/handle-decorator";
import {FilterType} from "../cores/enums";

interface TodoAction {
  filterText?: string;
  filterType?: FilterType;
  todoId?: string;
  todos?: Todo[];
  text?: string;
}

class TodoStore extends BaseStore {
  private _todos: Map<string, Todo> = new Map<string, Todo>();
  private _filterText: string = "";
  private _filterType: FilterType = FilterType.ALL;

  constructor() {
    super(TodoConstants.TODO_CHANGE_EVENT);
  }

  get todos(): Todo[] {
    return [...this._todos.values()]
      .filter(todo =>
        todo.text.toUpperCase().indexOf(this._filterText.toUpperCase()) >= 0 &&
        (this._filterType === FilterType.COMPLETED && todo.isDone ||
        this._filterType === FilterType.ACTIVE && !todo.isDone ||
        this._filterType === FilterType.ALL)
      );
  }

  get filterText(): string {
    return this._filterText;
  }

  get filterType(): FilterType {
    return this._filterType;
  }

  /* tslint:disable:no-unused-variable  */

  @handle(TodoConstants.TODO_LOAD_COMPLETE)
  private convertTodosToViewModel(action: TodoAction) {
    action.todos.forEach(todo => {
      this._todos.set(todo.id, todo);
    });

    this.emitChange();
  }

  @handle(TodoConstants.TODO_FILTER_TEXT)
  private filterTodosByText(action: TodoAction) {
    this._filterText = action.filterText;
    this.emitChange();
  }

  @handle(TodoConstants.TODO_TOGGLE)
  private toggleTodo(action: TodoAction): void {
    let todo = this._todos.get(action.todoId);

    todo.isDone = !todo.isDone;
    this.emitChange();
  }

  @handle(TodoConstants.TODO_TOGGLE_ALL)
  private toggleAllTodos(action: TodoAction): void {
    let todos = this._todos,
      allDone = [...todos.values()].every(todo => todo.isDone);

    [...todos.values()].forEach(todo => todo.isDone = !allDone);
    this.emitChange();
  }

  @handle(TodoConstants.TODO_REMOVE)
  private removeTodo(action: TodoAction): void {
    this._todos.delete(action.todoId);
    this.emitChange();
  }

  @handle(TodoConstants.TODO_ADD)
  private addTodo(action: TodoAction): void {
    let newTodo: Todo = {
      id: Math.random().toString(),
      text: action.text,
      isDone: false
    };

    this._todos.set(newTodo.id, newTodo);
    this.emitChange();
  }

  @handle(TodoConstants.TODO_FILTER_TYPE)
  private filterTodosByType(action: TodoAction): void {
    this._filterType = action.filterType;
    this.emitChange();
  }

  @handle(TodoConstants.TODO_CLEAR_COMPLETED)
  private clearCompletedTodos(action: TodoAction): void {
    let todos = this._todos;

    for (let [key, todo] of todos.entries()) {
      if (todo.isDone) {
        todos.delete(key);
      }
    }

    this.emitChange();
  }

  /* tslint:enable:no-unused-variable */
}

export default new TodoStore();
