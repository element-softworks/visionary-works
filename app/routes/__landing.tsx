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

// using authenticated session with cloudflare pages
export const loader: LoaderFunction = async ({ context, request }) => {
  // console.log("context.sessionStorage", context.sessionStorage);
  //
  // const session = await context.sessionStorage.getSession(
  //     request.headers.get("Cookie")
  // )
  //
  // const headers = {}
  //
  // if (!session.has("userId")) {
  //   session.set("userId", `user:${Math.random()}`)
  //   console.log("context.sessionStorage", context.sessionStorage, "session", session);
  //   // @ts-ignore
  //   headers["Set-Cookie"] = await context.sessionStorage.commitSession(session)
  // } else {
  //   console.log(session.get("userId"));
  // }

  // return json(null, { headers })

  return json(null)
}

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
