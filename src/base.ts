import { Clean, initOne, createOne, createAll } from "./main"
import tool from "./tool"

// const { createOne, createAll, clean, initOne } = main
const { createDOM } = tool

const base = {
  /* 基本方法 */
  map: function (callback: Function) { // 遍历clear对象，类似数组的map
    for (let i in this) {
      callback(this[i], i)
    }
  },
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
    const obj = new Clean()
    return initOne(obj, () => this[index])
  },
  /* 增删DOM */
  render: function (str: string) { // 向容器里渲染html
    for (let i in this) {
      this[i].innerHTML = str
    }
  },
  append: function (str: string) { // 向容器里后面追加html
    for (let i in this) {
      createDOM(str).map(item => {
        this[i].appendChild(item)
      })
    }
  },
  prepend: function (str: string) { // 向容器里前面添加html
    for (const i in this) {
      const tar = this[i]
      const first = tar.firstChild
      createDOM(str).map(item => {
        tar.insertBefore(item, first)
      })
    }
  },
  before: function (str: string) { // 向元素前面添加html
    for (let i in this) {
      const tar = this[i]
      const parent = tar.parentNode
      createDOM(str).map(item => {
        parent.insertBefore(item, tar)
      })
    }
  },
  after: function (str: string) { // 向元素后面添加html
    for (let i in this) {
      const tar = this[i]
      const parent = tar.parentNode
      const next = tar.nextSibling
      createDOM(str).map(item => {
        parent.insertBefore(item, next)
      })
    }
  },
  remove: function () { // 移除元素
    for (let i in this) {
      const tar = this[i]
      tar.parentNode.removeChild(tar)
    }
  },
  /* 修改dom */
  show: function (type: any) { // 显示元素
    type = type || ""
    for (const i in this) {
      this[i].style.display = type
    }
  },
  hide: function () { // 隐藏元素
    for (const i in this) {
      this[i].style.display = "none"
    }
  },
  getAttr(attr: string) { // 目标为单元素，获取属性
    return this[0].getAttribute(attr)
  },
  setAttr: function (attr: string, value: string) { // 设置属性
    for (const i in this) {
      this[i].setAttribute(attr, value)
    }
  },
  addClass: function (name: string) { // 添加class
    for (const i in this) {
      this[i].classList.add(name)
    }
  },
  removeClass: function (name: string) { // 移除class
    for (const i in this) {
      this[i].classList.remove(name)
    }
  },
  hasClass: function (name: string) { // 目标为单元素
    return this[0].classList.contains(name)
  },
  /* 绑定事件监听 */
  bind: function (type: any, callback: Function, option: any) {
    for (const i in this) {
      this[i].addEventListener(type, callback, option)
    }
  },
  unbind: function (type: any, callback: any, option: any) {
    for (const i in this) {
      this[i].removeEventListener(type, callback, option)
    }
  }
}

export default base