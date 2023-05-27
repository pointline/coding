
// 1.创建构造函数
// executor 执行器函数
function Promise (executor) {
  // resolve 函数
  function resolve (value) {

  }

  // reject函数
  function reject (reason) {

  }

  // 执行器函数【同步调用】
  executor(resolve, reject) // 需要定义resolve, reject函数
}

// 2.添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {

}