// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require('./test-module-2');
const { add, multiply, divide } = require('./test-module-2');
console.log(multiply(2, 5));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();

/**
 * Hello from the module
 * Log this beautiful text
 * Log this beautiful text
 * Log this beautiful text
 *
 * Output ออกมาแบบนี้เพราะว่าไฟล์ test-module-3 รันครั้งเดียว
 * ทำให้มี Hello from the module ครั้งเดียว ส่วน text ที่เหลือ
 * มันไม่เอามาจาก cache
 */
