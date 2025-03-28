/// <amd-module name="@scom/page-text-list/global/interface.ts" />
declare module "@scom/page-text-list/global/interface.ts" {
    import { ISpace } from "@ijstech/components";
    interface ITextItem {
        title?: string;
        description?: string;
        link?: {
            caption?: string;
            url?: string;
        };
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
        maxWidth?: string | number;
        gap?: string | number;
        borderRadius?: string | number;
        imageWidth?: string | number;
        imageHeight?: string | number;
        titleFontSize?: string | number;
        descriptionFontSize?: string | number;
        imageRadius?: string | number;
        itemMaxWidth?: string | number;
        itemPadding?: ISpace;
        light?: IColors;
        dark?: IColors;
    }
    export { ISettings, ITextItem, ITextList };
}
/// <amd-module name="@scom/page-text-list/global/index.ts" />
declare module "@scom/page-text-list/global/index.ts" {
    export { ISettings, ITextItem, ITextList } from "@scom/page-text-list/global/interface.ts";
}
/// <amd-module name="@scom/page-text-list/index.css.ts" />
declare module "@scom/page-text-list/index.css.ts" {
    export const cardItemStyle: string;
    export const customStyle: string;
}
/// <amd-module name="@scom/page-text-list/assets/index.ts" />
declare module "@scom/page-text-list/assets/index.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/page-text-list/model/index.ts" />
declare module "@scom/page-text-list/model/index.ts" {
    import { ISettings, ITextItem, ITextList } from "@scom/page-text-list/global/index.ts";
    interface IOptions {
        onUpdateBlock: () => void;
        onUpdateTheme: () => void;
    }
    export class Model {
        private _data;
        private _options;
        private _tag;
        constructor(options: IOptions);
        get tag(): ISettings;
        get data(): ITextItem[];
        set data(value: ITextItem[]);
        setData(data: ITextList): void;
        private getData;
        private getTag;
        setTag(value: ISettings): void;
        private updateTag;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
    }
}
/// <amd-module name="@scom/page-text-list" />
declare module "@scom/page-text-list" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { ITextItem } from "@scom/page-text-list/global/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-page-text-list']: ScomPageTextListElement;
            }
        }
    }
    interface ScomPageTextListElement extends ControlElement {
        data?: ITextItem[];
    }
    export default class ScomPageTextList extends Module {
        private pnlBlock;
        private pnlCard;
        private model;
        constructor(parent?: Container, options?: any);
        get data(): ITextItem[];
        set data(value: ITextItem[]);
        private setData;
        private onUpdateBlock;
        private renderList;
        private updateStyle;
        private onUpdateTheme;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
        init(): void;
        render(): any;
    }
}
