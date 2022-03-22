import {json, Link, LoaderFunction, MetaFunction, useLoaderData} from "remix";
import { useTheme } from "@mui/material";
import useStyle from "~/helpers/hooks/useStyle";
import { Theme } from "@emotion/react";
import { cms } from "~/utils/cms.server";

export const loader: LoaderFunction = async () => {
  const caseStudies = await cms("case-studies");

  console.log({ caseStudiesLoader: caseStudies });

  return json({ caseStudies });
};

const Home = () => {
  const { caseStudies } = useLoaderData();
  const Styles = useStyle(styles);
  const theme = useTheme();

  console.log({ caseStudies });

  return (
    <Styles>
      <h1 style={{ padding: theme.spacing(8) }}>Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="/case-studies">Go to Case Studies</Link>
        </li>
      </ul>
    </Styles>
  );
};

const styles = (theme: Theme) => `
  background-color: ${theme.palette.primary.main};
  
  ul {
    background-color: ${theme.palette.secondary.main};
  }
`;

export default Home;
