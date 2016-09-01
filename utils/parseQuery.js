var client = (function() {
  var parseQuery = function(url) {
    var queryString = url ? url.split('?')[1] : location.search.slice(1);
    var queryMap = {};
    if (queryString) {
      queryString = queryString.replace(/#[\S\s]+/, '');

      var params = queryString.split('&');

      for (var i = 0, length = params.length; i < length; i ++) {
        var paramItemHash = params[i].split('=');

        // 考虑到这样的参数：list[]=thing1&list[]=thing2
        var paramNum;
        var paramKey = decodeURIComponent(paramItemHash[0]);
        paramKey = paramKey.replace(/\[\d*\]/, function(num) {
          paramNum = num.slice(1, -1);
          paramNum = paramNum && parseInt(paramNum, 10);
          return '';
        });
        // 设置参数值（如果为空则设置为true）
        var paramValue = typeof paramItemHash[1] === 'undefined' ? true : decodeURIComponent(paramItemHash[1]);

        if (queryMap[paramKey]) {
          if (typeof queryMap[paramKey] === 'string') {
            queryMap[paramKey] = [queryMap[paramKey]];
          }

          if (typeof paramNum === 'number') {
            queryMap[paramKey][paramNum] = paramValue;
          } else {
            queryMap[paramKey].push(paramValue);
          }
        } else {
          queryMap[paramKey] = paramValue;
        }

      }
    }

    return queryMap;
  }

  return {
    parseQuery: parseQuery,
    queryMap: parseQuery()
  }
})();