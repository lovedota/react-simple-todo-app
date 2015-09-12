import './styles/todo-item.scss';

import React from 'react';
import classNames from "classnames";
import TodoActions from '../../actions/todo-actions';

interface Props extends React.Props<any> {
  key: string;
  style: any;
  todo: Todo;
}

interface State {

}

class TodoItemComponent extends React.Component<Props, State> {
  static displayName = "TodoItemComponent";

	render() {
    let {style, todo} = this.props,
      cssClasses = classNames('todo-item', {'completed': todo.isDone});

    return (
      <li style={style} className={cssClasses}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this.handleDone.bind(null, todo.id)}
            checked={todo.isDone}
          />
          <label>{todo.text}</label>
          <button
            className="destroy"
            onClick={this.handleDestroy.bind(null, todo.id)}
          />
        </div>
      </li>
    );
	}

  private handleDone = (key) => {
    TodoActions.toggleTodo(key);
  }

  private handleDestroy = (key) => {
    TodoActions.removeTodo(key);
  }
}

export default TodoItemComponent;
