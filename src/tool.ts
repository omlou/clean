import webtools from "@xlou/webtools"
import variable, { tagReg, TagMap } from "./variable"

function getUrl(msg: any) { // 将url和参数字符串凭借在一起
  if (typeof msg === "string") return msg
  if (!msg.url) return ""
  msg.url = msg.url || window.location.href
  const oparams = msg.params ? encodeURIComponent(JSON.stringify(msg.params)) : ""
  let oquery = webtools.queryString(msg.query)
  if (oparams) {
    oquery = oquery ? (oquery + "&__CLEANDATA__=" + oparams) : ("__CLEANDATA__=" + oparams)
  }
  let ourl = msg.url.indexOf('?') !== -1 ? '&' + oquery : '?' + oquery
  return msg.url + ourl
}

export default {
  /* DOM 相关 */
  createDOM: function (str: string): Array<Element> { // 将html转换为dom数组
    const res = tagReg.exec(str)
    const tag = res ? res[1] : null
    const parentTag = tag ? ((TagMap as any)[tag] || "div") : "div"
    const contdom = document.createElement(parentTag)
    contdom.innerHTML = str
    return Array.from(contdom.childNodes)
  },
  htmlCir: function (obj: any, callback: (item: any, i: any) => string): string { // 循环数组或对象生成html
    let html = ""
    for (let i in obj) {
      html += callback(obj[i], i)
    }
    return html
  },
  str: function (arg: any): string { // 在模板字符串中绑定属性和传递参数时处理变量
    if ((typeof arg === "object" || typeof arg === "string") && typeof arg !== null) {
      return JSON.stringify(arg).replace(/"/g, "&quot;")
    }
    return arg
  },
  one: function (target: any, range: any): Element { // 按css选择器选取一个dom，返回dom对象
    range = range || document
    return range.querySelector(target)
  },
  all: function (target: any, range: any): Array<Element> { // 按css选择器选取多个dom，返回数组
    range = range || document
    return Array.from(range.querySelectorAll(target))
  },

  /* 变量相关 */
  setState: function (obj: any, str?: string) { // 设置全局变量
    if (str) {
      const arr = str.split(",")
      for (const item of arr) {
        window[item as any] = obj[item]
      }
    } else {
      Object.assign(window, obj)
    }
  },
  watch(
    conta: any,
    arg: {
      [prop: string | number | symbol]: {
        handler: (nv: any, ov: any) => any,
        immediate?: boolean
      }
    }
  ): void { // 创建 watch
    for (const i in arg) {
      const data = conta[i]
      const item = arg[i]
      Object.defineProperty(conta, i, {
        get() {
          return data.value
        },
        set(value) {
          const ov = data.value
          data.value = value
          item.handler(value, ov)
          return true
        }
      })
      if (item.immediate) item.handler(data.value, null)
    }
  },

  /* 独立钩子函数 */
  mounted: function (callback: Function): void {
    (variable as any).mountArr.push(callback)
  },
  loaded: function (callback: Function): void {
    (variable as any).loadArr.push(callback)
  },
  beforeUnload: function (callback: Function): void {
    (variable as any).beforeunloadArr.push(callback)
  },
  unload: function (callback: Function): void {
    (variable as any).unloadArr.push(callback)
  },
  pageShow: function (callback: Function): void {
    (variable as any).showArr.push(callback)
  },
  pageHide: function (callback: Function): void {
    (variable as any).hideArr.push(callback)
  },

  /* 绑定事件的扩展，如：<div class="hello" onclick="C.self(sayHello,'123',this)"> */
  prevent: function (callback: Function, ev: Event, ...arg: any): void { // 阻止默认事件
    ev.preventDefault()
    if (callback) callback(...arg)
  },
  stop: function (callback: Function, ev: Event, ...arg: any): void { // 阻止事件冒泡
    ev.stopPropagation()
    if (callback) callback(...arg)
  },
  self: function (callback: Function, ev: Event, ...arg: any): void { // 只有目标是自身才触发
    const { currentTarget, target } = ev
    if (currentTarget === target) callback(...arg)
  },

  /* 路由 */
  push: function (msg: any): void { // 跳转
    window.location.href = getUrl(msg)
  },
  replace: function (msg: any): void { // 替换
    window.location.replace(getUrl(msg))
  },
  reload: function (): void { // 重新加载
    window.location.reload()
  },
  back: function (): void { // 返回
    window.history.back()
  },
  forward: function (): void { // 下一个页面
    window.history.forward()
  },
  go: function (index: number): void { // 跳转历史记录
    window.history.go(index)
  },
  route: function (): { params: any, query: any } { // 获取路由参数
    const res: any = {}
    const allQuery: any = webtools.getQuery()
    let params = decodeURIComponent(allQuery["__CLEANDATA__"])
    res.params = !(params === 'undefined' || params === '') ? JSON.parse(params) : {}
    delete res['__CLEANDATA__']
    res.query = allQuery
    return res
  },

  /* Form 表单相关 */
  formatInput: function (msg: any): void { // 正则限制input输入
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
  }
}