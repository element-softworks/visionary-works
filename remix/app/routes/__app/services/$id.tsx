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
import { Link as RouterLink } from "remix";

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
	// const service = await cms<Data>(`slugify/slugs/service/${params.id}`);
	const service: any = await cms<Data>(`services`, ["*"], `?filters[slug]=${params.id}`);
	const services: any = await cms<Data>(`services`, ["*"]);

	// const firstService = service?.data?.[0]
	return json({
		service: {
			data: service?.data?.[0]
		},
		// services: {
		// 	data: services?.data?.filter((service: Service) => {
		// 		console.log( service?.attributes?.slug, params?.id);
		// 		return service?.attributes?.slug !== params?.id
		// 	})
		// }
		services: {
			data: services?.data?.slice(0, 2)
		}
	});
};

const Service = () => {
	const { service, services } = useLoaderData<Data>();
	const Styles = useStyle(styles);
	const theme = useTheme();
	const [reactContent, setMarkdownSource] = useRemark();

	console.log("service", services);

	useEffect(() => {
		setMarkdownSource(service?.data?.attributes?.content);
	}, []);

	return (
		<Styles>
			<Box className="service-header">
				<Container>
					<Typography className="service-title" variant="h1">{service?.data?.attributes?.title} </Typography>
					<Box className="service-tags" component={RouterLink} to={"/service"}>
						<Chip label={service?.data?.attributes?.tag?.data?.attributes?.name} />
					</Box>
					<Typography className="service-subtitle"
					            variant="h2">{service?.data?.attributes?.subtitle}</Typography>

				</Container>
			</Box>

			<Container>

				<img src={service?.data?.attributes?.coverImage?.data?.attributes?.url} className="service-image"
				     alt={`${service?.data?.attributes?.title} cover image`} />

				<Box className="service-content">
					{reactContent}
				</Box>

				<Box className="service-related">
					<Typography variant="h3" className="service-related-title">
						Suggested Services
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
	.service-header {
		background: ${theme.palette.primary.main};
		margin-bottom: 60px;

		text-align: center;
		padding: 100px 0;
		
		.service-title {
			padding: 20px 0;
		}
		.service-subtitle {
			font-size: 1.5rem;
			max-width: 600px;
			display: block;
			margin: auto;
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
		margin-top: -60px;
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

export default Service;
