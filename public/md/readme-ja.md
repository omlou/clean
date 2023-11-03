## 言語

* [English](https://github.com/omlou/clean#readme)
* [简体中文](https://github.com/omlou/clean/blob/master/public/md/readme-zh.md)
* [日本語](https://github.com/omlou/clean/blob/master/public/md/readme-ja.md)
* [한국어](https://github.com/omlou/clean/blob/master/public/md/readme-ko.md)
* [Français](https://github.com/omlou/clean/blob/master/public/md/readme-fr.md)

## 概要

* Cleanは、開発を容易にするフロントエンドツールキットです。

## 使用法

### スクリプトタグでの導入

```html
<script src="https://unpkg.com/@xlou/clean@1.0.0/dist/umd/clean.min.js"></script>
<!-- ダウンロードしてローカルで使用をお勧めします -->
<script>
  /* このJSファイルを含めると、Cオブジェクトがグローバルで使用できるようになります */
  C("#app").render(`<div>Hello, World!</div>`)
</script>
```

### Nodeプロジェクトでの導入

インストール

``` bash
npm i @xlou/clean
```

使用

```javascript
import C from '@xlou/clean'

C("#app").render(`<div>Hello, World!</div>`)
```

## API

### メソッド C

CSSセレクタに一致するDOMをCleanインスタンスオブジェクトに変換します。

使用例：

```javascript
C("#app").render(`<div>Hello, World!</div>`)
C("#app", C.one(".mydiv")) // .mydivで検索

/* Cleanオブジェクトが返され、インデックスを使用してDOMオブジェクトに変換できます */
C("#app")[0]

/* Cの下にあるメソッドを使用 */
C.mounted(function () {
  /* ... */
})
C.ajax(/* ... */)
```

### Getter (要素の取得、配列への変換)

結果はCleanオブジェクトです。

親要素の取得の例：

```javascript
C("#app").parent
```

#### parent

対象の親要素を取得します。

対象のCleanオブジェクトが複数のDOM要素を含む場合、最初の要素が対象となります。

```typescript
get parent(): Clean;
```

#### child

対象のすべての子要素を取得します。

対象のCleanオブジェクトが複数のDOM要素を含む場合、最初の要素が対象となります。

```typescript
get child(): Clean;
```

#### next

対象の次の要素を取得します。

対象のCleanオブジェクトは複数のDOM要素であることができます。

```typescript
get next(): Clean;
```

#### prev

前の要素を取得します。

対象のCleanオブジェクトは複数のDOM要素であることができます。

```typescript
get prev(): Clean;
```

#### first

子要素の最初の要素を取得します。

対象のCleanオブジェクトは複数のDOM要素であることができます。

```typescript
get first(): Clean;
```

#### last

子要素の最後の要素を取得します。

対象のCleanオブジェクトは複数のDOM要素であることができます。

```typescript
get last(): Clean;
```

#### array

Cleanオブジェクトが変換された配列を返します。

```typescript
get array(): Array<Element>;
```

### Getter & Setter (属性の取得、属性の変更)

属性の取得と行内スタイルの設定の例：

```javascript
/* 取得 */
let style = C("#app").style

/* 設定 */
C("#app").style = "font-size: 14px;"
```

#### style

要素のスタイルを取得および設定します。

複数のDOM要素を含む場合、最初の要素が対象となります。

値はCSS文字列またはオブジェクトである必要があります（例: { display: "none", fontSize: "20px" }）。

```typescript
get style(): string;
set style(value: any);
```

#### value

フォーム要素の値を取得および設定します。

複数のDOM要素を含む場合、最初の要素が対象となります。

```typescript
get value(): any;
set value(value: any);
```

#### checked

ラジオボタンまたはチェックボックスの選択状態を取得および設定します。

複数のDOM要素を含む場合、最初の要素が対象となります。

```typescript
get checked(): boolean | undefined;
set checked(value: boolean);
```

#### text

要素のinnerTextを取得および変更します。

複数のDOM要素を含む場合、最初の要素が対象となります。

```typescript
get text(): string;
set text(value: any);
```

### Cleanインスタンスメソッド

#### nth

Cleanオブジェクト内の要素をインデックスで取得し、Cleanオブジェクトを返します。

```javascript
C("#app").nth(0)
```

説明：

```typescript
nth: (index: number) => Clean;
```

#### map

Cleanオブジェクトを反復処理し、同じ長さの配列オブジェクトを返します。

```javascript
C("#app").map((item,i)=>{
  /* ... */
  return i
}) // [0]
```

説明：

```typescript
map: (

callback: (item: Clean, i: string) => any) => Array<any>;
```

#### push

CleanオブジェクトにDOM要素を追加します。

```javascript
let divs = C(".app")
divs.push(C.one(".myapp"))
```

説明：

```typescript
push: (dom: Element) => void;
```

#### concat

CleanオブジェクトまたはNodeListオブジェクトなどを連結します。

```javascript
C("#app").concat(C(".mydiv"), C.all(".hello"))
```

説明：

```typescript
concat: (...arg: any) => void;
```

#### render

コンテナにHTMLをレンダリングします。

```typescript
render: (str: string) => void;
```

説明：

```javascript
C("#app").render(`<div>Hello, World!</div>`)
```

対象はCleanオブジェクトで複数のDOM要素をサポートします。

パラメータはHTML文字列です。

DOM要素を操作する他のメソッドも同様に使用できます。

#### append

コンテナの最後にHTMLを追加します。

```typescript
append: (str: string) => void;
```

#### prepend

コンテナの最初にHTMLを追加します。

```typescript
prepend: (str: string) => void;
```

#### before

要素の前にHTMLを追加します。

```typescript
before: (str: string) => void;
```

#### after

要素の後にHTMLを追加します。

```typescript
after: (str: string) => void;
```

#### remove

対象要素を削除します。

```typescript
remove: () => void;
```

#### show

要素を表示します。

```javascript
C("#app").show()
C("#app").show("block") // タイプ（デフォルトは "" のdisplayタイプ）はオプションです。
```

説明：

```typescript
show: (type?: string | undefined) => void;
```

#### hide

要素を非表示にし、スタイルをdisplay:none;に設定します。

説明：

```typescript
hide: () => void;
```

#### getAttr

要素の属性値を取得します。

このメソッドは、対象のCleanオブジェクトが複数のDOM要素を含む場合、最初の要素を対象とします。

```javascript
C("#app").getAttr("id")
```

説明：

```typescript
getAttr: (attr: string) => string | null; // attrは属性名です。
```

#### setAttr

要素の属性値を設定します。

```javascript
C("#app").setAttr("data", 1)
```

説明：

```typescript
setAttr: (attr: string, value: any) => void; // attrは属性名、valueは属性値です。
```

#### addClass

要素にクラスを追加します。

説明：

```typescript
addClass: (name: string) => void; // nameは追加するクラス名です。
```

#### removeClass

指定のクラスを要素から削除します。

説明：

```typescript
removeClass: (name: string) => void;
```

#### hasClass

要素が指定のクラスを持っているかどうかを判断し、ブール値を返します。

このメソッドは、対象のCleanオブジェクトが複数のDOM要素を含む場合、最初の要素を対象とします。

```javascript
C("#app").hasClass("hello")
```

説明：

```typescript
hasClass: (name: string) => boolean;
```

#### bind

イベントリスナーをバインドします。

```javascript
C("#app").bind("click", function(){
  console.log("click")
}, false)
```

説明：

```typescript
bind: (type: string, callback: Function, option: any) => void;
/* 
  type イベントタイプ
  callback バインドするイベントメソッド
  option オプションでバインドするイベントのパラメータです
*/
```

#### unbind

イベントリスナーを削除します。

```javascript
C("#app").unbind("click", sayHello)
```

説明：

```typescript
unbind: (type: string, callback: Function, option: any) => void;
/* 
  type イベントタイプ
  callback 削除するイベントメソッド（変数である必要があり、無名関数ではない）
*/
```

### C オブジェクトのメソッド

#### create

DOM を Clean オブジェクトに変換します

```javascript
C.create(C.createDOM(`<div>Hello, World!</div>`)
```

説明：

```typescript
create: (node: any) => Clean | undefined;
/* node は単一の DOM 要素、NodeList オブジェクト、または DOM オブジェクトの配列になります */
```

#### createDOM

HTML 文字列を含む DOM オブジェクトの配列に変換します

```javascript
C.createDOM(`<div>Hello, World!</div>`)
```

説明：

```typescript
createDOM: (str: string) => Element[];
```

#### htmlCir

配列またはオブジェクトをループして HTML 文字列を生成します

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

説明：

```typescript
htmlCir: (obj: any, callback: (item: any, i: any) => string) => string;
/* 
  obj はループする配列またはオブジェクトで、item はキー、i はインデックスです
  HTML 文字列を返します
*/
```

#### str

テンプレート文字列で変数を処理する際に属性をバインドおよびパラメーターを渡すための処理

パラメーターがオブジェクトまたは文字列の場合のみ、str() を使用する必要があります。その他の型は直接渡すことができます。

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
  パラメーターがオブジェクトの場合、オブジェクト内の型 Function Symbol RegExp のキー値は渡すことができません
  この場合、キーを使用してパラメーターを渡すことができます
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

説明：

```typescript
str: (arg: any) => string;
```

#### one

CSS セレクターで 1 つの DOM 要素を選択し、DOM オブジェクトを返します

querySelector() と同じです

```javascript
C.one(".mydiv")
```

説明：

```typescript
one: (target: any, range: any) => Element;
/* target：CSS セレクター、range：検索範囲 */
```

#### all

CSS セレクターで複数の DOM 要素を選択し、配列を返します

querySelectorAll() とは異なり、このメソッドは配列を返します

```javascript
C.all(".mydiv,.hello")
```

説明：

```typescript
all: (target: any, range: any) => Element[];
/* target：CSS セレクター、range：検索範囲 */
```

#### setState

グローバル変数を追加します

```javascript
const data = {
  id: 1,
  name: "Tom",
  age: 18,
  hobby: "swim"
}
C.setState(data) // data のすべてのプロパティがグローバル変数になります
C.setState(data, "name,age") // name および age プロパティのみをグローバルに昇格します
```

説明：

```typescript
setState: (obj: any, str?: string | undefined) => void;
```

#### proxy

特定のオブジェクトの特定のプロパティ値の変更を監視します

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

説明：

```typescript
proxy(conta: any, arg: {
  [prop: string | number | symbol]: {
    handler: (nv: any, ov: any) => any;
    immediate?: boolean | undefined;
  };
}): void;
/* immediate: true を指定した場合、ハンドラー関数はリスナーの追加時に1回実行されます */
```

#### mounted

ページ構築が完了した際のフック関数です。画像などのネットワークリソースの読み込みは含まれません

```javascript
C.mounted(function() {
  console.log("mounted")
})
```

説明：

```typescript
mounted: (callback: (event: Event | null) => any) => void;
```

#### loaded

ページの読み込みが完了した際のフック関数です

説明：

```typescript
loaded: (callback: (event: Event) => any) => void;
```

#### beforeUnload

ページを閉じる前のフック関

数です

```javascript
C.beforeUnload(function(event) {
  try {
    event.preventDefault()
    event.returnValue = true
  } catch () {}
  /* ページが閉じる際、ページフォームに変更がある場合、確認ダイアログが表示されます */
})
```

説明：

```typescript
beforeUnload: (callback: (event: Event) => any) => void;
```

#### visible

ページを閉じる、遷移、ウィンドウ切り替え、ブラウザの最小化などでトリガーされるフック関数です

```javascript
C.visible(function(msg) {
  console.log("C.visible", msg.event, msg.state)
  /* state が hidden の場合は非表示、visible の場合は表示です */
})
```

説明：

```typescript
visible: (callback: (event: {
  event: Event;
  state: string;
}) => any) => void;
```

#### pageShow

ページが表示された際のフック関数です

説明：

```typescript
pageShow: (callback: (event: PageTransitionEvent) => any) => void;
/* event.persisted を使用してドキュメントがキャッシュから読み込まれたかどうかを確認できます */
```

#### pageHide

ページが非表示になった際のフック関数です

説明：

```typescript
pageHide: (callback: (event: PageTransitionEvent) => any) => void;
```

#### prevent

デフォルトのイベントを阻止します

```html
<a class="hello" onclick="C.prevent(sayHello, event, 123)">クリック</a>
```

説明：

```typescript
prevent: (callback: Function, ev: Event, ...arg: any) => void;
/* callback はバインドするメソッド、ev はイベントオブジェクト、arg はメソッドに渡す必要があるパラメーターです */
```

#### stop

イベントバブリングを停止します

説明：

```typescript
stop: (callback: Function, ev: Event, ...arg: any) => void;
```

#### self

ターゲットが自身の場合にのみトリガーされます

説明：

```typescript
self: (callback: Function, ev: Event, ...arg: any) => void;
```

#### push

履歴を保持してページに移動します

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

説明：

```typescript
push: (msg: any) => void;
```

#### replace

現在のページを置き換えて、履歴を保持しません

説明：

```typescript
replace: (msg: any) => void;
```

#### reload

現在のページを再読み込みします

説明：

```typescript
reload: () => void;
```

#### back

前の履歴ページに戻ります

説明：

```typescript
back: () => void;
```

#### forward

次の履歴ページに進みます

説明：

```typescript
forward: () => void;
```

#### go

履歴ページに移動します

```javascript
C.go(-1) // 1 ページ戻る、つまり前のページに戻る
C.go(1) // 1 ページ進む
```

説明：

```typescript
go: (index: number) => void;
/* index は移動するページ数を表し、負数は以前のページ、正数は以降のページを表します */
```

#### route

ルートのパラメータを取得します

```javascript
const route = C.route()
```

説明：

```typescript
route: () => {
  params: any;
  query: any;
};
```

#### formatInput

入力を制限する正規表現をサポートする

複数の規則をサポートします

```javascript
/* 1 つの規則 */
C.formatInput({
  el: "", // CSS セレクター、一つの要素をサポートします
  reg: "", // 満たす必要のある正規表現
  nopass: e => {}, // 満たさない場合のコールバック
  pass: (nv, ov) => {} // 正規表現を満たす場合のコールバック、nv は新しい値、ov は古い値です
})

/* 複数の規則 */
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

説明：

```typescript
formatInput: (msg: any) => void;
```

#### ajax

Ajax リクエストを送信します

詳細な使い方は https://github.com/omlou/ajax をご覧ください

#### webtools

webtools のすべてのメソッドが統合されています

使用方法については https://github.com/omlou/webtools をご覧ください

例：

```javascript
C.clipboardWrite("Hello, World!")
.then(() => {
  console.log("コピーが成功しました")
})
```

####  型の説明

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