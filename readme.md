## 语言

* [English](https://github.com/omlou/clean#readme)
* [简体中文](https://github.com/omlou/clean/blob/master/public/md/readme-zh.md)
* [日本語](https://github.com/omlou/clean/blob/master/public/md/readme-ja.md)
* [한국어](https://github.com/omlou/clean/blob/master/public/md/readme-ko.md)
* [Français](https://github.com/omlou/clean/blob/master/public/md/readme-fr.md)

## 简介

* Clean 是一个可以让开发更方便前端工具包

## 用法

### Script 标签引入

```html
<script src="https://unpkg.com/@xlou/clean@1.0.0/dist/umd/clean.min.js"></script>
<!-- 建议下载并在本地使用 -->
<script>
  /* 包含此JS文件后，C 对象将在全局可用 */
  C("#app").render(`<div>Hello, World!</div>`)
</script>
```

### 在 Node 项目中引入

安装

``` bash
npm i @xlou/clean
```

使用

```javascript
import C from '@xlou/clean'

C("#app").render(`<div>Hello, World!</div>`)
```

## API

### 方法 C

将匹配 CSS 选择器的 DOM 转换成 Clean 实例对象

使用：

```javascript
C("#app").render(`<div>Hello, World!</div>`)
C("#app", C.one(".mydiv")) // 在 .mydiv 中查找

/* 返回的 Clean 对象类似于数组，如要转换为 DOM 对象根据索引获取即可 */
C("#app")[0]

/* 使用 C 下的方法 */
C.mounted(function () {
  /* ... */
})
C.ajax(/* ... */)
```

### Getter (获取元素、转换为数组)

返回结果为 Clean 对象

使用方法以获取父元素为例：

```javascript
C("#app").parent
```

#### parent

获取目标的父元素

该属性如果目标 Clean 对象是多个 DOM 元素，以第一个元素为准

```typescript
get parent(): Clean;
```

#### child

获取目标的全部子元素

该属性如果目标 Clean 对象是多个 DOM 元素，以第一个元素为准

```typescript
get child(): Clean;
```

#### next

获取目标的下一个元素

目标 Clean 对象可以为多个 DOM 元素

```typescript
get next(): Clean;
```

#### prev

获取上一个元素

目标 Clean 对象可以为多个 DOM 元素

```typescript
get prev(): Clean;
```

#### first

获取子元素里的第一个元素

目标 Clean 对象可以为多个 DOM 元素

```typescript
get first(): Clean;
```

#### last

获取子元素里的最后一个元素

目标 Clean 对象可以为多个 DOM 元素

```typescript
get last(): Clean;
```

#### array

返回已转换为数组的 Clean 对象

```typescript
get array(): Array<Element>;
```

### Getter & Setter (获取属性、修改属性)

使用方法以获取行内样式和设置行内样式为例

```javascript
/* 获取 */
let style = C("#app").style

/* 设置 */
C("#app").style="font-size: 14px;"
```

#### style

获取和设置元素的样式

获取时如果目标 Clean 对象是多个 DOM 元素，以第一个元素为准

值可以为 CSS 字符串，如 "display:none;" 也可以是对象 { display: none, fontSize: "20px" }

```typescript
get style(): string;
set style(value: any);
```

#### value

获取和设置表单元素的值

获取时如果目标 Clean 对象是多个 DOM 元素，以第一个元素为准

```typescript
get value(): any;
set value(value: any);
```

#### checked

获取和设置单选框或复选框的选中状态

获取时如果目标 Clean 对象是多个 DOM 元素，以第一个元素为准

```typescript
get checked(): boolean | undefined;
set checked(value: boolean);
```

#### text

获取和修改元素的 innerText

获取时如果目标 Clean 对象是多个 DOM 元素，以第一个元素为准

```typescript
get text(): string;
set text(value: any);
```

### Clean 实例对象方法

#### nth

根据索引获取 Clean 对象中的元素，返回值仍为 Clean 对象

```javascript
C("#app").nth(0)
```

说明：

```typescript
nth: (index: number) => Clean;
```

#### map

遍历 Clean 对象，并返回一个相同长度的数组对象

```javascript
C("#app").map((item,i)=>{
  /* ... */
  return i
}) // [0]
```

说明：

```typescript
map: (callback: (item: Clean, i: string) => any) => Array<any>;
```

#### push

向 Clean 对象中添加 DOM 元素

```javascript
C("#app").push(C.one(".myapp"))
```

说明：

```typescript
push: (dom: any) => void;
```

#### concat

拼接 Clean 对象或 NodeList 对象等

```javascript
C("#app").concat(C(".mydiv"), C.all(".hello"))
```

说明：

```typescript
concat: (...arg: any) => void;
```

#### render

向容器里渲染 HTML

```typescript
render: (str: string) => void;
```

说明：

```javascript
C("#app").render(`<div>Hello, World!</div>`)
```

目标支持多个 DOM 元素的 Clean 对象

参数为 HTML 字符串

其他操作 DOM 元素的方法用法同 render

#### append

向容器的最后面追加 HTML

```typescript
append: (str: string) => void;
```

#### prepend

向容器的最前面添加 HTML

```typescript
prepend: (str: string) => void;
```

#### before

向元素前面添加 HTML

```typescript
before: (str: string) => void;
```

#### after

向元素后面添加 HTML

```typescript
after: (str: string) => void;
```

#### remove

移除目标元素

```typescript
remove: () => void;
```

#### show

显示目标元素

```javascript
C("#app").show()
C("#app").show("block") // type 可选，为 display 的类型，默认为 ""
```

说明：

```typescript
show: (type?: string | undefined) => void;
```

#### hide

隐藏元素，设置样式 display:none;

说明：

```typescript
hide: () => void;
```

#### getAttr

获取元素的属性值

该方法如果目标 Clean 对象包含多个 DOM 元素，以第一个元素为准

```javascript
C("#app").getAttr("id")
```

说明：

```typescript
getAttr: (attr: string) => string | null; // attr 为属性名
```

#### setAttr

设置元素的属性值

```javascript
C("#app").setAttr("data", 1)
```

说明：

```typescript
setAttr: (attr: string, value: any) => void; // attr 为属性名, value 为属性值
```

#### addClass

给元素添加 class

说明：

```typescript
addClass: (name: string) => void; // name 为需要添加的 class 名
```

#### removeClass

移除指定的 class

说明：

```typescript
removeClass: (name: string) => void;
```

#### hasClass

判断元素是否有指定的 class ，返回布尔类型

该方法如果目标 Clean 对象包含多个 DOM 元素，以第一个元素为准

```javascript
C("#app").hasClass("hello")
```

说明：

```typescript
hasClass: (name: string) => boolean;
```

#### bind

绑定事件监听

```javascript
C("#app").bind("click", function(){
  console.log("click")
}, false)
```

说明：

```typescript
bind: (type: string, callback: Function, option: any) => void;
/* 
  type 事件类型
  callback 绑定的事件方法
  option 可选 绑定事件的参数
*/
```

#### unbind

移除事件监听

```javascript
C("#app").unbind("click", sayHello)
```

说明：

```typescript
unbind: (type: string, callback: Function, option: any) => void;
/* 
  type 事件类型
  callback 要移除事件方法，必须是一个变量，不能是匿名函数
*/
```

### C 对象下的方法

#### create

将 DOM 转换为 Clean 对象

```javascript
C.create(C.createDOM(`<div>Hello, World!</div>`))
```

说明：

```typescript
create: (node: any) => Clean | undefined;
/* node 可以为单个 DOM 元素，也可以时 NodeList 对象或者 DOM 对象的数组 */
```

#### createDOM

将 HTML 字符串转换为包含 DOM 对象的数组

```javascript
C.createDOM(`<div>Hello, World!</div>`)
```

说明：

```typescript
createDOM: (str: string) => Element[];
```

#### htmlCir

循环数组或对象生成 HTML 字符串

```javascript
let arr = [
  { name: "tom", content: "hello" },
  { name: "lili", content: "are you ok" }
]
C("#app").render(C.htmlCir(arr, (item, i) => {
  return `
    <div>
      <div class="name">${item.name}</div>
      <div class="content">${item.content}</div>
    </div>
  `
}))
```

说明：

```typescript
htmlCir: (obj: any, callback: (item: any, i: any) => string) => string;
/* 
  obj 为要循环的数组或对象，item 为键值，i 为索引
  返回 html 字符串
*/
```

#### str

在模板字符串中绑定属性和传递参数时处理变量

只有参数为对象和字符串时需要使用 str() 处理，其他类型可以直接传递

```javascript
let arr = [
  { name: "tom", age: 18 },
  { name: "lili", age: 25 }
]
C.htmlCir(arr, (item, i) => {
  return `
    <div onclick="sayHello(${C.str(item)})">
      <div class="name" onclick="sayName(${C.str(item.name)})">${item.name}</div>
      <div class="age" onclick="sayAge(${item.age})">${item.age}</div>
    </div>
  `
})

/*
  当参数为对象时，对象中类型为 Function Symbol RegExp 的键值不能传递
  此时可以使用键来传参
*/
let arr = [
  {
    name: "tom",
    say: function () {
      console.log("hello")
    },
    [Symbol("hobby")]: "swim"
  }
]
C.htmlCir(arr, (item, i) => {
  return `
    <div onclick="sayHello(arr[${C.str(i)}])">${item.name}</div>
  `
})
```

说明：

```typescript
str: (arg: any) => string;
```

#### one

按 CSS 选择器选取一个 DOM ，返回 DOM 对象

同 querySelector()

```javascript
C.one(".mydiv")
```

说明：

```typescript
one: (target: any, range: any) => Element;
/* target ：CSS 选择器，range ：查询范围 */
```

#### all

按 CSS 选择器选取多个 DOM ，返回数组

和 querySelectorAll() 不同的是，该方法返回的是数组

```javascript
C.all(".mydiv,.hello")
```

说明：

```typescript
all: (target: any, range: any) => Element[];
/* target ：CSS 选择器，range ：查询范围 */
```

#### setData

添加全局变量

```javascript
const data = {
  id: 1,
  name: "Tom",
  age: 18,
  hobby: "swim"
}
C.setData(data) // data 的全部属性都会变为全局变量
C.setData(info, "name,age") // 只将 name 和 age 属性提升至全局
```

说明：

``` typescript
setState: (obj: any, str?: string | undefined) => void;
```

#### watch

监听某个对象某个属性值的变化

```javascript
const data = {
  name: "Tom",
  age: 18
}
C.watch(data, {
  name: {
    handler(nv, ov) {
      C(".name").value = nv
    }
  }
})
```

说明：

``` typescript
watch(conta: any, arg: {
  [prop: string | number | symbol]: {
    handler: (nv: any, ov: any) => any;
    immediate: boolean;
  };
}): void;
/* 如果指定了 immediate: true ，则添加监听时就会执行一次 handler 方法 */
```

#### mounted

页面构建完成的钩子函数，不包括图片等网络资源的加载完成

```javascript
C.mounted(function() {
  console.log("mounted")
})
```

说明：

``` typescript
mounted: (callback: Function) => void;
```

#### loaded

页面加载完成的钩子函数

说明：

``` typescript
loaded: (callback: Function) => void;
```

#### beforeUnload

页面关闭之前的钩子函数

说明：

``` typescript
beforeUnload: (callback: Function) => void;
```

#### unload

页面关闭时钩子函数

说明：

``` typescript
unload: (callback: Function) => void;
```

#### pageShow

页面展示时的钩子函数

说明：

``` typescript
pageShow: (callback: Function) => void;
```

#### pageHide

页面隐藏时的钩子函数

说明：

``` typescript
pageHide: (callback: Function) => void;
```

#### prevent

阻止默认事件

```html
<a class="hello" onclick="C.prevent(sayHello, event, 123)">
```

说明：

``` typescript
prevent: (callback: Function, ev: Event, ...arg: any) => void;
/* callback 为需要绑定的方法， ev 为事件对象， arg 为需要向方法中传递的参数 */
```

#### stop

阻止事件冒泡

说明：

``` typescript
stop: (callback: Function, ev: Event, ...arg: any) => void;
```

#### self

只有目标是自身才触发

说明：

``` typescript
self: (callback: Function, ev: Event, ...arg: any) => void;
```

#### push

保留历史记录并跳转页面

```javascript
C.push("./page/home.html?id=1")
C.push({
  url: "./page/home.html",
  query: {
    id: 1
  },
  params: {
    name: "tom",
    age: 18
  }
})
```

说明：

``` typescript
push: (msg: any) => void;
```

#### replace

替换当前页面，不保留历史记录

说明：

``` typescript
replace: (msg: any) => void;
```

#### reload

重新加载当前页面

说明：

``` typescript
reload: () => void;
```

#### back

返回上一个历史页面

说明：

``` typescript
back: () => void;
```

#### forward

前进到下一个历史页面

说明：

``` typescript
forward: () => void;
```

#### go

跳转历史记录页面

```javascript
C.go(-1) // 向前跳一个页面，即返回上个页面
C.go(1) // 向后跳1个页面
```

说明：

``` typescript
go: (index: number) => void;
/* index 表示跳转的页面数，负数表示之前的页面，正数表示之后的页面 */
```

#### route

获取路由参数

```javascript
const route = C.route()
```

说明：

``` typescript
route: () => {
  params: any;
  query: any;
};
```

#### formatInput

正则限制 input 输入

支持多个规则的限制

```javascript
/* 单个规则 */
C.formatInput({
  el: "", // css 选择器，支持一类元素
  reg: "", // 需要满足的正则
  nopass: e => {}, // 不通过的回调
  pass: (nv, ov) => {} // 满足正则的回调，nv 为新值，ov 为旧值
})

/* 多个规则 */
C.formatInput({
  el: "",
  rules: [
    {
      reg: "",
      nopass: e => {}
    },
    {
      reg: "",
      nopass: e => {}
    }
  ],
  pass: (nv, ov) => {}
})
```

说明：

``` typescript
formatInput: (msg: any) => void;
```

#### ajax

发送 ajax 请求

详细用法请查看 https://github.com/omlou/ajax


#### webtools

集成了 webtools 的所有方法

用法请查看 https://github.com/omlou/webtools

举例：

```javascript
C.clipboardWrite("Hello, World!")
.then(() => {
  console.log("Copy successful")
})
```

### 类型说明

```typescript
import * as _xlou_ajax from '@xlou/ajax';
import * as _xlou_webtools from '@xlou/webtools';

declare const tools: {
    Base64: typeof _xlou_webtools.Base64;
    deepCopy: typeof _xlou_webtools.deepCopy;
    filterObject: typeof _xlou_webtools.filterObject;
    getQuery: typeof _xlou_webtools.getQuery;
    queryString: typeof _xlou_webtools.queryString;
    toFixed: typeof _xlou_webtools.toFixed;
    formSubmit: typeof _xlou_webtools.formSubmit;
    readText: typeof _xlou_webtools.readText;
    readJSON: typeof _xlou_webtools.readJSON;
    getStore: typeof _xlou_webtools.getStore;
    setStore: typeof _xlou_webtools.setStore;
    unid: typeof _xlou_webtools.unid;
    colorRGB: typeof _xlou_webtools.colorRGB;
    clipboardWrite: typeof _xlou_webtools.clipboardWrite;
    ajax: _xlou_ajax.AjaxOptions;
    createDOM: (str: string) => Element[];
    htmlCir: (obj: any, callback: (item: any, i: any) => string) => string;
    str: (arg: any) => string;
    one: (target: any, range: any) => Element;
    all: (target: any, range: any) => Element[];
    setState: (obj: any, str?: string | undefined) => void;
    watch(conta: any, arg: {
        [prop: string]: {
            handler: (nv: any, ov: any) => any;
            immediate?: boolean | undefined;
        };
        [prop: number]: {
            handler: (nv: any, ov: any) => any;
            immediate?: boolean | undefined;
        };
        [prop: symbol]: {
            handler: (nv: any, ov: any) => any;
            immediate?: boolean | undefined;
        };
    }): void;
    mounted: (callback: Function) => void;
    loaded: (callback: Function) => void;
    beforeUnload: (callback: Function) => void;
    unload: (callback: Function) => void;
    pageShow: (callback: Function) => void;
    pageHide: (callback: Function) => void;
    prevent: (callback: Function, ev: Event, ...arg: any) => void;
    stop: (callback: Function, ev: Event, ...arg: any) => void;
    self: (callback: Function, ev: Event, ...arg: any) => void;
    push: (msg: any) => void;
    replace: (msg: any) => void;
    reload: () => void;
    back: () => void;
    forward: () => void;
    go: (index: number) => void;
    route: () => {
        params: any;
        query: any;
    };
    formatInput: (msg: any) => void;
    create: (node: any) => Clean | undefined;
};
declare const instance: {
    remove: () => void;
    show: (type?: string | undefined) => void;
    hide: () => void;
    getAttr: (attr: string) => string | null;
    setAttr: (attr: string, value: any) => void;
    addClass: (name: string) => void;
    removeClass: (name: string) => void;
    hasClass: (name: string) => boolean;
    bind: (type: string, callback: Function, option: any) => void;
    unbind: (type: string, callback: Function, option: any) => void;
    nth: (index: number) => Clean;
    map: (callback: (item: Clean, i: string) => any) => Array<any>;
    push: (dom: any) => void;
    concat: (...arg: any) => void;
    render: (str: string) => void;
    append: (str: string) => void;
    prepend: (str: string) => void;
    before: (str: string) => void;
    after: (str: string) => void;
};
type Instance = typeof instance;
interface Clean extends Instance {
    readonly length: number;
    get parent(): Clean;
    get child(): Clean;
    get next(): Clean;
    get prev(): Clean;
    get first(): Clean;
    get last(): Clean;
    get array(): Array<Element>;
    get style(): string;
    set style(value: any);
    get value(): any;
    set value(value: any);
    get checked(): boolean | undefined;
    set checked(value: boolean);
    get text(): string;
    set text(value: any);
}
declare class Clean {
    constructor();
}
type ToolOption = typeof tools;
type CFuncion = (que: string, range?: Document) => Clean;
type COption = CFuncion | ToolOption;
declare const C: COption;

export { COption, Clean, C as default };
```