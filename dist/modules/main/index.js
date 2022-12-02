var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@feature/main/config.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.textareaStyle = void 0;
    exports.textareaStyle = components_1.Styles.style({
        $nest: {
            'textarea': {
                border: 'none',
                outline: 'none'
            }
        }
    });
});
define("@feature/main/config.tsx", ["require", "exports", "@ijstech/components", "@feature/main/config.css.ts", "@feature/global"], function (require, exports, components_2, config_css_1, global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Config = class Config extends components_2.Module {
        get data() {
            const selectedItem = this.cbCardType.selectedItem;
            const _data = {
                title: this.edtTitle.value || "",
                description: this.edtDesc.value || "",
                // contractEntrypoint: this.edtContract.value || "",
                // viewAllUrl: this.edtViewAllUrl.value || ""
            };
            if (selectedItem)
                _data.type = selectedItem.value;
            const itemsToShow = Number(this.edtItemsToShow.value);
            if (Number.isInteger(itemsToShow))
                _data.itemsToShow = itemsToShow;
            return _data;
        }
        set data(config) {
            this.edtTitle.value = config.title || "";
            this.edtDesc.value = config.description || "";
            // this.edtContract.value = config.contractEntrypoint || "";
            this.cbCardType.clear();
            const type = this._items.find(type => type.value === config.type);
            if (type)
                this.cbCardType.selectedItem = type;
            this.edtItemsToShow.value = config.itemsToShow || "";
            // this.edtViewAllUrl.value = config.viewAllUrl || "";
        }
        init() {
            this._items = global_1.getCardTypeOption();
            super.init();
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlConfig", gap: '0.5rem', padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-label", { caption: "Title:" }),
                this.$render("i-input", { id: "edtTitle", width: "100%" }),
                this.$render("i-label", { caption: "Description:" }),
                this.$render("i-input", { id: "edtDesc", class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: 'textarea' }),
                this.$render("i-label", { caption: "Card Type:" }),
                this.$render("i-combo-box", { id: "cbCardType", width: "100%", icon: { name: 'angle-down' }, items: this._items }),
                this.$render("i-label", { caption: "Max items to show:" }),
                this.$render("i-input", { id: "edtItemsToShow", width: "100%", inputType: 'number' })));
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
define("@feature/main/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@feature/main/data.json.ts'/> 
    const dataList = [
        {
            name: 'Feature 1',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan convallis ex, dapibus molestie erat pharetra id',
            img: 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyaW98ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
        },
        {
            name: 'Feature 2',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan convallis ex, dapibus molestie erat pharetra id',
            img: 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyaW98ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
        },
        {
            name: 'Feature 3',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan convallis ex, dapibus molestie erat pharetra id',
            img: 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyaW98ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
        },
        {
            name: 'Feature 4',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan convallis ex, dapibus molestie erat pharetra id',
            img: 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyaW98ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
        }
    ];
    exports.default = dataList;
});
define("@feature/main", ["require", "exports", "@ijstech/components", "@feature/main/config.tsx", "@feature/main/index.css.ts", "@feature/main/data.json.ts"], function (require, exports, components_4, config_1, index_css_1, data_json_1) {
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
        onUpdateBlock() {
            this.lblTitle.caption = this._data.title || '';
            this.lblDesc.caption = this._data.description || '';
            this.renderList();
        }
        renderList() {
            const dataList = this._data.itemsToShow
                ? data_json_1.default.slice(0, this._data.itemsToShow)
                : data_json_1.default;
            const type = this._data.type || 'horizontal-list';
            this.pnlControls.clearInnerHTML();
            switch (type) {
                case 'horizontal-list':
                    this.renderHorizontalList(dataList);
                    this.renderViewAll();
                    break;
                case 'vertical-list':
                    this.renderVerticalList(dataList);
                    this.renderViewAll();
                    break;
                case 'carousel':
                    this.renderCarousel(dataList);
                    break;
            }
        }
        renderHorizontalList(dataList) {
            this.pnlCardBody.clearInnerHTML();
            const lytItems = (this.$render("i-card-layout", { width: '100%', padding: { bottom: '1rem', left: '1rem', right: '1rem' }, gap: { column: '1rem', row: '0.75rem' }, columnsPerRow: 3, cardMinWidth: '250px' }));
            this.pnlCardBody.appendChild(lytItems);
            dataList.forEach((product) => {
                lytItems.append(this.$render("i-grid-layout", { width: '100%', height: '100%', class: index_css_1.cardItemStyle, gap: { column: '1rem', row: '2rem' }, templateAreas: [['areaImg'], ['areaDetails']] },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: 'auto', maxHeight: 100, padding: { top: '1rem', left: '1rem', right: '1rem' }, overflow: 'hidden', grid: { area: 'areaImg' }, url: product.img }),
                    this.$render("i-vstack", { gap: '0.5rem', grid: { area: 'areaDetails' }, padding: { left: '1rem', right: '1rem' }, class: index_css_1.centerStyle },
                        this.$render("i-label", { caption: product.name, font: { weight: 600, size: '1.125rem' } }),
                        this.$render("i-label", { caption: product.caption }))));
            });
        }
        renderVerticalList(dataList) {
            this.pnlCardBody.clearInnerHTML();
            dataList.forEach((product) => {
                this.pnlCardBody.append(this.$render("i-grid-layout", { width: '100%', height: '100%', class: index_css_1.cardItemStyle, padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, gap: { column: '1rem', row: '2rem' }, templateColumns: ['150px', 'auto', 'min-content'], templateAreas: [['areaImg', 'areaDetails']] },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: '100%', height: '100%', overflow: 'hidden', grid: { area: 'areaImg' }, url: product.img }),
                    this.$render("i-vstack", { gap: '0.5rem', grid: { area: 'areaDetails' }, verticalAlignment: 'center' },
                        this.$render("i-label", { caption: product.name, font: { weight: 600, size: '1.125rem' } }),
                        this.$render("i-label", { caption: product.caption }))));
            });
        }
        renderViewAll() {
            this.pnlCardFooter.clearInnerHTML();
            if (this._data.itemsToShow && this._data.itemsToShow < data_json_1.default.length) {
                this.pnlCardFooter.appendChild(this.$render("i-hstack", { class: "pointer", width: "100%", height: 45, background: { color: Theme.background.paper }, border: { top: { width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' } }, horizontalAlignment: 'center', verticalAlignment: 'center' },
                    this.$render("i-label", { caption: "View All", font: { size: '0.875rem', color: Theme.colors.primary.main, weight: 600 }, link: { href: this._data.viewAllUrl, target: "_self" } })));
            }
        }
        renderCarousel(dataList) {
            this.pnlCardBody.clearInnerHTML();
            this.pnlCardFooter.clearInnerHTML();
            const carousel = (this.$render("i-carousel-slider", { class: index_css_1.carouselStyle, width: '100%', minHeight: '200px', slidesToShow: 1, swipe: true }));
            const items = dataList.map((product) => {
                const item = (this.$render("i-grid-layout", { width: '100%', height: '100%', class: index_css_1.cardItemStyle, horizontalAlignment: 'center', padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, gap: { column: '1rem', row: '2rem' }, templateAreas: [['areaImg'], ['areaDetails']] },
                    this.$render("i-image", { class: index_css_1.imageStyle, width: 'auto', maxHeight: 100, overflow: 'hidden', grid: { area: 'areaImg' }, url: product.img }),
                    this.$render("i-vstack", { gap: '0.5rem', grid: { area: 'areaDetails' }, class: index_css_1.centerStyle },
                        this.$render("i-label", { caption: product.name, font: { weight: 600, size: '1.125rem' } }),
                        this.$render("i-label", { caption: product.caption }))));
                return {
                    name: undefined,
                    controls: [item],
                };
            });
            this.pnlCardBody.append(carousel);
            carousel.items = items;
            if (dataList.length > 1)
                this.renderControls(carousel);
        }
        renderControls(carousel) {
            this.pnlControls.appendChild(this.$render("i-button", { width: 45, height: 45, icon: { name: 'chevron-left', fill: 'rgba(160,168,177,.68)' }, background: { color: 'transparent' }, border: { width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }, onClick: () => carousel.prev() }));
            this.pnlControls.appendChild(this.$render("i-button", { width: 45, height: 45, icon: { name: 'chevron-right', fill: 'rgba(160,168,177,.68)' }, background: { color: 'transparent' }, border: { width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }, onClick: () => carousel.next() }));
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
