import { Module } from "@ijstech/components";
import { ISettings, ITextItem, ITextList } from "../global/index";

interface IOptions {
  onUpdateBlock: () => void;
  onUpdateTheme: () => void;
}

export class Model {
  private _data: ITextList = {};
  private _module: Module;
  private _options: IOptions;

  constructor(module: Module, options: IOptions) {
    this._options = options;
    this._module = module;
  }

  get data() {
    return this._data?.data || [];
  }

  set data(value: ITextItem[]) {
    this._data.data = value || [];
  }

  setData(data: ITextList) {
    this._data = data;
    this._options?.onUpdateBlock();
  }

  getData() {
    return this._data;
  }

  getTag() {
    return this._module.tag;
  }

  setTag(value: ISettings) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        if (prop === 'light' || prop === 'dark') this.updateTag(prop, newValue[prop]);
        else this._module.tag[prop] = newValue[prop];
      }
    }
    this._options?.onUpdateTheme();
    this._options?.onUpdateBlock();
  }

  private updateTag(type: 'light' | 'dark', value: any) {
    this._module.tag[type] = this._module.tag[type] ?? {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop)) this._module.tag[type][prop] = value[prop];
    }
  }
}