# vue-simple

> 借鉴vue实现的简易的数据响应式框架

## 1.1功能介绍

``` bash
# 准确的依赖收集
在第一次render的时候通过 get 收集依赖，set的时候回调

# 简单的watch金额computed
initData的时候 收集watch和computed的依赖

# proxy data on instance 
把option.data的数据保存在_data里面，然后通过实例代理读写

# 将要实现的
异步队列（否则会多次渲染）



