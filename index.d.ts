import * as _xlou_ajax from '@xlou/ajax';
import * as _xlou_webtools from '@xlou/webtools';

declare const tools: {
    Base64: _xlou_webtools.Base64Options;
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
    ajax: _xlou_ajax.AjaxOptions;
    createDOM: (str: string) => unknown[];
    htmlCir: (obj: any, callback: Function) => string;
    str: (arg: any) => any;
    one: (target: any, range: any) => any;
    all: (target: any, range: any) => unknown[];
    setState: (obj: any, str: any) => void;
    watch(conta: any, arg: any): void;
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
    route: () => any;
    formatInput: (msg: any) => void;
    create: (node: any) => Clean | undefined;
};
declare const getter: any;
interface ToolOption {
    create: typeof tools.create;
}
type CFuncion = (que: string, range?: Document) => Clean;
type COption = CFuncion | ToolOption;
interface Clean {
    readonly length: number;
    get parent(): typeof getter.parent;
    get style(): string;
    set style(value: any);
    get value(): any;
    set value(value: any);
    get checked(): boolean | undefined;
    set checked(value: boolean);
    get text(): string;
    set text(value: any);
    push: (dom: any) => void;
    concat: (...arg: any) => void;
    nth: (index: number) => Clean;
    append: (str: string) => void;
    prepend: (str: string) => void;
    before: (str: string) => void;
    after: (str: string) => void;
    map: (callback: (item: Clean, i: string) => void) => void;
    render: (str: string) => void;
    remove: () => void;
    show: (type?: string) => void;
    hide: () => void;
    getAttr: (attr: string) => null | string;
    setAttr: (attr: string, value: any) => void;
    addClass: (name: string) => void;
    removeClass: (name: string) => void;
    hasClass: (name: string) => boolean;
    bind: (type: string, callback: Function, option: any) => void;
    unbind: (type: string, callback: Function, option: any) => void;
}
declare class Clean {
    constructor();
}
declare const C: COption;

export { COption, Clean, C as default };
