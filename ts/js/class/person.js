"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 定义类
var Person = /** @class */ (function () {
    function Person(n) {
        this.name = n;
    }
    Person.prototype.run = function () {
        console.log(this.name);
    };
    return Person;
}());
// let p = new Person('James')
// p.run()
// 继承
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name, age) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        return _this;
    }
    return Web;
}(Person));
var w = new Web('Tom', 20);
w.run();
// 属性修饰
// public 
// protected
// private
// 静态方法只能调用静态属性
