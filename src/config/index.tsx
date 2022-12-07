import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Input,
  VStack,
  Control,
  Upload
} from '@ijstech/components';
import { textareaStyle, uploadStyle, pointerStyle } from './config.css';
import { IConfig, IData } from '@feature/global';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['pageblock-feature-config']: ControlElement;
    }
  }
}

@customModule
@customElements("pageblock-feature-config")
export default class Config extends Module {
  private edtTitle: Input;
  private edtDesc: Input;
  private listStack: VStack;
  private itemMap: Map<number, IData> = new Map();
  private _itemList: IData[] = [];

  get itemList() {
    return Array.from(this.itemMap).map(item => item[1]);
  }
  set itemList(data: IData[]) {
    this._itemList = data;
  }

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
    this.itemList = config.data || [];
    this.listStack.clearInnerHTML();
    this.itemMap = new Map();
    this._itemList.forEach(item => {
      this.addItem(item);
    })
  }

  private addItem(item?: IData) {
    const lastIndex = this.itemList.length;
    const uploadElm = (
      <i-upload
        maxHeight={200}
        maxWidth={200}
        class={uploadStyle}
        fileList={item?.file ? [item.file] : [] }
        onChanged={(source: Control, files: File[]) => this.updateList(source, lastIndex, 'img', files)}
        onRemoved={() => this.onRemovedImage(lastIndex)}
      ></i-upload>
    );
    const itemElm = (
      <i-vstack
        gap='0.5rem'
        padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
        border={{ width: 1, style: 'solid', color: 'rgba(217,225,232,.38)', radius: 5 }}
        position="relative"
      >
        <i-icon
          name="times" fill="red" width={20} height={20}
          position="absolute"
          top={10} right={10}
          class={pointerStyle}
          onClick={(source: Control) => this.deleteItem(itemElm, lastIndex)}
        ></i-icon>
        <i-hstack>
          <i-label caption="Name"></i-label>
          <i-label caption="*" font={{ color: 'red' }} margin={{left: '4px'}}></i-label>
          <i-label caption=":"></i-label>
        </i-hstack>
        <i-input width="100%" value={item?.name || ''} onChanged={(source: Control) => this.updateList(source, lastIndex, 'name')}></i-input>
        <i-label caption="Description:"></i-label>
        <i-input
          class={textareaStyle}
          width="100%"
          height="auto"
          resize="auto-grow"
          inputType='textarea'
          value={item?.caption || ''}
          onChanged={(source: Control) => this.updateList(source, lastIndex, 'caption')}
        ></i-input>
        <i-label caption="Image:"></i-label>
        <i-panel>
          { uploadElm }
        </i-panel>
      </i-vstack>
    );
    if (item?.img)
      uploadElm.preview(item?.img);
    this.listStack.appendChild(itemElm);
    this.itemMap.set(lastIndex, item ||  { name: '' });
  }

  private onRemovedImage(index: number) {
    if (this.itemMap.has(index)) {
      const item = this.itemMap.get(index);
      delete item.img;
      item.file = undefined;
      this.itemMap.set(index, item);
    }
  }

  private deleteItem(source: Control, index: number) {
    if (this.itemMap.has(index)) {
      source.remove();
      this.itemMap.delete(index);
    }
  }

  private async updateList(source: Control, index: number, prop: 'name' | 'caption' | 'img', files?: File[]) {
    const item: any = this.itemMap.get(index);
    if (prop === 'img') {
      const uploadElm = source as Upload;
      item.img = files ? await uploadElm.toBase64(files[0]) : undefined;
      item.file = files[0];
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
            onClick={() => this.addItem()}
          ></i-button>
        </i-panel>
        <i-vstack id="listStack" gap="0.5rem"></i-vstack>
      </i-vstack>
    )
  }
}