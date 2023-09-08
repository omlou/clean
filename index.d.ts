interface Clean {
    get parent(): Clean;
}
declare class Clean {
    constructor();
}
declare function C(que: string, range?: Document): Clean;

export { C as default };
