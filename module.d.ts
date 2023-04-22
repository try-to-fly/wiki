declare module "*.module.scss" {
  interface IMyClassNames {
    readonly [key: string]: string;
  }
  const classNames: IMyClassNames;
  export = classNames;
}
