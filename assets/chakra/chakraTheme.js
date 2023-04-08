import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "assets/chakra/button/buttonStyles";

export const chakraTheme = extendTheme({
  colors: {
    brand: {
      50: "#0066EE",
      100: "#c9e0fe",
      200: "#007ce6",
      300: "#007ce6",
      500: "#007ce6",
      600: "#007ce6",
      800: "#007ce6",
      900: "#007ce6",
    },
    background: {
      primary: "#ffffff",
      secondary: "#f7f7f7",
      tertiary: "#f4f7fe",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#2C323F",
      tertiary: "#0045AD",
    },
  },
  shadows: {
    brand_shadow_md:
      " 0 4px 6px -1px rgba(0, 124, 230, 0.1),0 2px 4px -1px rgba(0, 124, 230, 0.06)",
    brand_shadow_lg:
      " 0 10px 15px -3px rgba(0, 124, 230, 0.1),0 4px 6px -2px rgba(0, 124, 230, 0.05);",
  },
  components: {
    Button,
  },
});
