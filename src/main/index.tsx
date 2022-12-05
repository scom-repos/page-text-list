import {
  Module,
  customModule,
  Styles,
  Panel,
  Label
} from '@ijstech/components';
import { PageBlock, IConfig } from '@feature/global';
import Config from './config';
import {cardItemStyle, cardStyle, controlStyle, imageStyle, centerStyle } from './index.css';
import featureList from './data.json';
import assets from '@feature/assets';
export { Config };

const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Main extends Module implements PageBlock {
  private pnlCard: Panel
  private pnlCardBody: Panel
  private lblTitle: Label
  private lblDesc: Label
  private cardConfig: Config

  private _data: IConfig = {}
  tag: any
  defaultEdit: boolean = true
  readonly onConfirm: () => Promise<void>
  readonly onDiscard: () => Promise<void>
  readonly onEdit: () => Promise<void>

  getData() {
    return this._data
  }

  async setData(data: IConfig) {
    this._data = data
    this.cardConfig.data = data
    this.onUpdateBlock()
  }

  getTag() {
    return this.tag
  }

  async setTag(value: any) {
    this.tag = value
  }

  async edit() {
    this.cardConfig.data = this._data
    this.pnlCard.visible = false
    this.cardConfig.visible = true
  }

  async confirm() {
    this._data = this.cardConfig.data
    this.onUpdateBlock()
    this.pnlCard.visible = true
    this.cardConfig.visible = false
  }

  async discard() {
    this.pnlCard.visible = true
    this.cardConfig.visible = false
  }

  async config() { }
  
  validate() {
    const dataList = this._data.data;
    if (!dataList.length) return true;
    const emptyName = dataList.find(item => !item.name);
    return !emptyName;
  }

  onUpdateBlock() {
    this.lblTitle.caption = this._data.title || ''
    this.lblDesc.caption = this._data.description || ''
    this.renderList(this._data.data || [])
  }

  private getItemPerRow(dataList: any[]) {
    const length = dataList.length;
    if (length === 1) return 1;
    if (length % 3 === 0) return 3;
    if (length % 2 === 0) return 2;
    return 3;
  }

  renderList(dataList: any[]) {
    this.pnlCardBody.clearInnerHTML()
    const lytItems = (
      <i-card-layout
        width='100%'
        padding={{ bottom: '1rem', left: '1rem', right: '1rem' }}
        gap={{ column: '1rem', row: '0.75rem' }}
        columnsPerRow={this.getItemPerRow(dataList)}
        cardMinWidth='250px'
      ></i-card-layout>
    )
    this.pnlCardBody.appendChild(lytItems)
    dataList.forEach((product) => {
      lytItems.append(
        <i-grid-layout
          width='100%'
          height='100%'
          class={cardItemStyle}
          gap={{ column: '1rem', row: '2rem' }}
          templateAreas={[['areaImg'], ['areaDetails']]}
        >
          <i-image
            class={imageStyle}
            width='auto'
            maxHeight={100}
            padding={{ top: '1rem', left: '1rem', right: '1rem' }}
            overflow='hidden'
            grid={{ area: 'areaImg' }}
            url={product.img}
            fallbackUrl={assets.fullPath('img/placeholder.jpg')}
          ></i-image>
          <i-vstack
            gap='0.5rem'
            grid={{ area: 'areaDetails' }}
            padding={{ left: '1rem', right: '1rem' }}
            class={centerStyle}
          >
            <i-label
              caption={product.name || ''}
              font={{ weight: 600, size: '1.125rem' }}
            ></i-label>
            <i-label caption={product.caption || ''}></i-label>
          </i-vstack>
        </i-grid-layout>
      )
    })
  }

  render() {
    return (
      <i-panel id='pnlBlock' class={cardStyle}>
        <i-panel id='pnlCard'>
          <i-hstack
            id='pnlCardHeader'
            verticalAlignment='center'
            horizontalAlignment='center'
            padding={{
              top: '1.5rem',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
            }}
          >
            <i-vstack gap='0.5rem' class={centerStyle} width='100%'>
              <i-label
                id='lblTitle'
                font={{ size: '1.5rem', weight: 600 }}
              ></i-label>
              <i-label
                id='lblDesc'
                font={{ size: '0.875rem', color: Theme.colors.secondary.main }}
              ></i-label>
            </i-vstack>
            <i-hstack
              id='pnlControls'
              class={controlStyle}
              gap='0.5rem'
            ></i-hstack>
          </i-hstack>
          <i-panel id='pnlCardBody'></i-panel>
          <i-panel id='pnlCardFooter'></i-panel>
        </i-panel>
        <pageblock-card-config
          id='cardConfig'
          visible={false}
        ></pageblock-card-config>
      </i-panel>
    )
  }
}