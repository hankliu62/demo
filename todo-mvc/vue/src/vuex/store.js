import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from '../plugins/Logger'
import todoList from './modules/TodoList'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

console.log(todoList)
export default new Vuex.Store({
  modules: {
    todoList
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})