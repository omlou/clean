let e$1 = class e{constructor(e){e&&(this.key=e);}key="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";encode(e){let t,r,o,n,i,a,l,f="",c=0;for(e=this.utf8_encode(e);c<e.length;)t=e.charCodeAt(c++),r=e.charCodeAt(c++),o=e.charCodeAt(c++),n=t>>2,i=(3&t)<<4|r>>4,a=(15&r)<<2|o>>6,l=63&o,isNaN(r)?a=l=64:isNaN(o)&&(l=64),f=f+this.key.charAt(n)+this.key.charAt(i)+this.key.charAt(a)+this.key.charAt(l);return f}decode(e){let t,r,o,n,i,a,l,f="",c=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");c<e.length;)n=this.key.indexOf(e.charAt(c++)),i=this.key.indexOf(e.charAt(c++)),a=this.key.indexOf(e.charAt(c++)),l=this.key.indexOf(e.charAt(c++)),t=n<<2|i>>4,r=(15&i)<<4|a>>2,o=(3&a)<<6|l,f+=String.fromCharCode(t),64!=a&&(f+=String.fromCharCode(r)),64!=l&&(f+=String.fromCharCode(o));return f=this.utf8_decode(f).replace(/\u0000/g,""),f}utf8_encode(e){e=e.replace(/\r\n/g,"\n");let t="";for(let r=0;r<e.length;r++){let o=e.charCodeAt(r);o<128?t+=String.fromCharCode(o):o>127&&o<2048?(t+=String.fromCharCode(o>>6|192),t+=String.fromCharCode(63&o|128)):(t+=String.fromCharCode(o>>12|224),t+=String.fromCharCode(o>>6&63|128),t+=String.fromCharCode(63&o|128));}return t}utf8_decode(e){let t="",r=0,o=0,n=0,i=0;for(;r<e.length;)o=e.charCodeAt(r),o<128?(t+=String.fromCharCode(o),r++):o>191&&o<224?(n=e.charCodeAt(r+1),t+=String.fromCharCode((31&o)<<6|63&n),r+=2):(n=e.charCodeAt(r+1),i=e.charCodeAt(r+2),t+=String.fromCharCode((15&o)<<12|(63&n)<<6|63&i),r+=3);return t}};function t$1(e,r=new Set){if("object"!=typeof e||null===e)return e;if(r.has(e))return e;let o;switch(r.add(e),e.constructor){case Array:o=[];for(let n of e)o.push(t$1(n,r));break;case Set:o=new Set,e.forEach((e=>{o.add(t$1(e,r));}));break;case Map:o=new Map,e.forEach(((e,n)=>{o.set(t$1(n,r),t$1(e,r));}));break;default:o={};for(let n in e)o[n]=t$1(e[n],r);}return o}function r$1(e,t,r){let o={};if(!t)return Object.assign(o,e);let n=t.split(",");if(void 0===r&&(r=!0),r)for(let t of n)t=t.trim(),e[t]&&(o[t]=e[t]);else {Object.assign(o,e);for(let e of n)delete o[e];}return o}function o$1(e=window.location.href){let t={},r=e.indexOf("?");if(-1===r)return t;let o=e.indexOf("#");(-1===o||r>o)&&(o=void 0);let n=e.slice(r+1,o);if(""===n)return t;let i=n.split("&");for(let e of i){if(!e)continue;let r=e.split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]||"");}return t}function n$1(e,t=!1){let r=[];for(let t in e)null!==e[t]&&void 0!==e[t]||(e[t]=""),r.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));let o=r.join("&");return o&&t?"?"+o:o}function i(e,t){if(void 0===e)return;let r=Number(e);if(isNaN(r))throw "argument for toFixed error";if(r>Math.pow(10,21))return String(r);let o=Number(t);if(void 0===t||0==o)return String(Math.round(r));if(isNaN(o))throw "The argument of C.toFixed must be a number";if(o>20||o<0)throw "The second argument of C.toFixed must be between 0 and 20";let n=String(r),i=n.split(".");if(i.length<2){n+=".";for(let e=0;e<o;e++)n+="0";return n}let a=i[0],l=i[1];if(l.length==o)return n;if(l.length<o){for(let e=0;e<o-l.length;e++)n+="0";return n}n=a+"."+l.slice(0,o);let f=l.slice(o,o+1);if(parseInt(f,10)>=5){let e=10**o;n=(parseFloat(n)*e+1)/e,n=n.toFixed(o);}return n}function a$1(e){const{document:t}=window,r=t.createElement("form"),{data:o}=e;delete e.data;for(let t in e)e[t]&&(r[t]=e[t]);r.style.display="none";for(let e in o){const n=t.createElement("input");n.setAttribute("type","hidden"),n.setAttribute("name",e),n.value=o[e],r.appendChild(n);}t.body.appendChild(r),r.submit();}function l$1(e){return new Promise(((t,r)=>{const o=new XMLHttpRequest;o.onload=e=>{t(o.response);},o.onerror=e=>{r(e);},o.open("GET",e,!0),o.send();}))}function f(e){return new Promise(((t,r)=>{const o=new XMLHttpRequest;o.onload=e=>{t(JSON.parse(o.response));},o.onerror=e=>{r(e);},o.open("GET",e,!0),o.send();}))}function c(e){let t=localStorage.getItem(e);if("string"==typeof t)try{t=JSON.parse(t);}catch(e){}return t}function d$1(e,t){if("object"==typeof t&&null!==t)try{t=JSON.stringify(t);}catch(e){}localStorage.setItem(e,t);}function s$1(){return Math.floor(1e14*Math.random()).toString(36)+Date.now().toString(36)}function u(e){let t=e.toLowerCase(),r=[];if(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)){if(4===t.length){let e="#";for(let r=1;r<4;r+=1)e+=t.slice(r,r+1).concat(t.slice(r,r+1));t=e;}for(let e=1;e<7;e+=2)r.push(parseInt("0x"+t.slice(e,e+2)));return r}if(/^(rgb\(|RGB\()[\s\S]+\)/.test(t))return r=t.replace(/( |\(|\)|rgb|RGB)+/g,"").split(","),r.map(Number)}function h(e,t="text/plain"){let r=null;return r="[object Blob]"===Object.prototype.toString.call(e)?new ClipboardItem({[t]:e}):Array.isArray(e)?new ClipboardItem({[t]:new Blob(e,{type:t})}):new ClipboardItem({[t]:new Blob([e],{type:t})}),navigator.clipboard.write([r])}var p={Base64:e$1,deepCopy:t$1,filterObject:r$1,getQuery:o$1,queryString:n$1,toFixed:i,formSubmit:a$1,readText:l$1,readJSON:f,getStore:c,setStore:d$1,unid:s$1,colorRGB:u,clipboardWrite:h};

function e(e,t=!1){let o=[];for(let t in e)null!==e[t]&&void 0!==e[t]||(e[t]=""),o.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));let n=o.join("&");return n&&t?"?"+n:n}var t,o;!function(e){e.DF="",e.AB="arraybuffer",e.Blob="blob",e.DOC="document",e.JSON="json",e.TXT="text";}(t||(t={})),function(e){e.json="application/json;charset=UTF-8",e.urlencoded="application/x-www-form-urlencoded;charset=UTF-8",e.formData="multipart/form-data",e.text="text/plain;charset=UTF-8",e.xml="application/xml;charset=UTF-8",e.stream="application/octet-stream";}(o||(o={}));const n=new Set(["[object String]","[object FormData]","[object Blob]","[object ArrayBuffer]","[object URLSearchParams]","[object Null]","[object Undefined]"]),r=new Set(["GET","DELETE","HEAD","OPTIONS","TRACE"]);function s(t,o){if(!o)return "";let n="string"==typeof o?o:e(o);return n?-1!==t.indexOf("?")?"&"+n:"?"+n:""}function a(t,s,a,d){return r.has(d)?null:(n.has(Object.prototype.toString.call(t))||(s?s.includes("application/json")?t=JSON.stringify(t):s.includes("application/x-www-form-urlencoded")&&(t=e(t)):(a.setRequestHeader("Content-Type",o.json),t=JSON.stringify(t))),t)}function d(e){const t={};if(null!==e){const o=e.trim().split(/[\r\n]+/);for(const e of o){const o=e.split(": ");t[o[0]]=o[1];}}return t}const l=function(e){return new Promise((function(o,n){const r=new XMLHttpRequest;r.addEventListener("load",(t=>{const s=d(r.getAllResponseHeaders()),a={request:r,config:e,headers:s,response:r.response,status:r.status,statusText:r.statusText};var l;(l=r.status)>=200&&l<=299?o(a):n(a);})),r.addEventListener("error",(e=>{n(e);})),r.addEventListener("timeout",(e=>{n(e);})),e.uploadProgress&&(r.upload.addEventListener("loadstart",(t=>{e.uploadProgress(t);})),r.upload.addEventListener("progress",(t=>{e.uploadProgress(t);})),r.upload.addEventListener("load",(t=>{e.uploadProgress(t);})),r.upload.addEventListener("loadend",(t=>{e.uploadProgress(t);})),r.upload.addEventListener("error",(t=>{e.uploadProgress(t);}))),e.downloadProgress&&(r.addEventListener("loadstart",(t=>{e.downloadProgress(t);})),r.addEventListener("progress",(t=>{e.downloadProgress(t);})),r.addEventListener("loadend",(t=>{e.downloadProgress(t);})));let{method:l,url:i,params:u,data:p,headers:c,timeout:f,responseType:g,withCredentials:m}=e;if(l=l?l.toUpperCase():"GET",u&&(i+=s(i,u)),r.open(l,i,!0),void 0!==m&&(r.withCredentials=m),r.responseType=g||t.JSON,c){let e="";for(const t in c){let o=c[t];o=null==o?"":String(o),r.setRequestHeader(t,o);"content-type"===t.toLowerCase()&&(e=o);}p=a(p,e,r,l);}else p=a(p,"",r,l);r.timeout=f||0,r.send(p);}))};

/* 生成表格 DOM 相关 */
const tagReg = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
var TagMap;
(function (TagMap) {
    TagMap["thead"] = "table";
    TagMap["tbody"] = "table";
    TagMap["col"] = "colgroup";
    TagMap["tr"] = "tbody";
    TagMap["td"] = "tr";
})(TagMap || (TagMap = {}));
/* 钩子函数相关 */
var variable = {
    mountArr: [],
    loadArr: [],
    showArr: [],
    beforeunloadArr: [],
    hideArr: [],
    visibleArr: []
};

/* Clean 对象的操作相关 */
function isElement(dom) {
    return dom instanceof HTMLElement;
}
/* Clean 原型 setter，包含 getter */
const setter = {
    /* 修改 DOM */
    style: {
        get() {
            return this[0].style;
        },
        set(value) {
            return switchType(this, value, "style");
        }
    },
    value: {
        get() {
            return this[0].value;
        },
        set(value) {
            return switchType(this, value, "value");
        }
    },
    checked: {
        get() {
            return this[0].checked;
        },
        set(value) {
            return switchType(this, value, "checked");
        }
    },
    text: {
        get() {
            return this[0].innerText;
        },
        set(value) {
            return switchType(this, value, "text");
        }
    }
};
function switchType(nodelist, value, type) {
    if (nodelist.length === 0)
        throw "Target has no elements";
    switch (type) {
        case "style": {
            if (typeof value === "string") {
                for (const i in nodelist) {
                    nodelist[i].style.cssText = value;
                }
            }
            else {
                for (const i in nodelist) {
                    for (const j in value) {
                        nodelist[i].style[j] = value[j];
                    }
                }
            }
            break;
        }
        case "value": {
            for (const i in nodelist) {
                nodelist[i].value = value;
            }
            break;
        }
        case "checked": {
            for (const i in nodelist) {
                nodelist[i].checked = value;
            }
            break;
        }
        case "text": {
            for (const i in nodelist) {
                nodelist[i].innerText = value;
            }
            break;
        }
    }
}
var method = {
    /* DOM 相关 */
    remove: function () {
        for (let i in this) {
            const tar = this[i];
            tar.parentNode.removeChild(tar);
        }
    },
    /* 修改dom */
    show: function (type) {
        type = type || "";
        for (const i in this) {
            this[i].style.display = type;
        }
    },
    hide: function () {
        for (const i in this) {
            this[i].style.display = "none";
        }
    },
    getAttr: function (attr) {
        return this[0].getAttribute(attr);
    },
    setAttr: function (attr, value) {
        for (const i in this) {
            this[i].setAttribute(attr, value);
        }
    },
    addClass: function (name) {
        for (const i in this) {
            this[i].classList.add(name);
        }
    },
    removeClass: function (name) {
        for (const i in this) {
            this[i].classList.remove(name);
        }
    },
    hasClass: function (name) {
        return this[0].classList.contains(name);
    },
    /* 绑定事件监听 */
    bind: function (type, callback, option) {
        for (const i in this) {
            this[i].addEventListener(type, callback, option);
        }
    },
    unbind: function (type, callback, option) {
        for (const i in this) {
            this[i].removeEventListener(type, callback, option);
        }
    }
};

function getUrl(msg) {
    if (typeof msg === "string")
        return msg;
    if (!msg.url)
        return "";
    msg.url = msg.url || window.location.href;
    const oparams = msg.params ? encodeURIComponent(JSON.stringify(msg.params)) : "";
    let oquery = p.queryString(msg.query);
    if (oparams) {
        oquery = oquery ? (oquery + "&__CLEANDATA__=" + oparams) : ("__CLEANDATA__=" + oparams);
    }
    let ourl = msg.url.indexOf('?') !== -1 ? '&' + oquery : '?' + oquery;
    return msg.url + ourl;
}
var tool = {
    /* DOM 相关 */
    createDOM: function (str) {
        const res = tagReg.exec(str);
        const tag = res ? res[1] : null;
        const parentTag = tag ? (TagMap[tag] || "div") : "div";
        const contdom = document.createElement(parentTag);
        contdom.innerHTML = str;
        return Array.from(contdom.childNodes);
    },
    htmlCir: function (obj, callback) {
        let html = "";
        for (let i in obj) {
            html += callback(obj[i], i);
        }
        return html;
    },
    str: function (arg) {
        if (typeof arg === "string" || (typeof arg === "object" && typeof arg !== null)) {
            return JSON.stringify(arg).replace(/"/g, "&quot;");
        }
        if (typeof arg === "function") {
            return `(${arg})`.replace(/"/g, "&quot;");
        }
        return arg;
    },
    one: function (target, range) {
        range = range || document;
        return range.querySelector(target);
    },
    all: function (target, range) {
        range = range || document;
        return Array.from(range.querySelectorAll(target));
    },
    /* 变量相关 */
    setState: function (obj, str) {
        if (str) {
            const arr = str.split(",");
            for (const item of arr) {
                window[item] = obj[item];
            }
        }
        else {
            Object.assign(window, obj);
        }
    },
    proxy(conta, arg) {
        for (let i in arg) {
            const item = arg[i];
            if (item.immediate) {
                item.handler(conta[i], undefined);
            }
        }
        return new Proxy(conta, {
            get(target, property) {
                return Reflect.get(target, property);
            },
            set(target, property, value) {
                const oldValue = Reflect.get(target, property);
                Reflect.set(target, property, value);
                if (arg[property]) {
                    arg[property].handler(value, oldValue);
                }
                return true;
            }
        });
    },
    /* 独立钩子函数 */
    mounted: function (callback) {
        variable.mountArr.push(callback);
    },
    loaded: function (callback) {
        variable.loadArr.push(callback);
    },
    beforeUnload: function (callback) {
        variable.beforeunloadArr.push(callback);
    },
    visible: function (callback) {
        variable.visibleArr.push(callback);
    },
    pageShow: function (callback) {
        variable.showArr.push(callback);
    },
    pageHide: function (callback) {
        variable.hideArr.push(callback);
    },
    /* 绑定事件的扩展，如：<div class="hello" onclick="C.self(sayHello,'123',this)"> */
    prevent: function (callback, ev, ...arg) {
        ev.preventDefault();
        if (callback)
            callback(ev, ...arg);
    },
    stop: function (callback, ev, ...arg) {
        ev.stopPropagation();
        if (callback)
            callback(ev, ...arg);
    },
    self: function (callback, ev, ...arg) {
        const { currentTarget, target } = ev;
        if (currentTarget === target)
            callback(ev, ...arg);
    },
    /* 路由 */
    push: function (msg) {
        window.location.href = getUrl(msg);
    },
    replace: function (msg) {
        window.location.replace(getUrl(msg));
    },
    reload: function () {
        window.location.reload();
    },
    back: function () {
        window.history.back();
    },
    forward: function () {
        window.history.forward();
    },
    go: function (index) {
        window.history.go(index);
    },
    route: function () {
        const res = {};
        const allQuery = p.getQuery();
        let params = decodeURIComponent(allQuery["__CLEANDATA__"]);
        res.params = !(params === 'undefined' || params === '') ? JSON.parse(params) : {};
        delete allQuery['__CLEANDATA__'];
        res.query = allQuery;
        return res;
    },
    /* Form 表单相关 */
    formatInput: function (msg) {
        let { el, rules, reg, nopass, pass } = msg;
        const doc = window.document;
        const domArr = doc.querySelectorAll(el);
        domArr.forEach(item => {
            formatItem(item);
        });
        function formatItem(dom) {
            let nowval = dom.value;
            dom.addEventListener('input', bindLimit);
            dom.addEventListener('compositionstart', (event) => {
                dom.removeEventListener('input', bindLimit);
            });
            dom.addEventListener('compositionend', (event) => {
                bindLimit(event);
                dom.addEventListener('input', bindLimit);
            });
            function bindLimit(ev) {
                const inpval = ev.target.value;
                let allpass = true;
                if (rules) {
                    for (let item of rules) {
                        regVal(item.reg, item.nopass);
                        if (!allpass)
                            break;
                    }
                }
                else {
                    regVal(reg, nopass);
                }
                if (allpass) {
                    const oldvalue = nowval;
                    nowval = ev.target.value;
                    if (pass)
                        pass(nowval, oldvalue);
                }
                function regVal(mreg, mnopass) {
                    if (!mreg.test(inpval)) {
                        mnopass({ nopassValue: inpval });
                        ev.target.value = nowval;
                        allpass = false;
                    }
                }
            }
        }
    }
};

/* 工具方法，直接挂载在 C 方法下 */
const tools = {
    /* DOM 相关 */
    create: function (node) {
        const obj = createClean();
        if ((node instanceof NodeList) || (node instanceof Array)) {
            const j = 0;
            createAll(obj, j, node);
            return obj;
        }
        if (createOne(obj, node, 0))
            return obj;
    },
    ...tool,
    ajax: l,
    ...p
};
const instance = {
    /* 基本方法 */
    nth: function (index) {
        const obj = createClean();
        return initOne(obj, () => this[index]);
    },
    map: function (callback) {
        const arr = [];
        for (let i in this) {
            arr.push(callback(this[i], i));
        }
        return arr;
    },
    push: function (dom) {
        createOne(this, dom, this.length);
    },
    concat: function (...arg) {
        for (let item of arg) {
            const j = this.length;
            createAll(this, j, item);
        }
    },
    /* 增删DOM */
    render: function (str) {
        for (let i in this) {
            this[i].innerHTML = str;
        }
    },
    append: function (str) {
        for (let i in this) {
            tools.createDOM(str).map(item => {
                this[i].appendChild(item);
            });
        }
    },
    prepend: function (str) {
        for (const i in this) {
            const tar = this[i];
            const first = tar.firstChild;
            tools.createDOM(str).map(item => {
                tar.insertBefore(item, first);
            });
        }
    },
    before: function (str) {
        for (let i in this) {
            const tar = this[i];
            const parent = tar.parentNode;
            tools.createDOM(str).map(item => {
                parent.insertBefore(item, tar);
            });
        }
    },
    after: function (str) {
        for (let i in this) {
            const tar = this[i];
            const parent = tar.parentNode;
            const next = tar.nextSibling;
            tools.createDOM(str).map(item => {
                parent.insertBefore(item, next);
            });
        }
    },
    ...method
};
/* Clean 对象的操作相关 */
function setLength(obj, length) {
    Object.defineProperty(obj, "length", { value: length });
}
function createOne(obj, node, length) {
    if (isElement(node)) {
        obj[length] = node;
        setLength(obj, length + 1);
        return true;
    }
    else {
        throw "Parameter is not an element";
    }
}
function createAll(obj, length, nodelist) {
    for (const i in nodelist) {
        const dom = nodelist[i];
        if (isElement(dom)) {
            obj[length] = dom;
            length++;
        }
        else {
            throw "Parameter items are not all elements";
        }
    }
    setLength(obj, length);
}
function initOne(tar, callback) {
    const item = callback();
    if (item) {
        tar[0] = item;
        setLength(tar, 1);
    }
    return tar;
}
function initAll(tar, list, callback) {
    let j = 0;
    for (const i in list) {
        const item = callback(list[i]);
        if (item) {
            tar[j] = item;
            j++;
        }
    }
    setLength(tar, j);
    return tar;
}
/* DOM 通用方法 */
function switchTask(nodelist, type) {
    if (nodelist.length === 0)
        throw "Target has no elements";
    const obj = createClean();
    switch (type) {
        case "parent":
            return initOne(obj, () => nodelist[0].parentNode);
        case "child":
            return initAll(obj, Array.from(nodelist[0].children), (item) => item);
        case "next":
            return initAll(obj, nodelist, (item) => item.nextElementSibling);
        case "prev":
            return initAll(obj, nodelist, (item) => item.previousElementSibling);
        case "first":
            return initAll(obj, nodelist, (item) => item.children[0]);
        case "last":
            return initAll(obj, nodelist, (item) => {
                const child = item.children;
                return child[child.length - 1];
            });
    }
}
/* Clear 原型 getter */
const getter = {
    /* 查寻 DOM */
    parent() { return switchTask(this, "parent"); },
    child() { return switchTask(this, "child"); },
    next() { return switchTask(this, "next"); },
    prev() { return switchTask(this, "prev"); },
    first() { return switchTask(this, "first"); },
    last() { return switchTask(this, "last"); },
    /* 工具 */
    array() { return Array.from(this); } // 转换为数组
};
class Clean {
    constructor() {
        Object.defineProperty(this, "length", { value: 0, configurable: true });
    }
}
function createClean() {
    for (let i in getter) { // 挂载原型的getter
        Object.defineProperty(Clean.prototype, i, {
            get: getter[i]
        });
    }
    for (let i in setter) { // 挂载原型的setter
        let item = setter[i];
        Object.defineProperty(Clean.prototype, i, {
            get: item.get,
            set: item.set
        });
    }
    for (const i in instance) { // 挂载原型的方法
        Object.defineProperty(Clean.prototype, i, {
            value: instance[i]
        });
    }
    return new Clean();
}
const C = function (que, range) {
    range = range || document;
    const list = range.querySelectorAll(que);
    const clean = createClean();
    Object.assign(clean, list);
    setLength(clean, list.length);
    return clean;
};
/* mount 钩子函数相关 */
function DOMLoaded(event) {
    for (const item of variable.mountArr) {
        item(event);
    }
    variable.mountArr = [];
}
/* 初始化 Clean */
(function initClear() {
    Object.assign(C, tools);
    if (document.readyState === "loading") {
        document.addEventListener('DOMContentLoaded', DOMLoaded);
    }
    else {
        DOMLoaded(null);
    }
    window.addEventListener('load', (event) => {
        for (const item of variable.loadArr) {
            item(event);
        }
    });
    window.addEventListener('beforeunload', (event) => {
        for (const item of variable.beforeunloadArr) {
            item(event);
        }
    });
    document.addEventListener("visibilitychange", (event) => {
        for (const item of variable.visibleArr) {
            item({
                event: event,
                state: document.visibilityState
            });
        }
    });
    window.addEventListener('pageshow', (event) => {
        for (const item of variable.showArr) {
            item(event);
        }
    });
    window.addEventListener('pagehide', (event) => {
        for (const item of variable.hideArr) {
            item(event);
        }
    });
})();

export { Clean, C as default };
