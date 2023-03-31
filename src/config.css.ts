import { Styles } from "@ijstech/components";

export const textareaStyle = Styles.style({
  $nest: {
    textarea: {
      border: "none",
      outline: "none",
    },
  },
});

export const uploadStyle = Styles.style({
  $nest: {
    ".i-upload_preview-img": {
      maxHeight: "100%",
      display: "block",
    },
    ".i-upload-wrapper": {
      maxHeight: "inherit",
      overflow: "hidden",
    },
  },
});

export const pointerStyle = Styles.style({
  cursor: "pointer",
});

export const boxShadow = Styles.style({
  boxShadow: "0 0 1px 0 rgb(0 0 0 / 75%)",
  borderRadius: 5,
});
