const DirectivesPlugin = {}

DirectivesPlugin.install = function (Vue) {
  Vue.prototype.$myName = 'zhagngsan'

  Vue.directive('focus', {
    bind (el, binding) {
      console.log(el, binding)
    },
    inserted (el, binding) {
      console.log(el)
      el.focus()
    }
  })

  Vue.directive('demo', {
    bind: function (el, binding, vnode) {
      var s = JSON.stringify
      el.innerHTML =
        'name: ' + s(binding.name) + '<br>' +
        'value: ' + s(binding.value) + '<br>' +
        'expression: ' + s(binding.expression) + '<br>' +
        'argument: ' + s(binding.arg) + '<br>' +
        'modifiers: ' + s(binding.modifiers) + '<br>' +
        'vnode keys: ' + Object.keys(vnode).join(', ')
    }
  })
}

export default DirectivesPlugin
