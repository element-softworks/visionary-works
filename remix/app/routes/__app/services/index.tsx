import { json, Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { useTheme } from '@mui/material';
import useStyle from '~/helpers/hooks/useStyle';
import { Theme } from '@emotion/react';
import { cms } from '~/utils/cms.server';
import { CMSDataList } from '~/models/cms';
import { getSeoMeta } from '~/seo';

type Data = {
	services: CMSDataList<{
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
		title: 'Projects',
	});

export const loader: LoaderFunction = async ({ params }) => {
	const services = await cms<Data>('services');

	console.log({ serviceLoader: services.data });

	return json({ services });
};

const Home = () => {
	const { services } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();

	console.log('services', services);

	return (
		<Styles>
			<h1 style={{ padding: theme.spacing(8) }}>Welcome to Case Studies</h1>
			Test:
			<ul>
				{services?.data?.map((c) => (
					<li key={c.id}>
						<Link to={`/services/${c?.id}`}>{c?.attributes?.title} - link</Link>
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
