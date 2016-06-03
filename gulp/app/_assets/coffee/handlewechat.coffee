((win) ->
  wx = win.wx
  # Used to fix the WeixinJSBridge error
  WeixinJSBridge = win.WeixinJSBridge if win.WeixinJSBridge
  bindEvent = win.document.addEventListener
  bindEvent("WeixinJSBridgeReady", ->
    WeixinJSBridge = win.WeixinJSBridge if win.WeixinJSBridge
    return
  , false) if bindEvent

  if wx
    wx.config({
      appId: options.appId
      timestamp: options.timestamp
      nonceStr: options.nonceStr
      signature: options.signature
      jsApiList: [
        'hideOptionMenu',
        'showMenuItems'
      ]
    })

    wx.ready( ->
      if page is '404'
        wx.showMenuItems({
          menuList: [
            'menuItem:profile',
            'menuItem:addContact'
          ]
        })
      else
        wx.hideOptionMenu()
      return
    )
)(window)
