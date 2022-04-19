import { useContext } from "react";
import {
  SnackbarContext,
  defaultDuration,
  defaultPosition,
  defaultSeverity,
} from "./Snackbar";
import { AlertColor } from "@mui/material";

// Custom hook to trigger the snackbar on function components
export const useSnackbar = ({ position = defaultPosition } = {}) => {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);

  const open = (
    data: {
      message?: string;
      severity?: AlertColor;
      duration?: number;
    } | null
  ) => {
    openSnackbar?.(
      data?.message ?? "",
      data?.severity ?? defaultSeverity,
      data?.duration ?? defaultDuration,
      position
    );
  };

  // Returns methods in hooks array way
  return [open, closeSnackbar];
};
