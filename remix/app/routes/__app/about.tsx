import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Typography, Chip, useTheme, Container, Grid, Box } from "@mui/material";
import useStyle from "~/helpers/hooks/useStyle";
import { Theme } from "@emotion/react";
import { cms } from "~/utils/cms.server";
import { CMSData, CMSDataList } from "~/models/cms";
import { getSeoMeta } from "~/seo";
import { About } from "~/models/single/about";
import Header from "~/components/Header";
import { useRemark } from "react-remark";
import React, { useEffect } from "react";
import parseISO from "date-fns/parseISO";
import { format } from "date-fns";
import ContentCard from "~/components/ContentCard";
import ContentCardSmall from "~/components/ContentCardSmall";
import { Service } from "~/models/collection/service";

type Data = {
	about: CMSData<About>;
	services: CMSDataList<Service>;
};

export const meta: MetaFunction = ({ data }) => {
	return getSeoMeta({
		title: data?.about?.data?.attributes?.title ?? "About"
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	const about: any = await cms<Data>(`about`, ["*"]);
	const services: any = await cms<Data>(`services`, ["*"]);

	return json({
		about,
		services
	});
};

const AboutPage = () => {
	const { about, services } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();
	const [reactContent, setMarkdownSource] = useRemark();

	console.log("services", services);

	return (
		<Styles>
			<Container>
				<Box className="about-header">
					<Typography className="about-title" variant="h1">
						{about?.data?.attributes?.title}
					</Typography>
				</Box>
				<Box className="about-related">
					<Typography variant="h3" className="about-related-title">
					</Typography>
					<Grid container spacing={2}>
						{services?.data?.map((service, i) => <Grid item md={4}>
							<ContentCardSmall key={i} blog={service?.attributes} type="services" />
						</Grid>)}
					</Grid>
				</Box>
			</Container>
		</Styles>
	);
};

const styles = (theme: Theme) => `
	.about-header {
		text-align: center;
		padding: 100px 0;
		
		.about-title {
			padding: 20px 0;
		}
		.about-tags {
			display: flex; justifyContent: "center";
			margin: auto;
			display: block;
			
			.MuiChip-root {
				margin: 10px 10px 20px;
			}
		} 
	}
	
	.about-image {
		max-width: 100%;
		margin-bottom: 50px;
		border-radius: 5px;
	} 
	
    .about-content {
        margin-bottom: 60px;
    }
    
    .about-related-title {
        font-size: 2rem;
        margin-bottom: 10px;
    }
`;

export default AboutPage;
