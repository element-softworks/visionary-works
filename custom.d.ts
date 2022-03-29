import { Theme as MaterialUITheme } from "@mui/material";

declare module "@emotion/react" {
  export interface Theme extends MaterialUITheme {}
}
