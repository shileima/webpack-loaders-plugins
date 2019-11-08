let a = 10;
console.log(a);
console.log('loaders');

// -! 表示不用 pre + normal 来处理
// ! 表示不用normal 来处理
// !! 只用inline 来处理
let str = require('inline-loader!./b')
