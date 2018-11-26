function insertSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('argument should be array');
  }

  var len = array.length;

  for (var i = 1; i < len; i++) {
    var temp = array[i];
    var j = i - 1;
    while (j >= 0 && temp < array[j]) {
      array[j + 1] = array[j];
      array[j] = temp;
      j--;
    }
  }

  return array;
}

function quickSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('argument should be array');
  }

  var len = array.length;

  if (len <= 1) {
    return array;
  }

  var midIndex = Math.floor(len / 2);
  var middle = array.splice(midIndex, 1)[0];
  var previous = [];
  var next = [];
  for (var i = 0; i < len - 1; i++) {
    if (array[i] < middle) {
      previous.push(array[i]);
    } else {
      next.push(array[i]);
    }
  }

  return quickSort(previous).concat([middle], quickSort(next)); 
}

function bubbleSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('argument should be array');
  }

  var len = array.length;

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - i; j++) {
      if (array[j + 1] < array[j]) {
        var temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
      }
    }
  }

  return array;
}

function chooseSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('argument should be array');
  }

  var len = array.length;

  for (var i = 0; i < len; i++) {
    var minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      var temp = array[minIndex];
      array[minIndex] = array[i];
      array[i] = temp;   
    }
  }

  return array;
}

var arr = [];
for(var n = 0; n < 1000000; n++){
    arr.push(Math.round(Math.random() * 1000));
}

var text = function (fn, param) {
  var start, end;
  start = new Date().getTime();
  insertSort(arr);
  end = new Date().getTime();
  console.log("排序完成，耗时" + (end - start) + "毫秒");
}

text();