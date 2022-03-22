import { red, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material";

export default () => {
  const theme = createTheme();

  return {
    palette: {
      text: {
        primary: red[400],
      },
      background: {
        default: yellow[400],
      },
    },
  };
};
