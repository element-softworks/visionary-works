import { json, Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import useStyle from '~/helpers/hooks/useStyle';
import { Theme } from '@emotion/react';
import { cms } from '~/utils/cms.server';
import React from 'react';
import HeroImage from '~/components/HeroGraphic';

export const loader: LoaderFunction = async () => {
	const caseStudies = await cms('case-studies');

	console.log({ caseStudiesLoader: caseStudies });

	return json({ caseStudies });
};

const Home: React.FC = () => {
	const { caseStudies } = useLoaderData();
	const Styles = useStyle(styles);
	console.log({ caseStudies });

	return (
		<Styles>
			<Stack justifyContent="center" alignItems="center" className="hero">
				<HeroImage />
				<Typography variant="h1">Creative software agency</Typography>
			</Stack>
		</Styles>
	);
};

const styles = (theme: Theme) => `
  .hero {
    background: ${theme.palette.primary.main};
    height: 70vh;
    min-height: 900px;
    background-image: linear-gradient(90deg,#ebc000 1px,#facc00 0);
    background-size: 8.3333333333vw;
    
    svg {
        max-height: 250px;
        max-width: 250px;
    }
    
    ${theme.breakpoints.up('sm')} {
        clip-path: polygon(0 0,100% 0,100% 100%,0 calc(100% - 7vw));
        
        svg {
            max-height: 400px;
            max-width: 400px;
        }
    }
`;

export default Home;
