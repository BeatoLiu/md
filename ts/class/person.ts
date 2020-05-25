// 定义类
class Person{
    name: string
    constructor(n: string){
        this.name = n
    }
    run():void{
        console.log(this.name)
    }
}

// let p = new Person('James')
// p.run()


// 继承
class Web extends Person{
    age: number
    constructor(name: string, age: number){
        super(name)
        this.age = age
    }
}

let w = new Web('Tom',20)
w.run()

// 属性修饰
// public 
// protected
// private

// 静态方法只能调用静态属性