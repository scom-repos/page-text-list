import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Input,
  VStack,
  Control
} from '@ijstech/components';
import { textareaStyle, uploadStyle } from './config.css';
import { IConfig, IData } from '@feature/global';

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
  private listStack: VStack;
  private itemList: IData[] = [];

  get data() {
    const _data: IConfig = {
      title: this.edtTitle.value || "",
      description: this.edtDesc.value || "",
      data: this.itemList || []
    };
    return _data
  }

  set data(config: IConfig) {
    this.edtTitle.value = config.title || "";
    this.edtDesc.value = config.description || "";
    console.log(config)
  }

  private addItem() {
    const lastIndex = this.itemList.length;
    const itemElm = (
      <i-vstack
        gap='0.5rem'
        padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
        border={{ width: 1, style: 'solid', color: 'rgba(217,225,232,.38)', radius: 5 }}
      >
        <i-label caption="Name:"></i-label>
        <i-input width="100%" onChanged={(source: Control) => this.updateList(source, lastIndex, 'name')}></i-input>
        <i-label caption="Description:"></i-label>
        <i-input
          class={textareaStyle}
          width="100%"
          height="auto"
          resize="auto-grow"
          inputType='textarea'
          onChanged={(source: Control) => this.updateList(source, lastIndex, 'caption')}
        ></i-input>
        <i-label caption="Logo:"></i-label>
        <i-panel>
          <i-upload
            maxHeight={200}
            maxWidth={200}
            class={uploadStyle}
            onChanged={(source: Control) => this.updateList(source, lastIndex, 'img')}
          ></i-upload>
        </i-panel>
      </i-vstack>
    );
    this.listStack.appendChild(itemElm);
    this.itemList[lastIndex] = { name: '' };
  }

  private updateList(source: Control, index: number, prop: 'name' | 'caption' | 'img') {
    const item: any = this.itemList[index] || {};
    if (prop === 'img') {
      const imgUploader = source.getElementsByTagName("img")[0];
      item.img = imgUploader.src || '';
    } else {
      item[prop] = (source as Input).value;
    }
  }

  init() {
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
        <i-panel>
          <i-button
            caption="Add Item"
            padding={{ left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }}
            onClick={this.addItem.bind(this)}
          ></i-button>
        </i-panel>
        <i-vstack id="listStack" gap="0.5rem"></i-vstack>
      </i-vstack>
    )
  }
}