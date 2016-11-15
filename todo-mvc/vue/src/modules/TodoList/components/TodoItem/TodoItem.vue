<template>
  <li :class="{ completed: todo.completed, editing: isEdit }">
    <template v-if="isEdit">
      <todo-input :text="todo.text" :is-create="false" :on-update="updateItem"></todo-input>
    </template>
    <template v-else>
      <div class="view">
        <input
          type="checkbox"
          name="completedItem"
          class="toggle"
          v-model="todo.completed"
        />
        <label @dbclick="isEdit = !isEdit" v-bind="todo.text"></label>
        <i class="destroy" @click="removeItem"></i>
      </div>
    </template>
  </li>
</template>

<script>
import TodoInput from '../TodoInput/TodoInput'

export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isEdit: false
    }
  },
  components: { TodoInput },
  methods: {
    updateItem: function () {
      this.$emit('update', this.todo)
    },
    removeItem: function () {
      console.log(this.todo.id)
      this.$emit('update', this.todo)
    }
  }
}
</script>