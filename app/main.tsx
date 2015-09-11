import 'babel-core/polyfill';

import React  from 'react';
import TodoActions from './actions/todo-actions';
import TodoPage from './components/todo/todo-page';

TodoActions.getTodos();

React.render(<TodoPage />, document.getElementById('app-content'));
