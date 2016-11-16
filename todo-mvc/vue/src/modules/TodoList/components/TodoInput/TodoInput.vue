<template>
  <input
    type="text"
    name="todoItem"
    :class="{ edit: !vIsCreate, 'new-todo': vIsCreate }"
    placeholder="{{ this.placeholder || '' }}"
    v-model="item"
    @keyup.enter="updateItem"
    @blur="onBlurInput"
    autoFocus="true"
  >
</template>

<script>
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
      if (this.isCreate) {
        this.item = ''
      }
    },
    onBlurInput: function () {
      if (!this.isCreate) {
        this.updateItem()
      }
    }
  },
  directives: {
    focus: {
      update: function () {
        if (this.el) {
          this.el.focus()
        }
      }
    }
  }
}
</script>