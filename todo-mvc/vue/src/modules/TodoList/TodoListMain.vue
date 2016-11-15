<template>
  <v-header v-on:create="create"></v-header>
  <div class="todo-list-main">
    {{ name }}
  </div>
  <input v-model="name" :id="id" type="text" v-focus />
</template>
<script>
import VHeader from './components/Header/Header'
import TodoItem from './components/TodoItem/TodoItem'
import LocalStorageUtil from '../../utils/LocalStorageUtil'
import { generateObjectId } from '../../utils/StringUtil'
import { TODO_LIST_KEY } from '../../constants/Constants'

export default {
  data () {
    return {
      name: 'main.html',
      id: 'name'
    }
  },
  methods: {
    onEnter: function (e) {
      console.log(this, e, 'vvvvvvvvvvvvvvvv')
    },
    create: function (text) {
      if (!text.trim()) return
      const newTodo = { id: generateObjectId(), text, completed: !true }
      let todos = LocalStorageUtil.getItem(TODO_LIST_KEY)
      if (!todos) {
        todos = [newTodo]
      } else {
        todos.push(newTodo)
      }

      LocalStorageUtil.setItem(TODO_LIST_KEY, todos)
    }
  },
  components: {
    VHeader, TodoItem
  },
  mounted () {
    console.log(this.$myName)
  }
}
</script>