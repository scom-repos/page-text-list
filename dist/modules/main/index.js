var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@feature/main/config.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pointerStyle = exports.uploadStyle = exports.textareaStyle = void 0;
    exports.textareaStyle = components_1.Styles.style({
        $nest: {
            'textarea': {
                border: 'none',
                outline: 'none'
            }
        }
    });
    exports.uploadStyle = components_1.Styles.style({
        $nest: {
            '.i-upload_preview-img': {
                maxHeight: '100%',
                display: 'block'
            },
            '.i-upload-wrapper': {
                maxHeight: 'inherit',
                overflow: 'hidden'
            }
        }
    });
    exports.pointerStyle = components_1.Styles.style({
        cursor: 'pointer'
    });
});
define("@feature/main/config.tsx", ["require", "exports", "@ijstech/components", "@feature/main/config.css.ts"], function (require, exports, components_2, config_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Config = class Config extends components_2.Module {
        constructor() {
            super(...arguments);
            this.itemMap = new Map();
            this._itemList = [];
        }
        get itemList() {
            return Array.from(this.itemMap).map(item => item[1]);
        }
        set itemList(data) {
            this._itemList = data;
        }
        get data() {
            const _data = {
                title: this.edtTitle.value || "",
                description: this.edtDesc.value || "",
                data: this.itemList || []
            };
            return _data;
        }
        set data(config) {
            this.edtTitle.value = config.title || "";
            this.edtDesc.value = config.description || "";
        }
        addItem(item) {
            const lastIndex = this.itemList.length;
            const itemElm = (this.$render("i-vstack", { gap: '0.5rem', padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, border: { width: 1, style: 'solid', color: 'rgba(217,225,232,.38)', radius: 5 }, position: "relative" },
                this.$render("i-icon", { name: "times", fill: "red", width: 20, height: 20, position: "absolute", top: 10, right: 10, class: config_css_1.pointerStyle, onClick: (source) => this.deleteItem(itemElm, lastIndex) }),
                this.$render("i-hstack", null,
                    this.$render("i-label", { caption: "Name" }),
                    this.$render("i-label", { caption: "*", font: { color: 'red' }, margin: { left: '4px' } }),
                    this.$render("i-label", { caption: ":" })),
                this.$render("i-input", { width: "100%", value: item.name || '', onChanged: (source) => this.updateList(source, lastIndex, 'name') }),
                this.$render("i-label", { caption: "Description:" }),
                this.$render("i-input", { class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: 'textarea', value: item.caption || '', onChanged: (source) => this.updateList(source, lastIndex, 'caption') }),
                this.$render("i-label", { caption: "Image:" }),
                this.$render("i-panel", null,
                    this.$render("i-upload", { maxHeight: 200, maxWidth: 200, class: config_css_1.uploadStyle, onChanged: (source) => this.updateList(source, lastIndex, 'img'), onRemoved: () => this.onRemoved(lastIndex) }))));
            this.listStack.appendChild(itemElm);
            this.itemMap.set(lastIndex, { name: '' });
        }
        onRemoved(index) {
            if (this.itemMap.has(index)) {
                const item = this.itemMap.get(index);
                item.img = '';
                this.itemMap.set(index, item);
            }
        }
        deleteItem(source, index) {
            if (this.itemMap.has(index)) {
                source.remove();
                this.itemMap.delete(index);
            }
        }
        updateList(source, index, prop) {
            console.log('changed input');
            const item = this.itemMap.get(index);
            if (prop === 'img') {
                const imgUploader = source.getElementsByTagName("img")[0];
                item.img = imgUploader.src || '';
            }
            else {
                item[prop] = source.value;
            }
        }
        init() {
            super.init();
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlConfig", gap: '0.5rem', padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-label", { caption: "Title:" }),
                this.$render("i-input", { id: "edtTitle", width: "100%" }),
                this.$render("i-label", { caption: "Description:" }),
                this.$render("i-input", { id: "edtDesc", class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: 'textarea' }),
                this.$render("i-panel", null,
                    this.$render("i-button", { caption: "Add Item", padding: { left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }, onClick: this.addItem.bind(this) })),
                this.$render("i-vstack", { id: "listStack", gap: "0.5rem" })));
        }
    };
    Config = __decorate([
        components_2.customModule,
        components_2.customElements("pageblock-card-config")
    ], Config);
    exports.default = Config;
});
define("@feature/main/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.centerStyle = exports.controlStyle = exports.carouselStyle = exports.actionButtonStyle = exports.imageStyle = exports.cardItemStyle = exports.cardStyle = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.cardStyle = components_3.Styles.style({
        $nest: {
            'i-link > a': {
                textDecoration: 'none'
            }
        }
    });
    exports.cardItemStyle = components_3.Styles.style({
        $nest: {
            '&:hover i-button': {
                background: Theme.colors.primary.dark,
                color: Theme.colors.primary.contrastText
            },
            '&:hover i-button > i-icon': {
                fill: '#fff !important'
            }
        }
    });
    exports.imageStyle = components_3.Styles.style({
        $nest: {
            '> img': {
                width: '100%'
            }
        }
    });
    exports.actionButtonStyle = components_3.Styles.style({
        boxShadow: 'none',
        $nest: {
            '&:hover': {
                background: Theme.colors.primary.dark,
                color: Theme.colors.primary.contrastText
            },
            '> i-icon:hover': {
                fill: '#fff !important'
            }
        }
    });
    exports.carouselStyle = components_3.Styles.style({
        $nest: {
            '.dots-pagination': {
                height: 45,
                background: Theme.background.paper,
                borderTop: '1px solid rgba(217,225,232,.38)',
                marginTop: 0,
            },
            '.dots-pagination .--dot > span': {
                minHeight: '0.6rem',
                minWidth: '0.6rem',
            }
        }
    });
    exports.controlStyle = components_3.Styles.style({
        $nest: {
            'i-button': {
                boxShadow: 'none',
            },
            'i-button > span': {
                display: 'none'
            },
            'i-button:not(.disabled):hover': {
                background: 'transparent',
                boxShadow: 'none',
                borderColor: 'rgba(117,124,131,.68)',
                $nest: {
                    '> i-icon': {
                        fill: 'rgba(117,124,131,.68) !important'
                    }
                }
            }
        }
    });
    exports.centerStyle = components_3.Styles.style({
        textAlign: 'center'
    });
});
define("@feature/main", ["require", "exports", "@ijstech/components", "@feature/main/config.tsx", "@feature/main/index.css.ts", "@feature/assets"], function (require, exports, components_4, config_1, index_css_1, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Config = void 0;
    exports.Config = config_1.default;
    const Theme = components_4.Styles.Theme.ThemeVars;
    let Main = class Main extends components_4.Module {
        constructor() {
            super(...arguments);
            this._data = {};
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.cardConfig.data = data;
            this.onUpdateBlock();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
        }
        async edit() {
            this.cardConfig.data = this._data;
            this.pnlCard.visible = false;
            this.cardConfig.visible = true;
        }
        async confirm() {
            this._data = this.cardConfig.data;
            this.onUpdateBlock();
            this.pnlCard.visible = true;
            this.cardConfig.visible = false;
        }
        async discard() {
            this.pnlCard.visible = true;
            this.cardConfig.visible = false;
        }
        async config() { }
        validate() {
            const dataList = this._data.data;
            if (!dataList.length)
                return true;
            const emptyName = dataList.find(item => !item.name);
            return !emptyName;
        }
        onUpdateBlock() {
            this.lblTitle.caption = this._data.title || '';
            this.lblDesc.caption = this._data.description || '';
            this.renderList(this._data.data || []);
        }
        getItemPerRow(dataList) {
            const length = dataList.length;
            if (length === 1)
                return 1;
            if (length % 3 === 0)
                return 3;
            if (length % 2 === 0)
                return 2;
            return 3;
        }
        renderList(dataList) {
            this.pnlCardBody.clearInnerHTML();
            const lytItems = (this.$render("i-card-layout", { width: '100%', padding: { bottom: '1rem', left: '1rem', right: '1rem' }, gap: { column: '1rem', row: '0.75rem' }, columnsPerRow: this.getItemPerRow(dataList), cardMinWidth: '250px' }));
            this.pnlCardBody.appendChild(lytItems);
            dataList.forEach((product) => {
                lytItems.append(this.$render("i-grid-layout", { width: '100%', height: '100%', class: index_css_1.cardItemStyle, gap: { column: '1rem', row: '2rem' }, templateAreas: [['areaImg'], ['areaDetails']] },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: 'auto', maxHeight: 100, padding: { top: '1rem', left: '1rem', right: '1rem' }, overflow: 'hidden', grid: { area: 'areaImg' }, url: product.img, fallbackUrl: assets_1.default.fullPath('img/placeholder.jpg') }),
                    this.$render("i-vstack", { gap: '0.5rem', grid: { area: 'areaDetails' }, padding: { left: '1rem', right: '1rem' }, class: index_css_1.centerStyle },
                        this.$render("i-label", { caption: product.name || '', font: { weight: 600, size: '1.125rem' } }),
                        this.$render("i-label", { caption: product.caption || '' }))));
            });
        }
        render() {
            return (this.$render("i-panel", { id: 'pnlBlock', class: index_css_1.cardStyle },
                this.$render("i-panel", { id: 'pnlCard' },
                    this.$render("i-hstack", { id: 'pnlCardHeader', verticalAlignment: 'center', horizontalAlignment: 'center', padding: {
                            top: '1.5rem',
                            bottom: '1.5rem',
                            left: '1.5rem',
                            right: '1.5rem',
                        } },
                        this.$render("i-vstack", { gap: '0.5rem', class: index_css_1.centerStyle, width: '100%' },
                            this.$render("i-label", { id: 'lblTitle', font: { size: '1.5rem', weight: 600 } }),
                            this.$render("i-label", { id: 'lblDesc', font: { size: '0.875rem', color: Theme.colors.secondary.main } })),
                        this.$render("i-hstack", { id: 'pnlControls', class: index_css_1.controlStyle, gap: '0.5rem' })),
                    this.$render("i-panel", { id: 'pnlCardBody' }),
                    this.$render("i-panel", { id: 'pnlCardFooter' })),
                this.$render("pageblock-card-config", { id: 'cardConfig', visible: false })));
        }
    };
    Main = __decorate([
        components_4.customModule
    ], Main);
    exports.default = Main;
});
