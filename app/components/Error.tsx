import { Theme } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import useStyle from "~/helpers/hooks/useStyle";
import { Error as ErrorType } from "~/models/error";

const Error: React.FC<{ error: ErrorType }> = ({ error }) => {
  // const Styles = useStyle(styles);

  return (
    // <Styles>
      <Stack spacing={1}>
        <Typography variant="h1">Error</Typography>
        <Typography variant="caption">{error?.meta?.httpCode}</Typography>
        <Typography variant="body1">
          {error?.errorMessage ?? JSON.stringify(error ?? "")}
        </Typography>
      </Stack>
    // </Styles>
  );
};

const styles = (theme: Theme) => `
  
`;

export default Error;
