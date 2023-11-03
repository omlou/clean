/* 生成表格 DOM 相关 */
export const tagReg = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
export enum TagMap {
  thead = "table",
  tbody = "table",
  col = "colgroup",
  tr = "tbody",
  td = "tr"
}

/* 钩子函数相关 */
export default {
  mountArr: [],
  loadArr: [],
  showArr: [],
  beforeunloadArr: [],
  hideArr: [],
  visibleArr: []
}