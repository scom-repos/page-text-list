import {
  Module,
  customModule,
  Styles,
  Panel,
  Label
} from '@ijstech/components';
import { PageBlock, IConfig, IData, ISettings } from '@feature/global';
import Config from '@feature/config';
import { cardItemStyle, cardStyle, controlStyle, imageStyle, centerStyle, containerStyle, linkStyle } from './index.css';
import assets from '@feature/assets';
export { Config };

const Theme = Styles.Theme.ThemeVars;

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
}

@customModule
export default class Main extends Module implements PageBlock {
  private pnlCard: Panel
  private pnlCardBody: Panel
  private pnlDivider: Panel
  private lblTitle: Label
  private lblDesc: Label
  private cardConfig: Config

  private _data: IConfig = {}
  private settings: ISettings = {}

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
    this.updateFeature(value)
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

  getConfigSchema() {
    return configSchema
  }

  onConfigSave(config: any) {
    this.tag = config
    this.updateFeature(config)
  }

  updateFeature(config: any) {
    this.settings = config
    this.onUpdateBlock()
  }

  validate() {
    const dataList = this.cardConfig.data?.data;
    if (!dataList.length) return true;
    const emptyName = dataList.find(item => !item.title);
    return !emptyName;
  }

  onUpdateBlock() {
    if (this.settings?.backgroundColor) {
      this.pnlCard.background = { color: this.settings.backgroundColor };
    }
    this.lblTitle.caption = this._data.title || '';
    this.lblTitle.style.color = this.settings?.titleColor || '';
    this.lblDesc.caption = this._data.description || '';
    this.lblDesc.style.color = this.settings?.descriptionColor || '';
    this.pnlDivider.visible = this._data.divider || false;
    this.renderList(this._data.data || []);
  }

  renderList(dataList: any[]) {
    this.pnlCardBody.clearInnerHTML()
    const lytItems = (
      <i-card-layout
        width='100%'
        padding={{ bottom: '1rem', left: '1rem', right: '1rem' }}
        gap={{ column: '1rem', row: '0.75rem' }}
        columnsPerRow={this._data.columnsPerRow}
        cardMinWidth='250px'
      ></i-card-layout>
    )
    this.pnlCardBody.appendChild(lytItems)
    const settings = this.settings?.item || {};
    dataList.forEach((product: IData) => {
      lytItems.append(
        <i-grid-layout
          width='100%'
          height='100%'
          class={cardItemStyle}
          gap={{ column: '1rem', row: '2rem' }}
          templateAreas={product.img ? [['areaImg'], ['areaDetails']] : [['areaDetails']]}
          background={{ color: settings.itemTransparent ? 'transparent' : settings.itemBackgroundColor || '' }}
          padding={{ top: 16, bottom: 16 }}
          border={{ radius: 8 }}
        >
          {product.img ? <i-image
            class={imageStyle}
            width={settings.itemImage?.width || 'auto'}
            maxHeight={settings.itemImage?.height || 100}
            margin={{ left: settings.itemImage?.width ? 'auto' : 0, right: settings.itemImage?.width ? 'auto' : 0 }}
            padding={{ top: '1rem', left: '1rem', right: '1rem' }}
            overflow='hidden'
            grid={{ area: 'areaImg' }}
            url={product.img}
            fallbackUrl={assets.fullPath('img/placeholder.jpg')}
          ></i-image> : []}
          <i-vstack
            gap='0.5rem'
            grid={{ area: 'areaDetails' }}
            padding={{ left: '1rem', right: '1rem' }}
            class={centerStyle}
          >
            <i-label
              caption={product.title || ''}
              font={{ weight: 600, size: '1.125rem', color: settings.itemTitleColor || '' }}
            ></i-label>
            <i-panel height={2} visible={product.divider || false} width={200} maxWidth='100%' margin={{ bottom: 8, left: 'auto', right: 'auto' }} background={{ color: Theme.colors.primary.main }}></i-panel>
            <i-label caption={product.description || ''} font={{ color: settings.itemDescriptionColor || '' }}></i-label>
            {
              product.link?.caption ?
                <i-panel class={linkStyle}>
                  <i-button
                    caption={product.link.caption}
                    font={{ color: settings.itemLink?.itemLinkColor || Theme.colors.primary.contrastText, size: '20px' }}
                    background={{ color: settings.itemLink?.itemLinkTransparent ? 'transparent !important' : (settings.itemLink?.itemLinkBackgroundColor ? `${settings.itemLink?.itemLinkBackgroundColor} !important` : '') }}
                    onClick={() => window.location.href = product.link.url}
                    display='block'
                  ></i-button>
                </i-panel> : <i-label></i-label>
            }
          </i-vstack>
        </i-grid-layout>
      )
    })
  }

  render() {
    return (
      <i-panel id='pnlBlock' class={cardStyle}>
        <i-panel id='pnlCard' class={containerStyle}>
          <i-hstack
            id='pnlCardHeader'
            verticalAlignment='center'
            horizontalAlignment='center'
            padding={{
              top: '1.5rem',
              bottom: '1rem',
              left: '1.5rem',
              right: '1.5rem',
            }}
          >
            <i-vstack gap='0.5rem' class={centerStyle} width='100%'>
              <i-label
                id='lblTitle'
                font={{ size: '1.5rem', weight: 600 }}
              ></i-label>
              <i-panel id="pnlDivider" visible={false} height={2} width='inherit' maxWidth={200} margin={{ bottom: 8, left: 'auto', right: 'auto' }} background={{ color: Theme.colors.primary.main }}></i-panel>
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
        <pageblock-feature-config
          id='cardConfig'
          visible={false}
        ></pageblock-feature-config>
      </i-panel>
    )
  }
}