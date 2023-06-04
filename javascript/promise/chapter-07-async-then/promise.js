
// 1.创建构造函数
// executor 执行器函数
function Promise (executor) {
  // 添加属性
  this.PromiseState = 'pending'
  this.PromiseResult = null
  // 声明属性
  this.callback = {}

  // 保存实例对象的this值
  const self = this

  // resolve 函数
  function resolve (value) {
    // 判断状态
    if (self.PromiseState !== 'pending') return

    // 1. 修改对象的状态(promiseState)，promiseState属于实例对象的，并且有起始值
    self.PromiseState = 'fulfilled'
    // 2. 设置对象结果值(promiseResult)
    self.PromiseResult = value
    // 调用成功的回调函数
    if (self.callback.onResolved) {
      self.callback.onResolved(value)
    }
  }

  // reject函数
  function reject (reason) {
    // 判断状态
    if (self.PromiseState !== 'pending') return

    // 1. 修改对象的状态(promiseState)，promiseState属于实例对象的，并且有起始值
    self.PromiseState = 'rejected'
    // 2. 设置对象结果值(promiseResult)
    self.PromiseResult = reason
    // 调用失败的回调函数
    if (self.callback.onRejected) {
      self.callback.onRejected(reason)
    }
  }

  // 捕获抛出的错误
  try {
    // 执行器函数【同步调用】
    executor(resolve, reject) // 需要定义resolve, reject函数
  } catch (error) {
    // 修改 promise 对象状态为【失败】
    reject(error)
  }
}

// 2.添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
  // 调用回调函数
  if (this.PromiseState === 'fulfilled'){
    onResolved(this.PromiseResult)
  }

  if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult)
  }

  // 处理异步的情况
  // 判断 pending 状态
  if (this.PromiseState === 'pending') {
    // 保存回调函数
    this.callback = {
      onResolved,
      onRejected
    }
  }
}