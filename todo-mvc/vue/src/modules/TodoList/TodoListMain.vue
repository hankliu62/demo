<template>
  <v-header></v-header>
  <div class="todo-list-main">
    {{ name }}
  </div>
  <input v-model="name" :id="id" type="text" @keyup.enter="onEnter($event)" />
</template>
<script>
import VHeader from './components/Header/Header'

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
    }
  },
  components: {
    VHeader
  }
}
</script>
