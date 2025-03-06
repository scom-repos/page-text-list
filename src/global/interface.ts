import { ISpace } from "@ijstech/components";

interface ITextItem {
  title?: string;
  description?: string;
  link?: {
    caption?: string;
    url?: string;
  }
  image?: string;
}

interface ITextList {
  data?: ITextItem[];
}

interface IColors {
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  linkColor?: string;
  linkBackgroundColor?: string;
  itemBackgroundColor?: string;
  imageBackgroundColor?: string;
}

interface ISettings {
  maxWidth?: string|number;
  gap?: string|number;
  borderRadius?: string|number;
  imageWidth?: string|number;
  imageHeight?: string|number;
  titleFontSize?: string|number;
  descriptionFontSize?: string|number;
  imageRadius?: string|number;
  itemMaxWidth?: string|number;
  itemPadding?: ISpace;
  light?: IColors;
  dark?: IColors;
}

export {
  ISettings,
  ITextItem,
  ITextList
}