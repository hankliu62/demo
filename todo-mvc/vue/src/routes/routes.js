export default {
  '/': {
    component: function (resolve) {
      require(['../modules/TodoList/TodoListMain'], resolve)
    }
  },
  '/test': {
    component: function (resolve) {
      require(['../modules/Test/TestMain'], resolve)
    }
  }
}
