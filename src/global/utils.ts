interface IData {
  name: string,
  caption?: string,
  img?: string
}

interface IConfig {
  title?: string;
  description?: string;
  data?: IData[];
}

export {
  IConfig,
  IData
}