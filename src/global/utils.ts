interface IData {
  title: string;
  divider?: boolean;
  description?: string;
  link?: {
    caption?: string;
    url?: string;
  }
  img?: string;
  imageUrl?: string;
}

interface IConfig {
  columnsPerRow?: number;
  title?: string;
  description?: string;
  divider?: boolean;
  data?: IData[];
}

interface ISettings {
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  item?: {
    itemTitleColor?: string;
    itemDescriptionColor?: string;
    itemTransparent?: boolean;
    itemBackgroundColor?: string;
    itemImage?: {
      width?: string;
      height?: string;
    };
    itemLink?: {
      itemLinkColor?: string;
      itemLinkTransparent?: boolean;
      itemLinkBackgroundColor?: string;
    }
  }
}

export {
  ISettings,
  IConfig,
  IData
}