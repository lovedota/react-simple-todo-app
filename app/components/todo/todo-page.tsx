import './styles/todo-page.scss';

import React from 'react';
import TodoList from './todo-list';
import TodoCommandButtons from "./todo-command-buttons";
import TodoTopFilter from './todo-top-filter';
import TodoBottomFilter from "./todo-bottom-filter";
import TodoStore from '../../stores/todo-store';
import {FilterType} from '../../cores/enums';

interface Props {

}

interface State {
  todos: Todo[];
  filterText: string;
  filterType: FilterType;
}

function getStateFromStores(): State {
  return {
    todos: TodoStore.todos,
    filterText: TodoStore.filterText,
    filterType: TodoStore.filterType
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
    let {todos, filterText, filterType} = this.state;

    return (
      <div className="todo-page">
        <header className="header">
          <TodoCommandButtons />
          <TodoTopFilter filterText={filterText}/>
        </header>
        <section className="main">
          <TodoList todos={todos}/>
        </section>
        <footer className="footer">
          <TodoBottomFilter todos={todos} filterType={filterType}/>
        </footer>
      </div>
    );
  }

  private onChange = () => {
    this.setState(getStateFromStores());
  }
}

export default TodoPageComponent;
