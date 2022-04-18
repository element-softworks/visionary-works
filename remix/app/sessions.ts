// app/services/session.server.ts
import { AlertColor } from "@mui/material";
import { createCookieSessionStorage, Session } from "remix";

export type Message = {
  message: string;
  severity: AlertColor;
  duration?: number;
};

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

export const messageSession = createCookieSessionStorage({
  cookie: {
    name: "__message",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(Date.now() + ONE_YEAR),
    secrets: ["SUPER_SECRET"],
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

export function postSuccessMessage(session: Session, message: string) {
  session.flash("message", { message, severity: "success" } as Message);
}

export function postWarningMessage(session: Session, message: string) {
  session.flash("message", { message, severity: "warning" } as Message);
}

export function postInfoMessage(session: Session, message: string) {
  session.flash("message", { message, severity: "info" } as Message);
}

export function postErrorMessage(session: Session, message: string) {
  session.flash("message", { message, severity: "error" } as Message);
}
