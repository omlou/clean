## 언어

* [English](https://github.com/omlou/clean#readme)
* [简体中文](https://github.com/omlou/clean/blob/master/public/md/readme-zh.md)
* [日本語](https://github.com/omlou/clean/blob/master/public/md/readme-ja.md)
* [한국어](https://github.com/omlou/clean/blob/master/public/md/readme-ko.md)
* [Français](https://github.com/omlou/clean/blob/master/public/md/readme-fr.md)

## 개요

* Clean은 개발을 더 편리하게하는 프론트 엔드 도구 킷입니다.

## 사용법

### 스크립트 태그로 추가

```html
<script src="https://unpkg.com/@xlou/clean@1.0.0/dist/umd/clean.min.js"></script>
<!-- 로컬에서 다운로드하고 사용하는 것을 권장합니다. -->
<script>
  /* 이 JS 파일을 포함하면 C 객체가 전역에서 사용 가능합니다. */
  C("#app").render(`<div>Hello, World!</div>`)
</script>
```

### 노드 프로젝트에서 추가

설치

``` bash
npm i @xlou/clean
```

사용

```javascript
import C from '@xlou/clean'

C("#app").render(`<div>Hello, World!</div>`)
```

## API

### 메소드 C

일치하는 CSS 선택기의 DOM을 Clean 인스턴스 객체로 변환합니다.

사용 방법:

```javascript
C("#app").render(`<div>Hello, World!</div>`)
C("#app", C.one(".mydiv")) // .mydiv에서 찾기

/* 반환되는 Clean 객체는 배열과 유사하며 색인을 통해 DOM 객체로 변환할 수 있습니다. */
C("#app")[0]

/* C 하위 메소드 사용 */
C.mounted(function () {
  /* ... */
})
C.ajax(/* ... */)
```

### Getter (요소 가져오기, 배열로 변환)

결과는 Clean 객체입니다.

부모 요소 가져오기를 예로 들어 보겠습니다.

```javascript
C("#app").parent
```

#### parent

대상의 부모 요소를 가져옵니다.

대상 Clean 객체가 여러 개의 DOM 요소인 경우 첫 번째 요소를 대상으로 합니다.

```typescript
get parent(): Clean;
```

#### child

대상의 모든 하위 요소를 가져옵니다.

대상 Clean 객체가 여러 개의 DOM 요소인 경우 첫 번째 요소를 대상으로 합니다.

```typescript
get child(): Clean;
```

#### next

대상의 다음 요소를 가져옵니다.

대상 Clean 객체가 여러 개의 DOM 요소인 경우 첫 번째 요소를 대상으로 합니다.

```typescript
get next(): Clean;
```

#### prev

이전 요소를 가져옵니다.

대상 Clean 객체가 여러 개의 DOM 요소인 경우 첫 번째 요소를 대상으로 합니다.

```typescript
get prev(): Clean;
```

#### first

하위 요소 중 첫 번째 요소를 가져옵니다.

대상 Clean 객체가 여러 개의 DOM 요소인 경우 첫 번째 요소를 대상으로 합니다.

```typescript
get first(): Clean;
```

#### last

하위 요소 중 마지막 요소를 가져옵니다.

대상 Clean 객체가 여러 개의 DOM 요소인 경우 첫 번째 요소를 대상으로 합니다.

```typescript
get last(): Clean;
```

#### array

변환된 Clean 객체의 배열을 반환합니다.

```typescript
get array(): Array<Element>;
```

### Getter 및 Setter (속성 가져오기, 속성 설정)

속성 가져오기와 인라인 스타일 설정을 예로 들어 보겠습니다.

```javascript
/* 가져오기 */
let style = C("#app").style

/* 설정 */
C("#app").style="font-size: 14px;"
```

#### style

요소의 스타일을 가져오고 설정합니다.

대상 Clean 객체가 여러 개의 DOM 요소인 경우 첫 번째 요소를 대상으로 합니다.

값은 CSS 문자열 또는 객체여야 하며 다음과 같이 사용할 수 있습니다({ display: "none", fontSize: "20px" 등}).

```typescript
get style(): string;
set style(value: any);
```

#### value

양식 요소의 값 가져오기 및 설정하기

대상 Clean 객체가 여러 개의 DOM 요소인 경우 첫 번째 요소를 대상으로 합니다.

```typescript
get value(): any;
set value(value: any);
```

#### checked

라디오 버튼이나 체크 박스의 선택 상태 가져오기 및 설정하기

대상 Clean 객체가 여러 개의 DOM 요소인 경우 첫 번째 요소를 대상으로 합니다.

```typescript
get checked(): boolean | undefined;
set checked(value: boolean);
```

#### text

요소의 innerText 가져오기 및 수정하기

대상 Clean 객체가 여러 개의 DOM 요소인 경우 첫 번째 요소를 대상으로 합니다.

```typescript
get text(): string;
set text(value: any);
```

### Clean 인스턴스 메소드

#### nth

Clean 객체 내에서 인덱스를 기반으로 요소를 가져와 Clean 객체를 반환합니다.

```javascript
C("#app").nth(0)
```

설명:

```typescript
nth: (index: number) => Clean;
```

#### map

Clean 객체를 반복하고 동일한 길이의 배열 객체를 반환합니다.

```javascript
C("#app").map((item,i)=>{
  /* ... */
  return i
}) // [0]
```

설명:

```typescript
map: (callback: (item: Clean, i: string) => any) => Array<any>;
```

#### push

Clean 객체에 DOM 요소를 추가합니다.

```javascript
let divs = C(".app")
divs.push(C.one(".myapp"))
```

설명:

```typescript
push: (dom: Element) => void;
```

#### concat

Clean 객체 또는 NodeList 객체 등을 연결합니다.

```javascript
C("#app").concat(C(".mydiv"), C.all(".hello"))
```

설명:

```typescript
concat: (...

arg: any) => void;
```

#### render

컨테이너에 HTML을 렌더링합니다.

```typescript
render: (str: string) => void;
```

설명:

```javascript
C("#app").render(`<div>Hello, World!</div>`)
```

대상은 여러 개의 DOM 요소를 지원하는 Clean 객체입니다.

매개변수는 HTML 문자열입니다.

다른 DOM 요소 조작 메소드도 render와 동일한 방식으로 사용할 수 있습니다.

#### append

컨테이너의 끝에 HTML을 추가합니다.

```typescript
append: (str: string) => void;
```

#### prepend

컨테이너의 처음에 HTML을 추가합니다.

```typescript
prepend: (str: string) => void;
```

#### before

요소의 앞에 HTML을 추가합니다.

```typescript
before: (str: string) => void;
```

#### after

요소의 뒤에 HTML을 추가합니다.

```typescript
after: (str: string) => void;
```

#### remove

대상 요소를 제거합니다.

```typescript
remove: () => void;
```

#### show

요소를 표시합니다.

```javascript
C("#app").show()
C("#app").show("block") // 타입은 선택 사항이며 표시 유형의 기본값은 ""입니다.
```

설명:

```typescript
show: (type?: string | undefined) => void;
```

#### hide

요소를 숨깁니다. 스타일을 display:none;로 설정합니다.

설명:

```typescript
hide: () => void;
```

#### getAttr

요소의 속성 값을 가져옵니다.

이 메소드는 대상 Clean 객체가 여러 개의 DOM 요소를 포함하는 경우 첫 번째 요소를 대상으로 합니다.

```javascript
C("#app").getAttr("id")
```

설명:

```typescript
getAttr: (attr: string) => string | null; // attr은 속성 이름입니다.
```

#### setAttr

요소의 속성 값을 설정합니다.

```javascript
C("#app").setAttr("data", 1)
```

설명:

```typescript
setAttr: (attr: string, value: any) => void; // attr는 속성 이름이고, value는 속성 값입니다.
```

#### addClass

요소에 클래스를 추가합니다.

설명:

```typescript
addClass: (name: string) => void; // name은 추가할 클래스 이름입니다.
```

#### removeClass

지정한 클래스를 요소에서 제거합니다.

설명:

```typescript
removeClass: (name: string) => void;
```

#### hasClass

요소가 지정한 클래스를 가지고 있는지 여부를 판단하여 부울 값을 반환합니다.

이 메소드는 대상 Clean 객체가 여러 개의 DOM 요소를 포함하는 경우 첫 번째 요소를 대상으로 합니다.

```javascript
C("#app").hasClass("hello")
```

설명:

```typescript
hasClass: (name: string) => boolean;
```

#### bind

이벤트 리스너를 바인딩합니다.

```javascript
C("#app").bind("click", function(){
  console.log("click")
}, false)
```

설명:

```typescript
bind: (type: string, callback: Function, option: any) => void;
/* 
  type 이벤트 유형
  callback 바인딩할 이벤트 메소드
  option 이벤트 바인딩의 옵션입니다.
*/
```

#### unbind

이벤트 리스너를 제거합니다.

```javascript
C("#app").unbind("click", sayHello)
```

설명:

```typescript
unbind: (type: string, callback: Function, option: any) => void;
/* 
  type 이벤트 유형
  callback 제거할 이벤트 메소드 (변수여야 하며 익명 함수가 아니어야 함)
*/
```

### C 객체의 메서드

#### create

DOM을 Clean 객체로 변환합니다

```javascript
C.create(C.createDOM(`<div>Hello, World!</div>`))
```

설명:

```typescript
create: (node: any) => Clean | undefined;
/* node는 개별 DOM 요소, NodeList 객체 또는 DOM 객체의 배열이 될 수 있습니다 */
```

#### createDOM

HTML 문자열을 포함하는 DOM 객체의 배열로 변환합니다

```javascript
C.createDOM(`<div>Hello, World!</div>`)
```

설명:

```typescript
createDOM: (str: string) => Element[];
```

#### htmlCir

배열 또는 객체를 순환하여 HTML 문자열을 생성합니다

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

설명:

```typescript
htmlCir: (obj: any, callback: (item: any, i: any) => string) => string;
/* 
  obj는 순환할 배열 또는 객체이며, item은 키이고 i는 인덱스입니다.
  HTML 문자열을 반환합니다.
*/
```

#### str

템플릿 문자열에서 변수를 처리할 때 속성을 바인딩하고 매개변수를 전달하는 데 사용

매개변수가 객체 또는 문자열인 경우에만 str()을 사용해야합니다. 다른 유형은 직접 전달할 수 있습니다.

```javascript
let arr = [
  { name: "tom", age: 18 },
  { name: "lili", age: 25 }
]
C("#app").render(C.htmlCir(arr, (item, i) => {
  return `
    <div onclick="sayHello(${C.str(item)})">
      <div class="name" onclick="sayName(${C.str(item.name)})">${item.name}</div>
      <div class "age" onclick="sayAge(${item.age})">${item.age}</div>
    </div>
  `
}))

/*
  매개변수가 객체인 경우, 객체 내의 형식 Function Symbol RegExp의 키 값은 전달할 수 없습니다.
  이 경우 키를 사용하여 매개변수를 전달할 수 있습니다.
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

설명:

```typescript
str: (arg: any) => string;
```

#### one

CSS 선택기로 1개의 DOM 요소를 선택하고 DOM 객체를 반환합니다

querySelector()와 동일합니다

```javascript
C.one(".mydiv")
```

설명:

```typescript
one: (target: any, range: any) => Element;
/* target: CSS 선택기, range: 검색 범위 */
```

#### all

CSS 선택기로 여러 개의 DOM 요소를 선택하고 배열을 반환합니다

querySelectorAll()과 다르게 이 메서드는 배열을 반환합니다

```javascript
C.all(".mydiv,.hello")
```

설명:

```typescript
all: (target: any, range: any) => Element[];
/* target: CSS 선택기, range: 검색 범위 */
```

#### setState

전역 변수를 추가합니다

```javascript
const data = {
  id: 1,
  name: "Tom",
  age: 18,
  hobby: "swim"
}
C.setState(data) // data의 모든 속성이 전역 변수가 됩니다
C.setState(data, "name,age") // name 및 age 속성만 전역 변수로 승격합니다
```

설명:

```typescript
setState: (obj: any, str?: string | undefined) => void;
```

#### proxy

특정 객체의 특정 속성 값 변경을 감시합니다

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

설명:

```typescript
proxy(conta: any, arg: {
  [prop: string | number | symbol]: {
    handler: (nv: any, ov: any) => any;
    immediate?: boolean | undefined;
  };
}): void;
/* immediate: true를 지정하면 핸들러 함수가 리스너를 추가할 때 한 번 실행됩니다. */
```

#### mounted

페이지 구축이 완료된 후의 후크 함수입니다. 이미지 등 네트워크 리소스의 로드는 포함되지 않습니다

```javascript
C.mounted(function() {
  console.log("mounted")
})
```

설명:

```typescript
mounted: (callback: (event: Event | null) => any) => void;
```

#### loaded

페이지 로드가 완료된 후의 후크 함수입니다

설명:

```typescript
loaded: (callback: (event: Event) => any) => void;
```

#### beforeUnload

페이지를 닫기 전의 후크 함수입니다

```javascript
C.beforeUnload(function(event) {
  try {
    event.preventDefault()
    event.returnValue = true
  } catch () {}
  /* 페이지가 닫힐 때 페이지 폼에 변경 사항이 있는 경우 확인 대화 상자가 표시됩니다 */
})
```

설명:

```typescript
beforeUnload: (callback: (event: Event) => any) => void;
```

#### visible

페이지를 닫고, 이동하고, 창을 전환하고, 브라우저를 최소화하면 모두 이 후크 함수가 트리거됩니다.

```javascript
C.visible(function(msg) {
  console.log("C.visible", msg.event, msg.state)
  /* state가 hidden이면 숨김, visible이면 표시입니다 */
})
``

`

설명:

```typescript
visible: (callback: (event: {
  event: Event;
  state: string;
}) => any) => void;
```

#### pageShow

페이지가 표시되었을 때의 후크 함수입니다

설명:

```typescript
pageShow: (callback: (event: PageTransitionEvent) => any) => void;
/* event.persisted를 사용하여 문서가 캐시에서 로드되었는지 여부를 확인할 수 있습니다 */
```

#### pageHide

페이지가 숨겼을 때의 후크 함수입니다

설명:

```typescript
pageHide: (callback: (event: PageTransitionEvent) => any) => void;
```

#### prevent

기본 이벤트를 중지합니다

```html
<a class="hello" onclick="C.prevent(sayHello, event, 123)">클릭</a>
```

설명:

```typescript
prevent: (callback: Function, ev: Event, ...arg: any) => void;
/* callback은 바인딩할 메서드, ev는 이벤트 객체, arg는 메서드에 전달해야하는 매개 변수입니다 */
```

#### stop

이벤트 버블링을 중지합니다

설명:

```typescript
stop: (callback: Function, ev: Event, ...arg: any) => void;
```

#### self

대상이 자체인 경우에만 트리거됩니다

설명:

```typescript
self: (callback: Function, ev: Event, ...arg: any) => void;
```

#### push

히스토리를 유지하고 페이지로 이동합니다

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

설명:

```typescript
push: (msg: any) => void;
```

#### replace

현재 페이지를 교체하고 히스토리를 유지하지 않습니다

설명:

```typescript
replace: (msg: any) => void;
```

#### reload

현재 페이지를 다시로드합니다

설명:

```typescript
reload: () => void;
```

#### back

이전 히스토리 페이지로 돌아갑니다

설명:

```typescript
back: () => void;
```

#### forward

다음 히스토리 페이지로 이동합니다

설명:

```typescript
forward: () => void;
```

#### go

히스토리 페이지로 이동합니다

```javascript
C.go(-1) // 1 페이지 뒤로 이동, 즉 이전 페이지로 돌아갑니다
C.go(1) // 1 페이지 앞으로 이동합니다
```

설명:

```typescript
go: (index: number) => void;
/* index는 이동할 페이지 수를 나타내며 음수는 이전 페이지, 양수는 이후 페이지를 나타냅니다 */
```

#### route

루트 매개변수를 가져옵니다

```javascript
const route = C.route()
```

설명:

```typescript
route: () => {
  params: any;
  query: any;
};
```

#### formatInput

입력을 제한하는 정규식을 지원합니다

여러 규칙을 지원합니다

```javascript
/* 단일 규칙 */
C.formatInput({
  el: "", // CSS 선택기, 하나의 요소를 지원합니다
  reg: "", // 충족해야하는 정규식
  nopass: e => {}, // 충족하지 않는 경우의 콜백
  pass: (nv, ov) => {} // 정규식을 충족하는 경우의 콜백, nv는 새 값, ov는 이전 값입니다
})

/* 여러 규칙 */
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

설명:

```typescript
formatInput: (msg: any) => void;
```

#### ajax

Ajax 요청을 보냅니다

자세한 사용법은 https://github.com/omlou/ajax를 참조하십시오

#### webtools

webtools의 모든 메서드가 통합되어 있습니다

사용법은 https://github.com/omlou/webtools를 참조하십시오

예시:

```javascript
C.clipboardWrite("Hello, World!")
.then(() => {
  console.log("복사 성공")
})
```

### 유형 설명

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