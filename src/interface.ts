export interface IData {
  title: string;
  divider?: boolean;
  description?: string;
  link?: {
    caption?: string;
    url?: string;
  };
  img?: string;
  imageUrl?: string;
}

export interface IConfig {
  columnsPerRow?: number;
  title?: string;
  description?: string;
  divider?: boolean;
  data?: IData[];
}

export interface ISettings {
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
    };
  };
}

export interface PageBlock {
  // Properties
  getData: () => any;
  setData: (data: any) => Promise<void>;
  getTag: () => any;
  setTag: (tag: any) => Promise<void>;
  validate?: () => boolean;
  defaultEdit?: boolean;
  tag?: any;

  // Page Events
  readonly onEdit: () => Promise<void>;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  // onClear: () => void;

  // Page Block Events
  edit: () => Promise<void>;
  confirm: () => Promise<void>;
  discard: () => Promise<void>;
  config: () => Promise<void>;
}
