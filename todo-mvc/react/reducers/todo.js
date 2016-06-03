import { FETCH_TODOS, ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

const fetchTodosFux = (state, action) => {
  return action.todos
}

const addTodoFuc = (state, action) => {
  return action.todos;
}

const deleteTodoFuc = (state, action) => {
  return action.todos;
}

const editTodoFuc = (state, action) => {
  return action.todos;
}

const completeTodoFuc = (state, action) => {
  return action.todos;
}

const completeAllFuc = (state, action) => {
  return action.todos;
}

const clearCompletedFuc = (state, action) => {
  return action.todos;
}

const functions = {
  FETCH_TODOS: fetchTodosFux,
  ADD_TODO: addTodoFuc,
  DELETE_TODO: deleteTodoFuc,
  EDIT_TODO: editTodoFuc,
  COMPLETE_TODO: completeTodoFuc,
  COMPLETE_ALL: completeAllFuc,
  CLEAR_COMPLETED: clearCompletedFuc
}

const todos = (state = [], action) => {
  if (functions[action.type] && typeof functions[action.type] === 'function') {
    return functions[action.type](state, action);
  } else {
    return state;
  }
}

export default todos;