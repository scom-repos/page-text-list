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
        padding: { top: '0', bottom: '0', left: '0', right: '0' },
        maxWidth: "100%"
      },
      background: {
        color: "transparent"
      }
    }

    const merged = merge(defaultValues, this.model.tag);

    if (merged.columnsPerRow) {
      const columnsPerRow = merged.columnsPerRow;
      const rows = Math.ceil(this.data.length / columnsPerRow);
      for (let i = 0; i < rows; i++) {
        const start = i * columnsPerRow;
        const data = this.data.slice(start, start + columnsPerRow);
        this.renderRow(data, merged);
      }
    } else {
      this.renderRow(this.data, merged);
    }
  }

  private renderRow(data: ITextItem[], tag: ISettings) {
    const {
      gap,
      border,
      background,
      image: imageStyles,
      title: titleStyles,
      description: descriptionStyles,
      item: itemStyles,
      link: linkStyles
    } = tag;

    const lytItems = (
      <i-hstack
        width='100%'
        padding={{ bottom: '1rem', left: '1rem', right: '1rem' }}
        gap={gap || '1rem'}
        horizontalAlignment='center'
        background={background}
        wrap='wrap'
      ></i-hstack>
    )
    this.pnlCard.appendChild(lytItems)

    data.forEach((product: ITextItem) => {
      const { title, description, image, link } = product;

      lytItems.append(
        <i-grid-layout
          stack={{grow: '1', shrink: '1', basis: "0%"}}
          maxWidth={itemStyles?.maxWidth}
          class={cardItemStyle}
          gap={{ column: '1rem', row: itemStyles.gap ?? '1.5rem' }}
          background={itemStyles?.background}
          border={border}
          padding={itemStyles?.padding}
          boxShadow={itemStyles?.boxShadow ?? 'none'}
          mediaQueries={[
            { maxWidth: "767px", properties: { width: '100%' } }
          ]}
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
      )
    })
  }

  // private updateStyle(name: string, value: any) {
  //   value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  // }

  private onUpdateTheme() {
    // const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
    // this.updateStyle('--text-primary', this.model.tag[themeVar]?.titleColor);
    // this.updateStyle('--background-main', this.model.tag[themeVar]?.backgroundColor);
    // this.updateStyle('--text-secondary', this.model.tag[themeVar]?.descriptionColor);
    // this.updateStyle('--action-active_background', this.model.tag[themeVar]?.linkBackgroundColor);
    // this.updateStyle('--action-active', this.model.tag[themeVar]?.linkColor);
    // this.updateStyle('--background-paper', this.model.tag[themeVar]?.itemBackgroundColor);
    // this.updateStyle('--background-default', this.model.tag[themeVar]?.imageBackgroundColor);
  }

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