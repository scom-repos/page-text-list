import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const cardItemStyle = Styles.style({
  alignContent: 'stretch',
  $nest: {
    // '&:hover i-button': {
    //   background: Theme.colors.primary.dark,
    //   color: Theme.colors.primary.contrastText
    // },
    // '&:hover i-button > i-icon': {
    //   fill: '#fff !important'
    // }
  }
})

export const containerStyle = Styles.style({
  width: Theme.layout.container.width,
  maxWidth: Theme.layout.container.maxWidth,
  overflow: Theme.layout.container.overflow,
  textAlign: (Theme.layout.container.textAlign as any),
  margin: '0 auto',
  $nest: {
    'i-link > a': {
      textDecoration: 'none'
    }
  }
})

