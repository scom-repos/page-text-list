import {
  Module,
  Styles,
  Panel,
  customElements,
  ControlElement
} from '@ijstech/components';
import { ITextList, ITextItem, ISettings } from './global/index';
import { cardItemStyle, containerStyle } from './index.css';
import assets from './assets/index';
import { Model } from './model/index';

const Theme = Styles.Theme.ThemeVars;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-page-text-list']: ScomPageTextListElement;
    }
  }
}

interface ScomPageTextListElement extends ControlElement {
  data?: ITextItem[];
}

@customElements("i-scom-page-text-list")
export default class ScomPageTextList extends Module {
  private pnlBlock: Panel;
  private pnlCard: Panel

  private model: Model;
  tag: ISettings = {}

  get data() {
    return this.model.data
  }

  set data(value: ITextItem[]) {
    this.model.data = value;
  }

  private getData() {
    return this.model.getData()
  }

  private async setData(data: ITextList) {
    this.model.setData(data);
  }

  private onUpdateBlock() {
    if (this.tag?.maxWidth) {
      this.pnlBlock.maxWidth = this.tag.maxWidth;
    }
    this.renderList();
  }

  private renderList() {
    this.pnlCard.clearInnerHTML()
    const columnsPerRow = this.data.length || 1
    const width = 100 / columnsPerRow + '%'

    const lytItems = (
      <i-hstack
        width='100%'
        padding={{ bottom: '1rem', left: '1rem', right: '1rem' }}
        gap={this.tag?.gap || '1rem'}
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
        itemMaxWidth = "100%"
      } = this.tag;

      lytItems.append(
        <i-grid-layout
          width={width}
          stack={{grow: '0', shrink: '1'}}
          maxWidth={itemMaxWidth}
          class={cardItemStyle}
          gap={{ column: '1rem', row: '1.5rem' }}
          templateRows={image ? ['100px', '1fr']: []}
          background={{ color: Theme.background.paper }}
          padding={{ top: '1rem', bottom: '1rem' }}
          border={{ radius: borderRadius }}
          mediaQueries={[
            { maxWidth: "767px", properties: { width: '100%' } }
          ]}
        >
          {image ? <i-image
            width={imageWidth}
            maxHeight={imageHeight}
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
            padding={{ left: '1rem', right: '1rem' }}
            height="100%"
            verticalAlignment='space-between'
            class="text-center"
          >
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

  private getTag() {
    return this.model.getTag()
  }

  private async setTag(value: any) {
    this.model.setTag(value);
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  }

  private onUpdateTheme() {
    const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
    this.updateStyle('--text-primary', this.tag[themeVar]?.titleColor);
    this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
    this.updateStyle('--text-secondary', this.tag[themeVar]?.descriptionColor);
    this.updateStyle('--action-active_background', this.tag[themeVar]?.linkBackgroundColor);
    this.updateStyle('--action-active', this.tag[themeVar]?.linkColor);
    this.updateStyle('--background-paper', this.tag[themeVar]?.itemBackgroundColor);
    this.updateStyle('--background-default', this.tag[themeVar]?.imageBackgroundColor);
  }

  getConfigurators() {
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => {
          return []
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this),
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this),
      },
    ];
  }

  init() {
    super.init();
    this.model = new Model(this, {
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
        <i-panel id='pnlCard' class={containerStyle} />
      </i-panel>
    )
  }
}