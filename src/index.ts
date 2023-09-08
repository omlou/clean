
import webtools from "@xlou/webtools"
import ajax from "@xlou/ajax"
import variable from "./variable"
import method, { isElement, setter } from "./method"
import tool from './tool'

/* 工具方法，直接挂载在 C 方法下 */
const tools = {
  /* DOM 相关 */
  create: function (node: any) { // 将 dom 转换为 clean 对象
    const obj = createClean()
    if ((node instanceof NodeList) || (node instanceof Array)) {
      const j = 0
      createAll(obj, j, node)
      return obj
    }
    if (createOne(obj, node, 0)) return obj
  },
  ajax,
  ...tool,
  ...webtools
}

const instance: any = {
  /* 基本方法 */
  push: function (dom: any) { // 添加对象
    createOne(this, dom, this.length)
  },
  concat: function (...arg: any) { // 拼接clear对象或NodeList对象等
    for (let item of arg) {
      const j = this.length
      createAll(this, j, item)
    }
  },
  nth: function (index: number) { // 选取某个索引的元素生成一个clear对象
    const obj = createClean()
    return initOne(obj, () => this[index])
  },
  /* 增删DOM */
  append: function (str: string) { // 向容器里后面追加html
    for (let i in this) {
      tools.createDOM(str).map(item => {
        this[i].appendChild(item)
      })
    }
  },
  prepend: function (str: string) { // 向容器里前面添加html
    for (const i in this) {
      const tar = this[i]
      const first = tar.firstChild
      tools.createDOM(str).map(item => {
        tar.insertBefore(item, first)
      })
    }
  },
  before: function (str: string) { // 向元素前面添加html
    for (let i in this) {
      const tar = this[i]
      const parent = tar.parentNode
      tools.createDOM(str).map(item => {
        parent.insertBefore(item, tar)
      })
    }
  },
  after: function (str: string) { // 向元素后面添加html
    for (let i in this) {
      const tar = this[i]
      const parent = tar.parentNode
      const next = tar.nextSibling
      tools.createDOM(str).map(item => {
        parent.insertBefore(item, next)
      })
    }
  },
  ...method
}

/* Clean 对象的操作相关 */
function setLength(obj: Clean, length: number) { // 设置 clean 对象的长度
  Object.defineProperty(obj, "length", { value: length })
}

function createOne(obj: any, node: any, length: number) { // 添加一个dom元素，有判断
  if (isElement(node)) {
    obj[length] = node
    setLength(obj, length + 1)
    return true
  } else {
    throw "Parameter is not an element"
  }
}

function createAll(obj: any, length: number, nodelist: any) { // 添加多个dom元素，有判断
  for (const i in nodelist) {
    const dom = nodelist[i]
    if (isElement(dom)) {
      obj[length] = dom
      length ++
    } else {
      throw "Parameter items are not all elements"
    }
  }
  setLength(obj, length)
}

function initOne(tar: any, callback: Function) { // 初始化含一个元素的clear对象
  const item = callback()
  if (item) {
    tar[0] = item
    setLength(tar, 1)
  }
  return tar
}

function initAll(tar: any, list: any, callback: Function) { // 初始化含多个元素的clear对象
  let j = 0
  for (const i in list) {
    const item = callback(list[i])
    if (item) {
      tar[j] = item
      j ++
    }
  }
  setLength(tar, j)
  return tar
}

/* DOM 通用方法 */
function switchTask(nodelist: any, type: string) { // 处理两个参数
  if (nodelist.length === 0) throw "Target has no elements"
  const obj = createClean()
  switch (type) {
    case "parent":
      return initOne(obj, () => nodelist[0].parentNode)
    case "child":
      return initAll(obj, Array.from(nodelist[0].children), (item: any) => item)
    case "next":
      return initAll(obj, nodelist, (item: any) => item.nextElementSibling)
    case "prev":
      return initAll(obj, nodelist, (item: any) => item.previousElementSibling)
    case "first":
      return initAll(obj, nodelist, (item: any) => item.children[0])
    case "last":
      return initAll(obj, nodelist, (item: any) => {
        const child = item.children
        return child[child.length - 1]
      })
  }
}

/* Clear 原型 getter */
const getter: any = {
  /* 查寻 DOM */
  parent() { return switchTask(this, "parent") }, // 目标为单元素，获取父元素
  child() { return switchTask(this, "child") }, // 目标为单元素，获取全部子元素
  next() { return switchTask(this, "next") }, // 获取下一个元素
  prev() { return switchTask(this, "prev") }, // 获取上一个元素
  first() { return switchTask(this, "first") }, // 获取子元素里的第一个元素
  last() { return switchTask(this, "last") }, // 获取子元素里的最后一个元素
  /* 工具 */
  toArray() { return Array.from(this) } // 转换为数组
}

/* 创建 Clean 对象相关 */
interface Clean {
  get parent(): Clean
}

class Clean {
  constructor() {
    Object.defineProperty(this, "length", { value: 0, configurable: true })
  }
}

function createClean(): Clean {
  for (let i in getter) { // 挂载原型的getter
    Object.defineProperty(Clean.prototype, i, {
      get: getter[i]
    })
  }
  for (let i in setter) { // 挂载原型的setter
    let item = setter[i]
    Object.defineProperty(Clean.prototype, i, {
      get: item.get,
      set: item.set
    })
  }
  for (const i in instance) { // 挂载原型的方法
    Object.defineProperty(Clean.prototype, i, {
      value: instance[i]
    })
  }
  return new Clean()
}

function C(que: string, range?: Document): Clean {
  range = range || document
  const list = range.querySelectorAll(que)
  const clean = createClean()
  Object.assign(clean, list)
  setLength(clean, list.length)
  return clean
}

/* mount 钩子函数相关 */
function DOMLoaded() {
  variable.isShow = false
  for (const item of variable.mountArr as any) {
    item()
  }
  variable.mountArr = []
}

/* 初始化 Clean */
(function initClear() {
  Object.assign(C, tool)
  if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', DOMLoaded)
  } else {
    DOMLoaded()
  }
  window.addEventListener('load', () => {
    for (const item of variable.loadArr as any) {
      item()
    }
  })
  window.addEventListener('pageshow', () => {
    if (variable.isShow) {
      for (const item of variable.showArr as any) {
        item()
      }
    }
  })
  window.addEventListener('beforeunload', () => {
    for (const item of variable.beforeunloadArr as any) {
      item()
    }
  })
  window.addEventListener('pagehide', () => {
    variable.isShow = true
    for (const item of variable.hideArr as any) {
      item()
    }
  })
  window.addEventListener('unload', () => {
    for (const item of variable.unloadArr as any) {
      item()
    }
  })
})()

export default C