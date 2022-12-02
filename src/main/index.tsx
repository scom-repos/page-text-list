import {
  Module,
  customModule,
  Styles,
  Panel,
  Label,
  HStack,
  CarouselSlider
} from '@ijstech/components';
import { PageBlock, IConfig } from '@feature/global';
import Config from './config';
import { actionButtonStyle, cardItemStyle, cardStyle, carouselStyle, controlStyle, imageStyle, centerStyle } from './index.css';
import featureList from './data.json';
export { Config };

const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Main extends Module implements PageBlock {
  private pnlCard: Panel
  private pnlCardBody: Panel
  private pnlCardFooter: Panel
  private pnlControls: HStack
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

  async config() {}

  onUpdateBlock() {
    this.lblTitle.caption = this._data.title || ''
    this.lblDesc.caption = this._data.description || ''
    this.renderList()
  }

  renderList() {
    const dataList = this._data.itemsToShow
      ? featureList.slice(0, this._data.itemsToShow)
      : featureList
    const type = this._data.type || 'horizontal-list'
    this.pnlControls.clearInnerHTML()
    switch (type) {
      case 'horizontal-list':
        this.renderHorizontalList(dataList)
        this.renderViewAll()
        break
      case 'vertical-list':
        this.renderVerticalList(dataList)
        this.renderViewAll()
        break
      case 'carousel':
        this.renderCarousel(dataList)
        break
    }
  }

  renderHorizontalList(dataList: any[]) {
    this.pnlCardBody.clearInnerHTML()
    const lytItems = (
      <i-card-layout
        width='100%'
        padding={{ bottom: '1rem', left: '1rem', right: '1rem' }}
        gap={{ column: '1rem', row: '0.75rem' }}
        columnsPerRow={3}
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
          ></i-image>
          <i-vstack
            gap='0.5rem'
            grid={{ area: 'areaDetails' }}
            padding={{ left: '1rem', right: '1rem' }}
            class={centerStyle}
          >
            <i-label
              caption={product.name}
              font={{ weight: 600, size: '1.125rem' }}
            ></i-label>
            <i-label caption={product.caption}></i-label>
          </i-vstack>
        </i-grid-layout>
      )
    })
  }

  renderVerticalList(dataList: any[]) {
    this.pnlCardBody.clearInnerHTML()
    dataList.forEach((product) => {
      this.pnlCardBody.append(
        <i-grid-layout
          width='100%'
          height='100%'
          class={cardItemStyle}
          padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
          gap={{ column: '1rem', row: '2rem' }}
          templateColumns={['150px', 'auto', 'min-content']}
          templateAreas={[['areaImg', 'areaDetails']]}
        >
          <i-image
            class={imageStyle}
            width='100%'
            height='100%'
            overflow='hidden'
            grid={{ area: 'areaImg' }}
            url={product.img}
          ></i-image>
          <i-vstack
            gap='0.5rem'
            grid={{ area: 'areaDetails' }}
            verticalAlignment='center'
          >
            <i-label
              caption={product.name}
              font={{ weight: 600, size: '1.125rem' }}
            ></i-label>
            <i-label caption={product.caption}></i-label>
          </i-vstack>
        </i-grid-layout>
      )
    })
  }
  
  renderViewAll() {
    this.pnlCardFooter.clearInnerHTML();
    if (this._data.itemsToShow && this._data.itemsToShow < featureList.length) {
      this.pnlCardFooter.appendChild(
        <i-hstack
          class="pointer"
          width="100%"
          height={45}
          background={{ color: Theme.background.paper }}
          border={{ top: { width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' } }}
          horizontalAlignment='center'
          verticalAlignment='center'
        >
          <i-label
            caption="View All"
            font={{ size: '0.875rem', color: Theme.colors.primary.main, weight: 600 }}
            link={{ href: this._data.viewAllUrl, target: "_self" }}
          ></i-label>
        </i-hstack>
      )
    }
  }

  renderCarousel(dataList: any[]) {
    this.pnlCardBody.clearInnerHTML()
    this.pnlCardFooter.clearInnerHTML()
    const carousel = (
      <i-carousel-slider
        class={carouselStyle}
        width='100%'
        minHeight='200px'
        slidesToShow={1}
        swipe={true}
      ></i-carousel-slider>
    )
    const items = dataList.map((product) => {
      const item = (
        <i-grid-layout
          width='100%'
          height='100%'
          class={cardItemStyle}
          horizontalAlignment='center'
          padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
          gap={{ column: '1rem', row: '2rem' }}
          templateAreas={[['areaImg'], ['areaDetails']]}
        >
          <i-image
            class={imageStyle}
            width='auto'
            maxHeight={100}
            overflow='hidden'
            grid={{ area: 'areaImg' }}
            url={product.img}
          ></i-image>
          <i-vstack
            gap='0.5rem'
            grid={{ area: 'areaDetails' }}
            class={centerStyle}
          >
            <i-label
              caption={product.name}
              font={{ weight: 600, size: '1.125rem' }}
            ></i-label>
            <i-label caption={product.caption}></i-label>
          </i-vstack>
        </i-grid-layout>
      )
      return {
        name: undefined,
        controls: [item],
      }
    })
    this.pnlCardBody.append(carousel)
    carousel.items = items
    if (dataList.length > 1) this.renderControls(carousel)
  }

  renderControls(carousel: CarouselSlider) {
    this.pnlControls.appendChild(
      <i-button
        width={45}
        height={45}
        icon={{ name: 'chevron-left', fill: 'rgba(160,168,177,.68)' }}
        background={{ color: 'transparent' }}
        border={{ width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }}
        onClick={() => carousel.prev()}
      ></i-button>
    )
    this.pnlControls.appendChild(
      <i-button
        width={45}
        height={45}
        icon={{ name: 'chevron-right', fill: 'rgba(160,168,177,.68)' }}
        background={{ color: 'transparent' }}
        border={{ width: 1, style: 'solid', color: 'rgba(217,225,232,.38)' }}
        onClick={() => carousel.next()}
      ></i-button>
    )
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