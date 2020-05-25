"use strict";
/**这个对传入的参数作了限制
 * 必须是对象
 * 必须有label属性
 * label属性必需是string类型
 */
function printlabel(labelInfo) {
    console.log(labelInfo.label);
}
// printlabel('haha') // error
// printlabel({name: 'James'}) //error
// printlabel({name: 'James',age: 18}) //error
printlabel({ label: 'right' });
function printName(name) {
    console.log(name.firstName);
}
/**
 * 1、如果在外部定义一个对象，可以增加其它非接口规定的属性，再作为参数传入方法，但方法里无法使用这多余属性
 * 2、如果直接将对象写在参数里，则不能添加其它属性，只能按接口定义的来
 * 所以只要传入接口怕所定义的属性就好
 */
// 1
var obj = { age: 20, firstName: 'Liu', secondName: 'Beato' };
printName(obj);
var md5 = function (key, value) {
    return key + value;
};
md5('name', '12');
var userarr = ['aaa', 'bbb'];
console.log(userarr[0]);
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.eat = function (str) {
        console.log(this.name + ' eat ' + str);
    };
    return Dog;
}());
var dog = new Dog('Tom');
dog.eat('rice');
