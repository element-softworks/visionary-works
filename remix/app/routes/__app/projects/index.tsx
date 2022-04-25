import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Typography, Chip, useTheme, Container, Grid, Box } from "@mui/material";
import useStyle from "~/helpers/hooks/useStyle";
import { Theme } from "@emotion/react";
import { cms } from "~/utils/cms.server";
import { CMSData, CMSDataList } from "~/models/cms";
import { getSeoMeta } from "~/seo";
import { Project } from "~/models/collection/project";
import Header from "~/components/Header";
import { useRemark } from "react-remark";
import React, { useEffect } from "react";
import parseISO from "date-fns/parseISO";
import { format } from "date-fns";
import ContentCard from "~/components/ContentCard";
import ContentCardSmall from "~/components/ContentCardSmall";

type Data = {
	project: CMSData<Project>;
	projects: CMSDataList<Project>;
};

export const meta: MetaFunction = ({ data }) => {
	return getSeoMeta({
		title: data?.projects?.data?.attributes?.title ?? "Project"
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	const projects: any = await cms<Data>(`projects`, ["*"]);

	return json({
		projects
	});
};

const ProjectPage = () => {
	const { projects } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();
	const [reactContent, setMarkdownSource] = useRemark();

	console.log("projects", projects);

	return (
		<Styles>
			<Container>
				<Box className="project-header">
					<Typography className="project-title" variant="h1">Projects</Typography>
				</Box>
				<Box className="project-related">
					<Typography variant="h3" className="project-related-title">
						Latest Posts
					</Typography>
					<Grid container spacing={2}>
						{projects?.data?.map((project, i) => <Grid item md={4}>
							<ContentCardSmall key={i} blog={project?.attributes} type="projects" />
						</Grid>)}
					</Grid>
				</Box>
			</Container>
		</Styles>
	);
};

const styles = (theme: Theme) => `
	.project-header {
		text-align: center;
		padding: 100px 0;
		
		.project-title {
			padding: 20px 0;
		}
		.project-tags {
			display: flex; justifyContent: "center";
			margin: auto;
			display: block;
			
			.MuiChip-root {
				margin: 10px 10px 20px;
			}
		} 
	}
	
	.project-image {
		max-width: 100%;
		margin-bottom: 50px;
		border-radius: 5px;
	} 
	
    .project-content {
        margin-bottom: 60px;
    }
    
    .project-related-title {
        font-size: 2rem;
        margin-bottom: 10px;
    }
`;

export default ProjectPage;
