<template>
  <input
    type="text"
    name="todoItem"
    class="{{ classNames({ edit: !vIsCreate, 'new-todo': vIsCreate }) }}"
    placeholder="{{ this.placeholder || '' }}"
    v-model="item"
    @keyup.enter="updateItem"
  >
</template>

<script>
import classNames from 'classnames'

export default {
  props: {
    placeholder: String,
    isCreate: Boolean,
    text: String,
    onUpdate: Function
  },
  data () {
    return {
      item: this.text || ''
    }
  },
  computed: {
    vIsCreate: function () {
      return !!this.isCreate
    }
  },
  methods: {
    updateItem: function () {
      this.onUpdate(this.item)
    },
    classNames
  }
}

</script>