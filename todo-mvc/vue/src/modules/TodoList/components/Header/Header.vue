<template>
  <header class="header">
    <h1>todos</h1>
    <todo-input placeholder="What needs to be done?" is-create ></todo-input>
  </header>
</template>

<script>
  import TodoInput from '../TodoInput/TodoInput'
  import LocalStorageUtil from 'LocalStorageUtil'

  export default {
    components: { TodoInput }
    methods: {
      addItem: function (text) {

      }
    }
  }
</script>