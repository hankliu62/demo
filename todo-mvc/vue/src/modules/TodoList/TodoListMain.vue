<template>
  <div class="todoapp">
    <c-header v-on:create="createItem"></c-header>
    <!--<div class="todo-list-main">
      {{ todoMsgs }}
    </div>
    <input v-model="name" :id="id" type="text" />-->
    <div class="main">
      <input
        type="checkbox"
        class="toggle-all"
        v-model="isAllCompleted"
        :style="{ cursor: 'pointer' }"
        @click="checkAllTodos(!isAllCompleted)"
      />
      <ul class="todo-list">
        <todo-item
          v-for="todo in filtedTodos"
          v-bind:todo="todo"
          track-by="id"
          @update="updateItem"
          @remove="removeItem"
        ></todo-item>
      </ul>

      <c-footer
        :active-count="activeCount"
        :completed-count="completedCount"
        :filter="filterStatus"
        @filter="filterTodos"
        @clear="clearCompletedItems"
      >
      </c-footer>
    </div>
  </div>
</template>
<script>
import CHeader from './components/Header/Header'
import CFooter from './components/Footer/Footer'
import TodoItem from './components/TodoItem/TodoItem'
import LocalStorageUtil from '../../utils/LocalStorageUtil'
import { generateObjectId } from '../../utils/StringUtil'
import { cloneDeep } from '../../utils/ObjectUtil'
import { TODO_LIST_KEY, FILTER_STATUSES } from '../../constants/Constants'
import { mapActions, mapState, mapGetters } from 'vuex'

const deleteItems = function (todos, condition) {
  if (todos) {
    todos = todos.filter(condition);
  }
  return todos
}

const updateItems = function (todos, condition) {
  if (todos) {
    todos = todos.map(condition);
  }
  return todos
}

const getCompletedCount = function (todos) {
  if (todos) {
    return todos.filter(function (item) {
      return item.completed
    }).length
  }

  return 0
}

export default {
  // data () {
  //   return {
  //     name: 'main.html',
  //     id: 'name',
  //     todos: [],
  //     filterStatus: FILTER_STATUSES.ALL
  //   }
  // },
  methods: {
    ...mapActions(['setState']),
    // onEnter: function (e) {
    //   console.log(this, e, 'vvvvvvvvvvvvvvvv')
    // },
    setTodos: function (todos) {
      // this.$set('todos', todos)
      this.setState({ todos })
      LocalStorageUtil.setItem(TODO_LIST_KEY, todos)
    },
    // calcCheckedAll: function (todos) {
    //   if (todos) {
    //     const allCount = todos.length
    //     const completedCount = getCompletedCount(todos);
    //     // console.log(allCount, completedCount, !!allCount && allCount === completedCount)
    //     // this.$set('isAllCompleted', !!allCount && allCount === completedCount)
    //     this.setState({ isAllCompleted: !!allCount && allCount === completedCount })
    //   }

    //   this.setState({ isAllCompleted: false })
    //   // this.$set('isAllCompleted', false)
    // },
    createItem: function (text) {
      if (!text.trim()) return
      const newTodo = { id: generateObjectId(), text, completed: !true }
      let todos = cloneDeep(this.todos)
      if (!todos) {
        todos = [newTodo]
      } else {
        todos.unshift(newTodo)
      }

      this.setTodos(todos)
    },
    updateItem: function (todo) {
      const mapFunc = function (item) {
        if (todo && todo.id === item.id) {
          return { id: todo.id, text: todo.text, completed: todo.completed }
        }

        return item
      }
      const todos = updateItems(cloneDeep(this.todos), mapFunc)
      this.setTodos(todos)
    },
    removeItem: function (id) {
      const filterFunc = function (item) {
        return item.id !== id
      }
      const todos = deleteItems(cloneDeep(this.todos), filterFunc)
      this.setTodos(todos)
    },
    clearCompletedItems: function () {
      const filterFunc = function (item) {
        return !item.completed
      }
      const todos = deleteItems(cloneDeep(this.todos), filterFunc)
      this.setTodos(todos)
    },
    filterTodos: function (filter) {
      this.setState({ filterStatus: filter })
      // this.filterStatus = filter
    },
    checkAllTodos: function (checked) {
      const mapFunc = function (item) {
        item.completed = checked
        return item
      }
      const todos = updateItems(cloneDeep(this.todos), mapFunc)
      this.setTodos(todos);
    }
  },
  components: {
    CHeader, TodoItem, CFooter
  },
  created () {
    const todos = LocalStorageUtil.getItem(TODO_LIST_KEY)
    this.setState({ todos })
    // this.$set('todos', todos)
  },
  computed: {
    todoMsgs: function () {
      return this.todos.map(function (item) { return item.id + item.text })
    },
    ...mapGetters({
      filtedTodos: 'filtedTodos'
    }),
    // filtedTodos: function () {
    //   if (this.todos) {
    //     if (this.filterStatus === FILTER_STATUSES.ALL) {
    //       return this.todos
    //     }

    //     return this.todos.filter(function (item) {
    //       return item.completed === (this.filterStatus === FILTER_STATUSES.COMPLETED)
    //     }.bind(this))
    //   }

    //   return []
    // },
    allCount: function () {
      if (this.todos) {
        return this.todos.length
      }

      return 0
    },
    activeCount: function () {
      if (this.todos) {
        return this.todos.filter(function (item) {
          return !item.completed
        }).length
      }

      return 0
    },
    completedCount: function () {
      if (this.todos) {
        return this.todos.length - this.activeCount
      }

      return 0
    },
    isAllCompleted: function () {
      return !!this.allCount && this.allCount === this.completedCount
    },
    ...mapState({
      id: state => state.todoList.id,
      name: state => state.todoList.name,
      filterStatus: state => state.todoList.filterStatus,
      todos: state => state.todoList.todos
    })
  }
  // watch: {
  //   'isAllCompleted': function (newValue) {
  //     const mapFunc = function (item) {
  //       item.completed = newValue
  //       return item
  //     }
  //     const todos = updateItems(mapFunc)
  //     this.setTodos(todos);
  //   }
  // }
}
</script>