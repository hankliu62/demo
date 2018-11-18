var readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line',function(line) {
  var tokens = line.split(' ');
  var n = tokens[0];
  var m = tokens[1];

  if (!/^\d+$/.test(n)) {
    throw new Error('arguments n should be number');
  }

  if (!/^\d+$/.test(m)) {
    throw new Error('arguments m should be number');
  }

  var n = parseInt(n);
  var m = parseInt(m);

  if (n < m) {
    throw new Error('arguments m should be less than arguments n');
  }

  if (n < 10) {
    return m - 1;
  }

  var tempArray = []
  for (var i = 1; i <= n; i ++) {
    tempArray.push(i);
  }

  console.log(tempArray.sort()[m - 1]);
});

rl.on('close',function(){
  process.exit()
});
