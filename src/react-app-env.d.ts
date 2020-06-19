// /// <reference types="react-scripts" />

// declare module '*.css' {
//     const css: any;
//     export default css
// }

declare module '*.css' {
    interface IClassNames {
      [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
  }