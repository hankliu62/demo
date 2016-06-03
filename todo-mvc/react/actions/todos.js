import * as types from '../constants/ActionTypes';
import * as LocalStorageUtil from '../utils/LocalStorageUtil'

const STORAGE_KEY = 'todos';

export const fetchTodos = () => {
  return async (dispatch) => {
    let todos = await LocalStorageUtil.getItem(STORAGE_KEY) || [];
    dispatch({ type: types.FETCH_TODOS, todos });
  }
}

export const addTodo = (text) => {
  return async (dispatch) => {
    let todos = await LocalStorageUtil.getItem(STORAGE_KEY) || [];
    const todo = {
      text: text,
      completed: false,
      id: todos.reduce((pre, next) => Math.max(pre, next.id), -1) + 1
    }
    todos = [todo, ...todos];
    await LocalStorageUtil.setItem(STORAGE_KEY, todos);

    dispatch({ type: types.ADD_TODO, todos });
  }
}

export const deleteTodo = (id) => {
  return async (dispatch) => {
    let todos = await LocalStorageUtil.getItem(STORAGE_KEY) || [];
    todos = todos.filter((todo) => id !== todo.id);
    await LocalStorageUtil.updateItem(STORAGE_KEY, todos);
    dispatch({ type: types.DELETE_TODO, todos });
  }
}

export const editTodo = (id, text) => {
  return async (dispatch) => {
    let todos = await LocalStorageUtil.getItem(STORAGE_KEY) || [];
    todos = todos.map((todo) => {
      return todo.id === id ? Object.assign({}, todo, {text: text}) : todo;
    });
    await LocalStorageUtil.updateItem(STORAGE_KEY, todos);
    dispatch({ type: types.EDIT_TODO, todos });
  }
}

export const completeTodo = (id) => {
  return async (dispatch) => {
    let todos = await LocalStorageUtil.getItem(STORAGE_KEY) || [];
    todos = todos.map((todo) => {
      return todo.id === id ? Object.assign({}, todo, {completed: !todo.completed}) : todo;
    });
    await LocalStorageUtil.updateItem(STORAGE_KEY, todos);
    dispatch({ type: types.COMPLETE_TODO, todos });
  }
}

export const completeAll = () => {
  return async (dispatch) => {
    let todos = await LocalStorageUtil.getItem(STORAGE_KEY) || [];
    const isCompleteAll = todos.reduce((completed, todo) => completed && todo.completed, true)
    todos = todos.map((todo) => Object.assign({}, todo, {completed: !isCompleteAll}));
    await LocalStorageUtil.updateItem(STORAGE_KEY, todos);
    dispatch({ type: types.COMPLETE_ALL, todos });
  }
}

export const clearCompleted = () => {
  return async (dispatch) => {
    let todos = await LocalStorageUtil.getItem(STORAGE_KEY) || [];
    todos = todos.filter((todo) => !todo.completed)
    await LocalStorageUtil.updateItem(STORAGE_KEY, todos);
    dispatch({ type: types.CLEAR_COMPLETED, todos});
  }
}