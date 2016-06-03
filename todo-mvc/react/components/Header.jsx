import React, { Component, PropTypes} from 'react';
import TodoInput from './TodoInput.jsx'

class Header extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  addHandler = (text) => {
    if (text.length) {
      this.props.addTodo(text);
    }
  }

  render = () => {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoInput onUpdate={this.addHandler.bind(this)} placeholder="What needs to be done?"></TodoInput>
      </header>
    );
  }
}

export default Header;

