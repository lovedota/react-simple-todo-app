import './styles/todo-list.scss';

import React from 'react';
import {TransitionSpring, presets} from 'react-motion';
import TodoActions from '../../actions/todo-actions';
import TodoItem from './todo-item';

function spring(val, config = presets.noWobble) {
  return {val, config};
}

interface Props extends React.Props<any> {
  todos: Todo[];
}

interface State {

}

class TodoList extends React.Component<Props, State> {
  static displayName = "TodoListComponent";

  getEndValue() {
    let {todos} = this.props,
        configs = {};

    todos.forEach(todo => {
      configs[todo.id] = {
        height: spring(60, presets.gentle),
        opacity: spring(1, presets.gentle),
        data: todo,
      };
    });

    return configs;
  }

  willEnter = (key) => {
    return {
      height: spring(0),
      opacity: spring(1),
      data: this.props.todos.filter(todo => todo.id === key),
    };
  }

  willLeave = (key, value, endValue, currentValue, currentSpeed) => {
    return {
      height: spring(0),
      opacity: spring(0),
      data: currentValue[key].data,
    };
  }

  render() {
    return (
      <TransitionSpring
        endValue={this.getEndValue()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {currentValue =>
          <ul className="todo-list">
            {Object.keys(currentValue).map(key => {
              let style = {
                height: currentValue[key].height.val,
                opacity: currentValue[key].opacity.val,
              },
              data = currentValue[key].data;

              return (
                <TodoItem
                  key={key}
                  style={style}
                  todo={data}
                />
              );
            })}
          </ul>
        }
      </TransitionSpring>
    );
  }
}

export default TodoList;
