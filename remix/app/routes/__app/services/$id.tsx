import { json, Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { Typography, useTheme } from "@mui/material";
import useStyle from '~/helpers/hooks/useStyle';
import { Theme } from '@emotion/react';
import { cms } from '~/utils/cms.server';
import { CMSData } from '~/models/cms';
import { getSeoMeta } from '~/seo';

type Data = {
	service: CMSData<{
		body: string;
		createdAt: string;
		endDate: string;
		publishedAt: string;
		startDate: string;
		title: string;
		updatedAt: string;
	}>;
};

export const meta: MetaFunction = ({ data }) => {
	return getSeoMeta({
		title: data?.projects?.data?.attributes?.title ?? 'Service',
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	console.log({params}, `services/${params.id}`);
	const service = await cms<Data>(`services/${params.id}`);

	console.log({service});
	return json({ service });
};

const Home = () => {
	const { service } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();

	console.log('service', service, 2);

	return (
		<Styles>
			<Typography variant="h1">{service?.data?.attributes?.title}</Typography>
		</Styles>
	);
};

const styles = (theme: Theme) => `
  background-color: ${theme.palette.primary.main};
  padding: 400px 0;
  
  ul {
    background-color: ${theme.palette.secondary.main};
  }
`;

export default Home;
