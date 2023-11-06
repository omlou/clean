C.mounted(function () {
  initWatch()
  inintReadme()
})
C.loaded(function () {
  if (location.hash) {
    scrollTarget = C(location.hash.replace("#", "#user-content-"))
    scrollWindow()
  }
})

/* 导航栏 */
function goIndex(){
  C.push("./index.html")
}

/* 激活时钟组件 */
function initWatch() {
  updateTime()
  setInterval(() => {
    updateTime()
  }, 1000)
  function updateTime() {
    let nowDate = new Date()
    let year = nowDate.getFullYear()
    let month = nowDate.getMonth()+1
    let date = nowDate.getDate()
    let hour = nowDate.getHours()
    let min = nowDate.getMinutes() < 10 ? ('0' + nowDate.getMinutes()) : nowDate.getMinutes()
    let sec = nowDate.getSeconds() < 10 ? ('0' + nowDate.getSeconds()) : nowDate.getSeconds()
    let day = nowDate.getDay()
    let cday = ""
    switch (day) {
      case 0:
        cday = "星期天"
        break
      case 1:
        cday = "星期一"
        break
      case 2:
        cday = "星期二"
        break
      case 3:
        cday = "星期三"
        break
      case 4:
        cday = "星期四"
        break
      case 5:
        cday = "星期五"
        break
      case 6:
        cday = "星期六"
    }
    let fdate = year + "年" + month + "月" + date + "日"
    if (C(".bdaday").text !== fdate) C(".bdaday").text = fdate
    if (C(".bdaweek").text !== cday) C(".bdaweek").text = cday
    C(".bdatime").text = hour + ":" + min + ":" + sec
  }
}

/* 激活页面滚动和锚点 */
let scrollInterval = ""
let scrollNow = 0
let scrollTarget = ""
let anchorList = []
let clickAnchor = false

function scrollWindow() {
  // 需要滚动的距离
  let	domTop = scrollTarget.parent[0].offsetTop - 20
  // 页面可以滚动的最大距离
  let scrollMax = C.one(".file_content").scrollHeight - C.one(".file_content").clientHeight
  if (domTop > scrollMax) domTop = scrollMax
  // 当前已经滚动的距离
  scrollNow = C.one(".file_content").scrollTop
  if ((scrollNow >= scrollMax) && (domTop >= scrollMax)) return
  // 计算每一帧滚动的距离
  let	scrolli = Math.round((domTop - scrollNow) / 200 * 20)
  // 第一次滚动
  if (domTop == scrollNow) return
  scrollNow += scrolli
  C.one(".file_content").scrollTo(0, scrollNow)
  // 每20ms执行一次
  scrollInterval = setInterval(() => {
    scrollNow = C.one(".file_content").scrollTop
    // 如果下一帧滚动距离超过需要滚动的距离
    if (domTop > scrollNow) {
      scrollNow += scrolli
      if (scrollNow > domTop) scrollNow = domTop
    } else if (domTop < scrollNow) {
      scrollNow += scrolli
      if (scrollNow < domTop) scrollNow = domTop
    }
    C.one(".file_content").scrollTo(0, scrollNow)
    // 如果滚动完成
    if (scrollNow == domTop) clearInterval(scrollInterval)
  }, 20)
}

function inintReadme() {
  C(".markdown-body .anchor").bind("click", function(event) {
    event.preventDefault()
    scrollTarget = C.create(event.target)
    location.hash = scrollTarget.getAttr("href")
    scrollWindow()
  })
  C(".file_catalog a").bind('click', function(event) {
    event.preventDefault()
    let { target } = event
    let href = target.getAttribute("href")
    location.hash = href
    // 获取目标的DOM
    scrollTarget = C(decodeURIComponent(href).replace("#", "#user-content-"))
    // 关闭滚动监听
    clickAnchor = true
    setActive(C.create(target))
    scrollWindow()
    setTimeout(() => {
      clickAnchor = false
    }, 300)
  })
  C(".file_content").bind("scroll", function(event) {
    if (clickAnchor) return
    for (let i in anchorList) {
      let item = anchorList[i]
      if (event.target.scrollTop + 20 < item.parentNode.offsetTop && i >= 1) {
        setActive(anchorList[i-1].getAttribute("id"))
        break
      }
    }
  })
  C.all(".markdown-body .anchor").map((item, i) => {
    anchorList.push(item)
  })
}
function setActive(str) {
  let target = typeof(str) == 'string' ? C(`.file_catalog a[href="${encodeURIComponent(str).replace("user-content-", "#")}"]`) : str
  if (target.parent.hasClass("active")) return
  C(".file_catalog .active").removeClass("active")
  target.parent.addClass("active")
}