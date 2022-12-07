interface IData {
  name: string,
  caption?: string,
  img?: string,
  file?: File
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