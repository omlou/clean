(function(win,doc){
  // 主方法工具对象（框架使用，不向外暴露）
  var cmain={
		// 生成表格DOM相关
		tagReg:/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
		tagMap:{
			"thead":"table",
			"tbody":"table",
			"col":"colgroup",
			"tr":"tbody",
			"td":"tr"
    },
		// 钩子函数相关
		isShow:true,
		mountArr:[],
		loadArr:[],
		showArr:[],
		beforeunloadArr:[],
		hideArr:[],
		unloadArr:[],
    // 初始化一个clear对象
    get clear(){
      var obj=Object.create(new this.Clear)
      Object.defineProperty(obj,"length",{value:0,configurable:true})
      return obj
    },
    // 框架通用方法
    creatCoputed(conta,arg){ // 创建computed
      for(let i in arg){
        Object.defineProperty(conta,i,{
          get:arg[i]
        })
      }
    },
		creatProxy(conta,arg){ // 创建proxy
			for(let i in arg){
				let item=arg[i]
				Object.defineProperty(conta,i,{
					get(){
						return item.value
					},
					set(value){
						var ov=item.value
						item.value=value
						item.watch(value,ov)
						return true
					}
				})
				if(item.immediate)item.watch(item.value,null)
			}
    },
    /* 处理路径参数 */
		getUrl(msg){ // 将url和参数字符串凭借在一起
			if(!msg.url)return ""
			var oparams=msg.params?encodeURIComponent(JSON.stringify(msg.params)):""
			var oquery=chttp.getQueryString(msg.query)
			if(oparams){
				oquery?(oquery+="&clearparams="+oparams):(oquery="clearparams="+oparams)
			}
			var ourl=msg.url.indexOf('?')!==-1?'&'+oquery:'?'+oquery
			return msg.url+ourl
		},
		getAllQuery(){ // 将地址参数转换为对象
			var qurl=(win.location.href.match(/\?([\S\s]*)/)||[])[1]
			if(!qurl) return {}
			var qlarr=qurl.split("&"),
				qlobj={}
			for(let item of qlarr){
				let itemarr=item.split("=")
				qlobj[decodeURIComponent(itemarr[0])]=decodeURIComponent(itemarr[1])
			}
			return qlobj
    },
		getPath(){ // 获取到当前的路由
			var {pathname}=win.location
			var starti=pathname.lastIndexOf("/")+1
			var endi=pathname.indexOf(".",starti)
			var path=(endi!==-1)?pathname.slice(starti,endi):pathname.slice(starti)
			return (path||"index")
		},
    // 将匹配css选择器的dom转换成clear对象
    C(que,range){
			range=(range||doc)
      var list=range.querySelectorAll(que),
        obj=this.clear
      Object.assign(obj,list)
      this.setLength(obj,list.length)
      return obj
    },
    // 原型构造函数
    Clear:function(){
      for(let i in cget){ // 挂载原型的getter
        Object.defineProperty(this,i,{
          get:cget[i]
        })
      }
			for(let i in cset){ // 挂载原型的setter
				let item=cset[i]
        Object.defineProperty(this,i,{
					get:item.get,
          set:item.set
        })
			}
			for(let i in cfunc){ // 挂载原型的方法
				Object.defineProperty(this,i,{
					value:cfunc[i]
				})
			}
    },
    // 将原始dom转换为clear对象相关
    isElement(dom){ // 判断是不是一个DOM对象
      return (dom.nodeType===1)&&(typeof dom.nodeName==='string')?true:false
    },
    createOne(obj,node,length){ // 添加一个dom元素，有判断
      if(this.isElement(node)){
        obj[length]=node
        this.setLength(obj,length+1)
        return true
      }else{
        throw "Parameter is not an element"
      }
    },
    createAll(obj,length,nodelist){ // 添加多个dom元素，有判断
      for(let i in nodelist){
        let dom=nodelist[i]
        if(this.isElement(dom)){
          obj[length]=dom
          length++
        }else{
          throw "Parameter items are not all elements"
        }
      }
      this.setLength(obj,length)
    },
    initOne(tar,callback){ // 初始化含一个元素的clear对象
      var item=callback()
      if(item){
        tar[0]=item
        this.setLength(tar,1)
      }
      return tar
    },
		initAll(tar,list,callback){ // 初始化含多个元素的clear对象
      var j=0
      for(let i in list){
        let item=callback(list[i])
        if(item){
          tar[j]=item
          j++
        }
      }
      this.setLength(tar,j)
      return tar
    },
    setLength(obj,length){ // 设置clear对象的长度
      Object.defineProperty(obj,"length",{value:length})
    },
		// dom通用方法
    switchType(nodelist,value,type){ // 处理三个参数
      if(nodelist.length===0)
        throw "Target has no elements"
      switch(type){
        case "style":
          if(typeof value==="string"){
            for(let i in nodelist){
              nodelist[i].style.cssText=value
            }
          }else{
            for(let i in nodelist){
							for(let j in value){
								nodelist[i].style[j]=value[j]
							}
						}
          }
          break
        case "value":
          for(let i in nodelist){
            nodelist[i].value=value
          }
					break
				case "checked":
					for(let i in nodelist){
            nodelist[i].checked=value
          }
					break
        case "text":
          for(let i in nodelist){
            nodelist[i].innerText=value
          }
          break
      }
    },
    switchTask(nodelist,type){ // 处理两个参数
      if(nodelist.length===0)
        throw "Target has no elements"
      var obj=this.clear
      switch(type){
        case "parent":
          return this.initOne(obj,()=>nodelist[0].parentNode)
        case "child":
          return this.initAll(obj,Array.from(nodelist[0].children),item=>item)
        case "next":
          return this.initAll(obj,nodelist,item=>item.nextElementSibling)
        case "prev":
          return this.initAll(obj,nodelist,item=>item.previousElementSibling)
        case "first":
          return this.initAll(obj,nodelist,item=>item.children[0])
        case "last":
          return this.initAll(obj,nodelist,item=>{
            var child=item.children
            return child[child.length-1]
          })
      }
    },
    // mount钩子函数相关
		listenDOMLoad(){
			doc.removeEventListener('DOMContentLoaded',this.listenDOMLoad)
			this.isShow=false
			for(let item of this.mountArr){item()}
			this.mountArr=[]
		},
		// 初始化clear
    initClear:function(){
      // 初始化钩子函数
			doc.addEventListener('DOMContentLoaded',this.listenDOMLoad.bind(this))
			win.addEventListener('load',()=>{
				for(let item of this.loadArr){item()}
			})
			win.addEventListener('pageshow',()=>{
				if(this.isShow)for(let item of this.showArr){item()}
			})
			win.addEventListener('beforeunload',()=>{
				for(let item of this.beforeunloadArr){item()}
			})
			win.addEventListener('pagehide',()=>{
				this.isShow=true
				for(let item of this.hideArr){item()}
			})
			win.addEventListener('unload',()=>{
				for(let item of this.unloadArr){item()}
      })
			// 挂载C
			win.C=this.C.bind(this)
      // 为C挂载工具方法
      Object.assign(win.C,ctool)
      win.C.ajax=chttp.ajax
      win.C.getQueryString=chttp.getQueryString
    }
  }
  // Clear原型getter
  var cget={
		// 查寻dom
		parent(){return cmain.switchTask(this,"parent")}, // 目标为单元素，获取父元素
		child(){return cmain.switchTask(this,"child")}, // 目标为单元素，获取全部子元素
		next(){return cmain.switchTask(this,"next")}, // 获取下一个元素
		prev(){return cmain.switchTask(this,"prev")}, // 获取上一个元素
		first(){return cmain.switchTask(this,"first")}, // 获取子元素里的第一个元素
		last(){return cmain.switchTask(this,"last")}, // 获取子元素里的最后一个元素
		// 工具
		toArray(){return Array.from(this)} // 转换为数组
	}
  // Clear原型setter，包含getter
  var cset={ // 读取都是目标是单元素
		// 修改dom
		style:{ // 获取和修改样式
			get(){
				return this[0].style
			},
			set(value){
				return cmain.switchType(this,value,"style")
			}
		},
		value:{ // 获取和修改表单元素的value
			get(){
				return this[0].value
			},
			set(value){
				return cmain.switchType(this,value,"value")
			}
		},
		checked:{ // 设置type="checkbox"或type="radio"input的选中状态
			get(){
				return this[0].checked
			},
			set(value){
				return cmain.switchType(this,value,"checked")
			}
		},
		text:{ // 获取和修改元素的innerText
			get(){
				return this[0].innerText
			},
			set(value){
				return cmain.switchType(this,value,"text")
			}
		}
  }
  // Clear原型方法
  var cfunc={
    // 基本方法
    map(callback){ // 遍历clear对象，类似数组的map
      for(let i in this){
        callback(this[i],i)
      }
    },
    push(dom){ // 添加对象
      cmain.createOne(this,dom,this.length)
    },
    concat(...arg){ // 拼接clear对象或NodeList对象等
      for(let item of arg){
        let j=this.length
        cmain.createAll(this,j,item)
      }
    },
    nth(index){ // 选取某个索引的元素生成一个clear对象
      var obj=cmain.clear
      return cmain.initOne(obj,()=>this[index])
    },
    // 增删DOM
    render(str){ // 向容器里渲染html
      for(let i in this){
        this[i].innerHTML=str
      }
    },
    append(str){ // 向容器里后面追加html
      for(let i in this){
        ctool.createDOM(str).map(item=>{
          this[i].appendChild(item)
        })
      }
    },
    prepend(str){ // 向容器里前面添加html
      for(let i in this){
        let tar=this[i],first=tar.firstChild
        ctool.createDOM(str).map(item=>{
          tar.insertBefore(item,first)
        })
      }
    },
    before(str){ // 向元素前面添加html
      for(let i in this){
        let tar=this[i],parent=tar.parentNode
        ctool.createDOM(str).map(item=>{
          parent.insertBefore(item,tar)
        })
      }
    },
    after(str){ // 向元素后面添加html
      for(let i in this){
        let tar=this[i],
          parent=tar.parentNode,
          next=tar.nextSibling
        ctool.createDOM(str).map(item=>{
          parent.insertBefore(item,next)
        })
      }
    },
    remove(){ // 移除元素
      for(let i in this){
        let tar=this[i]
        tar.parentNode.removeChild(tar)
      }
    },
    // 修改dom
    show(type){ // 显示元素
      type=(type||"")
      for(let i in this){
        this[i].style.display=type
      }
    },
    hide(){ // 隐藏元素
      for(let i in this){
        this[i].style.display="none"
      }
    },
    getAttr(attr){ // 目标为单元素，获取属性
      return this[0].getAttribute(attr)
    },
    setAttr(attr,value){ // 设置属性
      for(let i in this){
        this[i].setAttribute(attr,value)
      }
    },
    addClass(name){ // 添加class
      for(let i in this){
        this[i].classList.add(name)
      }
    },
    removeClass(name){ // 移除class
      for(let i in this){
        this[i].classList.remove(name)
      }
    },
    hasClass(name){ // 目标为单元素
      return this[0].classList.contains(name)
    },
    // 绑定事件监听
    bind(type,callback,option){
      for(let i in this){
        this[i].addEventListener(type,callback,option)
      }
    },
    unbind(type,callback,option){
      for(let i in this){
        this[i].removeEventListener(type,callback,option)
      }
    }
  }
  // 工具方法，直接挂载在C方法下
  var ctool={
    /* dom相关 */
    create(node){ // 将dom转换为clear对象
      var obj=cmain.clear
      if((node instanceof NodeList)||(node instanceof Array)){
        var j=0
        cmain.createAll(obj,j,node)
        return obj
      }
      if(cmain.createOne(obj,node,0))return obj
    },
    createDOM(str){ // 将html转换为dom数组
      var {tagReg,tagMap}=cmain
			var tag=tagReg.exec(str)[1],
				parentTag=(tagMap[tag]||"div")
			var contdom=doc.createElement(parentTag)
			contdom.innerHTML=str
			return Array.from(contdom.childNodes)
    },
		htmlCir(obj,callback){ // 循环数组或对象生成html
			var html=""
			for(let i in obj){
				html+=callback(obj[i],i)
			}
			return html
		},
		str(arg){ // 在模板字符串中绑定属性和传递参数时处理变量
			if((typeof(arg)==="object"||typeof(arg)==="string")&&typeof(arg)!==null){
				return JSON.stringify(arg).replace(/"/g,"&quot;")
			}
			return arg
		},
    one(target,range){ // 按css选择器选取一个dom，返回dom对象
      range=(range||doc)
      return range.querySelector(target)
    },
    all(target,range){ // 按css选择器选取多个dom，返回数组
      range=(range||doc)
      return Array.from(range.querySelectorAll(target))
    },
    // 页面框架部分
    page({data,computed,proxy,methods,create,mount,load,show,beforeunload,hide,unload}){
			// data&methods
			Object.assign(win,data,methods)
			// computed
			cmain.creatCoputed(win,computed)
			// proxy
			cmain.creatProxy(win,proxy)
			// 生命周期钩子函数
			if(create)create()
			if(mount)cmain.mountArr.push(mount)
			if(load)cmain.loadArr.push(load)
			if(show)cmain.showArr.push(show)
			if(beforeunload)cmain.beforeunloadArr.push(beforeunload)
			if(hide)cmain.hideArr.push(hide)
			if(unload)cmain.unloadArr.push(unload)
		},
		component(obj){
			var {name,data,computed,proxy,methods,render,mount}=obj
			if(!name)throw "Component must have a name"
			var compobj={}
			// 复制
			Object.assign(compobj,data,methods,render,mount)
			// computed
			cmain.creatCoputed(compobj,computed)
			// proxy
			cmain.creatProxy(compobj,proxy)
			// 挂载
			win[name]=compobj
			return compobj
		},
		setData(obj,str){ // 设置全局变量
			if(str){
				var arr=str.split(",")
				for(let item of arr){
					win[item]=obj[item]
				}
			}else{
				Object.assign(win,obj)
			}
		},
		setProxy(obj,target=win){ // 设置属性的set
			cmain.creatProxy(target,obj)
		},
		// 独立钩子函数
		mount(callback){
			cmain.mountArr.push(callback)
		},
		pageshow(callback){
			cmain.showArr.push(callback)
		},
		pagehide(callback){
			cmain.hideArr.push(callback)
		},
    // 绑定事件的扩展，如：<div class="hello" onclick="C.self(sayHello,'123',this)">
    prevent(callback,...arg){ // 阻止默认事件
      event.preventDefault()
      if(callback)callback(...arg)
    },
    stop(callback,...arg){ // 阻止事件冒泡
      event.stopPropagation()
      if(callback)callback(...arg)
    },
    self(callback,...arg){ // 只有目标是自身才触发
      var {currentTarget,target}=event
      if(currentTarget===target)callback(...arg)
    },
		// 缓存
		getStore(str){
			return JSON.parse(localStorage.getItem(str))
		},
		setStore(str,data){
			var datajson=JSON.stringify(data)
			localStorage.setItem(str,datajson)
		},
		delStore(str){
			localStorage.removeItem(str)
		},
		clearStore(){
			localStorage.clear()
		},
		// 路由
		push(msg){ // 跳转
			win.location.href=(msg instanceof Object)?cmain.getUrl(msg):msg
		},
		replace(msg){ // 替换
			win.location.replace((msg instanceof Object)?cmain.getUrl(msg):msg)
		},
		reload(){ // 重新加载
			win.location.reload()
		},
		back(){ // 返回
			win.history.back()
		},
		forward(){ // 下一个页面
			win.history.forward()
		},
		go(str){ // 跳转历史记录
			win.history.go(str)
    },
    // 网络连接
		getDOC(url,callback){ // 读取文件
			let xhr=new XMLHttpRequest()
			xhr.onload=e=>{
				callback(xhr.response)
			}
			xhr.open('GET',url,true)
			xhr.send()
		},
		getJSON(url,callback){ // 读取json文件
			this.getDOC(url,res=>{
				res?callback(JSON.parse(res)):callback("")
			})
		},
    formSubmit(obj){ // 模拟form表单提交
			var form=document.createElement("form"),
				data=obj.data
			Reflect.deleteProperty(obj,"data")
			for(let i in obj){
				obj[i]&&(form[i]=obj[i])
			}
			form.style.display="none"
			for(let i in data){
				let input=document.createElement("input")
				input.setAttribute("type","hidden")
				input.setAttribute("name",i)
				input.value=data[i]
				form.appendChild(input)
			}
			doc.body.appendChild(form)
			form.submit()
		},
		/* 工具 */
		deepCopy(obj){ // 深拷贝 var AObj=C.deepCopy(BObj)
			let a=(obj.constructor.name==="Array")?[]:{}
			for (let prop in obj) {
				if (typeof obj[prop]==='object'&&obj[prop]!==null) {
						a[prop]=(obj[prop].constructor.name==="Array")?[]:{}
						a[prop]=this.deepCopy(obj[prop])
				}else{
						a[prop]=obj[prop]
				}
			}
			return a
		},
		filterObject(obj,str,bol){ // 过滤对象
			var res={}
			if(str==undefined)return Object.assign(res,obj)
			var arr=str.split(",")
			if(bol===undefined)bol=true
			if(bol){
				for(let item of arr){
					obj[item]&&(res[item]=obj[item])
				}
			}else{
				Object.assign(res,obj)
				for(let item of arr){
					Reflect.deleteProperty(res,item)
				}
			}
			return res
		},
		toFixed(num,s){ // 保留几位小数
			if(num===undefined){ // 第一个参数为undefined
				return undefined
			}
			let numn=Number(num)
			if(isNaN(numn)){ // 第一个参数不是数字
				throw "argument for C.toFixed error"
			}
			if(numn>Math.pow(10,21)){ // 第一个参数太大
				return String(numn)
			}
			let sn=Number(s)
			if(s===undefined||sn==0){ // 没有第二个参数或者第一个数可以被Number()转化成0
				return String(Math.round(numn))
			}
			if(isNaN(sn)){ // 第二个参数不是个数字
				throw "The argument of C.toFixed must be a number"
			}
			if(sn>20||sn<0){ // 第二个参数超出范围
				throw "The second argument of C.toFixed must be between 0 and 20"
			}
			let nums=String(numn)
			let numarr=nums.split(".")
			if(numarr.length<2){
				nums+="."
				for(let i=0;i<sn;i++){
					nums+="0"
				}
				return nums
			}
			let int=numarr[0]
			let dec=numarr[1]
			if(dec.length==sn){
				return nums
			}
			if(dec.length<sn){
				for(let i=0;i<sn-dec.length;i++){
					nums+="0"
				}
				return nums
			}
			nums=int+"."+dec.slice(0,sn)
			let last=dec.slice(sn,sn+1)
			if(parseInt(last,10)>=5){
				let x=Math.pow(10,sn)
				nums=((parseFloat(nums)*x)+1)/x
				nums=nums.toFixed(sn)
			}
			return nums
		},
		formatInput(msg){ // 正则限制input输入
			var {el,rules,reg,nopass,pass}=msg
			var doc=window.document
			var domArr=doc.querySelectorAll(el)
			domArr.forEach(item=>{
				formatItem(item)
			})
			function formatItem(dom){
				var nowval=dom.value
				dom.addEventListener('input',bindLimit)
				dom.addEventListener('compositionstart',event=>{
					dom.removeEventListener('input',bindLimit)
				})
				dom.addEventListener('compositionend',event=>{
					bindLimit(event)
					dom.addEventListener('input',bindLimit)
				})
				function bindLimit(event){
					var inpval=event.target.value
					var allpass=true
					if(rules){
						for(let item of rules){
							regVal(item.reg,item.nopass)
							if(!allpass)break
						}
					}else{
						regVal(reg,nopass)
					}
					if(allpass){
						var oldvalue=nowval
						nowval=event.target.value
						if(pass)pass(nowval,oldvalue)
					}
					function regVal(mreg,mnopass){
						if(!mreg.test(inpval)){
							mnopass({nopassValue:inpval})
							event.target.value=nowval
							allpass=false
						}
					}
				}
			}
		},
		clearRoute(){ // 获取路由地址和参数
			var res={}
			var allquery=cmain.getAllQuery()
			var params=decodeURIComponent(allquery.clearparams)
			res.params=!(params=='undefined'||params=='')?JSON.parse(params):{}
			Reflect.deleteProperty(res,'clearparams')
			res.query=allquery
			res.path=cmain.getPath()
			return res
		}
	}
	// ajax对象，ajax、getQueryString方法暴露
	var chttp={
		ajax(msg){ // 发送ajax请求
			return new Promise(promiseFunc.bind(chttp))
			function promiseFunc(resolve,reject){
				var xhr=new XMLHttpRequest()
				// 请求结果返回处理
				xhr.addEventListener('load',e=>{
					if(msg.getResponse){
						var responseobj={}
						var response=xhr.getAllResponseHeaders().split('\r\n')
						for(let item of response){
							let itemarr=item.split(": ")
							if(itemarr[0])responseobj[itemarr[0]]=itemarr[1]
						}
						msg.getResponse(responseobj)
					}
					var {status}=xhr
					if(status==200){
						resolve(xhr.response)
					}else{
						reject({
							status,
							result:xhr,
							error:e
						})
					}
				})
				xhr.addEventListener('error', e => {
					reject({
						status:xhr.status,
						result:xhr,
						error:e
					})
				})
				xhr.addEventListener('timeout', e => {
					reject({
						status:xhr.status,
						result:xhr,
						error:e
					})
				})
				// 添加上传进度监听
				if(msg.uploadProgress){
					xhr.upload.addEventListener('loadstart',e=>{
						msg.uploadProgress(e)
					})
					xhr.upload.addEventListener('progress',e=>{
						msg.uploadProgress(e)
					})
					xhr.upload.addEventListener('load',e=>{
						msg.uploadProgress(e)
					})
					xhr.upload.addEventListener('loadend',e=>{
						msg.uploadProgress(e)
					})
					xhr.upload.addEventListener('error',e=>{
						msg.uploadProgress(e)
					})
				}
				// 添加下载监听
				if(msg.downloadProgress){
					xhr.addEventListener('loadstart',e=>{
						msg.downloadProgress(e)
					})
					xhr.addEventListener('progress',e=>{
						msg.downloadProgress(e)
					})
					xhr.addEventListener('loadend',e=>{
						msg.downloadProgress(e)
					})
				}
				// 请求参数处理
				var type=msg.method
				var {url,params,data,headers,timeout,responseType,withCredentials}=msg
				params=(params||{})
				data=(data||{})
				var simrequ=false // 默认不是简单请求
				if(!type){
					type="GET"
				}else{
					type=type.toUpperCase()
				}
				if((new Set(['GET','DELETE','HEAD','OPTIONS','TRACE'])).has(type))simrequ=true
				url+=this.getUrlParam(url,params)
				xhr.open(type,url,true)
				if(withCredentials!==undefined)xhr.withCredentials=withCredentials // 该参数控制请求是否携带cookie
				xhr.responseType=(responseType||"json")
				for(let i in headers){ // 读取headers参数
					xhr.setRequestHeader(i,headers[i])
					i=i.toLowerCase()
				}
				if(!((headers&&headers['content-type'])||(data.constructor.name=="FormData"))){ // 没有传Content-Type，也不是formdata
					xhr.setRequestHeader('content-type','application/x-www-form-urlencoded;charset=UTF-8')
				}else if((headers&&headers['content-type'])&&(headers['content-type'].indexOf('application/json')!==-1)&&(data instanceof Object)){
					data=JSON.stringify(data)
				}
				xhr.timeout=(timeout||60000)
				xhr.send(simrequ?null:this.getPostParam(data))
			}
		},
		getUrlParam(url,data){ // 处理参数字符串
			if(!data){return ""}
			var paramsstr=data instanceof Object ? this.getQueryString(data) : data
			return (url.indexOf('?')!==-1)?'&'+paramsstr:'?'+paramsstr
		},
		getPostParam(data){ // 处理post请求参数
			if(!data){return null}
			if((typeof data === "string")||(data instanceof FormData)){
				return data
			}
			return this.getQueryString(data)
		},
		getQueryString(data){ // 将参数对象转换为参数字符串
			let paramsarr=[]
			if (data instanceof Object) {
				for(let i in data){
					paramsarr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]))
				}
			}
			return paramsarr.join('&')
		}
	}
  cmain.initClear()
})(window,document)
/**
 * Developed by Xiaolou On September 20,2020
 */