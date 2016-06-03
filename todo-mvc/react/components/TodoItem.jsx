import React, { Component, PropTypes } from 'react';
import TodoInput from './TodoInput.jsx';
import classnames from 'classnames';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false
    }
  }

  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  updateTodo = (text) => {
    const { todo, editTodo, deleteTodo } = this.props;

    if (text.length) {
      editTodo(todo.id, text);
      this.setState({ isEdit: false })
    } else {
      deleteTodo(todo.id);
    }
  }

  renderEditTypeComponent = (todo) => {
    return (
      <TodoInput text={ todo.text }
        isCreate={ false }
        onUpdate={ this.updateTodo }>
      </TodoInput>
    );
  }

  renderDispalyTypeComponent = (todo) => {
    return (
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={ todo.completed }
          style={ { cursor: "pointer" } }
          onChange={ () => this.props.completeTodo(todo.id) } />
        <label onDoubleClick={ () => this.setState({ isEdit: true }) }>{ todo.text }</label>
        <button style={ { cursor: "pointer" } } className="destroy" onClick={ () => this.props.deleteTodo(todo.id) }></button>
      </div>
    );
  }

  render = () => {
    let elem;
    const { todo } = this.props;

    if (this.state.isEdit) {
      elem = this.renderEditTypeComponent(todo);
    } else {
      elem = this.renderDispalyTypeComponent(todo);
    }

    return (
      <li className={ classnames({completed: todo.completed, editing: this.state.isEdit}) }>
        { elem }
      </li>
    );
  }
}

export default TodoItem;