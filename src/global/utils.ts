interface IData {
  name: string,
  caption?: string,
  img?: string
}

interface IConfig {
  columnsPerRow?: number;
  title?: string;
  description?: string;
  data?: IData[];
}

export {
  IConfig,
  IData
}