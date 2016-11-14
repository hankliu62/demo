export default {
  '/': {
    component: function (resolve) {
      require(['../modules/TodoList/TodoListMain'], resolve)
    }
  }
}
