import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'

class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text
    }
  }

  static propTypes = {
    placeholder: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    isCreate: PropTypes.bool,
    text: PropTypes.string
  }

  static defaultProps = {
    isCreate: true,
    text: ''
  }

  blurHandler = (e) => {
    if (!this.props.isCreate) {
      this.props.onUpdate(e.target.value.trim());
    }
  }

  keyDownHandler = (e) => {
    if (e.which === 13) {
      const value = e.target.value.trim();
      this.props.onUpdate(value);

      if (this.props.isCreate) {
        this.setState({text: ''});
      }
    }
  }

  changeHandler = (e) => {
    this.setState({text: e.target.value});
  }

  render = () => {
    return (
      <input
        className={classnames({
          'edit': !this.props.isCreate,
          'new-todo': this.props.isCreate
        })}
        placeholder={ this.props.placeholder }
        value={ this.state.text }
        onChange={ this.changeHandler.bind(this) }
        onBlur={ this.blurHandler.bind(this) }
        onKeyDown={ this.keyDownHandler.bind(this) }
        autoFocus="true" />
    );
  }
}

export default TodoInput