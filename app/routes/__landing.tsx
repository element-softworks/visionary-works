import React from "react";
import { createTheme, CssBaseline, ThemeProvider, Paper } from "@mui/material";
import landingTheme from "~/theme/variants/landing";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { json, LoaderFunction, Outlet, useLoaderData } from "remix";
import SnackbarProvider from "~/components/Snackbar";
import { Message, messageSession } from "~/sessions";
import { getMessage } from "~/utils/message.server";

type LoaderData = {
  message: Message | null;
};

const Landing: React.FC = ({ children }) => {
  const theme = createTheme(landingTheme());

  return (
    <ThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <Outlet />
        </SnackbarProvider>
      </EmotionThemeProvider>
    </ThemeProvider>
  );
};

export default Landing;
