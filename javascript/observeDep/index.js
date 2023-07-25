class Dep {
  constructor() {
    // 订阅数据，不重复
    this.subscribers = new Set()
  }

  addSubscriber(subscriber) {
    this.subscribers.add(subscriber)
  }

  removeSubscriber(subscriber) {
    this.subscribers.delete(subscriber)
  }

  notify() {
    this.subscribers.forEach(subscriber => {
      subscriber && subscriber()
    })
  }
}

const reactive = (obj) => {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集：保存访问该属性的调用函数
        if (Dep.target && !dep.subscribers.has(Dep.target)) {
          dep.addSubscriber(Dep.target)
        }

        return value
      },
      set(newValue) {
        if (newValue !== value) {
          // 更新value
          value = newValue
          // 触发所有依赖相关的函数
          dep.notify()
        }
      }
    })
  })

  return obj
}

const data = reactive({
  name: 'peter',
  age: 18
})

const watch = (callback) => {
  // 先将要需要执行的函数保存到Dep上
  Dep.target = callback
  // 执行一次回调函数
  callback && callback()
  // 将保存在Dep函数上函数清除
  Dep.target = null
}

watch(() => {
  // 这里的回调函数非常关键，这里data.name访问了name，所以会触发getter，就会将该函数保存到Dep中，这样就收集了依赖
  console.log('属性变化', data.name)
})

watch(() => {
  // 这里的回调函数非常关键，这里data.name访问了name，所以会触发getter，就会将该函数保存到Dep中，这样就收集了依赖
  console.log('属性变化', data.age)
})

data.name = 'jack'
data.age = 20