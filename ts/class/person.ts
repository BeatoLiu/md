// 定义类
class Person{
    name: string
    constructor(n: string){
        this.name = n
    }
    run():void{
        console.log(this.name)
    }
    getName():string{
        return this.name
    }
    setName(name:string):void{
        this.name = name
    }
}

// let p = new Person('James')
// p.run()


// 继承
class Web extends Person{
    age: number
    static gender:string = 'M'
    constructor(name: string, age: number){
        super(name)
        this.age = age
    }
    study():void{
        console.log(this.name + 'is studying')
    }
    // 静态方法， 不能调用其它属性，只能调用静态属性
    static work(name:string):void{
        console.log(name + 'is working who is a ' + this.gender)
    }
}

let w = new Web('Tom',20)
w.run()

// 属性修饰
// public 
// protected
// private

// 静态方法只能调用静态属性