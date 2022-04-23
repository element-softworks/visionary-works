import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { Typography, useTheme, Container, Grid } from '@mui/material';
import useStyle from '~/helpers/hooks/useStyle';
import { Theme } from '@emotion/react';
import { cms } from '~/utils/cms.server';
import { CMSData } from '~/models/cms';
import { getSeoMeta } from '~/seo';
import { Blog } from "~/models/collection/blog";
import Header from "~/components/Header";

type Data = {
	blog: CMSData<Blog>;
};

export const meta: MetaFunction = ({ data }) => {
	return getSeoMeta({
		title: data?.projects?.data?.attributes?.title ?? 'Project',
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	const blog = await cms<Data>(`slugify/slugs/blog/${params.id}`);
	// http://localhost:1337/api/slugify/slugs/blog/another-thing-23
	return json({ blog });
};

const Home = () => {
	const { blog } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();

	console.log('blog', blog);

	return (
		<Styles>
			<Header title={blog?.data?.attributes?.title}/>
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
