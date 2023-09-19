## 语言

* [English](https://github.com/omlou/clean#readme)
* [简体中文](https://github.com/omlou/clean/blob/master/public/markdowns/readme-zh.md)
* [日本語](https://github.com/omlou/clean/blob/master/public/markdowns/readme-ja.md)
* [한국어](https://github.com/omlou/clean/blob/master/public/markdowns/readme-ko.md)
* [Français](https://github.com/omlou/clean/blob/master/public/markdowns/readme-fr.md)

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

类型和参数说明：

```typescript
/* que 为 CSS 选择器，range 为查询范围 */
type CFuncion = (que: string, range?: Document) => Clean;

type ToolOption = {
    createDOM: (str: string) => Element[];
    htmlCir: (obj: any, callback: (item: any, i: any) => string) => string;
    str: (arg: any) => string;
    one: (target: any, range: any) => Element;
    all: (target: any, range: any) => Element[];
    setState: (obj: any, str?: string | undefined) => void;
    watch(conta: any, arg: {
        [prop: string | number | symbol]: {
            value: any;
            handler: (nv: any, ov: any) => any;
            immediate: boolean;
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
    go: (str: any) => void;
    route: () => {
        params: any;
        query: any;
    };
    formatInput: (msg: any) => void;
    create: (node: any) => Clean | undefined;
    ajax: ajax.AjaxOptions;
    Base64: webtools.Base64Options;
    deepCopy: typeof webtools.deepCopy;
    filterObject: typeof webtools.filterObject;
    getQuery: typeof webtools.getQuery;
    queryString: typeof webtools.queryString;
    toFixed: typeof webtools.toFixed;
    formSubmit: typeof webtools.formSubmit;
    readText: typeof webtools.readText;
    readJSON: typeof webtools.readJSON;
    getStore: typeof webtools.getStore;
    setStore: typeof webtools.setStore;
    unid: typeof webtools.unid;
    colorRGB: typeof webtools.colorRGB;
};

type COption = CFuncion | ToolOption;

const C: COption;

type Instance = {
    render: (str: string) => void;
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
    push: (dom: any) => void;
    concat: (...arg: any) => void;
    nth: (index: number) => Clean;
    append: (str: string) => void;
    prepend: (str: string) => void;
    before: (str: string) => void;
    after: (str: string) => void;
    map: (callback: (item: Clean, i: string) => any) => Array<any>;
};

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
```

### Getter 获取元素

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

### Getter 其它

#### array

返回已转换为数组的 Clean 对象

```typescript
get array(): Array<Element>;
```

### Getter & Setter 获取属性和修改属性

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

### Clean 实例对象的基本方法

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

### 操作 DOM

目标支持多个 DOM 元素的 Clean 对象

参数为 HTML 字符串

使用方法以 render 为例

```javascript
C("#app").render(`<div>Hello, World!</div>`)
```

#### render

向容器里渲染 HTML

```typescript
render: (str: string) => void;
```

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

### 操作 DOM 的属性

除了 getAttr 和 hasClass 只操作单个元素以外，其他方法均支持操作多个元素

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

### 给 DOM 绑定事件监听

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

### C 对象下的方法，DOM 相关

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

### C 对象下的方法，变量和监听

#### setData

添加全局变量

obj 包含需要被添加的变量的对象