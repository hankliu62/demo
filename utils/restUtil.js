var rest = (function(){
  var rest = {};

  // 第三方库的类型，默认为Zepto
  var libraryType;

  // http动词简写
  var methods = ['get', 'post', 'put', 'del'];
  var beforeHandlers = [], afterHandlers = [];

  function isFunction(func) {
    return typeof func === 'function';
  }

  function beforeHandler(params) {
    for (var handler of beforeHandlers) {
      handler(params);
    }
  }

  function afterHandler(params) {
    for (var handler of beforeHandlers) {
      handler(params);
    }
  }

  function sendRequest(config) {
    switch (libraryType) {
      case 'jQuery':
      case 'Zepto':
      default:
        config.contentType = 'application/json';
        config.dataType = 'json';
        Zepto.ajax(config);
    }
  }

  var decorateUrlHandler = function(url) {
    return url;
  }

  rest.addBeforeHandler = function (callback) {
    isFunction(callback) && beforeHandlers.push(callback);
    return rest;
  }

  rest.addAfterHandler = function (callback) {
    isFunction(callback) && afterHandlers.push(callback);
    return rest;
  }

  rest.clearBeforeHandlers = function () {
    beforeHandlers = [];
    return rest;
  }

  rest.clearAfterHandlers = function () {
    afterHandlers = [];
    return rest;
  }

  rest.decorateUrl = function (callback) {
    isFunction(callback) && (decorateUrlHandler = callback);
    return rest;
  }

  rest.setLibraryType = function (type) {
    libraryType = type;
    return rest;
  }

  // 定义http动词对应的方法
  for (var i = 0, length = methods.length; i < length; i++) {
    (function(i){
      var methodName = methods[i];
      rest[methodName] = function(url, date, okCallback, failCallback) {
        // 假设不需要传API接口参数时
        if (typeof date === 'function') {
          failCallback = okCallback;
          okCallback = date;
          date = {};
        }

        // 转换缩写的del -> delete(http动词)
        if (methodName === 'del') {
          methodName = 'delete';
        }

        failCallback = failCallback || function(jqXHR, textStatus, errorThrown) {
          console && console.error(jqXHR, textStatus, errorThrown);
          return;
        };

        beforeHandler(arguments);

        if (methodName !== 'get') {
          data = JSON.stringify(data);
        }

        url = decorateUrlHandler(url);
        if (!url) {
          throw new Error('URL must be specified');
        }

        sendRequest({
          type: methodName,
          url: url,
          data: data,
          success: okCallback,
          error: failCallback,
          complete: afterHandler
        });
        return;
      }
    })(i);
  }

  return rest;
})()