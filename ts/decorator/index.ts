//1、类装饰器(无参)，params即为所装饰的类,类装饰器可以动态为类扩展属性和方法
function logClass(params: any){
    console.log(params)
    params.prototype.url = '动态扩展的属性'
    params.prototype.run = function(){
        console.log('I am a function')
    }
}

@logClass
class HttpClient{
    constructor(){}
}

let http:any = new HttpClient()
console.log(http.url) // 动态扩展的属性
http.run()

// 2、传参的装饰器
function logClass1(params: string){
    return function(target: any){
        console.log(params) // https://www.baidu.com
        console.log(target) // 当前类
        target.prototype.url = params 
    }
}

@logClass1('https://www.baidu.com')
class HttpClient1{

}
let http1:any = new HttpClient1()
console.log(http1.url)

// 3、类装饰器还可以重写类的方法和属性
function logClass2(target: any){
    return class extends target{
        url:any = 'https://www.baidu.com'
        getData = () =>{
            
            console.log(this.url + '------')
        }
    }
}

@logClass2
class HttpClient2{
    url:string
    constructor(url:string){
        this.url = url
    }
    getData=()=>{
        console.log(this.url)
    }
}
let http2:any = new HttpClient2('hahah')
http2.getData()