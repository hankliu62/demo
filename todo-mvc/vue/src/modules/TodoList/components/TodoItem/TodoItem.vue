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
          :style="{ cursor: 'pointer' }"
        />
        <label @dblclick="beforeEditItem">{{ todo.text }}</label>
        <button class="destroy" @click="removeItem" :style="{ cursor: 'pointer' }"></button>
      </div>
    </template>
  </li>
</template>

<script>
import TodoInput from '../TodoInput/TodoInput'

const isChildOf = function (child, parent) {
  if (child && parent) {
    if (child.parentNode === parent) {
      return true
    }

    return isChildOf(child.parentNode, parent)
  }

  return false
}

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
    updateItem: function (text) {
      this.todo.text = text
      this.$emit('update', this.todo)
      this.isEdit = false
    },
    removeItem: function () {
      this.$emit('remove', this.todo.id)
    },
    beforeEditItem: function (event) {
      this.isEdit = !this.isEdit
    }
  },
  watch: {
    'todo.completed': function (newValue, oldValue) {
      this.todo.completed = newValue
      this.$emit('update', this.todo)
    },
    'isEdit': function (newValue) {
      if (newValue) {
        const clickHanlder = function (event) {
          const isClickOutside = !isChildOf(event.target, this.$el)
          if (isClickOutside) {
            this.isEdit = !this.isEdit
          }
        }.bind(this)
        document.addEventListener('click', clickHanlder)
        this.clickHanlder = clickHanlder
      } else {
        document.removeEventListener('click', this.clickHanlder)
        this.clickHanlder = null
      }
    }
  }
}
</script>