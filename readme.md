## Language

* [English](https://github.com/omlou/clean#readme)
* [简体中文](https://github.com/omlou/clean/blob/master/docs/md/readme-zh.md)
* [日本語](https://github.com/omlou/clean/blob/master/docs/md/readme-ja.md)
* [한국어](https://github.com/omlou/clean/blob/master/docs/md/readme-ko.md)
* [Français](https://github.com/omlou/clean/blob/master/docs/md/readme-fr.md)

## Introduction

* Clean is a front-end toolkit that makes development more convenient.

## Usage

### Script Tag Inclusion

```html
<script src="https://unpkg.com/@xlou/clean@1.0.0/dist/umd/clean.min.js"></script>
<!-- Recommended to download and use locally -->
<script>
  /* After including this JS file, the C object will be globally available */
  C("#app").render(`<div>Hello, World!</div>`)
</script>
```

### Import in Node Projects

Installation

```bash
npm i @xlou/clean
```

Usage

```javascript
import C from '@xlou/clean'

C("#app").render(`<div>Hello, World!</div>`)
```

## API

### Method C

Converts DOM elements matching a CSS selector into Clean instance objects.

Usage:

```javascript
C("#app").render(`<div>Hello, World!</div>`)
C("#app", C.one(".mydiv")) // Find within .mydiv

/* The returned Clean object is similar to an array; you can access DOM elements by index */
C("#app")[0]

/* Use methods under C */
C.mounted(function () {
  /* ... */
})
C.ajax(/* ... */)
```

### Getter (Retrieve Elements, Convert to an Array)

Returns a Clean object as a result.

For example, retrieving the parent element:

```javascript
C("#app").parent
```

#### parent

Get the parent element of the target.

If the target Clean object contains multiple DOM elements, the first element is considered.

```typescript
get parent(): Clean;
```

#### child

Get all child elements of the target.

If the target Clean object contains multiple DOM elements, the first element is considered.

```typescript
get child(): Clean;
```

#### next

Get the next element of the target.

The target Clean object can contain multiple DOM elements.

```typescript
get next(): Clean;
```

#### prev

Get the previous element.

The target Clean object can contain multiple DOM elements.

```typescript
get prev(): Clean;
```

#### first

Get the first element among the child elements.

The target Clean object can contain multiple DOM elements.

```typescript
get first(): Clean;
```

#### last

Get the last element among the child elements.

The target Clean object can contain multiple DOM elements.

```typescript
get last(): Clean;
```

#### array

Returns the Clean object converted to an array.

```typescript
get array(): Array<Element>;
```

### Getter & Setter (Retrieve and Modify Attributes)

For example, retrieving and setting inline styles:

```javascript
/* Retrieve */
let style = C("#app").style

/* Set */
C("#app").style = "font-size: 14px;"
```

#### style

Retrieve and set the element's styles.

When retrieving, if the target Clean object contains multiple DOM elements, the first element is considered.

The value can be a CSS string, e.g., "display: none;" or an object { display: none, fontSize: "20px" }.

```typescript
get style(): string;
set style(value: any);
```

#### value

Retrieve and set the value of form elements.

When retrieving, if the target Clean object contains multiple DOM elements, the first element is considered.

```typescript
get value(): any;
set value(value: any);
```

#### checked

Retrieve and set the checked state of radio buttons or checkboxes.

When retrieving, if the target Clean object contains multiple DOM elements, the first element is considered.

```typescript
get checked(): boolean | undefined;
set checked(value: boolean);
```

#### text

Retrieve and modify the innerText of the element.

When retrieving, if the target Clean object contains multiple DOM elements, the first element is considered.

```typescript
get text(): string;
set text(value: any);
```

### Clean Instance Object Methods

#### nth

Get the element at the specified index in the Clean object. The result is still a Clean object.

```javascript
C("#app").nth(0)
```

Description:

```typescript
nth: (index: number) => Clean;
```

#### map

Iterate over the Clean object and return an array of the same length.

```javascript
C("#app").map((item, i) => {
  /* ... */
  return i
}) // [0]
```

Description:

```typescript
map: (callback: (item: Clean, i: string) => any) => Array<any>;
```

#### push

Add DOM elements to the Clean object.

```javascript
let divs = C(".app")
divs.push(C.one(".myapp"))
```

Description:

```typescript
push: (dom: Element) => void;
```

#### concat

Concatenate Clean objects or NodeList objects, etc.

```javascript
C("#app").concat(C(".mydiv"), C.all(".hello"))
```

Description:

```typescript
concat: (...arg: any) => void;
```

#### render

Render HTML into a container.

```typescript
render: (str: string) => void;
```

Description:

```javascript
C("#app").render(`<div>Hello, World!</div>`)
```

The target supports a Clean object with multiple DOM elements.

The parameter is an HTML string.

Other methods for manipulating DOM elements are used similarly to render.

#### append

Append HTML to the end of the container.

```typescript
append: (str: string) => void;
```

#### prepend

Add HTML to the beginning of the container.

```typescript
prepend: (str: string) => void;
```

#### before

Add HTML before the element.

```typescript
before: (str: string) => void;
```

#### after

Add HTML after the element.

```typescript
after: (str: string) => void;
```

#### remove

Remove the target element.

```typescript
remove: () => void;
```

#### show

Show the element.

```javascript
C("#app").show()
C("#app").show("block") // Type is optional, defaults to ""
```

Description:

```typescript
show: (type?: string | undefined) => void;
```

#### hide

Hide the element by setting the display style to "none."

Description:

```typescript
hide: () => void;
```

#### getAttr

Retrieve the value of an element's attribute.

If the target Clean object contains multiple DOM elements, the first element is considered.

```javascript
C("#app").getAttr("id")
```

Description:

```typescript
getAttr: (attr: string) => string | null; // attr is the attribute name
```

#### setAttr

Set the value of an element's attribute.

```javascript
C("#app").setAttr("data", 1)
```

Description:

```typescript
setAttr: (attr

: string, value: any) => void; // attr is the attribute name, value is the attribute value
```

#### addClass

Add a class to the element.

Description:

```typescript
addClass: (name: string) => void; // name is the class name to be added
```

#### removeClass

Remove a specified class.

Description:

```typescript
removeClass: (name: string) => void;
```

#### hasClass

Check if the element has a specified class and return a boolean.

If the target Clean object contains multiple DOM elements, the first element is considered.

```javascript
C("#app").hasClass("hello")
```

Description:

```typescript
hasClass: (name: string) => boolean;
```

#### bind

Bind an event listener.

```javascript
C("#app").bind("click", function () {
  console.log("click")
}, false)
```

Description:

```typescript
bind: (type: string, callback: Function, option: any) => void;
/* 
  type: event type
  callback: event method to bind
  option: optional, event parameters
*/
```

#### unbind

Remove an event listener.

```javascript
C("#app").unbind("click", sayHello)
```

Description:

```typescript
unbind: (type: string, callback: Function, option: any) => void;
/* 
  type: event type
  callback: event method to remove; must be a variable and not an anonymous function
*/
```

### Methods Under C Object

#### create

Convert DOM into Clean objects.

```javascript
C.create(C.createDOM(`<div>Hello, World!</div>`))
```

Description:

```typescript
create: (node: any) => Clean | undefined;
/* node can be a single DOM element, a NodeList object, or an array of DOM objects */
```

#### createDOM

Convert HTML strings into an array containing DOM objects.

```javascript
C.createDOM(`<div>Hello, World!</div>`)
```

Description:

```typescript
createDOM: (str: string) => Element[];
```

#### htmlCir

Generate HTML strings by looping through an array or object.

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

Description:

```typescript
htmlCir: (obj: any, callback: (item: any, i: any) => string) => string;
/* 
  obj: the array or object to loop through
  item: the key-value, i: the index
  Returns an HTML string
*/
```

#### str

Process variables when binding attributes and passing parameters in template strings.

Only objects and strings need to be processed with `C.str()` when binding attributes and passing parameters in template strings. Other types can be passed directly.

```javascript
let arr = [
  { name: "tom", age: 18 },
  { name: "lili", age: 25 }
]
C("#app").render(C.htmlCir(arr, (item, i) => {
  return `
    <div onclick="sayHello(${C.str(item)})">
      <div class="name" onclick="sayName(${C.str(item.name)})">${item.name}</div>
      <div class="age" onclick="sayAge(${item.age})">${item.age}</div>
    </div>
  `
}))

/*
  When the parameter is an object, keys with types Function, Symbol, RegExp cannot be passed.
  In such cases, you can use the keys to pass the parameters.
*/
let obj = {
  name: "tom",
  say: function (str) {
    console.log("hello" + str)
  },
  [Symbol("hobby")]: "swim"
}
C("#app").render(C.htmlCir(obj, (item, i) => {
  return `
    <div onclick="${C.str(obj.say)}('tom')">${C.str(i)}-${C.str(item)}</div>
  `
}))
```

Description:

```typescript
str: (arg: any) => string;
```

#### one

Select a DOM element based on a CSS selector and return the DOM object.

Similar to `querySelector()`.

```javascript
C.one(".mydiv")
```

Explanation:

```typescript
one: (target: any, range: any) => Element;
/* target: CSS selector, range: query range */
```

#### all

Select multiple DOM elements based on a CSS selector and return an array.

Unlike `querySelectorAll()`, this method returns an array.

```javascript
C.all(".mydiv, .hello")
```

Explanation:

```typescript
all: (target: any, range: any) => Element[];
/* target: CSS selector, range: query range */
```

#### setState

Add global variables.

```javascript
const data = {
  id: 1,
  name: "Tom",
  age: 18,
  hobby: "swim"
}
C.setState(data) // All properties of data become global variables
C.setState(data, "name,age") // Only elevate the name and age properties to global variables
```

Explanation:

```typescript
setState: (obj: any, str?: string | undefined) => void;
```

#### proxy

Listen for changes in a specific property of an object.

```javascript
const data = {
  name: "Tom",
  age: 18
}
let dataProxy = C.proxy(data, {
  name: {
    handler(nv, ov) {
      C(".name").value = nv
    },
    immediate: true
  }
})
```

Explanation:

```typescript
proxy(conta: any, arg: {
  [prop: string | number | symbol]: {
    handler: (nv: any, ov: any) => any;
    immediate?: boolean | undefined;
  };
}): void;
/* If immediate: true is specified, the handler method will be executed once when the listener is added */
```

#### mounted

A hook function that is called when the page is constructed, excluding the loading of images and other network resources.

```javascript
C.mounted(function() {
  console.log("mounted")
})
```

Explanation:

```typescript
mounted: (callback: (event: Event | null) => any) => void;
```

#### loaded

A hook function that is called when the page is fully loaded.

Explanation:

```typescript
loaded: (callback: (event: Event) => any) => void;
```

#### beforeUnload

A hook function called before the page is closed.

```javascript
C.beforeUnload(function(event) {
  try {
    event.preventDefault()
    event.returnValue = true
  } catch () {}
  /* When the page is about to close and the page form has been modified, a dialog will be displayed as a warning */
})
```

Explanation:

```typescript
beforeUnload: (callback: (event: Event) => any) => void;
```

#### visible

A hook function that is triggered when the page is closed, navigated, the window is switched, or the browser is minimized.

```javascript
C.visible(function(msg) {
  console.log("C.visible", msg.event, msg.state)
  /* state is hidden when hidden, visible when shown */
})
```

Explanation:

```typescript
visible: (callback: (event: {
  event: Event;
  state: string;
}) => any) => void;
```

#### pageShow

A hook function called when the page is shown.

Explanation:

```typescript
pageShow: (callback: (event: PageTransitionEvent) => any) => void;
/* You can use event.persisted to check if the document is loaded from the cache */
```

#### pageHide

A hook function called when the page is hidden.

Explanation:

```typescript
pageHide: (callback: (event: PageTransitionEvent) => any) => void;
```

#### prevent

Prevent the default event.

```html
<a class="hello" onclick="C.prevent(sayHello, event, 123)">Click me</a>
```

Explanation:

```typescript
prevent: (callback: Function, ev: Event, ...arg: any) => void;
/* callback is the method to be bound, ev is the event object, arg is the parameters to be passed to the method */
```

#### stop

Stop event propagation.

Explanation:

```typescript
stop: (callback: Function, ev: Event, ...arg: any) => void;
```

#### self

Only trigger the event if the target is itself.

Explanation:

```typescript
self: (callback: Function, ev: Event, ...arg: any) => void;
```

#### push

Preserve the browsing history and navigate to a new page.

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

Explanation:

```typescript
push: (msg: any) => void;
```

#### replace

Replace the current page without preserving the browsing history.

Explanation:

```typescript
replace: (msg: any) => void;
```

#### reload

Reload the current page.

Explanation:

```typescript
reload: () => void;
```

#### back

Navigate to the previous page in the browsing history.

Explanation:

```typescript
back: () => void;
```

#### forward

Navigate to the next page in the browsing history.

Explanation:

```typescript
forward: () => void;
```

#### go

Navigate to a specific page in the browsing history.

```javascript
C.go(-1) // Go back one page, i.e., return to the previous page
C.go(1) // Go forward one page
```

Explanation:

```typescript
go: (index: number) => void;
/* index indicates the number of pages to navigate, negative numbers mean going back to previous pages, positive numbers mean going forward to subsequent pages */
```

#### route

Get route parameters.

```javascript
const route = C.route()
```

Explanation:

```typescript
route: () => {
  params: any;
  query: any;
};
```

#### formatInput

Restrict input using regular expressions.

Supports multiple rules for input restrictions.

```javascript
/* Single rule */
C.formatInput({
  el: "", // CSS selector, supports a class of elements
  reg: "", // Regular expression to match
  nopass: e => {}, // Callback for non-matching input
  pass: (nv, ov) => {} // Callback for matching the regular expression, nv is the new value, ov is the old value
})

/* Multiple rules */
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

Explanation:

```typescript
formatInput: (msg: any) => void;
```

#### ajax

Send an AJAX request.

For detailed usage, please refer to https://github.com/omlou/ajax.

#### webtools

Integrates all methods of webtools.

Usage can be found at https://github.com/omlou/webtools.

Example:

```javascript
C.clipboardWrite("Hello, World!")
.then(() => {
  console.log("Copy successful

")
})
```

### Type Explanations

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
    proxy(conta: any, arg: {
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
    mounted: (callback: (event: Event | null) => any) => void;
    loaded: (callback: (event: Event) => any) => void;
    beforeUnload: (callback: (event: Event) => any) => void;
    visible: (callback: (event: {
        event: Event;
        state: string;
    }) => any) => void;
    pageShow: (callback: (event: PageTransitionEvent) => any) => void;
    pageHide: (callback: (event: PageTransitionEvent) => any) => void;
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
    push: (dom: Element) => void;
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