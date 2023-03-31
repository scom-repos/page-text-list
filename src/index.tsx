import {
  Module,
  customModule,
  Styles,
  Panel,
  Label,
  customElements,
  ControlElement,
} from "@ijstech/components";
// import assets from "./assets";
import Config from "./config";
import { PageBlock, IConfig, IData, ISettings } from "./interface";
import {
  cardItemStyle,
  cardStyle,
  controlStyle,
  imageStyle,
  centerStyle,
  containerStyle,
  linkStyle,
} from "./index.css";

const Theme = Styles.Theme.ThemeVars;

const configSchema = {
  type: "object",
  required: [],
  properties: {
    titleColor: {
      type: "string",
      format: "color",
    },
    descriptionColor: {
      type: "string",
      format: "color",
    },
    backgroundColor: {
      type: "string",
      format: "color",
    },
    transparent: {
      type: "boolean",
    },
    item: {
      type: "object",
      properties: {
        itemTitleColor: {
          type: "string",
          format: "color",
        },
        itemDescriptionColor: {
          type: "string",
          format: "color",
        },
        itemLink: {
          type: "object",
          properties: {
            itemLinkColor: {
              type: "string",
              format: "color",
            },
            itemLinkBackgroundColor: {
              type: "string",
              format: "color",
            },
            itemLinkTransparent: {
              type: "boolean",
            },
          },
        },
        itemImage: {
          type: "object",
          properties: {
            width: {
              type: "string",
            },
            height: {
              type: "string",
            },
          },
        },
        itemBackgroundColor: {
          type: "string",
          format: "color",
        },
        itemTransparent: {
          type: "boolean",
        },
      },
    },
  },
};

interface ScomFeatureElement extends ControlElement {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["i-scom-feature"]: ScomFeatureElement;
    }
  }
}

@customModule
@customElements("i-scom-feature")
export default class ScomFeature extends Module implements PageBlock {
  private pnlCard: Panel;
  private pnlCardBody: Panel;
  private pnlDivider: Panel;
  private lblTitle: Label;
  private lblDesc: Label;
  private cardConfig: Config;

  private _data: IConfig = {};
  private settings: ISettings = {};

  tag: any;
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  getData() {
    return this._data;
  }

  async setData(data: IConfig) {
    this._data = data;
    this.cardConfig.data = data;
    this.onUpdateBlock();
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
    this.updateFeature(value);
  }

  async edit() {
    this.cardConfig.data = this._data;
    this.pnlCard.visible = false;
    this.cardConfig.visible = true;
  }

  async confirm() {
    this._data = this.cardConfig.data;
    this.onUpdateBlock();
    this.pnlCard.visible = true;
    this.cardConfig.visible = false;
  }

  async discard() {
    this.pnlCard.visible = true;
    this.cardConfig.visible = false;
  }

  async config() {}

  getConfigSchema() {
    return configSchema;
  }

  onConfigSave(config: any) {
    this.tag = config;
    this.updateFeature(config);
  }

  updateFeature(config: any) {
    this.settings = config;
    this.onUpdateBlock();
  }

  validate() {
    const dataList = this.cardConfig.data?.data;
    if (!dataList.length) return true;
    const emptyName = dataList.find((item) => !item.title);
    return !emptyName;
  }

  onUpdateBlock() {
    if (this.settings?.backgroundColor) {
      this.pnlCard.background = { color: this.settings.backgroundColor };
    }
    this.lblTitle.caption = this._data.title || "";
    this.lblTitle.style.color = this.settings?.titleColor || "";
    this.lblDesc.caption = this._data.description || "";
    this.lblDesc.style.color = this.settings?.descriptionColor || "";
    this.pnlDivider.visible = this._data.divider || false;
    this.renderList(this._data.data || []);
  }

  renderList(dataList: any[]) {
    this.pnlCardBody.clearInnerHTML();
    const lytItems = (
      <i-card-layout
        width="100%"
        padding={{ bottom: "1rem", left: "1rem", right: "1rem" }}
        gap={{ column: "1rem", row: "0.75rem" }}
        columnsPerRow={this._data.columnsPerRow}
        cardMinWidth="250px"
      ></i-card-layout>
    );
    this.pnlCardBody.appendChild(lytItems);
    const settings = this.settings?.item || {};
    dataList.forEach((product: IData) => {
      const { title, description, divider, imageUrl, img, link } = product;
      const {
        itemTransparent,
        itemBackgroundColor,
        itemImage,
        itemTitleColor,
        itemDescriptionColor,
        itemLink,
      } = settings;
      const _imageUrl = imageUrl || img || "";
      lytItems.append(
        <i-grid-layout
          width="100%"
          height="100%"
          class={cardItemStyle}
          gap={{ column: "1rem", row: "2rem" }}
          templateRows={_imageUrl ? ["100px", "1fr"] : []}
          background={{
            color: itemTransparent ? "transparent" : itemBackgroundColor || "",
          }}
          padding={{ top: 16, bottom: 16 }}
          border={{ radius: 8 }}
        >
          {_imageUrl ? (
            <i-image
              class={imageStyle}
              width={itemImage?.width || "auto"}
              maxHeight={itemImage?.height || 100}
              margin={{
                left: itemImage?.width ? "auto" : 0,
                right: itemImage?.width ? "auto" : 0,
              }}
              padding={{ top: "1rem", left: "1rem", right: "1rem" }}
              overflow="hidden"
              url={_imageUrl}
              // fallbackUrl={assets.fullPath("img/placeholder.jpg")}
            ></i-image>
          ) : (
            []
          )}
          <i-vstack
            gap="0.5rem"
            padding={{ left: "1rem", right: "1rem" }}
            class={centerStyle}
          >
            <i-label
              caption={title || ""}
              font={{
                weight: 600,
                size: "1.125rem",
                color: itemTitleColor || "",
              }}
            ></i-label>
            <i-panel
              height={2}
              visible={divider || false}
              width={200}
              maxWidth="100%"
              margin={{ bottom: 8, left: "auto", right: "auto" }}
              background={{ color: Theme.colors.primary.main }}
            ></i-panel>
            <i-label
              caption={description || ""}
              font={{ color: itemDescriptionColor || "" }}
            ></i-label>
            {link?.caption ? (
              <i-panel class={linkStyle}>
                <i-button
                  caption={link.caption}
                  font={{
                    color:
                      itemLink?.itemLinkColor ||
                      Theme.colors.primary.contrastText,
                    size: "20px",
                  }}
                  background={{
                    color: itemLink?.itemLinkTransparent
                      ? "transparent !important"
                      : itemLink?.itemLinkBackgroundColor
                      ? `${itemLink?.itemLinkBackgroundColor} !important`
                      : "",
                  }}
                  onClick={() => (window.location.href = link.url)}
                  display="block"
                ></i-button>
              </i-panel>
            ) : (
              <i-label></i-label>
            )}
          </i-vstack>
        </i-grid-layout>
      );
    });
  }

  render() {
    return (
      <i-panel id="pnlBlock" class={cardStyle}>
        <i-panel id="pnlCard" class={containerStyle}>
          <i-hstack
            id="pnlCardHeader"
            verticalAlignment="center"
            horizontalAlignment="center"
            padding={{
              top: "1.5rem",
              bottom: "1rem",
              left: "1.5rem",
              right: "1.5rem",
            }}
          >
            <i-vstack gap="0.5rem" class={centerStyle} width="100%">
              <i-label
                id="lblTitle"
                font={{ size: "1.5rem", weight: 600 }}
              ></i-label>
              <i-panel
                id="pnlDivider"
                visible={false}
                height={2}
                width="inherit"
                maxWidth={200}
                margin={{ bottom: 8, left: "auto", right: "auto" }}
                background={{ color: Theme.colors.primary.main }}
              ></i-panel>
              <i-label
                id="lblDesc"
                font={{ size: "0.875rem", color: Theme.colors.secondary.main }}
              ></i-label>
            </i-vstack>
            <i-hstack
              id="pnlControls"
              class={controlStyle}
              gap="0.5rem"
            ></i-hstack>
          </i-hstack>
          <i-panel id="pnlCardBody"></i-panel>
          <i-panel id="pnlCardFooter"></i-panel>
        </i-panel>
        <i-scom-feature-config
          id="cardConfig"
          visible={false}
        ></i-scom-feature-config>
      </i-panel>
    );
  }
}
