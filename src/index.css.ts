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

export const customStyle = Styles.style({
  $nest: {
    'i-link > a': {
      textDecoration: 'none'
    }
  }
})

