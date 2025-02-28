var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/page-text-list/global/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/page-text-list/global/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/page-text-list/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.containerStyle = exports.cardItemStyle = void 0;
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
    exports.containerStyle = components_1.Styles.style({
        width: Theme.layout.container.width,
        maxWidth: Theme.layout.container.maxWidth,
        overflow: Theme.layout.container.overflow,
        textAlign: Theme.layout.container.textAlign,
        margin: '0 auto',
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
        constructor(module, options) {
            this._data = {};
            this._options = options;
            this._module = module;
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
            return this._data;
        }
        getTag() {
            return this._module.tag;
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this._module.tag[prop] = newValue[prop];
                }
            }
            this._options?.onUpdateTheme();
            this._options?.onUpdateBlock();
        }
        updateTag(type, value) {
            this._module.tag[type] = this._module.tag[type] ?? {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this._module.tag[type][prop] = value[prop];
            }
        }
    }
    exports.Model = Model;
});
define("@scom/page-text-list", ["require", "exports", "@ijstech/components", "@scom/page-text-list/index.css.ts", "@scom/page-text-list/assets/index.ts", "@scom/page-text-list/model/index.ts"], function (require, exports, components_3, index_css_1, index_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    let ScomPageTextList = class ScomPageTextList extends components_3.Module {
        constructor() {
            super(...arguments);
            this.tag = {};
        }
        get data() {
            return this.model.data;
        }
        set data(value) {
            this.model.data = value;
        }
        getData() {
            return this.model.getData();
        }
        async setData(data) {
            this.model.setData(data);
        }
        onUpdateBlock() {
            if (this.tag?.maxWidth) {
                this.pnlBlock.maxWidth = this.tag.maxWidth;
            }
            this.renderList();
        }
        renderList() {
            this.pnlCard.clearInnerHTML();
            const columnsPerRow = this.data.length || 1;
            const width = 100 / columnsPerRow + '%';
            const lytItems = (this.$render("i-hstack", { width: '100%', padding: { bottom: '1rem', left: '1rem', right: '1rem' }, gap: this.tag?.gap || '1rem', horizontalAlignment: 'center', background: { color: Theme.background.main }, wrap: 'wrap' }));
            this.pnlCard.appendChild(lytItems);
            this.data.forEach((product) => {
                const { title, description, image, link } = product;
                const { borderRadius = 0, imageWidth = "auto", imageHeight = "100px", titleFontSize = "1.125rem", descriptionFontSize = "0.875rem", imageRadius = 0, itemMaxWidth = "100%" } = this.tag;
                lytItems.append(this.$render("i-grid-layout", { width: width, stack: { grow: '0', shrink: '1' }, maxWidth: itemMaxWidth, class: index_css_1.cardItemStyle, gap: { column: '1rem', row: '1.5rem' }, templateRows: image ? ['100px', '1fr'] : [], background: { color: Theme.background.paper }, padding: { top: '1rem', bottom: '1rem' }, border: { radius: borderRadius }, mediaQueries: [
                        { maxWidth: "767px", properties: { width: '100%' } }
                    ] },
                    image ? this.$render("i-image", { width: imageWidth, maxHeight: imageHeight, margin: { left: 'auto', right: 'auto' }, padding: { top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem' }, overflow: "hidden", border: { radius: imageRadius }, background: { color: Theme.background.default }, url: image, fallbackUrl: index_1.default.fullPath('img/placeholder.jpg') }) : [],
                    this.$render("i-vstack", { gap: "1rem", padding: { left: '1rem', right: '1rem' }, height: "100%", verticalAlignment: 'space-between', class: "text-center" },
                        this.$render("i-label", { caption: title || '', visible: !!title, font: { weight: 600, size: typeof titleFontSize === 'number' ? `${titleFontSize}px` : titleFontSize, color: Theme.text.primary } }),
                        this.$render("i-label", { caption: description || '', visible: !!description, font: { color: Theme.text.secondary, size: typeof descriptionFontSize === 'number' ? `${descriptionFontSize}px` : descriptionFontSize } }),
                        link?.caption ?
                            this.$render("i-panel", null,
                                this.$render("i-button", { caption: link.caption, padding: { left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }, font: { color: Theme.action.active, size: '20px' }, background: { color: Theme.action.activeBackground }, boxShadow: 'none', margin: { left: 'auto', right: 'auto' }, onClick: () => window.location.href = link.url })) : [])));
            });
        }
        getTag() {
            return this.model.getTag();
        }
        async setTag(value) {
            this.model.setTag(value);
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        onUpdateTheme() {
            const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
            this.updateStyle('--text-primary', this.tag[themeVar]?.titleColor);
            this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
            this.updateStyle('--text-secondary', this.tag[themeVar]?.descriptionColor);
            this.updateStyle('--action-active_background', this.tag[themeVar]?.linkBackgroundColor);
            this.updateStyle('--action-active', this.tag[themeVar]?.linkColor);
            this.updateStyle('--background-paper', this.tag[themeVar]?.itemBackgroundColor);
            this.updateStyle('--background-default', this.tag[themeVar]?.imageBackgroundColor);
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
        init() {
            super.init();
            this.model = new index_2.Model(this, {
                onUpdateBlock: () => this.onUpdateBlock(),
                onUpdateTheme: () => this.onUpdateTheme()
            });
            const data = this.getAttribute('data', true);
            if (data) {
                this.setData({ data });
            }
        }
        render() {
            return (this.$render("i-panel", { id: 'pnlBlock', background: { color: 'transparent' }, margin: { left: 'auto', right: 'auto' } },
                this.$render("i-panel", { id: 'pnlCard', class: index_css_1.containerStyle })));
        }
    };
    ScomPageTextList = __decorate([
        (0, components_3.customElements)("i-scom-page-text-list")
    ], ScomPageTextList);
    exports.default = ScomPageTextList;
});
