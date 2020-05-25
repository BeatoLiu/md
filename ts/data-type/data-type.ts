
// 1.布尔值(boolean)
let isDone: boolean = true
// isDone = 123 // 不可再赋值其它类型的值

// 2.数字
let num: number = 123

// 3.字符串
let str: string = 'hello'

// 4.数组
let arr: number[] = [1, 2, 3] // 声明了元素为number类型，不可有其它类型的元素
let arr1: Array<number> = [1, 2, 3]

// 5.元组 Tuple
let tup: [string, number]
tup = ['hello', 10]

// 6.枚举 如果不给元素设置值，元素下标会从0开始,设置了值则会从该值开始
enum Flag{
    success , // 0
    error = 3, 
    cancle, // 4 
}
let f: Flag = Flag.error
console.log(f)

// 7.任意类型
let x: any = 123
x ='hello' // 可赋值任意类型的值

// 8.定义但未赋值 undefined
let num1: number 
// console.log(num1) // undefined

// 定义多个类型
let num2: number | string
num2=2
console.log(num2) // 2
num2 = 'he'
console.log(num2) // he
// num2 = true // no

// ? 表示可选参数,且可选参数只能放在最后
// gender: string = 'f' 默认参数
function getInfo(name: string, gender: string = 'f', age?: number): string{
    return `${name}---${age ? age : 'secret'}---${gender}`
}

console.log(getInfo('Sam', 'm', 30))