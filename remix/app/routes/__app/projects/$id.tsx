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
	// const project = await cms<Data>(`slugify/slugs/project/${params.id}`);
	const project: any = await cms<Data>(`projects`, ["*"], `?filters[slug]=${params.id}`);
	const projects: any = await cms<Data>(`projects`, ["*"]);

	// const firstProject = project?.data?.[0]
	return json({
		project: {
			data: project?.data?.[0]
		},
		// projects: {
		// 	data: projects?.data?.filter((project: Project) => {
		// 		console.log( project?.attributes?.slug, params?.id);
		// 		return project?.attributes?.slug !== params?.id
		// 	})
		// }
		projects: {
			data: projects?.data?.slice(0, 2)
		}
	});
};

const Project = () => {
	const { project, projects } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();
	const [reactContent, setMarkdownSource] = useRemark();

	console.log("project", projects);

	useEffect(() => {
		setMarkdownSource(project?.data?.attributes?.content);
	}, []);

	return (
		<Styles>
			<Container>
				<Box className="project-header">
					<Typography className="project-title" variant="h1">{project?.data?.attributes?.title} </Typography>
					<Typography>Published
						on {format(new Date(project?.data?.attributes?.publishedAt), "PPPP")}</Typography>

					<Box className="project-tags">
						{project?.data?.attributes?.tags?.data?.map((tag, i) => {
							return <Chip label={tag?.attributes?.name} />;
						})}
					</Box>
				</Box>

				<img src={project?.data?.attributes?.coverImage?.data?.attributes?.url} className="project-image"
				     alt={`${project?.data?.attributes?.title} cover image`} />

				<Box className="project-content">
					{reactContent}
				</Box>

				<Box className="project-related">
					<Typography variant="h3" className="project-related-title">
						Suggested Projects
					</Typography>
					<Grid container spacing={2}>
						{projects?.data?.map((project) => <Grid item md={4}>
							<ContentCardSmall blog={project?.attributes} type="projects" />
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

export default Project;
