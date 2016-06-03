import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem.jsx';
import Footer from './Footer.jsx';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/VisibilityTypes';

const TODO_FILTER = {
  [SHOW_ALL]: () => true,
  [SHOW_COMPLETED]: (todo) => todo.completed,
  [SHOW_ACTIVE]: (todo) => !todo.completed
}

class MainBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibilityType: SHOW_ALL
    }
  }

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  changeVisibilityType = (type) => {
    this.setState({ visibilityType: type });
  }

  renderCheckBox = (completedCount) => {
    const { todos, actions } = this.props;
    const isAllCompleted = todos.length && completedCount === todos.length;

    if (todos.length) {
      return (
        <input
          type="checkbox"
          className="toggle-all"
          checked={ isAllCompleted }
          style={ { cursor: "pointer" } }
          onChange={ actions.completeAll } />
      );
    }
  }

  renderFooter = (activeCount, completedCount) => {
    const { todos, actions } = this.props;

    if (todos.length) {
      return (
        <Footer
          visibilityType={ this.state.visibilityType }
          onChangeType={ this.changeVisibilityType }
          activeCount={ activeCount }
          clearCompleted={ actions.clearCompleted }
          completedCount={ completedCount } >
        </Footer>
      );
    }
  }

  renderTodos = (todos) => {
    const { actions } = this.props;

    return (
      <ul className="todo-list">
        {
          todos.map((todo) => <TodoItem key={ 'todo' + todo.id } todo={ todo } {...actions}></TodoItem>)
        }
      </ul>
    );
  }

  render = () => {
    const { todos } = this.props;

    const displayTodos = todos.filter(TODO_FILTER[this.state.visibilityType]);

    const activeCount = todos.reduce((count, todo) => todo.completed ? count : count + 1, 0);
    const completedCount = todos.length - activeCount;

    return (
      <section className="main">
        { this.renderCheckBox(completedCount) }
        { this.renderTodos(displayTodos) }
        { this.renderFooter(activeCount, completedCount) }
      </section>
    );
  }
}

export default MainBody;

