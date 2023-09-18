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

说明：

```typescript
interface ToolOption {
    [prop: string]: Function;
}
type CFuncion = (que: string, range?: Document) => Clean;
type COption = CFuncion | ToolOption;
const C: COption;
```

