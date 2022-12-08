var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@feature/config/config.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
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
define("@feature/config", ["require", "exports", "@ijstech/components", "@feature/config/config.css.ts"], function (require, exports, components_2, config_css_1) {
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
                columnsPerRow: 3,
                data: this.itemList || []
            };
            const columnsPerRow = Number(this.edtColumnsPerRow.value);
            if (Number.isInteger(columnsPerRow))
                _data.columnsPerRow = columnsPerRow;
            return _data;
        }
        set data(config) {
            this.edtTitle.value = config.title || "";
            this.edtDesc.value = config.description || "";
            this.edtColumnsPerRow.value = `${config.columnsPerRow || 3}`;
            this.itemList = config.data || [];
            this.listStack.clearInnerHTML();
            this.itemMap = new Map();
            this._itemList.forEach(item => {
                this.addItem(item);
            });
        }
        addItem(item) {
            const lastIndex = this.itemList.length;
            const uploadElm = (this.$render("i-upload", { maxHeight: 200, maxWidth: 200, class: config_css_1.uploadStyle, fileList: (item === null || item === void 0 ? void 0 : item.file) ? [item.file] : [], onChanged: (source, files) => this.updateList(source, lastIndex, 'img', files), onRemoved: () => this.onRemovedImage(lastIndex) }));
            const itemElm = (this.$render("i-vstack", { gap: '0.5rem', padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, border: { width: 1, style: 'solid', color: 'rgba(217,225,232,.38)', radius: 5 }, position: "relative" },
                this.$render("i-icon", { name: "times", fill: "red", width: 20, height: 20, position: "absolute", top: 10, right: 10, class: config_css_1.pointerStyle, onClick: (source) => this.deleteItem(itemElm, lastIndex) }),
                this.$render("i-hstack", null,
                    this.$render("i-label", { caption: "Name" }),
                    this.$render("i-label", { caption: "*", font: { color: 'red' }, margin: { left: '4px' } }),
                    this.$render("i-label", { caption: ":" })),
                this.$render("i-input", { width: "100%", value: (item === null || item === void 0 ? void 0 : item.name) || '', onChanged: (source) => this.updateList(source, lastIndex, 'name') }),
                this.$render("i-label", { caption: "Description:" }),
                this.$render("i-input", { class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: 'textarea', value: (item === null || item === void 0 ? void 0 : item.caption) || '', onChanged: (source) => this.updateList(source, lastIndex, 'caption') }),
                this.$render("i-label", { caption: "Image:" }),
                this.$render("i-panel", null, uploadElm)));
            if (item === null || item === void 0 ? void 0 : item.img)
                uploadElm.preview(item === null || item === void 0 ? void 0 : item.img);
            this.listStack.appendChild(itemElm);
            this.itemMap.set(lastIndex, item || { name: '' });
        }
        onRemovedImage(index) {
            if (this.itemMap.has(index)) {
                const item = this.itemMap.get(index);
                delete item.img;
                item.file = undefined;
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
            if (prop === 'img') {
                const uploadElm = source;
                item.img = files ? await uploadElm.toBase64(files[0]) : undefined;
                item.file = files[0];
            }
            else {
                item[prop] = source.value;
            }
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlConfig", gap: '0.5rem', padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-label", { caption: "Title:" }),
                this.$render("i-input", { id: "edtTitle", width: "100%" }),
                this.$render("i-label", { caption: "Description:" }),
                this.$render("i-input", { id: "edtDesc", class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: 'textarea' }),
                this.$render("i-label", { caption: "Columns Per Row:" }),
                this.$render("i-input", { id: "edtColumnsPerRow", width: "100%", inputType: "number" }),
                this.$render("i-panel", null,
                    this.$render("i-button", { caption: "Add Item", padding: { left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }, onClick: () => this.addItem() })),
                this.$render("i-vstack", { id: "listStack", gap: "0.5rem" })));
        }
    };
    Config = __decorate([
        components_2.customModule,
        components_2.customElements("pageblock-feature-config")
    ], Config);
    exports.default = Config;
});
