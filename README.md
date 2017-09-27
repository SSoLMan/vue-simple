# vue-simple

> 看了vue的源码，想自己搞一搞，但不想去抄，就自己写了写，很多地方和vue的实现有差异，但是相对来说比较容易理解，代码会根据功能的需要逐步添加

## 1.1功能介绍

``` bash
# 准确的依赖收集
在第一次render的时候通过 get 收集依赖，set的时候notify

# 简单的watch金额computed
initData的时候 收集watch和computed的依赖

# proxy data on instance 
把option.data的数据保存在_data里面，然后通过实例代理读写

# 将要实现的
异步队列（否则会多次渲染）



