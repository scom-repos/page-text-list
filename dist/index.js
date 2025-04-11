var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/page-text-list/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/page-text-list/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customStyle = exports.cardItemStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.cardItemStyle = components_1.Styles.style({
        alignContent: 'stretch',
        $nest: {
        // '&:hover i-button': {
        //   background: Theme.colors.primary.dark,
        //   color: Theme.colors.primary.contrastText
        // },
        // '&:hover i-button > i-icon': {
        //   fill: '#fff !important'
        // }
        }
    });
    exports.customStyle = components_1.Styles.style({
        $nest: {
            'i-link > a': {
                textDecoration: 'none'
            }
        }
    });
});
define("@scom/page-text-list/assets/index.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_2.application.currentModuleDir;
    function fullPath(path) {
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/page-text-list/model/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(options) {
            this._data = {};
            this._tag = {
                light: {},
                dark: {}
            };
            this._options = options;
        }
        get tag() {
            return this._tag || {};
        }
        get data() {
            return this._data?.data || [];
        }
        set data(value) {
            this._data.data = value || [];
        }
        setData(data) {
            this._data = data;
            this._options?.onUpdateBlock();
        }
        getData() {
            return this._data || {};
        }
        getTag() {
            return this._tag || {};
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this._tag[prop] = newValue[prop];
                }
            }
            this._options?.onUpdateTheme();
            this._options?.onUpdateBlock();
        }
        updateTag(type, value) {
            this._tag[type] = this._tag[type] || {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this._tag[type][prop] = value[prop];
            }
        }
        getConfigurators() {
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        return [];
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this),
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this),
                },
            ];
        }
    }
    exports.Model = Model;
});
define("@scom/page-text-list/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.merge = void 0;
    ///<amd-module name='@scom/page-text-list/utils.ts'/> 
    const merge = (...objects) => {
        return objects.reduce((prev, obj) => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof prev[key] === 'object')
                        prev[key] = (0, exports.merge)(prev[key], obj[key]);
                    else
                        prev[key] = obj[key];
                }
            }
            return prev;
        }, {});
    };
    exports.merge = merge;
});
define("@scom/page-text-list", ["require", "exports", "@ijstech/components", "@scom/page-text-list/index.css.ts", "@scom/page-text-list/assets/index.ts", "@scom/page-text-list/model/index.ts", "@scom/page-text-list/utils.ts"], function (require, exports, components_3, index_css_1, index_1, index_2, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    let ScomPageTextList = class ScomPageTextList extends components_3.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        get data() {
            return this.model.data;
        }
        set data(value) {
            this.model.data = value;
        }
        async setData(data) {
            this.model.setData(data);
        }
        onUpdateBlock() {
            if (this.model.tag?.maxWidth) {
                this.pnlBlock.maxWidth = this.model.tag.maxWidth;
            }
            this.renderList();
        }
        renderList() {
            this.pnlCard.clearInnerHTML();
            const defaultValues = {
                image: {
                    width: "auto",
                    height: "100px"
                },
                title: {
                    font: {
                        size: "1.125rem",
                        bold: true
                    }
                },
                description: {
                    font: {
                        size: "0.875rem",
                        color: Theme.text.secondary
                    }
                },
                link: {
                    font: {
                        size: "20px",
                        color: Theme.action.active
                    },
                    background: {
                        color: Theme.action.activeBackground
                    }
                },
                item: {
                    padding: { top: '0', bottom: '0', left: '0', right: '0' }
                },
                background: {
                    color: "transparent"
                }
            };
            const merged = (0, utils_1.merge)(defaultValues, this.model.tag);
            this.renderRow(this.data, merged);
        }
        renderRow(data, tag) {
            const { gap, border, background, columnsPerRow, image: imageStyles, title: titleStyles, description: descriptionStyles, item: itemStyles, link: linkStyles } = tag;
            const length = this.data.length;
            const rows = columnsPerRow ? Math.ceil(length / columnsPerRow) : length;
            const isValidNumber = (value) => {
                return value && value !== 'auto' && value !== '100%';
            };
            let maxWidth = isValidNumber(itemStyles?.maxWidth) ? itemStyles.maxWidth : undefined;
            if (maxWidth !== undefined && !isNaN(Number(maxWidth)))
                maxWidth = `${maxWidth}px`;
            let width = isValidNumber(itemStyles?.width) ? itemStyles.width : undefined;
            if (width !== undefined && !isNaN(Number(width)))
                width = `${width}px`;
            const repeatWidth = width || maxWidth || '1fr';
            const repeat = columnsPerRow ? `repeat(${rows}, ${repeatWidth})` : `repeat(${length}, ${repeatWidth})`;
            const lytItems = (this.$render("i-card-layout", { width: '100%', padding: { bottom: '1rem', left: '1rem', right: '1rem' }, gap: { column: gap || '1rem', row: gap || '1rem' }, justifyContent: 'center', background: background, cardMinWidth: itemStyles?.minWidth, templateColumns: [repeat], mediaQueries: [
                    {
                        maxWidth: "767px",
                        properties: {
                            templateColumns: [`repeat(1, ${repeatWidth})`]
                        }
                    },
                    {
                        minWidth: "768px",
                        maxWidth: "1024px",
                        properties: {
                            templateColumns: [`repeat(2, ${repeatWidth})`]
                        }
                    }
                ] }));
            this.pnlCard.appendChild(lytItems);
            data.forEach((product) => {
                const { title, description, image, link } = product;
                const el = this.$render("i-grid-layout", { maxWidth: itemStyles?.maxWidth, class: index_css_1.cardItemStyle, width: "100%", gap: { column: '1rem', row: itemStyles.gap ?? '1.5rem' }, background: itemStyles?.background, border: border, padding: itemStyles?.padding, boxShadow: itemStyles?.boxShadow ?? 'none' },
                    image ? this.$render("i-image", { width: imageStyles?.width, height: imageStyles?.height, margin: { left: 'auto', right: 'auto' }, padding: { top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem' }, overflow: "hidden", border: imageStyles?.border, background: imageStyles?.background, url: image, fallbackUrl: index_1.default.fullPath('img/placeholder.jpg') }) : [],
                    this.$render("i-vstack", { gap: "1rem", height: "100%", verticalAlignment: 'space-between', class: "text-center" },
                        this.$render("i-vstack", { gap: "1rem", class: "text-center", width: "100%", height: "100%" },
                            this.$render("i-label", { caption: title || '', visible: !!title, font: titleStyles?.font }),
                            this.$render("i-label", { caption: description || '', visible: !!description, font: descriptionStyles?.font })),
                        link?.caption ?
                            this.$render("i-panel", null,
                                this.$render("i-button", { caption: link.caption, padding: { left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }, font: linkStyles?.font, background: linkStyles?.background, boxShadow: 'none', margin: { left: 'auto', right: 'auto' }, onClick: () => {
                                        if (this._designMode)
                                            return;
                                        window.location.href = link.url;
                                    } })) : []));
                lytItems.append(el);
            });
        }
        onUpdateTheme() { }
        getConfigurators() {
            return this.model.getConfigurators();
        }
        init() {
            super.init();
            this.model = new index_2.Model({
                onUpdateBlock: () => this.onUpdateBlock(),
                onUpdateTheme: () => this.onUpdateTheme()
            });
            const data = this.getAttribute('data', true);
            if (data)
                this.setData({ data });
            const tag = this.getAttribute('tag', true);
            if (tag)
                this.model.setTag(tag);
        }
        render() {
            return (this.$render("i-panel", { id: 'pnlBlock', background: { color: 'transparent' }, margin: { left: 'auto', right: 'auto' } },
                this.$render("i-panel", { id: 'pnlCard', class: index_css_1.customStyle })));
        }
    };
    ScomPageTextList = __decorate([
        components_3.customModule,
        (0, components_3.customElements)("i-page-text-list", {
            icon: 'stop',
            props: {
                data: {
                    type: 'array',
                    default: []
                }
            },
            className: 'ScomPageTextList',
            events: {},
            dataSchema: {
                "type": "object",
                "properties": {
                    "data": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "type": "string"
                                },
                                "description": {
                                    "type": "string"
                                },
                                "link": {
                                    "type": "object",
                                    "properties": {
                                        "caption": {
                                            "type": "string"
                                        },
                                        "url": {
                                            "type": "string"
                                        }
                                    }
                                },
                                "image": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        })
    ], ScomPageTextList);
    exports.default = ScomPageTextList;
});
