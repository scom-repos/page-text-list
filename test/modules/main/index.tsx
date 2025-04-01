import { Module, customModule, Styles } from '@ijstech/components';
import ScomPageTextList from '@scom/page-text-list';

Styles.Theme.defaultTheme.action.active = '#ebebeb';
Styles.Theme.defaultTheme.docs.text0 = 'rgba(12, 18, 52, 1.00)';
Styles.Theme.defaultTheme.docs.text1 = 'rgba(136, 153, 168, 1.00)';
Styles.Theme.applyTheme(Styles.Theme.defaultTheme);

@customModule
export default class Main extends Module {
  private pageBlock1: ScomPageTextList;
  private pageBlock2: ScomPageTextList;

  private _data1 = [
    {
      "backgroundColor": "#FF9933",
      "title": "Liquidity Queue Framework",
      "description": "A novel and efficient approach to on-chain liquidity that complement and enhance the DeFi and DEX ecosystem.",
      "link": {
        "caption": "Learn more",
        "url": "https://www.ijs.network/defi2+-protocol/liquidity-queue-framework"
      }
    },
    {
      "backgroundColor": "#FF9933",
      "title": "Open Interchain Protocol",
      "description": "A more efficient inter-blockchain swapping of chain-native digital assets through the usage of single-asset vaults and decentralised mechanisms.",
      "link": {
        "caption": "Learn more",
        "url": "https://www.ijs.network/defi2+-protocol/open-interchain-protocol"
      }
    },
    {
      "backgroundColor": "#FF9933",
      "title": "Decentralised Buyback Protocol",
      "description": "On-chain token buybacks can be offered in a transparent and decentralised manner through the usage of the Decentralised Buyback Protocol.",
      "link": {
        "caption": "Learn more",
        "url": "https://www.ijs.network/defi2+-protocol/decentralised-buyback-protocol"
      },
    }
  ]

  private _data2 = [
    {
      "image": "//cdn.ijsweb.com/assets/79ddb9c6-25ec-47dd-96ce-1b49a38c95af/max-svgrepo-com.svg?size=s",
      "description": "Easily query and transact against smart contracts from various chains."
    },
    {
      "image": "//cdn.ijsweb.com/assets/c3087b4b-87e4-4ce2-b30a-c5e6499cfae4/server-hosting-svgrepo-com.svg?size=s",
      "description": "Hosted in a trustless decentralised manner."
    },
    {
      "image": "//cdn.ijsweb.com/assets/fbc9b5c6-416e-4e41-8992-a089867849bb/rocket-svgrepo-com.svg?size=s",
      "description": "Faster to build DApp."
    },
    {
      "image": "//cdn.ijsweb.com/assets/8875ed0c-1577-4cb1-88b3-7f8077a1b082/certificate-svgrepo-com.svg?size=s",
      "description": "Authenticity of DApp to address 'fake' site concerns."
    }
  ]

  init() {
    super.init();
    const config1 = this.pageBlock1.getConfigurators().find(item => item.target === 'Builders');
    if (config1?.setTag) {
      config1.setTag({
        borderRadius: 10,
        gap: 20,
        titleFontSize: 20,
        descriptionFontSize: 16,
        itemMaxWidth: 250,
        "light": {
          backgroundColor: '#FF9933',
          titleColor: '#fff',
          descriptionColor: '#fff',
          linkColor: '#F39422',
          linkBackgroundColor: 'transparent',
          itemBackgroundColor: '#5D0D07',
        },
        "dark": {
          backgroundColor: '#FF9933',
          titleColor: '#fff',
          descriptionColor: '#fff',
          linkColor: '#F39422',
          linkBackgroundColor: 'transparent',
          itemBackgroundColor: '#5D0D07',
        }
      });
    }

    const config2 = this.pageBlock2.getConfigurators().find(item => item.target === 'Builders');
    if (config2?.setTag) {
      config2.setTag({
        "title": {
          "color": "#FA8930",
          "size": "30px"
        },
        "description": {
          "color": "#5D0D07",
          "size": "20px"
        },
        "image": {
          "width": "220px",
          "height": "220px",
          "background": {
            "color": "white"
          }
        },
        light: {
          imageBackgroundColor: '#fff',
          itemBackgroundColor: "#5D0D07",
          descriptionColor: '#fff'
        },
        dark: {
          imageBackgroundColor: '#fff',
          itemBackgroundColor: "#5D0D07",
          descriptionColor: '#fff',
        }
      })
    }
  }

  render() {
    return <i-vstack width={'100%'} height={'100%'} gap="1rem" margin={{top: '1rem'}}>
      <i-page-text-list
        id="pageBlock1"
        data={this._data1}
      />
      <i-page-text-list
        id="pageBlock2"
        data={this._data2}
      />
    </i-vstack>
  }
}