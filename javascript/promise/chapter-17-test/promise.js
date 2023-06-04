// 1.创建Promise构造函数
function Promise(executor) {
  // 下面的resolve和reject调用时，this执行是window，需要保存引用
  const self = this

  this.PromiseState  = 'pending' // 初始化状态
  this.PromiseResult = undefined // 初始化值
  this.callbacks = []

  // 3. 定义resolve函数
  function resolve(value) {
    // 限制状态修改吗，状态只能被修改一次
    if (self.PromiseState !== 'pending') return

    // 修改PromiseState
    self.PromiseState = 'fulfilled'
    // 设置PromiseResult值
    self.PromiseResult = value
    // 调用then指定的回调函数
    self.callbacks.forEach((callback) => {
      // 异步执行resolve回调函数
      setTimeout(() => {
        callback && callback.onFulfilled(value)
      })
    })
  }

  // 4.定义reject函数
  function reject(reason) {
    // 限制状态修改吗，状态只能被修改一次
    if (self.PromiseState !== 'pending') return

    // 修改PromiseState
    self.PromiseState = 'rejected'
    // 设置PromiseResult值
    self.PromiseResult = reason
    // 调用then指定的回调函数
    self.callbacks.forEach((callback) => {
      // 异步执行reject回调函数
      setTimeout(() => {
        callback && callback.onRejected(value)
      })
    })
  }

  // 捕获在executor抛出异常的情况
  try {
    // 2. executor是一个形参，同步调用函数。需要提供两个实参resolve和reject函数传入
    executor(resolve, reject)
  } catch (error) {
    // 修改Promise状态为失败
    reject(error)
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  const self = this

  // 处理then的resolve回调不是必传的情况
  if (typeof onFulfilled !== 'function') {
    onFulfilled = value => value
  }

  // 处理then的reject回调函数不是必传的情况
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }

  return new Promise((resolve, reject) => {
    const callbackFn = (type) => {
      // 获取执行结果，决定then返回Promise的状态
      try {
        const result = type(self.PromiseResult)
        if (result instanceof Promise) {
          result.then(v => {
            // 返回结果值，Promise状态为fulfilled
            resolve(v)
          }, r => {
            // 返回错误，Promise状态为rejected
            reject(r)
          })
        } else {
          // 返回的非Promise，直接拿到结果返回，Promise状态为fulfilled
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }

    // 同步情况处理
    if (this.PromiseState === 'fulfilled') {
      callbackFn(onFulfilled)
    }

    // 同步情况处理
    if (this.PromiseState === 'rejected') {
      // 获取执行结果，决定then返回Promise的状态
      callbackFn(onRejected)
    }

    // 异步改变状态处理，异步是先指定then回调函数，然后再修改状态，这是状态是pending
    if (this.PromiseState === 'pending') {
      // 保存回调函数
      this.callbacks.push({
        onFulfilled: () => {
          // 异步情况处理，
          callbackFn(onFulfilled)
        },
        onRejected: () => {
          callbackFn(onRejected)
        }
      })
    }
  })
}

// 添加catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

// 添加静态resolve方法
Promise.resolve = function (value) {
  // 需要返回Promise对象
  return new Promise((resolve, reject) => {
    // 判断传入的是否是Promise
    if (value instanceof Promise) {
      value.then((v) => {
        resolve(v)
      }, r => {
        reject(r)
      })
    } else {
      // 传入的是非Promise类型，直接修改状态为fulfilled
      resolve(value)
    }
  })
}

// 添加静态reject方法
Promise.reject = function (reason) {
  return new Promise((undefined, reject) => {
    reject(reason)
  })
}

// 添加静态all方法
Promise.all = function(promises) {
  // 返回一个promise对象，promiseState是一个Promise数组
  return new Promise((resolve, reject) => {
    // 声明一个计数变量
    let count = 0
    // 保存每个promise的返回值
    const arr = []

    // 循环出入的promise数组
    for (let i = 0; i < promises.length; i++) {
      // 执行每一个promise
      promises[i].then(v => {
        // 得知已经成功，统计数量+1
        count++
        // 为保证与传入的Promise前后一致，赋值时按下标赋值
        arr[i] = v

        // 统计数量与传入的promises数量一致时返回
        if (count === promises.length) {
          resolve(arr)
        }
      }, r => {
        // 如果有一个promise报错，就整个返回这个promise的返回值
        reject(r)
      })
    }
  })
}

// 添加静态race方法
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v => {
        // 最先返回的【成功】的promise觉得race的返回，值为这个promise的返回结果
        resolve(v)
      }, r => {
        // 最先返回的【失败】的promise觉得race的返回，值为这个promise的返回结果
        reject(r)
      })
    }
  })
}