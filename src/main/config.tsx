import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Styles,
  Input,
  ComboBox
} from '@ijstech/components';
import { textareaStyle } from './config.css';
import { getCardTypeOption, IConfig, ICardTypeOption } from '@feature/global';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['pageblock-card-config']: ControlElement;
    }
  }
}

@customModule
@customElements("pageblock-card-config")
export default class Config extends Module {
  private edtTitle: Input;
  private edtDesc: Input;
  private edtItemsToShow: Input;
  // private edtContract: Input;
  // private edtViewAllUrl: Input;
  private cbCardType: ComboBox;
  private _items: ICardTypeOption[];

  get data() {
    const selectedItem = this.cbCardType.selectedItem as ICardTypeOption;
    const _data: IConfig = {
      title: this.edtTitle.value || "",
      description: this.edtDesc.value || "",
      // contractEntrypoint: this.edtContract.value || "",
      // viewAllUrl: this.edtViewAllUrl.value || ""
    };
    if (selectedItem) _data.type = selectedItem.value;
    const itemsToShow = Number(this.edtItemsToShow.value);
    if (Number.isInteger(itemsToShow)) _data.itemsToShow = itemsToShow;
    return _data
  }

  set data(config: IConfig) {
    this.edtTitle.value = config.title || "";
    this.edtDesc.value = config.description || "";
    // this.edtContract.value = config.contractEntrypoint || "";
    this.cbCardType.clear();
    const type = this._items.find(type => type.value === config.type);
    if (type) this.cbCardType.selectedItem = type;
    this.edtItemsToShow.value = config.itemsToShow || "";
    // this.edtViewAllUrl.value = config.viewAllUrl || "";
  }

  init() {
    this._items = getCardTypeOption();
    super.init();
  }

  render() {
    return (
      <i-vstack id="pnlConfig" gap='0.5rem' padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}>
        <i-label caption="Title:"></i-label>
        <i-input id="edtTitle" width="100%"></i-input>
        <i-label caption="Description:"></i-label>
        <i-input
          id="edtDesc"
          class={textareaStyle}
          width="100%"
          height="auto"
          resize="auto-grow"
          inputType='textarea'
        ></i-input>
        <i-label caption="Card Type:"></i-label>
        <i-combo-box
          id="cbCardType"
          width="100%"
          icon={{ name: 'angle-down' }}
          items={this._items}
        ></i-combo-box>
        <i-label caption="Max items to show:"></i-label>
        <i-input id="edtItemsToShow" width="100%" inputType='number'></i-input>
        {/* <i-label caption="Contract Entrypoint:"></i-label>
        <i-input id="edtContract" width="100%"></i-input> */}
        {/* <i-label caption="View all link:"></i-label>
        <i-input id="edtViewAllUrl" width="100%"></i-input> */}
      </i-vstack>
    )
  }
}