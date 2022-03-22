import { json, Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { useTheme } from '@mui/material';
import useStyle from '~/helpers/hooks/useStyle';
import { Theme } from '@emotion/react';
import { cms } from '~/utils/cms.server';
import { CMSDataList } from '~/models/cms';
import { getSeo, getSeoMeta } from '~/seo';

type Data = {
	caseStudies: CMSDataList<{
		body: string;
		createdAt: string;
		endDate: string;
		publishedAt: string;
		startDate: string;
		title: string;
		updatedAt: string;
	}>;
};

export const meta: MetaFunction = () =>
	getSeoMeta({
		title: 'Case Studies',
	});

export const loader: LoaderFunction = async ({ params }) => {
	const caseStudies = await cms<Data>('case-studies');

	console.log({ caseStudiesLoader: caseStudies });

	return json({ caseStudies });
};

const Home = () => {
	const { caseStudies } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();

	console.log('caseStudies', caseStudies);

	return (
		<Styles>
			<h1 style={{ padding: theme.spacing(8) }}>Welcome to Case Studies</h1>
			<ul>
				{caseStudies?.data?.map((c) => (
					<li key={c.id}>
						<Link to={`/case-studies/${c?.id}`}>{c?.attributes?.title}</Link>
					</li>
				))}
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
