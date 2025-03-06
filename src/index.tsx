import {
  Module,
  Styles,
  Panel,
  customElements,
  ControlElement,
  customModule,
  Container
} from '@ijstech/components';
import { ITextList, ITextItem } from './global/index';
import { cardItemStyle, customStyle } from './index.css';
import assets from './assets/index';
import { Model } from './model/index';

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
@customElements("i-page-text-list")
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
    // const columnsPerRow = this.data.length || 1
    // const width = 100 / columnsPerRow + '%'

    const lytItems = (
      <i-hstack
        width='100%'
        padding={{ bottom: '1rem', left: '1rem', right: '1rem' }}
        gap={this.model.tag?.gap || '1rem'}
        horizontalAlignment='center'
        background={{color: Theme.background.main}}
        wrap='wrap'
      ></i-hstack>
    )
    this.pnlCard.appendChild(lytItems)

    this.data.forEach((product: ITextItem) => {
      const { title, description, image, link } = product;
      const {
        borderRadius = 0,
        imageWidth = "auto",
        imageHeight = "100px",
        titleFontSize = "1.125rem",
        descriptionFontSize = "0.875rem",
        imageRadius = 0,
        itemMaxWidth = "100%",
        itemPadding = { top: '0', bottom: '0', left: '0', right: '0' }
      } = this.model.tag;

      lytItems.append(
        <i-grid-layout
          stack={{grow: '1', shrink: '1', basis: "0%"}}
          maxWidth={itemMaxWidth}
          class={cardItemStyle}
          gap={{ column: '1rem', row: '1.5rem' }}
          background={{ color: Theme.background.paper }}
          border={{ radius: borderRadius }}
          padding={itemPadding}
          mediaQueries={[
            { maxWidth: "767px", properties: { width: '100%' } }
          ]}
        >
          {image ? <i-image
            width={imageWidth}
            height={imageHeight}
            margin={{ left: 'auto', right: 'auto' }}
            padding={{ top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem' }}
            overflow="hidden"
            border={{radius: imageRadius}}
            background={{color: Theme.background.default}}
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
                font={{ weight: 600, size: typeof titleFontSize === 'number' ? `${titleFontSize}px` : titleFontSize, color: Theme.text.primary }}
              ></i-label>
              <i-label
                caption={description || ''}
                visible={!!description}
                font={{ color: Theme.text.secondary, size: typeof descriptionFontSize === 'number' ? `${descriptionFontSize}px` : descriptionFontSize }}
              ></i-label>
            </i-vstack>
            {
              link?.caption ?
                <i-panel>
                  <i-button
                    caption={link.caption}
                    padding={{ left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }}
                    font={{ color: Theme.action.active, size: '20px' }}
                    background={{ color: Theme.action.activeBackground }}
                    boxShadow='none'
                    margin={{ left: 'auto', right: 'auto' }}
                    onClick={() => window.location.href = link.url}
                  ></i-button>
                </i-panel> : []
            }
          </i-vstack>
        </i-grid-layout>
      )
    })
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  }

  private onUpdateTheme() {
    const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
    this.updateStyle('--text-primary', this.model.tag[themeVar]?.titleColor);
    this.updateStyle('--background-main', this.model.tag[themeVar]?.backgroundColor);
    this.updateStyle('--text-secondary', this.model.tag[themeVar]?.descriptionColor);
    this.updateStyle('--action-active_background', this.model.tag[themeVar]?.linkBackgroundColor);
    this.updateStyle('--action-active', this.model.tag[themeVar]?.linkColor);
    this.updateStyle('--background-paper', this.model.tag[themeVar]?.itemBackgroundColor);
    this.updateStyle('--background-default', this.model.tag[themeVar]?.imageBackgroundColor);
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
    if (data) {
      this.setData({ data });
    }
  }

  render() {
    return (
      <i-panel id='pnlBlock' background={{ color: 'transparent' }} margin={{left: 'auto', right: 'auto'}}>
        <i-panel id='pnlCard' class={customStyle} />
      </i-panel>
    )
  }
}