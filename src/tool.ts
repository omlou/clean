import webtools from "@xlou/webtools"
import main from "./main"
const {
  tagReg,
  tagMap,
  clean,
  createOne,
  createAll,
  creatCoputed,
  creatProxy,
  mountArr,
  loadArr,
  showArr,
  beforeunloadArr,
  hideArr,
  unloadArr,
  getUrl,
  getAllQuery,
  getPath
}: any = main

/* 工具方法，直接挂载在 C 方法下 */
export default {
  /* DOM 相关 */
  create: function (node: any) { // 将dom转换为clear对象
    const obj = clean()
    if ((node instanceof NodeList) || (node instanceof Array)) {
      const j = 0
      createAll(obj, j, node)
      return obj
    }
    if (createOne(obj, node, 0)) return obj
  },
  createDOM: function (str: string) { // 将html转换为dom数组
    const res = tagReg.exec(str)
    const tag = res ? res[1] : null
    const parentTag = tag ? ((tagMap as any)[tag] || "div") : "div"
    const contdom = document.createElement(parentTag)
    contdom.innerHTML = str
    return Array.from(contdom.childNodes)
  },
  htmlCir: function (obj: any, callback: Function) { // 循环数组或对象生成html
    let html = ""
    for (let i in obj) {
      html += callback(obj[i], i)
    }
    return html
  },
  str: function (arg: any) { // 在模板字符串中绑定属性和传递参数时处理变量
    if ((typeof arg === "object" || typeof arg === "string") && typeof arg !== null) {
      return JSON.stringify(arg).replace(/"/g, "&quot;")
    }
    return arg
  },
  one: function (target: any, range: any) { // 按css选择器选取一个dom，返回dom对象
    range = range || document
    return range.querySelector(target)
  },
  all: function (target: any, range: any) { // 按css选择器选取多个dom，返回数组
    range = range || document
    return Array.from(range.querySelectorAll(target))
  },
  /* 页面框架部分 */
  page: function ({ data, computed, proxy, methods, create, mount, load, show, beforeunload, hide, unload }: any) {
    // data&methods
    Object.assign(window,data,methods)
    // computed
    creatCoputed(window, computed)
    // proxy
    creatProxy(window, proxy)
    // 生命周期钩子函数
    if (create) create()
    if (mount) mountArr.push(mount)
    if (load) loadArr.push(load)
    if (show) showArr.push(show)
    if (beforeunload) beforeunloadArr.push(beforeunload)
    if (hide) hideArr.push(hide)
    if (unload) unloadArr.push(unload)
  },
  component: function (obj: any) {
    let { name, data, computed, proxy, methods, render, mount } = obj
    if (!name) throw "Component must have a name"
    const compobj = {}
    // 复制
    Object.assign(compobj, data, methods, render, mount)
    // computed
    creatCoputed(compobj, computed)
    // proxy
    creatProxy(compobj, proxy);
    // 挂载
    (window as any)[name] = compobj
    return compobj
  },
  setData: function (obj: any, str: any) { // 设置全局变量
    if (str) {
      const arr = str.split(",")
      for (const item of arr) {
        window[item] = obj[item]
      }
    } else {
      Object.assign(window, obj)
    }
  },
  setProxy: function (obj: any, target: any = window) { // 设置属性的set
    creatProxy(target, obj)
  },
  /* 独立钩子函数 */
  mount: function (callback: Function) {
    mountArr.push(callback)
  },
  pageshow: function (callback: Function) {
    showArr.push(callback)
  },
  pagehide: function (callback: Function) {
    hideArr.push(callback)
  },
  /* 绑定事件的扩展，如：<div class="hello" onclick="C.self(sayHello,'123',this)"> */
  prevent: function (callback: Function, ev: Event, ...arg: any){ // 阻止默认事件
    ev.preventDefault()
    if (callback) callback(...arg)
  },
  stop: function (callback: Function, ev: Event, ...arg: any) { // 阻止事件冒泡
    ev.stopPropagation()
    if (callback) callback(...arg)
  },
  self: function (callback: Function, ev: Event, ...arg: any) { // 只有目标是自身才触发
    const { currentTarget, target } = ev
    if (currentTarget === target) callback(...arg)
  },
  /* 路由 */
  push: function (msg: any) { // 跳转
    window.location.href = msg instanceof Object ? getUrl(msg) : msg
  },
  replace: function (msg: any) { // 替换
    window.location.replace(msg instanceof Object ? getUrl(msg) : msg)
  },
  reload: function () { // 重新加载
    window.location.reload()
  },
  back: function (){ // 返回
    window.history.back()
  },
  forward: function (){ // 下一个页面
    window.history.forward()
  },
  go: function (str: any){ // 跳转历史记录
    window.history.go(str)
  },
  formatInput: function (msg: any) { // 正则限制input输入
    let { el, rules, reg, nopass, pass } = msg
    const doc = window.document
    const domArr = doc.querySelectorAll(el)
    domArr.forEach(item => {
      formatItem(item)
    })
    function formatItem(dom: any) {
      let nowval = dom.value
      dom.addEventListener('input', bindLimit)
      dom.addEventListener('compositionstart', (event: any) => {
        dom.removeEventListener('input', bindLimit)
      })
      dom.addEventListener('compositionend', (event: any)=>{
        bindLimit(event)
        dom.addEventListener('input', bindLimit)
      })
      function bindLimit(ev: any) {
        const inpval = ev.target.value
        let allpass = true
        if (rules) {
          for (let item of rules) {
            regVal(item.reg, item.nopass)
            if (!allpass) break
          }
        }else{
          regVal (reg, nopass)
        }
        if (allpass) {
          const oldvalue = nowval
          nowval = ev.target.value
          if (pass) pass(nowval, oldvalue)
        }
        function regVal(mreg: any, mnopass: any) {
          if (!mreg.test(inpval)) {
            mnopass({ nopassValue: inpval })
            ev.target.value = nowval
            allpass = false
          }
        }
      }
    }
  },
  clearRoute: function () { // 获取路由地址和参数
    const res: any = {}
    const allquery = getAllQuery()
    let params = decodeURIComponent(allquery.clearparams)
    res.params = !(params == 'undefined' || params == '') ? JSON.parse(params) : {}
    delete res['clearparams']
    res.query = allquery
    res.path = getPath()
    return res
  },
  ...webtools
}
