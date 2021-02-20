+ tsc --init 生成配置文件 tsconfig.json 这个文件可配置

+ Terminal -> run task -> ts/tsconfig.json  可实时更新ts代码

+ 数据类型
 - 已经声明类型的变量，不可更改成其它类型
    ```
    let num:number = 123
    let str:string = 'string'
    let flag:boolean = true
    // 数组可以规定元素类型
    let arr:number[] = [1,2,3,4]
    let arr1:Array<string> = ['s', 't', 'r']
    let arr2:any = ['str', 124]
    // 元组，数组的一种，用来存放类型各异的数据
    let tup:[number, string] = [1, 'str']
    // 枚举 如果不给元素设置值，元素下标会从0开始,设置了值则会从该值开始
    enum Flag{
        success = 1,
        error = -1,
        warming, // 0
        info    // 1
    }
    // 任意类型 , 可以用来处理下面的这种类型数据，ts中没有Object类型
    // document.getElementById('box') 返回的是个Object
    var oBox:any = document.getElementById('box')
    // 如果不确定变量的类型，可定义多个类型
    var data:number | null | undefined
    // 无返回值方法
    function a():void{}
    // 方法返回类型为number
    function b():number{return 1}
    // ? 表示可选参数,且可选参数只能放在最后
    // gender: string = 'f' 默认参数
    function getInfo(name: string, gender: string = 'f', age?: number): string{
        return `${name}---${age ? age : 'secret'}---${gender}`
    }


    ```

+ 类
    ```
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
            console.log(name + ' is working who is a ' + this.gender)
        }
    }
    ```


+ ts的编译方式
    - ts-loader 编译的时候可以进行类型检查
    - babel-loader @babel/preset-typescript 不能进行类型检查