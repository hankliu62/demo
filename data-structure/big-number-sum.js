// 大数相加：将大数按位分割，倒置，根据位置相加，再合并
module.exports = function (...bigNumbers) {
  let maxLength = 0;
  const bigSplitDigits = bigNumbers.map(function (number) {
    const splitDigits = number.toString().split('').reverse();
    maxLength = Math.max(maxLength, splitDigits.length)
    return splitDigits;
  });

  const sumDigits = [];
  let carryNumber = 0;
  for (let i = 0; i < maxLength + 1; i++) {
    let sumDigit = bigSplitDigits.reduce(function(total, digits) {
      return total + (+(digits[i] || 0));
    }, carryNumber);

    const singleNumber = sumDigit % 10;
    carryNumber = ~~(sumDigit / 10);

    if (i < maxLength || singleNumber || carryNumber) {
      sumDigits.push(singleNumber);
    }
  }

  return sumDigits.reverse().join('');
}