// 泛型方法
function getData<T>(value: T): T{
    return value
}
// getData<string>(123) // error
getData<string>('123')

// 泛型类
class Min<T>{
    public list:T[] = []
    add = (value: T) => {this.list.push(value)}
    min = (): T => {
        let minValue = this.list[0]
        for(let i = 0; i < this.list.length; i++){
            if (minValue > this.list[i]){
                minValue = this.list[i]
            }
        }
        return minValue
    }
}

let m1 = new Min<number>()
m1.add(2)
m1.add(4)
m1.add(111)
console.log(m1.min())

// 泛型接口
// 第1种形式
interface ConfigFn{
    <T>(value: T): T
}
let getData1:ConfigFn = function(value){
    return value
}
getData1<string>('11')

// 第2种形式
interface ConfigFn1<T>{
    (value: T): T
}
let myGetData:ConfigFn1<string> = getData1 
myGetData('123')

