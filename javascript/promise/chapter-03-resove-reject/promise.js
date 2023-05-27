
// 1.创建构造函数
// executor 执行器函数
function Promise (executor) {
  // 添加属性
  this.PromiseState = 'pending'
  this.PromiseResult = null

  // 保存实例对象的this值
  const self = this

  // resolve 函数
  function resolve (value) {
    // 1. 修改对象的状态(promiseState)，promiseState属于实例对象的，并且有起始值
    self.PromiseState = 'fulfilled'
    // 2. 设置对象结果值(promiseResult)
    self.PromiseResult = value
  }

  // reject函数
  function reject (reason) {
    // 1. 修改对象的状态(promiseState)，promiseState属于实例对象的，并且有起始值
    self.PromiseState = 'rejected'
    // 2. 设置对象结果值(promiseResult)
    self.PromiseResult = reason
  }

  // 执行器函数【同步调用】
  executor(resolve, reject) // 需要定义resolve, reject函数
}

// 2.添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {

}