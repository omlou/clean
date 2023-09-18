interface ToolOption {
    [prop: string]: Function;
}
type CFuncion = (que: string, range?: Document) => Clean;
type COption = CFuncion | ToolOption;
interface Clean {
    readonly length: number;
    get parent(): Clean;
    get child(): Clean;
    get next(): Clean;
    get prev(): Clean;
    get first(): Clean;
    get last(): Clean;
    get array(): Array<any>;
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
