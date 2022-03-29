import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { Typography, useTheme } from '@mui/material';
import useStyle from '~/helpers/hooks/useStyle';
import { Theme } from '@emotion/react';
import { cms } from '~/utils/cms.server';
import { CMSData } from '~/models/cms';
import { getSeoMeta } from '~/seo';

type Data = {
	caseStudy: CMSData<{
		body: string;
		createdAt: string;
		endDate: string;
		publishedAt: string;
		startDate: string;
		title: string;
		updatedAt: string;
	}>;
};

export const meta: MetaFunction = ({ data: { caseStudy } }) => {
	return getSeoMeta({
		title: caseStudy?.data?.attributes?.title ?? 'Case Study',
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	const caseStudy = await cms<Data>(`case-studies/${params.id}`);

	return json({ caseStudy });
};

const Home = () => {
	const { caseStudy } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();

	console.log('caseStudy', caseStudy);

	return (
		<Styles>
			<Typography variant="h1">{caseStudy?.data?.attributes?.title}</Typography>
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
