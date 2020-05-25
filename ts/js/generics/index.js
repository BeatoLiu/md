"use strict";
// 泛型方法
function getData(value) {
    return value;
}
// getData<string>(123) // error
getData('123');
// 泛型类
var Min = /** @class */ (function () {
    function Min() {
        var _this = this;
        this.list = [];
        this.add = function (value) { _this.list.push(value); };
        this.min = function () {
            var minValue = _this.list[0];
            for (var i = 0; i < _this.list.length; i++) {
                if (minValue > _this.list[i]) {
                    minValue = _this.list[i];
                }
            }
            return minValue;
        };
    }
    return Min;
}());
var m1 = new Min();
m1.add(2);
m1.add(4);
m1.add(111);
console.log(m1.min());
var getData1 = function (value) {
    return value;
};
getData1('11');
var myGetData = getData1;
myGetData('123');
