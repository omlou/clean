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
