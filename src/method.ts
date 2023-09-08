/* Clean 对象的操作相关 */
export function isElement(dom: any) { // 判断是不是一个 DOM 对象
  return dom instanceof HTMLElement
}

/* Clean 原型 setter，包含 getter */
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

export default {
  /* DOM 相关 */
  map: function (callback: Function) { // 遍历clear对象，类似数组的map
    for (let i in this) {
      callback(this[i], i)
    }
  },
  render: function (str: string) { // 向容器里渲染html
    for (let i in this) {
      this[i].innerHTML = str
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