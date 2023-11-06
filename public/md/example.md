## 列表渲染

HTML

``` html
<div class="index"></div>
```

JS

``` javascript
let pageList = [
  { name: "HTML", bgcolor: "#e54d26" },
  { name: "JavaScript", bgcolor: "#ecb12c" },
  { name: "CSS", bgcolor: "#1774b7" }
]

C(".index").render(`
  <div>
    <div class="title">前端</div>
    <div class="content">${
      C.htmlCir(pageList, (item, i) => {
        return `
          <div class="item" style="background-color:${item.bgcolor};">
            <div class="name">${item.name}</div>
          </div>
        `
      })
    }</div>
  </div>
`)
```

## 条件渲染

HTML

``` html
<div class="index"></div>
```

JS

``` javascript
let pageList = [
  { name: "HTML" },
  { name: "JavaScript", showBtn: true },
  { name: "CSS" }
]

function showName(name) {
  console.log(name)
}

C(".index").render(`
  <div>
    <div class="title">前端</div>
    <div class="content">${
      C.htmlCir(pageList, (item, i) => {
        return `
          <div class="item">
            <span class="name">${item.name}</span>
            ${item.showBtn ? `
              <button class="btn" onclick="showName(${C.str(item.name)})">click</button>
            ` : ""}
          </div>
        `
      })
    }</div>
  </div>
`)
```

## 数据绑定

HTML

``` html
<div class="top">
  <input class="numinput" type="text" oninput="proxy.num = this.value">
  <span class="numcont">value: <span class="num"></span></span>
</div>
<div class="btncont">
  <button class="minus" onclick="proxy.num --">-</button>
  <button class="add" onclick="proxy.num ++">+</button>
</div>
```

JS

``` javascript
const proxy = C.proxy({ num: "0" }, {
  num: {
    handler(nv, ov) {
      C(".numinput").value = nv
      C(".num").text = nv
    },
    immediate: true
  }
})
```

## 输入限制

HTML

``` html
<input class="numinput" type="text">
```

JS

``` javascript
C.formatInput({
  el: ".numinput",
  reg: /^-?((([1-9]\d*)|0)(\.\d{0,2})?)?$/,
  nopass: () => {
    console.log("格式不符合要求")
  },
  pass: (nv, ov) => {}
})
```

## 路由传参

HTML

``` html
<button onclick="go()">go</button>
```

JS

``` javascript
function go() {
  C.push({
    url: "./example.html#go",
    query: {
      id: "example"
    },
    params: {
      arr: [1, 2, 3],
      obj: { name: "go" }
    }
  })
  console.log(C.route())
}
```

## 发送 AJAX

HTML

``` html
<button onclick="send()">send</button>
```

JS

``` javascript
function send() {
  C.ajax({
    url: "http://127.0.0.1:3000/post",
    method: "post",
    params: {
      id: 1
    },
    data: {
      name: "Tom"
    }
  })
  .then(res => {
    console.log("response", res.response)
  })
}
```
