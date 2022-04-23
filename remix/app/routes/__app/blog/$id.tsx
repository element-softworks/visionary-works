import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Typography, Chip, useTheme, Container, Grid, Box } from "@mui/material";
import useStyle from "~/helpers/hooks/useStyle";
import { Theme } from "@emotion/react";
import { cms } from "~/utils/cms.server";
import { CMSData, CMSDataList } from "~/models/cms";
import { getSeoMeta } from "~/seo";
import { Blog } from "~/models/collection/blog";
import Header from "~/components/Header";
import { useRemark } from "react-remark";
import React, { useEffect } from "react";
import parseISO from "date-fns/parseISO";
import { format } from "date-fns";

type Data = {
	blog: CMSData<Blog>;
};

export const meta: MetaFunction = ({ data }) => {
	return getSeoMeta({
		title: data?.projects?.data?.attributes?.title ?? "Project"
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	// const blog = await cms<Data>(`slugify/slugs/blog/${params.id}`);
	const blog: any = await cms<Data>(`blogs`, ["*"], `?filters[slug]=${params.id}`);

	// const firstBlog = blog?.data?.[0]
	return json({
		blog: {
			data: blog?.data?.[0]
		}
	});
};

const Home = () => {
	const { blog } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();
	const [reactContent, setMarkdownSource] = useRemark();

	console.log("blog", blog);

	useEffect(() => {
		setMarkdownSource(blog?.data?.attributes?.content);
	}, []);

	return (
		<Styles>
			<Container>
				<Box className="blog-header">
					<Typography className="blog-title" variant="h1">{blog?.data?.attributes?.title} </Typography>
					<Typography>Published
						on {format(new Date(blog?.data?.attributes?.publishedAt), "PPPP")}</Typography>

					<Box className="blog-tags">
						{blog?.data?.attributes?.tags?.data?.map((tag, i) => {
							return <Chip label={tag?.attributes?.name} />;
						})}
					</Box>
				</Box>

				<img src={blog?.data?.attributes?.coverImage?.data?.attributes?.url} className="blog-image"
				     alt={`${blog?.data?.attributes?.title} cover image`} />

				<Box className="blog-content">
					{reactContent}
				</Box>
			</Container>
		</Styles>
	);
};

const styles = (theme: Theme) => `
	.blog-header {
		text-align: center;
		padding: 100px 0;
		
		.blog-title {
			padding: 20px 0;
		}
		.blog-tags {
			display: flex; justifyContent: "center";
			margin: auto;
			display: block;
			
			.MuiChip-root {
				margin: 10px 10px 20px;
			}
		} 
	}
	
	.blog-image {
		max-width: 100%;
		margin-bottom: 50px;
		border-radius: 5px;
	} 
	
    .blog-content {
        margin-bottom: 60px;
    }
`;

export default Home;
