<template>
  <header class="header">
    <h1>todos</h1>
    <todo-input placeholder="What needs to be done?" is-create :on-update="addItem" v-focus></todo-input>
  </header>
</template>

<script>
import TodoInput from '../TodoInput/TodoInput'

export default {
  components: { TodoInput },
  methods: {
    addItem: function (text) {
      this.$emit('create', text)
    }
  }
}
</script>