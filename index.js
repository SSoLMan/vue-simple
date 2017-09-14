//  默认钩子
 const _lifecycleHooks= [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
  ]
 
 class V {
    constructor(option={}){
        this.option = option //配置项
        this.create()   //创建组件（创建期间要进行 生命周期和数据初始化）
        this.mount() //添加组件，生成dom （这个周期，需要确定el绑定的元素，解析template或者jsx语法，生成虚拟dom，）
    }

    // 创建dom元素的方法
    createElement(tagName,option,cont){ 
        var domEl = document.createElement(tagName)
        option.props&&Object.keys(option.props).forEach(ele=>{
           domEl[ele] = option.props[ele]
        });
        var child = null
        if(Object.prototype.toString.call(cont)==="[object Array]"){
            cont.forEach(e=>{
                if(typeof e === "object"){
                    domEl.appendChild(e)
                }else{
                    var oSpan = document.createElement("span")
                    oSpan.innerHTML = e
                    domEl.appendChild(oSpan)
                }
            })
        }else{
            domEl.innerHTML = cont;
        }
        return domEl
    }
    // 初始化声明周期函数
    initLifecycle(){
        let option = this.option
        console.log("初始钩子 init lifecycle hooks")
        _lifecycleHooks.forEach(hookName=>{
            this[hookName] = option[hookName] || function(){}
        })
        //组装 render函数
        this.render = ()=>{
            this.el.innerHTML = ""
            this.el.appendChild(option.render.call(this,this.createElement))
        }
    }
    initData(){
        console.log("初始化 方法和响应数据")
        //初始化响应数据（重要）
        let option = this.option
        Object.keys(option.data).forEach(ele=>{
            //拷贝 option的data到  组件实例（vue实现的方法更复杂）
            defineReactive(this,ele,option.data[ele],this.update.bind(this))//(obj,key,val,cb)
            
        });
        // 拷贝 option的 方法到 组件实例
        Object.keys(option.methods).forEach(ele=>{
            this[ele] = option.methods[ele]
        })
    }
    create(){//create
        this.initLifecycle()
        this.beforeCreate()
        this.initData() //INIT
        this.created()
    }
    mount(){//第一次render 
        this.el =document.getElementById(this.option.el.substr(1)) //没有判断el绑定的是class或id
        this.beforeMount()
        this.render()
        this.mounted()
    }
    update(){
        //更新时调用
        this.beforeUpdate()
        this.render()
        this.updated()
    }
    destroy(){
        //销毁时调用
        this.beforeDestroy()
        this.el.innerHTML = "" //destroy
        this.destroyed()
    }
    
}
//响应数据设置的方法
const defineReactive=(obj,key,val,cb)=>{
    Object.defineProperty(obj,key,{
        get:function(){
            console.log(val)
            return val
        },
        set:function(newVal){
            console.log(val,newVal)
            //设置数据的时候，如果修改前后的值没有发生变化就返回 
            if(newVal==val){
                return 
            }
            val = newVal
            cb() //当数据变动时调用回调 跟新组件（cd其实就是组件的update方法）
        }
    })
}


