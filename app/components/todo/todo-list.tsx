import './styles/todo-list.scss';

import React from 'react';
import {TransitionSpring, presets} from 'react-motion';
import TodoActions from '../../actions/todo-actions';

function spring(val, config = presets.noWobble) {
  return {val, config};
}

interface Props extends React.Props<any> {
  todos: Todo[];
}

interface State {
  value?: string;
  selected?: string;
}

class TodoApp extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      value: '',
      selected: 'all',
    };
  }

  getEndValue() {
    let {value} = this.state,
        {todos} = this.props,
        configs = {};

    todos.forEach(todo => {
      configs[todo.id] = {
        height: {val: 50},
        opacity: {val: 1},
        data: todo,
      };
    });

    return configs;
  }

  willEnter = (key) => {
    return {
      height: {val: 50},
      opacity: {val: 1},
      data: this.props.todos.filter(todo => todo.id === key),
    };
  }

  willLeave = (key, value, endValue, currentValue, currentSpeed) => {
    return {
      height: {val: 0},
      opacity: {val: 0},
      data: currentValue[key].data,
    };
  }

  handleDone = (key) => {
    TodoActions.toggleTodo(key);
  }

  handleDestroy = (key) => {
    TodoActions.removeTodo(key);
  }

  handleToggleAll = () => {
    TodoActions.toggleAllTodos();
  }


  // logic from todo, unrelated to animation
  handleChange = (event: any) => {
    this.setState({value: event.target.value});
    TodoActions.filterTodosByText(event.target.value);
  }

  render() {
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus={true}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox" onChange={this.handleToggleAll} />
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
                    <li key={key} style={style} className={data.isDone ? 'completed' : ''}>
                      <div className="view">
                        <input
                          className="toggle"
                          type="checkbox"
                          onChange={this.handleDone.bind(null, key)}
                          checked={data.isDone}
                        />
                         <label>{data.text}</label>
                        <button
                          className="destroy"
                          onClick={this.handleDestroy.bind(null, key)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            }
          </TransitionSpring>
        </section>
      </div>
    );
  }
}

export default TodoApp;
