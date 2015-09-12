import './styles/todo-page.scss';

import React from 'react';
import TodoList from './todo-list';
import TodoStore from '../../stores/todo-store';
TodoStore
interface Props {

}

interface State {
  todos: Todo[];
}

function getStateFromStores(): State {
  return {
    todos: TodoStore.todos
  };
}

class TodoPageComponent extends React.Component<Props, State> {
  constructor() {
      super();
      this.state = getStateFromStores();
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  }

  componentDidMount() {
    TodoStore.addChangeListener(this.onChange);
  }

  render() {
    let {todos} = this.state;

    return (
      <div className="row">
       <TodoList todos={todos}/>
      </div>
    );
  }

  private onChange = () => {
    this.setState(getStateFromStores());
  }
}

export default TodoPageComponent;
