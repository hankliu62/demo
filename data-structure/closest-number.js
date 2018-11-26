// 问题：最接近的数字(找出一个比N大且最接近的数，这个数的每位之和与N相同，用代码实现之。)
// 思路：倒数非0, 再倒数非9的前一位数量+1，新数字后面几位之和等于之前后面几位数字之和再减1，越靠后的数字应尽可能大
module.exports = function (number) {
  if (!/^\d+$/.test(number)) {
    throw new Error('arguments should be number type');
  }

  const digits = number.toString().split('').reverse();
  let minusIndex = 0;
  while (digits[minusIndex] === '0') {
    minusIndex++;
  }
  while (digits[minusIndex] === '9') {
    minusIndex++;
  }
  minusIndex = minusIndex || 1;
  digits[minusIndex] = parseInt(digits[minusIndex] || 0, 10) + 1;
  let sinceMinusIndexSum = digits.slice(0, minusIndex).reduce(function (total, digit) {
    return total + parseInt(digit, 10);
  }, 0) - 1;

  let index = 0;
  while (index < minusIndex) {
    if (sinceMinusIndexSum > 9) {
      digits[index] = 9;
    } else {
      digits[index] = sinceMinusIndexSum;
    }

    sinceMinusIndexSum -= digits[index];
    index++;
  }

  return digits.reverse().join('');
}