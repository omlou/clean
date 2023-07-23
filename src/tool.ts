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
  /* 缓存 */
  getStore: function (str: string) {
    return JSON.parse(localStorage.getItem(str) as string)
  },
  setStore: function (str: string, data: any) {
    const datajson = JSON.stringify(data)
    localStorage.setItem(str, datajson)
  },
  delStore: function (str: string) {
    localStorage.removeItem(str)
  },
  clearStore: function () {
    localStorage.clear()
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
  /* 网络连接 */
  getDOC: function (url: string, callback: Function) { // 读取文件
    const xhr = new XMLHttpRequest()
    xhr.onload= e => {
      callback(xhr.response)
    }
    xhr.open('GET', url, true)
    xhr.send()
  },
  getJSON: function (url: string, callback: Function){ // 读取json文件
    this.getDOC(url, (res: any) => {
      res ? callback(JSON.parse(res)) : callback("")
    })
  },
  formSubmit: function (obj: any) { // 模拟form表单提交
    const form = document.createElement("form")
    const data = obj.data
    Reflect.deleteProperty(obj, "data")
    for (const i in obj) {
      obj[i] && (form[i] = obj[i])
    }
    form.style.display = "none"
    for (const i in data) {
      const input = document.createElement("input")
      input.setAttribute("type", "hidden")
      input.setAttribute("name", i)
      input.value = data[i]
      form.appendChild(input)
    }
    document.body.appendChild(form)
    form.submit()
  },
  /* 工具 */
  deepCopy: function (obj: any) { // 深拷贝 var AObj=C.deepCopy(BObj)
    const a:any = obj.constructor.name === "Array" ? [] : {}
    for (const prop in obj) {
      if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        a[prop] = (obj[prop].constructor.name==="Array") ? [] : {}
        a[prop] = this.deepCopy(obj[prop])
      } else {
        a[prop] = obj[prop]
      }
    }
    return a
  },
  filterObject: function (obj: any, str: string, bol: boolean){ // 过滤对象
    const res: any = {}
    if (str == undefined) return Object.assign(res, obj)
    const arr = str.split(",")
    if (bol === undefined) bol = true
    if (bol) {
      for (let item of arr) {
        obj[item] && (res[item] = obj[item])
      }
    } else {
      Object.assign(res, obj)
      for (let item of arr) {
        Reflect.deleteProperty(res, item)
      }
    }
    return res
  },
  toFixed: function (num: any, s: any) { // 保留几位小数
    if (num === undefined) { // 第一个参数为undefined
      return undefined
    }
    let numn = Number(num)
    if (isNaN(numn)) { // 第一个参数不是数字
      throw "argument for C.toFixed error"
    }
    if (numn > Math.pow(10,21)) { // 第一个参数太大
      return String(numn)
    }
    let sn = Number(s)
    if (s === undefined || sn == 0) { // 没有第二个参数或者第一个数可以被Number()转化成0
      return String(Math.round(numn))
    }
    if (isNaN(sn)) { // 第二个参数不是个数字
      throw "The argument of C.toFixed must be a number"
    }
    if (sn > 20 || sn < 0) { // 第二个参数超出范围
      throw "The second argument of C.toFixed must be between 0 and 20"
    }
    let nums: string | number = String(numn)
    let numarr = nums.split(".")
    if (numarr.length < 2) {
      nums += "."
      for (let i=0; i<sn; i++) {
        nums += "0"
      }
      return nums
    }
    let int = numarr[0]
    let dec = numarr[1]
    if (dec.length == sn) {
      return nums
    }
    if (dec.length < sn) {
      for (let i=0; i<sn-dec.length; i++) {
        nums += "0"
      }
      return nums
    }
    nums = int + "." + dec.slice(0,sn)
    let last = dec.slice(sn, sn+1)
    if (parseInt(last, 10) >= 5) {
      let x = Math.pow(10, sn)
      nums = ((parseFloat(nums) * x) + 1) / x
      nums = nums.toFixed(sn)
    }
    return nums
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
  }
}
