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
import ContentCard from "~/components/ContentCard";
import ContentCardSmall from "~/components/ContentCardSmall";

type Data = {
	blog: CMSData<Blog>;
	blogs: CMSDataList<Blog>;
};

export const meta: MetaFunction = ({ data }) => {
	return getSeoMeta({
		title: data?.projects?.data?.attributes?.title ?? "Project"
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	const blogs: any = await cms<Data>(`blogs`, ["*"]);

	return json({
		blogs
	});
};

const Home = () => {
	const { blogs } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();
	const [reactContent, setMarkdownSource] = useRemark();

	console.log("blogs", blogs);

	return (
		<Styles>
			<Container>
				<Box className="blog-header">
					<Typography className="blog-title" variant="h1">Blogs</Typography>
				</Box>
				<Box className="blog-related">
					<Typography variant="h3" className="blog-related-title">
						Latest Posts
					</Typography>
					<Grid container spacing={2}>
						{blogs?.data?.map((blog, i) => <Grid item md={4}>
							<ContentCardSmall key={i} content={blog?.attributes} />
						</Grid>)}
					</Grid>
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
    
    .blog-related-title {
        font-size: 2rem;
        margin-bottom: 10px;
    }
`;

export default Home;
