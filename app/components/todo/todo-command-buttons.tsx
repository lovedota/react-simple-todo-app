import './styles/todo-command-buttons.scss';

import React from 'react';
import classNames from "classnames";
import TodoActions from '../../actions/todo-actions';

interface Props extends React.Props<any> {

}

interface State {

}

class TodoCommandButtonsComponent extends React.Component<Props, State> {
  static displayName = "TodoFilterComponent";

	render(): JSX.Element {
    return (
      <div className="todo-command-buttons">
        <button
          className="add-new-button"
          onClick={this.handleAddNewClick}
        >
          Add New Todo
        </button>
      </div>
    );
	}

  private handleAddNewClick = () => {
    let todoText = prompt('What is new Todo ?');

    if (todoText) {
      TodoActions.addTodo(todoText);
    }
  }
}

export default TodoCommandButtonsComponent;
