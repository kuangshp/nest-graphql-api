declare module '*.css' {
  const css: { [key: string]: string };
  export default css;
}
declare module '*.css' {
  const content: {
    [propName: string]: any;
  };
  export default content;
}

declare module '*.scss' {
  const content: any;
  export default content;
}

declare module '*.less' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const content: object;
  export default content;
}

interface System {
  import<T = any>(module: string): Promise<T>;
}

declare const System: System;

declare module 'react-async-component';

interface Window {
  __state__: any;
}

interface CommonElement {
  styleName?: string;
  [propName: string]: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    // 给div元素增加styleName属性，为了兼容 react-css-modules 库
    div: CommonElement;
    [elemName: string]: any;
  }
}

declare module 'redux-logger';
