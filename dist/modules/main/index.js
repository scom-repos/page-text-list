var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@feature/main/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.centerStyle = exports.controlStyle = exports.carouselStyle = exports.actionButtonStyle = exports.imageStyle = exports.cardItemStyle = exports.cardStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.cardStyle = components_1.Styles.style({
        $nest: {
            'i-link > a': {
                textDecoration: 'none'
            }
        }
    });
    exports.cardItemStyle = components_1.Styles.style({
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
    exports.imageStyle = components_1.Styles.style({
        $nest: {
            '> img': {
                width: '100%'
            }
        }
    });
    exports.actionButtonStyle = components_1.Styles.style({
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
    exports.carouselStyle = components_1.Styles.style({
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
    exports.controlStyle = components_1.Styles.style({
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
    exports.centerStyle = components_1.Styles.style({
        textAlign: 'center'
    });
});
define("@feature/main", ["require", "exports", "@ijstech/components", "@feature/config", "@feature/main/index.css.ts", "@feature/assets"], function (require, exports, components_2, config_1, index_css_1, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Config = void 0;
    exports.Config = config_1.default;
    const Theme = components_2.Styles.Theme.ThemeVars;
    let Main = class Main extends components_2.Module {
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
            var _a;
            const dataList = (_a = this.cardConfig.data) === null || _a === void 0 ? void 0 : _a.data;
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
            const lytItems = (this.$render("i-card-layout", { width: '100%', padding: { bottom: '1rem', left: '1rem', right: '1rem' }, gap: { column: '1rem', row: '0.75rem' }, columnsPerRow: this._data.columnsPerRow, cardMinWidth: '250px' }));
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
                this.$render("pageblock-feature-config", { id: 'cardConfig', visible: false })));
        }
    };
    Main = __decorate([
        components_2.customModule
    ], Main);
    exports.default = Main;
});
