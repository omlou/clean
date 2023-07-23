import tool from "./tool"
import ajax from "./ajax"
import base from "./base"

const { createDOM } = tool
const { getQueryString } = ajax

const main = {
  /* 生成表格 DOM 相关 */
  tagReg: /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
  tagMap: {
    thead: "table",
    tbody: "table",
    col: "colgroup",
    tr: "tbody",
    td: "tr"
  },
  /* 钩子函数相关 */
  isShow: true,
  mountArr: [],
  loadArr: [],
  showArr: [],
  beforeunloadArr: [],
  hideArr: [],
  unloadArr: [],
  /* 初始化一个 Clean 对象 */
  clean: function () {
    const obj = Object.create(new (main.Clean as any)())
    Object.defineProperty(obj, "length", { value: 0, configurable: true })
  },
  /* 将匹配css选择器的dom转换成clear对象 */
  C: function (que: string, range: any) {
    range = range || document
    const list = range.querySelectorAll(que)
    const obj = this.clear
    Object.assign(obj, list)
    setLength(obj, list.length)
    return obj
  },
  /* 原型构造函数 */
  Clean: function () {
    for(let i in getter){ // 挂载原型的getter
      Object.defineProperty(this,i,{
        get: getter[i]
      })
    }
    for(let i in setter){ // 挂载原型的setter
      let item=setter[i]
      Object.defineProperty(this,i,{
        get: item.get,
        set: item.set
      })
    }
    for(const i in base){ // 挂载原型的方法
      Object.defineProperty(this, i, {
        value: (base as any)[i]
      })
    }
  },
  /* 框架通用方法 */
  creatCoputed: function (conta: any, arg: any) { // 创建computed
    for (const i in arg) {
      Object.defineProperty(conta, i, {
        get: arg[i]
      })
    }
  },
  creatProxy: function (conta: any, arg: any) { // 创建proxy
    for (const i in arg) {
      const item = arg[i]
      Object.defineProperty(conta, i, {
        get() {
          return item.value
        },
        set(value) {
          const ov = item.value
          item.value = value
          item.watch(value, ov)
          return true
        }
      })
      if (item.immediate) item.watch(item.value, null)
    }
  },
  /* 处理路径参数 */
  getUrl: function (msg: any) { // 将url和参数字符串凭借在一起
    if (!msg.url) return ""
    const oparams = msg.params ? encodeURIComponent(JSON.stringify(msg.params)) : ""
    let oquery = getQueryString(msg.query)
    if (oparams) {
      oquery ? (oquery += "&clearparams=" + oparams) : (oquery = "clearparams=" + oparams)
    }
    const ourl = msg.url.indexOf('?') !== -1 ? '&' + oquery : '?' + oquery
    return msg.url + ourl
  },
  getAllQuery: function () { // 将地址参数转换为对象
    const qurl = (window.location.href.match(/\?([\S\s]*)/) || [])[1]
    if (!qurl) return {}
    const qlarr = qurl.split("&")
    const qlobj: any = {}
    for (const item of qlarr) {
      const itemarr = item.split("=")
      qlobj[decodeURIComponent(itemarr[0])] = decodeURIComponent(itemarr[1])
    }
    return qlobj
  },
  getPath: function () { // 获取到当前的路由
    const { pathname } = window.location
    const starti = pathname.lastIndexOf("/") + 1
    const endi = pathname.indexOf(".", starti)
    const path = (endi !== -1) ? pathname.slice(starti, endi) : pathname.slice(starti)
    return path || "index"
  },
  /* 将原始 DOM 转换为 Clean 对象相关 */
  isElement: function (dom: any) { // 判断是不是一个 DOM 对象
    return (dom.nodeType === 1) && (typeof dom.nodeName === 'string') ? true : false
  },
  setLength: function (obj: any, length: number) { // 设置clear对象的长度
    Object.defineProperty(obj, "length", { value: length })
  },
  createOne: function (obj: any, node: any, length: number) { // 添加一个dom元素，有判断
    if (isElement(node)) {
      obj[length] = node
      setLength(obj, length + 1)
      return true
    } else {
      throw "Parameter is not an element"
    }
  },
  createAll: function (obj: any, length: number, nodelist: any) { // 添加多个dom元素，有判断
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
  },
  initOne: function (tar: any, callback: Function) { // 初始化含一个元素的clear对象
    const item = callback()
    if (item) {
      tar[0] = item
      setLength(tar, 1)
    }
    return tar
  },
  initAll: function (tar: any, list: any, callback: Function) { // 初始化含多个元素的clear对象
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
}

export default main

/* Clear 原型 getter */
export const getter: any = {
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

/* Clear 原型 setter，包含 getter */
export const setter: any = { // 读取目标都是单元素
  /* 修改 DOM */
  style: { // 获取和修改样式
    get() {
      return this[0].style
    },
    set(value: any) {
      return switchType(this, value, "style")
    }
  },
  value: { // 获取和修改表单元素的value
    get() {
      return this[0].value
    },
    set(value: any) {
      return switchType(this, value, "value")
    }
  },
  checked: { // 设置type="checkbox"或type="radio"input的选中状态
    get() {
      return this[0].checked
    },
    set(value: any) {
      return switchType(this, value, "checked")
    }
  },
  text: { // 获取和修改元素的innerText
    get() {
      return this[0].innerText
    },
    set(value: any) {
      return switchType(this, value, "text")
    }
  }
}






/* DOM 通用方法 */
function switchType(nodelist: any, value: any, type: string) { // 处理三个参数
  if (nodelist.length === 0) throw "Target has no elements"
  switch (type) {
    case "style": {
      if (typeof value === "string") {
        for (const i in nodelist) {
          nodelist[i].style.cssText = value
        }
      } else {
        for (const i in nodelist) {
          for (const j in value) {
            nodelist[i].style[j] = value[j]
          }
        }
      }
      break
    }
    case "value": {
      for (const i in nodelist) {
        nodelist[i].value = value
      }
      break
    }
    case "checked": {
      for (const i in nodelist) {
        nodelist[i].checked = value
      }
      break
    }
    case "text": {
      for (const i in nodelist) {
        nodelist[i].innerText = value
      }
      break
    }
  }
}

function switchTask(nodelist: any, type: string) { // 处理两个参数
  if (nodelist.length === 0) throw "Target has no elements"
  const obj = clean()
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





/* mount 钩子函数相关 */
function listenDOMLoad() {
  document.removeEventListener('DOMContentLoaded', listenDOMLoad)
  isShow = false
  for (let item of mountArr) { item() }
  mountArr = []
}

/* 初始化 Clean */
function initClear() {
  document.addEventListener('DOMContentLoaded', listenDOMLoad.bind(this))
  window.addEventListener('load', () => {
    for (let item of loadArr) { item() }
  })
  window.addEventListener('pageshow', () => {
    if (isShow) for (let item of showArr) { item() }
  })
  window.addEventListener('beforeunload', () => {
    for (let item of beforeunloadArr) { item() }
  })
  window.addEventListener('pagehide', () => {
    isShow = true
    for (let item of hideArr) { item() }
  })
  window.addEventListener('unload', () => {
    for (let item of unloadArr) { item() }
  })
  window.C = C.bind(this) // 挂载C
  // 为C挂载工具方法
  Object.assign(window.C, ctool)
  window.C.ajax = chttp.ajax
  window.C.getQueryString = chttp.getQueryString
}