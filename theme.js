import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  styles: {
    global: {
      body: { bg: "#202130", color: "white", position: "static" },
    },
  },
  colors: {
    basic: {
      white: "#f5f5f5",
      darkest: "#202130",
      dark: "#2F3143",
      primary: "#C24C5A",
      secondaryLight: "#00FDDC",
      secondaryDark: "#368F8B",
    },
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});

export default theme;
