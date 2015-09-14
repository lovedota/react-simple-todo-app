import './styles/todo-bottom-filter.scss';

import React from 'react';
import classNames from "classnames";
import TodoActions from '../../actions/todo-actions';
import {FilterType} from '../../cores/enums';

interface Props extends React.Props<any> {
  todos: Todo[];
  filterType: FilterType;
}

interface State {

}

class TodoFilterComponent extends React.Component<Props, State> {
  static displayName = "TodoFilterComponent";

	render() {
    let {todos, filterType} = this.props;

    return (
      <section className="todo-bottom-filter">
        <span className="todo-count">
          <strong>
            {todos.filter(todo => !todo.isDone).length}
          </strong> item left
        </span>
        <ul className="filters">
          <li>
            <a
              className={filterType === FilterType.ALL ? 'selected' : ''}
              onClick={this.handleSelect.bind(null, FilterType.ALL)}>
              All
            </a>
          </li>
          <li>
            <a
              className={filterType === FilterType.ACTIVE ? 'selected' : ''}
              onClick={this.handleSelect.bind(null, FilterType.ACTIVE)}>
              Active
            </a>
          </li>
          <li>
            <a
              className={filterType === FilterType.COMPLETED ? 'selected' : ''}
              onClick={this.handleSelect.bind(null, FilterType.COMPLETED)}>
              Completed
            </a>
          </li>
        </ul>
        <button className="clear-completed" onClick={this.handleClearCompleted}>
          Clear completed
        </button>
      </section>
    );
	}

  private handleSelect = (filterType) => {
    TodoActions.filterTodosByType(filterType);
  }

  private handleClearCompleted = () => {
    TodoActions.clearCompletedTodos();
  }
}

export default TodoFilterComponent;
