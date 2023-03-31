/// <amd-module name="@scom/scom-feature/config.css.ts" />
declare module "@scom/scom-feature/config.css.ts" {
    export const textareaStyle: string;
    export const uploadStyle: string;
    export const pointerStyle: string;
    export const boxShadow: string;
}
/// <amd-module name="@scom/scom-feature/interface.ts" />
declare module "@scom/scom-feature/interface.ts" {
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
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        validate?: () => boolean;
        defaultEdit?: boolean;
        tag?: any;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
        config: () => Promise<void>;
    }
}
/// <amd-module name="@scom/scom-feature/config.tsx" />
declare module "@scom/scom-feature/config.tsx" {
    import { Module, ControlElement } from "@ijstech/components";
    import { IConfig, IData } from "@scom/scom-feature/interface.ts";
    interface ScomFeatureConfigElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-feature-config"]: ScomFeatureConfigElement;
            }
        }
    }
    export default class Config extends Module {
        private ckbDivider;
        private edtTitle;
        private edtDesc;
        private edtColumnsPerRow;
        private listStack;
        private itemMap;
        private _itemList;
        get itemList(): IData[];
        set itemList(data: IData[]);
        get data(): IConfig;
        set data(config: IConfig);
        private addItem;
        private onRemovedImage;
        private deleteItem;
        private updateList;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-feature/index.css.ts" />
declare module "@scom/scom-feature/index.css.ts" {
    export const cardStyle: string;
    export const cardItemStyle: string;
    export const imageStyle: string;
    export const actionButtonStyle: string;
    export const carouselStyle: string;
    export const controlStyle: string;
    export const centerStyle: string;
    export const containerStyle: string;
    export const linkStyle: string;
}
/// <amd-module name="@scom/scom-feature" />
declare module "@scom/scom-feature" {
    import { Module, ControlElement } from "@ijstech/components";
    import { PageBlock, IConfig } from "@scom/scom-feature/interface.ts";
    interface ScomFeatureElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-feature"]: ScomFeatureElement;
            }
        }
    }
    export default class ScomFeature extends Module implements PageBlock {
        private pnlCard;
        private pnlCardBody;
        private pnlDivider;
        private lblTitle;
        private lblDesc;
        private cardConfig;
        private _data;
        private settings;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        getData(): IConfig;
        setData(data: IConfig): Promise<void>;
        getTag(): any;
        setTag(value: any): Promise<void>;
        edit(): Promise<void>;
        confirm(): Promise<void>;
        discard(): Promise<void>;
        config(): Promise<void>;
        getConfigSchema(): {
            type: string;
            required: any[];
            properties: {
                titleColor: {
                    type: string;
                    format: string;
                };
                descriptionColor: {
                    type: string;
                    format: string;
                };
                backgroundColor: {
                    type: string;
                    format: string;
                };
                transparent: {
                    type: string;
                };
                item: {
                    type: string;
                    properties: {
                        itemTitleColor: {
                            type: string;
                            format: string;
                        };
                        itemDescriptionColor: {
                            type: string;
                            format: string;
                        };
                        itemLink: {
                            type: string;
                            properties: {
                                itemLinkColor: {
                                    type: string;
                                    format: string;
                                };
                                itemLinkBackgroundColor: {
                                    type: string;
                                    format: string;
                                };
                                itemLinkTransparent: {
                                    type: string;
                                };
                            };
                        };
                        itemImage: {
                            type: string;
                            properties: {
                                width: {
                                    type: string;
                                };
                                height: {
                                    type: string;
                                };
                            };
                        };
                        itemBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        itemTransparent: {
                            type: string;
                        };
                    };
                };
            };
        };
        onConfigSave(config: any): void;
        updateFeature(config: any): void;
        validate(): boolean;
        onUpdateBlock(): void;
        renderList(dataList: any[]): void;
        render(): any;
    }
}
