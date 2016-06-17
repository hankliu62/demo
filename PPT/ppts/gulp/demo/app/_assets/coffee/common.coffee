# Add common function and logic here
((w) ->
  rest = {}
  rest.methods = [
    'get'
    'post'
    'put'
    'del'
  ]
  rest.offline = true

  rest.before = (params) ->
    return

  rest.after = (params) ->
    return

  len = rest.methods.length
  i = 0
  while i < len
    do ->
      methodName = rest.methods[i]
      rest[methodName] = (url, data, okCallback, failCallback) ->
        if typeof data is 'function'
          failCallback = okCallback
          okCallback = data
          data = {}
        methodName is 'del' and (methodName = 'delete')
        if not failCallback

          failCallback = (jqXHR, textStatus, errorThrown) ->
            console and console.error jqXHR, textStatus, errorThrown
            return

        rest.before arguments
        timeoffset = new Date().getTimezoneOffset() / 60
        url = "/api#{url}?tmoffset=#{timeoffset}"
        if accessToken = $('#accessToken').val()
          url += "&accesstoken=#{accessToken}"
        data = JSON.stringify data if methodName isnt 'get'

        Zepto.ajax
          contentType: 'application/json'
          dataType: 'json'
          type: methodName
          url: url
          data: data
          success: okCallback
          error: failCallback
          complete: rest.after
        return

      return
    i++

  # Util function
  parseQuery = ->
    arr = location.search.slice(1).split('&')
    queryMap = {}
    for item in arr
      parts = item.split('=')
      queryMap[parts[0]] = parts[1]
    queryMap

  stringifyQuery = (queryMap) ->
    querySearchStr = ''
    if queryMap and Object.prototype.toString.apply(queryMap).slice(8, -1) is 'Object'
      querySearchStr = '?'
      for key, value of queryMap
        querySearchStr += "#{key}=#{value}&" if queryMap.hasOwnProperty(key)
      querySearchStr = querySearchStr.replace /\&$/, ''
    querySearchStr = '' if querySearchStr is '?'
    querySearchStr


  debounce = (func, wait, immediate) ->
    timeout = args = context = timestamp = result = undefined
    later = ->
      last = new Date().getTime() - timestamp
      if last < wait and last >= 0
        timeout = setTimeout(later, wait - last)
      else
        timeout = null
        unless immediate
          result = func.apply(context, args)
          context = args = null  unless timeout
      return
    ->
      context = this
      args = arguments
      timestamp = new Date().getTime()
      callNow = immediate and not timeout
      timeout = setTimeout(later, wait)  unless timeout
      if callNow
        result = func.apply(context, args)
        context = args = null
      result

  throttle = (func, delay, immediate) ->
    currentTime = diff = context = args = undefined
    lastExecuteTime = 0
    timer = null
    execute = ->
      lastExecuteTime = currentTime
      func.apply context, args
    ->
      currentTime = new Date().getTime()
      context = this
      args = arguments
      diff = currentTime - lastExecuteTime - delay
      clearTimeout timer
      if diff >= 0
        execute()
      else if immediate
        timer = setTimeout execute, -diff

  dateFormat = (date, fmt) ->
    o =
      'M+': date.getMonth() + 1
      'd+': date.getDate()
      'h+': date.getHours()
      'm+': date.getMinutes()
      's+': date.getSeconds()
      'q+': Math.floor((date.getMonth() + 3) / 3)
      'S': date.getMilliseconds()
    if /(y+)/.test(fmt)
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for k of o
      if new RegExp('(' + k + ')').test(fmt)
        fmt = fmt.replace(RegExp.$1, if RegExp.$1.length is 1 then o[k] else ('00' + o[k]).substr(('' + o[k]).length))
    fmt

  storage =
    setItem: (key, value) ->
      valueJson = JSON.stringify(value)
      valueJson = Base64.encode valueJson
      key = Base64.encode key
      window.localStorage.setItem key, valueJson
      return
    getItem: (key) ->
      key = Base64.encode key
      itemJson = window.localStorage.getItem(key)
      itemJson = Base64.decode itemJson if itemJson
      item = JSON.parse(itemJson)
      item
    removeItem: (key) ->
      key = Base64.encode key
      window.localStorage.removeItem key
      return
    updateItem: (key, value) ->
      key = Base64.encode key
      window.localStorage.removeItem key
      valueJson = JSON.stringify(value)
      valueJson = Base64.encode valueJson
      window.localStorage.setItem key, valueJson
      return

  detect = ->
    userAgent = navigator.userAgent or navigator.vendor
    os = null
    if userAgent.match(/iPad/i) or userAgent.match(/iPhone/i) or userAgent.match(/iPod/i)
      os = 'iOS'
    else
      os = 'Android'

    isIOS: -> os is 'iOS'
    isAndroid: -> os is 'Android'

  loadMore = (callback) ->
    $(window).scroll debounce( ->
      if $(document).height() - $(this).scrollTop() - $(this).height() <= 2
        callback()
    )

  checkTelNum = (tel) ->
    telRegs = ['^0?1[0-9]{10}$', '^09[0-9]{8}$', '^\\d{8}$', '^853[0-9]{8}$']
    tip = '手机号码格式不正确'
    if tel
      for reg in telRegs
        re = new RegExp(reg)
        if re.test(tel)
          tip = ''
          break
    else
      tip = '手机号码不能为空'
    tip

  hideShare = (wx, options) ->
    if wx
      wx.config({
        debug: false
        appId: options.appId
        timestamp: options.timestamp
        nonceStr: options.nonceStr
        signature: options.signature
        jsApiList: [
          'hideOptionMenu'
        ]
      })

      wx.ready ->
        wx.hideOptionMenu()

  util =
    queryMap: parseQuery()
    stringifyQuery: stringifyQuery
    debounce: debounce
    throttle: throttle
    dateFormat: dateFormat
    storage: storage
    loadMore: loadMore
    checkTelNum: checkTelNum
    detect: detect
    hideShare: hideShare

  w.rest = rest
  w.util = util
  return
) window
