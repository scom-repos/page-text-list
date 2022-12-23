import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Input,
  VStack,
  Control,
  Upload,
  Checkbox
} from '@ijstech/components';
import { textareaStyle, uploadStyle, pointerStyle, boxShadow } from './config.css';
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
  private ckbDivider: Checkbox;
  private edtTitle: Input;
  private edtDesc: Input;
  private edtColumnsPerRow: Input;
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
      title: this.edtTitle.value || '',
      divider: this.ckbDivider.checked || false,
      description: this.edtDesc.value || '',
      columnsPerRow: 3,
      data: this.itemList || []
    };
    const columnsPerRow = Number(this.edtColumnsPerRow.value);
    if (Number.isInteger(columnsPerRow)) _data.columnsPerRow = columnsPerRow;
    return _data
  }

  set data(config: IConfig) {
    this.edtTitle.value = config.title || '';
    this.edtDesc.value = config.description || '';
    this.ckbDivider.checked = config.divider || false;
    this.edtColumnsPerRow.value = `${config.columnsPerRow || 3}`
    this.itemList = config.data || [];
    this.listStack.clearInnerHTML();
    this.itemMap = new Map();
    this._itemList.forEach(item => this.addItem(item));
  }

  private addItem(item?: IData) {
    const lastIndex = this.itemList.length;
    const uploadElm = (
      <i-upload
        maxHeight={200}
        maxWidth={200}
        class={uploadStyle}
        onChanged={(source: Control, files: File[]) => this.updateList(source, lastIndex, { key: 'img' }, files)}
        onRemoved={() => this.onRemovedImage(lastIndex)}
      ></i-upload>
    );
    const itemElm = (
      <i-vstack
        gap={8}
        padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
        class={boxShadow}
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
          <i-label caption="Title" font={{ bold: true }}></i-label>
          <i-label caption="*" font={{ color: 'red' }} margin={{ left: '2px' }}></i-label>
          <i-label caption=":" font={{ bold: true }}></i-label>
        </i-hstack>
        <i-input width="100%" value={item?.title || ''} onChanged={(source: Control) => this.updateList(source, lastIndex, { key: 'title' })}></i-input>
        <i-hstack gap={8} margin={{ top: 4, bottom: 12 }} verticalAlignment="center">
          <i-label caption="Show Divider:" font={{ bold: true }}></i-label>
          <i-checkbox checked={item?.divider || false} height={16} onChanged={(source: Control) => this.updateList(source, lastIndex, { key: 'divider' })}></i-checkbox>
        </i-hstack>
        <i-label caption="Description:" font={{ bold: true }}></i-label>
        <i-input
          class={textareaStyle}
          width="100%"
          height="auto"
          resize="auto-grow"
          inputType='textarea'
          value={item?.description || ''}
          onChanged={(source: Control) => this.updateList(source, lastIndex, { key: 'description' })}
          margin={{ bottom: 8 }}
        ></i-input>
        <i-label caption="Image:"></i-label>
        <i-panel margin={{ bottom: 8 }}>
          {uploadElm}
        </i-panel>
        <i-panel>
          <i-label caption="URL"></i-label>
          <i-input width="100%" onChanged={(source: Control) => this.updateList(source, lastIndex, { key: 'imageUrl' })}></i-input>
        </i-panel>
        <i-label caption="Link:" font={{ bold: true }}></i-label>
        <i-vstack
          gap={8}
          margin={{ bottom: 8 }}
          padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
          class={boxShadow}
          position="relative"
        >
          <i-label caption="Caption:" font={{ bold: true }}></i-label>
          <i-input value={item?.link?.caption || ''} width="100%" onChanged={(source: Control) => this.updateList(source, lastIndex, { key: 'link', key2: 'caption' })}></i-input>
          <i-label caption="URL:" font={{ bold: true }}></i-label>
          <i-input value={item?.link?.url || ''} width="100%" onChanged={(source: Control) => this.updateList(source, lastIndex, { key: 'link', key2: 'url' })}></i-input>
        </i-vstack>
      </i-vstack>
    );
    if (item?.img)
      uploadElm.preview(item?.img);
    this.listStack.appendChild(itemElm);
    this.itemMap.set(lastIndex, item || { title: '' });
  }

  private onRemovedImage(index: number) {
    if (this.itemMap.has(index)) {
      const item = this.itemMap.get(index);
      delete item.img;
      this.itemMap.set(index, item);
    }
  }

  private deleteItem(source: Control, index: number) {
    if (this.itemMap.has(index)) {
      source.remove();
      this.itemMap.delete(index);
    }
  }

  private async updateList(source: Control, index: number, prop: { key: string, key2?: string }, files?: File[]) {
    const item: any = this.itemMap.get(index);
    if (prop.key === 'img') {
      const uploadElm = source as Upload;
      item.img = files ? await uploadElm.toBase64(files[0]) : undefined;
    } else if (prop.key === 'divider') {
      item[prop.key] = (source as Checkbox).checked;
    } else {
      if (prop.key2) {
        if (!item[prop.key]) {
          item[prop.key] = {};
        }
        item[prop.key][prop.key2] = (source as Input).value;
      } else {
        item[prop.key] = (source as Input).value;
      }
    }
  }

  render() {
    return (
      <i-vstack id="pnlConfig" gap={8} padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}>
        <i-label caption="Title:" font={{ bold: true }}></i-label>
        <i-input id="edtTitle" width="100%"></i-input>
        <i-hstack gap={8} margin={{ top: 4, bottom: 12 }} verticalAlignment="center">
          <i-label caption="Show Divider:" font={{ bold: true }}></i-label>
          <i-checkbox id="ckbDivider" checked={false} height={16}></i-checkbox>
        </i-hstack>
        <i-label caption="Description:" font={{ bold: true }}></i-label>
        <i-input
          id="edtDesc"
          class={textareaStyle}
          width="100%"
          height="auto"
          resize="auto-grow"
          inputType="textarea"
        ></i-input>
        <i-label caption="Columns Per Row:" font={{ bold: true }}></i-label>
        <i-input id="edtColumnsPerRow" width="100%" inputType="number" margin={{ bottom: 8 }}></i-input>
        <i-panel margin={{ bottom: 8 }}>
          <i-button
            caption="Add Item"
            padding={{ left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }}
            onClick={() => this.addItem()}
          ></i-button>
        </i-panel>
        <i-vstack id="listStack" gap={16}></i-vstack>
      </i-vstack>
    )
  }
}