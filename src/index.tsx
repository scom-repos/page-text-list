import {
  Module,
  Styles,
  Panel,
  customElements,
  ControlElement,
  customModule,
  Container
} from '@ijstech/components';
import { ITextList, ITextItem, ISettings } from './interface';
import { cardItemStyle, customStyle } from './index.css';
import assets from './assets/index';
import { Model } from './model/index';
import { merge } from './utils';

const Theme = Styles.Theme.ThemeVars;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-page-text-list']: ScomPageTextListElement;
    }
  }
}

interface ScomPageTextListElement extends ControlElement {
  data?: ITextItem[];
}

@customModule
@customElements("i-page-text-list", {
  icon: 'stop',
  props: {
    data: {
      type: 'array',
      default: []
    }
  },
  className: 'ScomPageTextList',
  events: {},
  dataSchema: {
    "type": "object",
    "properties": {
      "data": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "link": {
              "type": "object",
              "properties": {
                "caption": {
                  "type": "string"
                },
                "url": {
                  "type": "string"
                }
              }
            },
            "image": {
              "type": "string"
            }
          }
        }
      }
    }
  }
})
export default class ScomPageTextList extends Module {
  private pnlBlock: Panel;
  private pnlCard: Panel

  private model: Model;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get data() {
    return this.model.data
  }

  set data(value: ITextItem[]) {
    this.model.data = value;
  }

  private async setData(data: ITextList) {
    this.model.setData(data);
  }

  private onUpdateBlock() {
    if (this.model.tag?.maxWidth) {
      this.pnlBlock.maxWidth = this.model.tag.maxWidth;
    }
    this.renderList();
  }

  private renderList() {
    this.pnlCard.clearInnerHTML()
    const defaultValues = {
      image: {
        width: "auto",
        height: "100px"
      },
      title: {
        font: {
          size: "1.125rem",
          bold: true
        }
      },
      description: {
        font: {
          size: "0.875rem",
          color: Theme.text.secondary
        }
      },
      link: {
        font: {
          size: "20px",
          color: Theme.action.active
        },
        background: {
          color: Theme.action.activeBackground
        }
      },
      item: {
        padding: { top: '0', bottom: '0', left: '0', right: '0' }
      },
      background: {
        color: "transparent"
      }
    }

    const merged = merge(defaultValues, this.model.tag);

    this.renderRow(this.data, merged);
  }

  private renderRow(data: ITextItem[], tag: ISettings) {
    const {
      gap,
      border,
      background,
      columnsPerRow,
      image: imageStyles,
      title: titleStyles,
      description: descriptionStyles,
      item: itemStyles,
      link: linkStyles
    } = tag;

    const length = this.data.length;
    const validColumns = columnsPerRow && columnsPerRow > length ? length : columnsPerRow && columnsPerRow < 1 ? 1 : columnsPerRow;

    const isValidNumber = (value: string | number) => {
      return value && value !== 'auto' && value !== '100%';
    }

    let maxWidth = isValidNumber(itemStyles?.maxWidth) ? itemStyles.maxWidth : undefined;
    if (maxWidth !== undefined && !isNaN(Number(maxWidth))) maxWidth = `${maxWidth}px`;
    let width = isValidNumber(itemStyles?.width) ? itemStyles.width : undefined;
    if (width !== undefined && !isNaN(Number(width))) width = `${width}px`;
    let minWidth = isValidNumber(itemStyles?.minWidth) ? itemStyles.minWidth : undefined;
    if (minWidth !== undefined && !isNaN(Number(minWidth))) minWidth = `${minWidth}px`;

    let repeat = '';
    const repeatWidth = maxWidth || width || '1fr';
    
    if (width || minWidth || maxWidth) {
      if (validColumns) {
        repeat = `repeat(${validColumns}, minmax(${minWidth || width || 'auto'}, ${repeatWidth}))`;
      } else {
        repeat = `repeat(auto-fill, minmax(${minWidth || width || 'auto'}, ${repeatWidth}))`;
      }
    }
    else {
      repeat = `repeat(${validColumns || length}, 1fr)`;
    }

    const lytItems = (
      <i-card-layout
        width='100%'
        padding={{ bottom: '1rem', left: '1rem', right: '1rem' }}
        gap={{column: gap || '1rem', row: gap || '1rem'}}
        justifyContent='center'
        background={background}
        cardMinWidth={itemStyles?.minWidth}
        templateColumns={[repeat]}
        mediaQueries={[
          {
            maxWidth: "767px",
            properties: {
              templateColumns: [`repeat(1, ${repeatWidth})`]
            }
          },
          {
            minWidth: "768px",
            maxWidth: "1024px",
            properties: {
              templateColumns: [`repeat(2, ${repeatWidth})`]
            }
          }
        ]}
      ></i-card-layout>
    )
    this.pnlCard.appendChild(lytItems)

    data.forEach((product: ITextItem) => {
      const { title, description, image, link } = product;

      const el = <i-grid-layout
        maxWidth={itemStyles?.maxWidth}
        class={cardItemStyle}
        width="100%"
        gap={{ column: '1rem', row: itemStyles.gap ?? '1.5rem' }}
        background={itemStyles?.background}
        border={border}
        padding={itemStyles?.padding}
        boxShadow={itemStyles?.boxShadow ?? 'none'}
      >
        {image ? <i-image
          width={imageStyles?.width}
          height={imageStyles?.height}
          margin={{ left: 'auto', right: 'auto' }}
          padding={{ top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem' }}
          overflow="hidden"
          border={imageStyles?.border}
          background={imageStyles?.background}
          url={image}
          fallbackUrl={assets.fullPath('img/placeholder.jpg')}
        ></i-image> : []}
        <i-vstack
          gap="1rem"
          height="100%"
          verticalAlignment='space-between'
          class="text-center"
        >
          <i-vstack gap="1rem" class="text-center" width="100%" height="100%">
            <i-label
              caption={title || ''}
              visible={!!title}
              font={titleStyles?.font}
            ></i-label>
            <i-label
              caption={description || ''}
              visible={!!description}
              font={descriptionStyles?.font}
            ></i-label>
          </i-vstack>
          {
            link?.caption ?
              <i-panel>
                <i-button
                  caption={link.caption}
                  padding={{ left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }}
                  font={linkStyles?.font}
                  background={linkStyles?.background}
                  boxShadow='none'
                  margin={{ left: 'auto', right: 'auto' }}
                  onClick={() => {
                    if (this._designMode) return;
                    window.location.href = link.url;
                  }}
                ></i-button>
              </i-panel> : []
          }
        </i-vstack>
      </i-grid-layout>

      lytItems.append(el);
    })
  }

  private onUpdateTheme() {}

  getConfigurators() {
    return this.model.getConfigurators();
  }

  init() {
    super.init();
      this.model = new Model({
        onUpdateBlock: () => this.onUpdateBlock(),
        onUpdateTheme: () => this.onUpdateTheme()
      });
    const data = this.getAttribute('data', true);
    if (data) this.setData({ data });

    const tag = this.getAttribute('tag', true);
    if (tag) this.model.setTag(tag);
  }

  render() {
    return (
      <i-panel id='pnlBlock' background={{ color: 'transparent' }} margin={{left: 'auto', right: 'auto'}}>
        <i-panel id='pnlCard' class={customStyle} />
      </i-panel>
    )
  }
}