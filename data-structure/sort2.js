// 冒泡排序：将最大的元素沉到末尾
function bubbleSort(array) {
  if (!Array.isArray(array)) {
    throw new Array('argument should be array');
  }

  var len = array.length;

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - i; j++) {
      if (array[j] > array[j + 1]) {
        array[j] = array[j] - array[j + 1];
        array[j + 1] = array[j + 1] + array[j];
        array[j] = array[j + 1] - array[j];
      }
    }
  }
  return array;
}

// 选择排序: 循环选择最小元素的下标，与未排序最前列的位置交换
function chooseSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('arguments should be array')
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
      array[i] = array[i] - array[minIndex];
      array[minIndex] = array[minIndex] + array[i];
      array[i] = array[minIndex] - array[i];
    }
  }

  return array;
}

// 插入排序: 依次使列表中元素与该位置之前的元素比较，如果该位置的元素比之前位置的元素小，交换
function insertSort(array) {
  if (!Array.isArray(array)) {
    throw new Error("arguments should be array");
  }

  var len = array.length;
  for (var i = 1; i < len; i++) {
    var j = i;
    while ((j - 1) >= 0 && array[j - 1] > array[j]) {
      array[j - 1] = array[j - 1] - array[j];
      array[j] = array[j] + array[j - 1];
      array[j - 1] = array[j] - array[j - 1];
      j--;
    }
  }
  return array;
}

// 快速排序：将数组分成三块，中间元素一块，比之小的元素一块，比之大的元素一块，递归合并
function quickSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('arguments should be array');
  }

  var len = array.length;

  if (len <= 1) {
    return array;
  }

  var midIndex = ~~(len / 2);
  var midValue = array.splice(midIndex, 1)[0];
  var previous = [];
  var next = [];
  for (var i = 0; i < len - 1; i++) {
    if (array[i] < midValue) {
      previous.push(array[i]);
    } else {
      next.push(array[i]);
    }
  }

  return quickSort(previous).concat([midValue], quickSort(next));
}

// 归并排序：分而治之的方式，将数组递归拆分成两个小的数组，再按照两个数组的大小来合并(二路归并)
function mergeSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('arguments should be array');
  }

  var len = array.length;
  if (len < 2) {
    return array;
  }
  
  var midIndex = ~~(len / 2);
  var previous = array.slice(0, midIndex);
  var next = array.slice(midIndex);

  return merge(mergeSort(previous), mergeSort(next));
}

function merge(left, right) {
  var sortedArray = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArray.push(left.shift());
    } else {
      sortedArray.push(right.shift());
    }
  }

  while (left.length) {
    sortedArray.push(left.shift());
  }

  while (right.length) {
    sortedArray.push(right.shift());
  }

  return sortedArray;
}

// 二分查找：对于一个已排序(从小到大)的数组，每次取中间值进行查找
function binarySearch(array, found, start, end) {
  if (!Array.isArray(array)) {
    throw new Error('first arguments should be array');
  }

  var startIndex = start || 0;
  var endIndex = end === undefined ? array.length - 1 : end;

  if (startIndex > endIndex) {
    return -1;
  }

  var midIndex = ~~((startIndex + endIndex) / 2);

  if (found === array[midIndex]) {
    return midIndex;
  }

  if (found < array[midIndex]) {
    return binarySearch(array, found, startIndex, midIndex - 1);
  }

  return binarySearch(array, found, midIndex + 1, endIndex);
}