const DirectivesPlugin = {}

DirectivesPlugin.install = function (Vue) {
  Vue.prototype.$myName = 'zhagngsan'

  Vue.directive('focus', {
    bind () {
      // console.log(this.el)
    },
    update (value, oldValue) {
      // console.log(this.el)
      this.el.focus()
    }
  })

  Vue.directive('demo', {
    bind: function (value) {
      var s = JSON.stringify
      this.el.innerHTML =
        'name: ' + s(this.name) + '<br>' +
        'value: ' + s(this.value) + '<br>' +
        'expression: ' + s(this.expression) + '<br>' +
        'argument: ' + s(this.arg) + '<br>' +
        'modifiers: ' + s(this.modifiers) + '<br>' +
        'vnode keys: ' + Object.keys(this.vnode).join(', ')
    }
  })
}

export default DirectivesPlugin
