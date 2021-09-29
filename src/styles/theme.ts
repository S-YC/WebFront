import { indigo } from "@material-ui/core/colors";
import { createTheme, Theme as MuiTheme } from "@material-ui/core/styles";
import baseStyled, { ThemedStyledInterface } from "styled-components";

const size = {
  mobile: "600px",
  tablet: "900px",
  desktop: "1280px",
};

const theme2 = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};

const colors = {
  white: "#ffffff",
  black: "#000000",
};

const secondaryColors = {};
const fontSizes: string[] = [];

/**
 * 테마 설정을위한 생성
 */
const muiTheme: MuiTheme = createTheme({
  palette: {
    primary: indigo,
  },
});
/**
 * 테마 반환
 */
export const theme = {
  ...muiTheme,
  colors,
  fontSizes,
  secondaryColors,
  theme2,
  app: {
    backgroundColor: "#222232",
  },
};
/**
 * 테마 타입 설정
 */
export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
