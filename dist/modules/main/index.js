var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@feature/main/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.linkStyle = exports.containerStyle = exports.centerStyle = exports.controlStyle = exports.carouselStyle = exports.actionButtonStyle = exports.imageStyle = exports.cardItemStyle = exports.cardStyle = void 0;
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
    exports.containerStyle = components_1.Styles.style({
        width: Theme.layout.container.width,
        maxWidth: Theme.layout.container.maxWidth,
        overflow: Theme.layout.container.overflow,
        textAlign: Theme.layout.container.textAlign,
        margin: '0 auto'
    });
    exports.linkStyle = components_1.Styles.style({
        width: 'fit-content',
        margin: 'auto auto 0',
        $nest: {
            'i-button': {
                boxShadow: 'none',
                outline: 'none',
                marginTop: 8
            }
        }
    });
});
define("@feature/main", ["require", "exports", "@ijstech/components", "@feature/config", "@feature/main/index.css.ts", "@feature/assets"], function (require, exports, components_2, config_1, index_css_1, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Config = void 0;
    exports.Config = config_1.default;
    const Theme = components_2.Styles.Theme.ThemeVars;
    const configSchema = {
        type: 'object',
        required: [],
        properties: {
            'titleColor': {
                type: 'string',
                format: 'color',
            },
            'descriptionColor': {
                type: 'string',
                format: 'color',
            },
            'backgroundColor': {
                type: 'string',
                format: 'color',
            },
            'transparent': {
                type: 'boolean',
            },
            'item': {
                type: 'object',
                properties: {
                    'itemTitleColor': {
                        type: 'string',
                        format: 'color',
                    },
                    'itemDescriptionColor': {
                        type: 'string',
                        format: 'color',
                    },
                    'itemLink': {
                        type: 'object',
                        properties: {
                            'itemLinkColor': {
                                type: 'string',
                                format: 'color',
                            },
                            'itemLinkBackgroundColor': {
                                type: 'string',
                                format: 'color',
                            },
                            'itemLinkTransparent': {
                                type: 'boolean',
                            }
                        },
                    },
                    'itemImage': {
                        type: 'object',
                        properties: {
                            'width': {
                                type: 'string',
                            },
                            'height': {
                                type: 'string',
                            },
                        },
                    },
                    'itemBackgroundColor': {
                        type: 'string',
                        format: 'color',
                    },
                    'itemTransparent': {
                        type: 'boolean',
                    }
                }
            },
        }
    };
    let Main = class Main extends components_2.Module {
        constructor() {
            super(...arguments);
            this._data = {};
            this.settings = {};
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
            this.updateFeature(value);
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
        getConfigSchema() {
            return configSchema;
        }
        onConfigSave(config) {
            this.tag = config;
            this.updateFeature(config);
        }
        updateFeature(config) {
            this.settings = config;
            this.onUpdateBlock();
        }
        validate() {
            var _a;
            const dataList = (_a = this.cardConfig.data) === null || _a === void 0 ? void 0 : _a.data;
            if (!dataList.length)
                return true;
            const emptyName = dataList.find(item => !item.title);
            return !emptyName;
        }
        onUpdateBlock() {
            var _a, _b, _c;
            if ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.backgroundColor) {
                this.pnlCard.background = { color: this.settings.backgroundColor };
            }
            this.lblTitle.caption = this._data.title || '';
            this.lblTitle.style.color = ((_b = this.settings) === null || _b === void 0 ? void 0 : _b.titleColor) || '';
            this.lblDesc.caption = this._data.description || '';
            this.lblDesc.style.color = ((_c = this.settings) === null || _c === void 0 ? void 0 : _c.descriptionColor) || '';
            this.pnlDivider.visible = this._data.divider || false;
            this.renderList(this._data.data || []);
        }
        renderList(dataList) {
            var _a;
            this.pnlCardBody.clearInnerHTML();
            const lytItems = (this.$render("i-card-layout", { width: '100%', padding: { bottom: '1rem', left: '1rem', right: '1rem' }, gap: { column: '1rem', row: '0.75rem' }, columnsPerRow: this._data.columnsPerRow, cardMinWidth: '250px' }));
            this.pnlCardBody.appendChild(lytItems);
            const settings = ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.item) || {};
            dataList.forEach((product) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                const imageUrl = product.imageUrl || product.img || "";
                lytItems.append(this.$render("i-grid-layout", { width: '100%', height: '100%', class: index_css_1.cardItemStyle, gap: { column: '1rem', row: '2rem' }, templateRows: imageUrl ? ['100px', '1fr'] : [], background: { color: settings.itemTransparent ? 'transparent' : settings.itemBackgroundColor || '' }, padding: { top: 16, bottom: 16 }, border: { radius: 8 } },
                    imageUrl ? this.$render("i-image", { class: index_css_1.imageStyle, width: ((_a = settings.itemImage) === null || _a === void 0 ? void 0 : _a.width) || 'auto', maxHeight: ((_b = settings.itemImage) === null || _b === void 0 ? void 0 : _b.height) || 100, margin: { left: ((_c = settings.itemImage) === null || _c === void 0 ? void 0 : _c.width) ? 'auto' : 0, right: ((_d = settings.itemImage) === null || _d === void 0 ? void 0 : _d.width) ? 'auto' : 0 }, padding: { top: '1rem', left: '1rem', right: '1rem' }, overflow: 'hidden', url: imageUrl, fallbackUrl: assets_1.default.fullPath('img/placeholder.jpg') }) : [],
                    this.$render("i-vstack", { gap: '0.5rem', padding: { left: '1rem', right: '1rem' }, class: index_css_1.centerStyle },
                        this.$render("i-label", { caption: product.title || '', font: { weight: 600, size: '1.125rem', color: settings.itemTitleColor || '' } }),
                        this.$render("i-panel", { height: 2, visible: product.divider || false, width: 200, maxWidth: '100%', margin: { bottom: 8, left: 'auto', right: 'auto' }, background: { color: Theme.colors.primary.main } }),
                        this.$render("i-label", { caption: product.description || '', font: { color: settings.itemDescriptionColor || '' } }),
                        ((_e = product.link) === null || _e === void 0 ? void 0 : _e.caption) ?
                            this.$render("i-panel", { class: index_css_1.linkStyle },
                                this.$render("i-button", { caption: product.link.caption, font: { color: ((_f = settings.itemLink) === null || _f === void 0 ? void 0 : _f.itemLinkColor) || Theme.colors.primary.contrastText, size: '20px' }, background: { color: ((_g = settings.itemLink) === null || _g === void 0 ? void 0 : _g.itemLinkTransparent) ? 'transparent !important' : (((_h = settings.itemLink) === null || _h === void 0 ? void 0 : _h.itemLinkBackgroundColor) ? `${(_j = settings.itemLink) === null || _j === void 0 ? void 0 : _j.itemLinkBackgroundColor} !important` : '') }, onClick: () => window.location.href = product.link.url, display: 'block' })) : this.$render("i-label", null))));
            });
        }
        render() {
            return (this.$render("i-panel", { id: 'pnlBlock', class: index_css_1.cardStyle },
                this.$render("i-panel", { id: 'pnlCard', class: index_css_1.containerStyle },
                    this.$render("i-hstack", { id: 'pnlCardHeader', verticalAlignment: 'center', horizontalAlignment: 'center', padding: {
                            top: '1.5rem',
                            bottom: '1rem',
                            left: '1.5rem',
                            right: '1.5rem',
                        } },
                        this.$render("i-vstack", { gap: '0.5rem', class: index_css_1.centerStyle, width: '100%' },
                            this.$render("i-label", { id: 'lblTitle', font: { size: '1.5rem', weight: 600 } }),
                            this.$render("i-panel", { id: "pnlDivider", visible: false, height: 2, width: 'inherit', maxWidth: 200, margin: { bottom: 8, left: 'auto', right: 'auto' }, background: { color: Theme.colors.primary.main } }),
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
