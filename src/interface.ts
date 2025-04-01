import { IBorder, IFont, ISpace } from "@ijstech/components";

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
}

interface IStyles {
  width?: string|number;
  height?: string|number;
  background?: {color?: string};
  border?: IBorder;
  font?: IFont;
  maxWidth?: string|number;
  padding?: ISpace;
}

interface ISettings {
  maxWidth?: string|number;
  background?: {color?: string};
  gap?: string|number;
  border?: IBorder;
  light?: IColors;
  dark?: IColors;
  item?: IStyles;
  image?: IStyles;
  title?: IStyles;
  description?: IStyles;
  link?: IStyles;
}

export {
  ISettings,
  ITextItem,
  ITextList
}