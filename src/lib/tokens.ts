export const colors = {
  brand: {
    blue: "#3E86C6",
    purple: "#A666AA",
    pink: "#EC4492",
    red: "#EE4454",
    orange: "#F05427",
  },

  status: {
    green: "#42A93E",
    greenLight: "#EDF7EC",
    red: "#EE4454",
    redLight: "#FFF1F1",
  },

  neutral: {
    white: "#FFFFFF",
    offWhite: "#F7F7F7",
    gray: "#E6E6E7",
    darkGray: "#6E6E73",
    black: "#1D1D1F",
  },

  surface: {
    outer: "#FFFFFF",
    card: "#FBFBFB",
  },
} as const;

export const gradients = {
  brand:
    "linear-gradient(90deg, #3E86C6 0%, #A666AA 25%, #EC4492 50%, #EE4454 75%, #F05427 100%)",
  progressInactive:
    "linear-gradient(90deg, rgba(62,134,198,0.1) 0%, rgba(166,102,170,0.1) 25%, rgba(236,68,146,0.1) 50%, rgba(238,68,84,0.1) 75%, rgba(240,84,39,0.1) 100%)",
} as const;

export const shadows = {
  button: "0px 5px 10px 0px rgba(230, 230, 231, 0.25)",
  buttonInner: "inset -2px 2px 10px 0px white",
} as const;

export const radii = {
  card: "20px",
  pill: "100px",
} as const;

export const typography = {
  fontFamily: "'Satoshi', sans-serif",
  sizes: {
    base: "16px",
  },
  weights: {
    medium: 500,
    bold: 700,
  },
} as const;
