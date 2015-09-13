import './styles/todo-page.scss';

import React from 'react';
import TodoList from './todo-list';
import TodoStore from '../../stores/todo-store';
import TodoFilter from './todo-filter';

interface Props {

}

interface State {
  todos: Todo[];
  filterText: string;
}

function getStateFromStores(): State {
  return {
    todos: TodoStore.todos,
    filterText: TodoStore.filterText
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
    let {todos, filterText} = this.state;

    return (
      <div className="todo-page">
        <header>
          <TodoFilter filterText={filterText}/>
        </header>
        <section className="main">
          <TodoList todos={todos}/>
        </section>
      </div>
    );
  }

  private onChange = () => {
    this.setState(getStateFromStores());
  }
}

export default TodoPageComponent;
