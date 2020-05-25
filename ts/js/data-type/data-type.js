"use strict";
// 1.布尔值(boolean)
var isDone = true;
// isDone = 123 // 不可再赋值其它类型的值
// 2.数字
var num = 123;
// 3.字符串
var str = 'hello';
// 4.数组
var arr = [1, 2, 3]; // 声明了元素为number类型，不可有其它类型的元素
var arr1 = [1, 2, 3];
// 5.元组 Tuple
var tup;
tup = ['hello', 10];
// 6.枚举 如果不给元素设置值，元素下标会从0开始,设置了值则会从该值开始
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 0] = "success";
    Flag[Flag["error"] = 3] = "error";
    Flag[Flag["cancle"] = 4] = "cancle";
})(Flag || (Flag = {}));
var f = Flag.error;
console.log(f);
// 7.任意类型
var x = 123;
x = 'hello'; // 可赋值任意类型的值
// 8.定义但未赋值 undefined
var num1;
// console.log(num1) // undefined
// 定义多个类型
var num2;
num2 = 2;
console.log(num2); // 2
num2 = 'he';
console.log(num2); // he
// num2 = true // no
// ? 表示可选参数,且可选参数只能放在最后
// gender: string = 'f' 默认参数
function getInfo(name, gender, age) {
    if (gender === void 0) { gender = 'f'; }
    return name + "---" + (age ? age : 'secret') + "---" + gender;
}
console.log(getInfo('Sam', 'm', 30));
