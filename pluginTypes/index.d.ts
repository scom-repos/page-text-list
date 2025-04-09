/// <amd-module name="@scom/page-text-list/interface.ts" />
declare module "@scom/page-text-list/interface.ts" {
    import { IBorder, IFont, ISpace } from "@ijstech/components";
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
    }
    interface IStyles {
        width?: string | number;
        height?: string | number;
        background?: {
            color?: string;
        };
        border?: IBorder;
        font?: IFont;
        maxWidth?: string | number;
        padding?: ISpace;
        margin?: ISpace;
        gap?: string | number;
        boxShadow?: string;
    }
    interface ISettings {
        maxWidth?: string | number;
        background?: {
            color?: string;
        };
        gap?: string | number;
        border?: IBorder;
        light?: IColors;
        dark?: IColors;
        item?: IStyles;
        image?: IStyles;
        title?: IStyles;
        description?: IStyles;
        link?: IStyles;
        columnsPerRow?: number;
    }
    export { ISettings, ITextItem, ITextList };
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
    import { ISettings, ITextItem, ITextList } from "@scom/page-text-list/interface.ts";
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
/// <amd-module name="@scom/page-text-list/utils.ts" />
declare module "@scom/page-text-list/utils.ts" {
    export const merge: (...objects: any[]) => any;
}
/// <amd-module name="@scom/page-text-list" />
declare module "@scom/page-text-list" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { ITextItem } from "@scom/page-text-list/interface.ts";
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
        private renderRow;
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
