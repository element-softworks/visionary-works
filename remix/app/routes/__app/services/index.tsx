import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Typography, Chip, useTheme, Container, Grid, Box } from "@mui/material";
import useStyle from "~/helpers/hooks/useStyle";
import { Theme } from "@emotion/react";
import { cms } from "~/utils/cms.server";
import { CMSData, CMSDataList } from "~/models/cms";
import { getSeoMeta } from "~/seo";
import { Service } from "~/models/collection/service";
import Header from "~/components/Header";
import { useRemark } from "react-remark";
import React, { useEffect } from "react";
import parseISO from "date-fns/parseISO";
import { format } from "date-fns";
import ContentCard from "~/components/ContentCard";
import ContentCardSmall from "~/components/ContentCardSmall";

type Data = {
	service: CMSData<Service>;
	services: CMSDataList<Service>;
};

export const meta: MetaFunction = ({ data }) => {
	return getSeoMeta({
		title: data?.services?.data?.attributes?.title ?? "Service"
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	const services: any = await cms<Data>(`services`, ["*"]);

	return json({
		services
	});
};

const ServicePage = () => {
	const { services } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();
	const [reactContent, setMarkdownSource] = useRemark();

	console.log("services", services);

	return (
		<Styles>
			<Container>
				<Box className="service-header">
					<Typography className="service-title" variant="h1">Services</Typography>
				</Box>
				<Box className="service-related">
					<Typography variant="h3" className="service-related-title">
						Latest Posts
					</Typography>
					<Grid container spacing={2}>
						{services?.data?.map((service, i) => <Grid item md={4}>
							<ContentCardSmall key={i} content={service?.attributes} type="services" />
						</Grid>)}
					</Grid>
				</Box>
			</Container>
		</Styles>
	);
};

const styles = (theme: Theme) => `
	.service-header {
		text-align: center;
		padding: 100px 0;
		
		.service-title {
			padding: 20px 0;
		}
		.service-tags {
			display: flex; justifyContent: "center";
			margin: auto;
			display: block;
			
			.MuiChip-root {
				margin: 10px 10px 20px;
			}
		} 
	}
	
	.service-image {
		max-width: 100%;
		margin-bottom: 50px;
		border-radius: 5px;
	} 
	
    .service-content {
        margin-bottom: 60px;
    }
    
    .service-related-title {
        font-size: 2rem;
        margin-bottom: 10px;
    }
`;

export default ServicePage;
