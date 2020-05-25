/**这个对传入的参数作了限制
 * 必须是对象
 * 必须有label属性
 * label属性必需是string类型
 */
function printlabel(labelInfo: {label: string}){
    console.log(labelInfo.label)
}

// printlabel('haha') // error
// printlabel({name: 'James'}) //error
// printlabel({name: 'James',age: 18}) //error
printlabel({label: 'right'})

/**
 * 接口：行为和动作的规范，对指方法进行约束
 * 
 */
// 一、属性接口 ?  则表示可选参数
interface FullName{
    firstName: string
    secondName: string
    midName?: string
}
function printName(name: FullName){
    console.log(name.firstName)
}

/**
 * 1、如果在外部定义一个对象，可以增加其它非接口规定的属性，再作为参数传入方法，但方法里无法使用这多余属性
 * 2、如果直接将对象写在参数里，则不能添加其它属性，只能按接口定义的来
 * 所以只要传入接口怕所定义的属性就好
 */
// 1
let obj = {age:20, firstName: 'Liu', secondName: 'Beato'}
printName(obj)
// 2
// printName({age:20, firstName: 'Liu', secondName: 'Beato'}) // error


// 二、函数类型接口，对方法传入的参数以及返回值进行约束
interface encrypt{
    (key: string, value: string): string
}
const md5: encrypt = function(key, value){
    return key + value
}
md5('name','12')

// 三、可索引接口，规范数组（对象），不常用 
interface UserArr{
    // 下标是number（下标是string,则是对对象进行规范）,元素是string
    [index: number]: string
}
let userarr:UserArr = ['aaa', 'bbb']
console.log(userarr[0])

// 三、类类型接口，对类进行约束，和抽象类有点相似
// 接口里定义的方法，在实现类里都要重写
interface Animal{
    name: string
    eat(str: string): void
}
class Dog implements Animal{
    name: string
    constructor(name: string){
        this.name = name
    }
    eat(str: string): void {
        console.log(this.name + ' eat ' + str)
    }
}

const dog = new Dog('Tom')
dog.eat('rice')