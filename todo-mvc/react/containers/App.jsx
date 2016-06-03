import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../actions/todos'
import Header from '../components/Header.jsx'
import MainBody from '../components/MainBody.jsx'

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.actions.fetchTodos();
  }

  render = () => {
    const { todos, actions } = this.props;

    return (
      <div>
        <Header addTodo={ actions.addTodo }></Header>
        <MainBody todos={ todos } actions={ actions }></MainBody>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)