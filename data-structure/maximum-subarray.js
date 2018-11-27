// 问题：求子数组的最大和
// 描述：输入一个整形数组，数组里有正数也有负数。数组中连续的一个或多个整数组成一个子数组，每个子数组都有一个和。求所有子数组的和的最大值。要求时间复杂度为O(n)。
// 思路；循环数组，sum[i]是前面i个元素之和，第i + 1个元素可能存在两种情况，第一种：与前面i个元素相加，第二种：从该元素开始重新计算
module.exports = function (array) {
  if (!Array.isArray(array)) {
    throw new Error('arguments should be array');
  }

  let max = array[0];
  let sum = 0;
  const len = array.length;
  for (let i = 0; i < len - 1; i ++) {
    if (sum >= 0) {
      sum += array[i];
    } else {
      sum = array[i];
    }

    if (sum > max) {
      max = sum;
    }
  }

  return max;
}