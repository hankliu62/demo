<template>
  <input
    type="text"
    name="todoItem"
    :class="{ edit: !vIsCreate, 'new-todo': vIsCreate }"
    placeholder="{{ this.placeholder || '' }}"
    v-model="item"
    @keyup.enter="updateItem"
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
    }
  },
  directives: {
    focus: {
      bind: function (el, binding, vnode) {
        console.log(el, binding, vnode);
      },
      inserted: function (el) {
        console.log(el)
        if (this.isCreate) {
          el.focus()
        }
      }
    }
  }
}
</script>