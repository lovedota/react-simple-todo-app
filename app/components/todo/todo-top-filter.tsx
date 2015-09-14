import './styles/todo-top-filter.scss';

import React from 'react';
import classNames from "classnames";
import TodoActions from '../../actions/todo-actions';

interface Props extends React.Props<any> {
  filterText: string;
}

interface State {

}

class TodoFilterComponent extends React.Component<Props, State> {
  static displayName = "TodoFilterComponent";

	render() {
    let {filterText} = this.props;

    return (
      <section className="todo-top-filter">
        <h1>todos</h1>
        <form>
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.handleToggleAll}
          />
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus={true}
            value={filterText}
            onChange={this.handleChange}
          />
        </form>
      </section>
    );
	}

  private handleChange = (event: any) => {
    TodoActions.filterTodosByText(event.target.value);
  }

  private handleToggleAll = () => {
    TodoActions.toggleAllTodos();
  }
}

export default TodoFilterComponent;
