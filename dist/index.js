var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-feature/config.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boxShadow = exports.pointerStyle = exports.uploadStyle = exports.textareaStyle = void 0;
    exports.textareaStyle = components_1.Styles.style({
        $nest: {
            textarea: {
                border: "none",
                outline: "none",
            },
        },
    });
    exports.uploadStyle = components_1.Styles.style({
        $nest: {
            ".i-upload_preview-img": {
                maxHeight: "100%",
                display: "block",
            },
            ".i-upload-wrapper": {
                maxHeight: "inherit",
                overflow: "hidden",
            },
        },
    });
    exports.pointerStyle = components_1.Styles.style({
        cursor: "pointer",
    });
    exports.boxShadow = components_1.Styles.style({
        boxShadow: "0 0 1px 0 rgb(0 0 0 / 75%)",
        borderRadius: 5,
    });
});
define("@scom/scom-feature/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-feature/config.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-feature/config.css.ts"], function (require, exports, components_2, config_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Config = class Config extends components_2.Module {
        constructor() {
            super(...arguments);
            this.itemMap = new Map();
            this._itemList = [];
        }
        get itemList() {
            return Array.from(this.itemMap).map((item) => item[1]);
        }
        set itemList(data) {
            this._itemList = data;
        }
        get data() {
            const _data = {
                title: this.edtTitle.value || "",
                divider: this.ckbDivider.checked || false,
                description: this.edtDesc.value || "",
                columnsPerRow: 3,
                data: this.itemList || [],
            };
            const columnsPerRow = Number(this.edtColumnsPerRow.value);
            if (Number.isInteger(columnsPerRow))
                _data.columnsPerRow = columnsPerRow;
            return _data;
        }
        set data(config) {
            this.edtTitle.value = config.title || "";
            this.edtDesc.value = config.description || "";
            this.ckbDivider.checked = config.divider || false;
            this.edtColumnsPerRow.value = `${config.columnsPerRow || 3}`;
            this.itemList = config.data || [];
            this.listStack.clearInnerHTML();
            this.itemMap = new Map();
            this._itemList.forEach((item) => this.addItem(item));
        }
        addItem(item) {
            var _a, _b;
            const lastIndex = this.itemList.length;
            // const uploadElm = (
            //   <i-upload
            //     maxHeight={200}
            //     maxWidth={200}
            //     class={uploadStyle}
            //     onChanged={(source: Control, files: File[]) => this.updateList(source, lastIndex, { key: 'img' }, files)}
            //     onRemoved={() => this.onRemovedImage(lastIndex)}
            //   ></i-upload>
            // );
            const itemElm = (this.$render("i-vstack", { gap: 8, padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, class: config_css_1.boxShadow, position: "relative" },
                this.$render("i-icon", { name: "times", fill: "red", width: 20, height: 20, position: "absolute", top: 10, right: 10, class: config_css_1.pointerStyle, onClick: (source) => this.deleteItem(itemElm, lastIndex) }),
                this.$render("i-hstack", null,
                    this.$render("i-label", { caption: "Title", font: { bold: true } }),
                    this.$render("i-label", { caption: "*", font: { color: "red" }, margin: { left: "2px" } }),
                    this.$render("i-label", { caption: ":", font: { bold: true } })),
                this.$render("i-input", { width: "100%", value: (item === null || item === void 0 ? void 0 : item.title) || "", onChanged: (source) => this.updateList(source, lastIndex, { key: "title" }) }),
                this.$render("i-hstack", { gap: 8, margin: { top: 4, bottom: 12 }, verticalAlignment: "center" },
                    this.$render("i-label", { caption: "Show Divider:", font: { bold: true } }),
                    this.$render("i-checkbox", { checked: (item === null || item === void 0 ? void 0 : item.divider) || false, height: 16, onChanged: (source) => this.updateList(source, lastIndex, { key: "divider" }) })),
                this.$render("i-label", { caption: "Description:", font: { bold: true } }),
                this.$render("i-input", { class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: "textarea", value: (item === null || item === void 0 ? void 0 : item.description) || "", onChanged: (source) => this.updateList(source, lastIndex, { key: "description" }), margin: { bottom: 8 } }),
                this.$render("i-label", { caption: "URL Image:", font: { bold: true } }),
                this.$render("i-panel", { margin: { bottom: 8 } },
                    this.$render("i-input", { width: "100%", value: (item === null || item === void 0 ? void 0 : item.imageUrl) || "", onChanged: (source) => this.updateList(source, lastIndex, { key: "imageUrl" }) })),
                this.$render("i-label", { caption: "Link:", font: { bold: true } }),
                this.$render("i-vstack", { gap: 8, margin: { bottom: 8 }, padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, class: config_css_1.boxShadow, position: "relative" },
                    this.$render("i-label", { caption: "Caption:", font: { bold: true } }),
                    this.$render("i-input", { value: ((_a = item === null || item === void 0 ? void 0 : item.link) === null || _a === void 0 ? void 0 : _a.caption) || "", width: "100%", onChanged: (source) => this.updateList(source, lastIndex, {
                            key: "link",
                            key2: "caption",
                        }) }),
                    this.$render("i-label", { caption: "URL:", font: { bold: true } }),
                    this.$render("i-input", { value: ((_b = item === null || item === void 0 ? void 0 : item.link) === null || _b === void 0 ? void 0 : _b.url) || "", width: "100%", onChanged: (source) => this.updateList(source, lastIndex, { key: "link", key2: "url" }) }))));
            // if (item?.img)
            //   uploadElm.preview(item?.img);
            this.listStack.appendChild(itemElm);
            this.itemMap.set(lastIndex, item || { title: "" });
        }
        onRemovedImage(index) {
            if (this.itemMap.has(index)) {
                const item = this.itemMap.get(index);
                delete item.img;
                this.itemMap.set(index, item);
            }
        }
        deleteItem(source, index) {
            if (this.itemMap.has(index)) {
                source.remove();
                this.itemMap.delete(index);
            }
        }
        async updateList(source, index, prop, files) {
            const item = this.itemMap.get(index);
            if (prop.key === "img") {
                const uploadElm = source;
                item.img = files ? await uploadElm.toBase64(files[0]) : undefined;
            }
            else if (prop.key === "divider") {
                item[prop.key] = source.checked;
            }
            else {
                if (prop.key2) {
                    if (!item[prop.key]) {
                        item[prop.key] = {};
                    }
                    item[prop.key][prop.key2] = source.value;
                }
                else {
                    item[prop.key] = source.value;
                }
            }
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlConfig", gap: 8, padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" } },
                this.$render("i-label", { caption: "Title:", font: { bold: true } }),
                this.$render("i-input", { id: "edtTitle", width: "100%" }),
                this.$render("i-hstack", { gap: 8, margin: { top: 4, bottom: 12 }, verticalAlignment: "center" },
                    this.$render("i-label", { caption: "Show Divider:", font: { bold: true } }),
                    this.$render("i-checkbox", { id: "ckbDivider", checked: false, height: 16 })),
                this.$render("i-label", { caption: "Description:", font: { bold: true } }),
                this.$render("i-input", { id: "edtDesc", class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: "textarea" }),
                this.$render("i-label", { caption: "Columns Per Row:", font: { bold: true } }),
                this.$render("i-input", { id: "edtColumnsPerRow", width: "100%", inputType: "number", margin: { bottom: 8 } }),
                this.$render("i-panel", { margin: { bottom: 8 } },
                    this.$render("i-button", { caption: "Add Item", padding: {
                            left: "1rem",
                            right: "1rem",
                            top: "0.5rem",
                            bottom: "0.5rem",
                        }, onClick: () => this.addItem() })),
                this.$render("i-vstack", { id: "listStack", gap: 16 })));
        }
    };
    Config = __decorate([
        components_2.customModule,
        components_2.customElements("i-scom-feature-config")
    ], Config);
    exports.default = Config;
});
define("@scom/scom-feature/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.linkStyle = exports.containerStyle = exports.centerStyle = exports.controlStyle = exports.carouselStyle = exports.actionButtonStyle = exports.imageStyle = exports.cardItemStyle = exports.cardStyle = void 0;
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
    exports.containerStyle = components_3.Styles.style({
        width: Theme.layout.container.width,
        maxWidth: Theme.layout.container.maxWidth,
        overflow: Theme.layout.container.overflow,
        textAlign: Theme.layout.container.textAlign,
        margin: '0 auto'
    });
    exports.linkStyle = components_3.Styles.style({
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
define("@scom/scom-feature", ["require", "exports", "@ijstech/components", "@scom/scom-feature/index.css.ts"], function (require, exports, components_4, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    const configSchema = {
        type: "object",
        required: [],
        properties: {
            titleColor: {
                type: "string",
                format: "color",
            },
            descriptionColor: {
                type: "string",
                format: "color",
            },
            backgroundColor: {
                type: "string",
                format: "color",
            },
            transparent: {
                type: "boolean",
            },
            item: {
                type: "object",
                properties: {
                    itemTitleColor: {
                        type: "string",
                        format: "color",
                    },
                    itemDescriptionColor: {
                        type: "string",
                        format: "color",
                    },
                    itemLink: {
                        type: "object",
                        properties: {
                            itemLinkColor: {
                                type: "string",
                                format: "color",
                            },
                            itemLinkBackgroundColor: {
                                type: "string",
                                format: "color",
                            },
                            itemLinkTransparent: {
                                type: "boolean",
                            },
                        },
                    },
                    itemImage: {
                        type: "object",
                        properties: {
                            width: {
                                type: "string",
                            },
                            height: {
                                type: "string",
                            },
                        },
                    },
                    itemBackgroundColor: {
                        type: "string",
                        format: "color",
                    },
                    itemTransparent: {
                        type: "boolean",
                    },
                },
            },
        },
    };
    let ScomFeature = class ScomFeature extends components_4.Module {
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
            const emptyName = dataList.find((item) => !item.title);
            return !emptyName;
        }
        onUpdateBlock() {
            var _a, _b, _c;
            if ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.backgroundColor) {
                this.pnlCard.background = { color: this.settings.backgroundColor };
            }
            this.lblTitle.caption = this._data.title || "";
            this.lblTitle.style.color = ((_b = this.settings) === null || _b === void 0 ? void 0 : _b.titleColor) || "";
            this.lblDesc.caption = this._data.description || "";
            this.lblDesc.style.color = ((_c = this.settings) === null || _c === void 0 ? void 0 : _c.descriptionColor) || "";
            this.pnlDivider.visible = this._data.divider || false;
            this.renderList(this._data.data || []);
        }
        renderList(dataList) {
            var _a;
            this.pnlCardBody.clearInnerHTML();
            const lytItems = (this.$render("i-card-layout", { width: "100%", padding: { bottom: "1rem", left: "1rem", right: "1rem" }, gap: { column: "1rem", row: "0.75rem" }, columnsPerRow: this._data.columnsPerRow, cardMinWidth: "250px" }));
            this.pnlCardBody.appendChild(lytItems);
            const settings = ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.item) || {};
            dataList.forEach((product) => {
                const { title, description, divider, imageUrl, img, link } = product;
                const { itemTransparent, itemBackgroundColor, itemImage, itemTitleColor, itemDescriptionColor, itemLink, } = settings;
                const _imageUrl = imageUrl || img || "";
                lytItems.append(this.$render("i-grid-layout", { width: "100%", height: "100%", class: index_css_1.cardItemStyle, gap: { column: "1rem", row: "2rem" }, templateRows: _imageUrl ? ["100px", "1fr"] : [], background: {
                        color: itemTransparent ? "transparent" : itemBackgroundColor || "",
                    }, padding: { top: 16, bottom: 16 }, border: { radius: 8 } },
                    _imageUrl ? (this.$render("i-image", { class: index_css_1.imageStyle, width: (itemImage === null || itemImage === void 0 ? void 0 : itemImage.width) || "auto", maxHeight: (itemImage === null || itemImage === void 0 ? void 0 : itemImage.height) || 100, margin: {
                            left: (itemImage === null || itemImage === void 0 ? void 0 : itemImage.width) ? "auto" : 0,
                            right: (itemImage === null || itemImage === void 0 ? void 0 : itemImage.width) ? "auto" : 0,
                        }, padding: { top: "1rem", left: "1rem", right: "1rem" }, overflow: "hidden", url: _imageUrl })) : ([]),
                    this.$render("i-vstack", { gap: "0.5rem", padding: { left: "1rem", right: "1rem" }, class: index_css_1.centerStyle },
                        this.$render("i-label", { caption: title || "", font: {
                                weight: 600,
                                size: "1.125rem",
                                color: itemTitleColor || "",
                            } }),
                        this.$render("i-panel", { height: 2, visible: divider || false, width: 200, maxWidth: "100%", margin: { bottom: 8, left: "auto", right: "auto" }, background: { color: Theme.colors.primary.main } }),
                        this.$render("i-label", { caption: description || "", font: { color: itemDescriptionColor || "" } }),
                        (link === null || link === void 0 ? void 0 : link.caption) ? (this.$render("i-panel", { class: index_css_1.linkStyle },
                            this.$render("i-button", { caption: link.caption, font: {
                                    color: (itemLink === null || itemLink === void 0 ? void 0 : itemLink.itemLinkColor) ||
                                        Theme.colors.primary.contrastText,
                                    size: "20px",
                                }, background: {
                                    color: (itemLink === null || itemLink === void 0 ? void 0 : itemLink.itemLinkTransparent)
                                        ? "transparent !important"
                                        : (itemLink === null || itemLink === void 0 ? void 0 : itemLink.itemLinkBackgroundColor)
                                            ? `${itemLink === null || itemLink === void 0 ? void 0 : itemLink.itemLinkBackgroundColor} !important`
                                            : "",
                                }, onClick: () => (window.location.href = link.url), display: "block" }))) : (this.$render("i-label", null)))));
            });
        }
        render() {
            return (this.$render("i-panel", { id: "pnlBlock", class: index_css_1.cardStyle },
                this.$render("i-panel", { id: "pnlCard", class: index_css_1.containerStyle },
                    this.$render("i-hstack", { id: "pnlCardHeader", verticalAlignment: "center", horizontalAlignment: "center", padding: {
                            top: "1.5rem",
                            bottom: "1rem",
                            left: "1.5rem",
                            right: "1.5rem",
                        } },
                        this.$render("i-vstack", { gap: "0.5rem", class: index_css_1.centerStyle, width: "100%" },
                            this.$render("i-label", { id: "lblTitle", font: { size: "1.5rem", weight: 600 } }),
                            this.$render("i-panel", { id: "pnlDivider", visible: false, height: 2, width: "inherit", maxWidth: 200, margin: { bottom: 8, left: "auto", right: "auto" }, background: { color: Theme.colors.primary.main } }),
                            this.$render("i-label", { id: "lblDesc", font: { size: "0.875rem", color: Theme.colors.secondary.main } })),
                        this.$render("i-hstack", { id: "pnlControls", class: index_css_1.controlStyle, gap: "0.5rem" })),
                    this.$render("i-panel", { id: "pnlCardBody" }),
                    this.$render("i-panel", { id: "pnlCardFooter" })),
                this.$render("i-scom-feature-config", { id: "cardConfig", visible: false })));
        }
    };
    ScomFeature = __decorate([
        components_4.customModule,
        components_4.customElements("i-scom-feature")
    ], ScomFeature);
    exports.default = ScomFeature;
});
