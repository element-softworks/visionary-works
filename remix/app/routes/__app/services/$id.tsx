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
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-common-types";

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
					<Grid container>
						<Grid item sm={6}>
							<Typography className="service-title"
							            variant="h1">{service?.data?.attributes?.title} </Typography>
							{!!service?.data?.attributes?.tag?.data?.attributes?.name &&
								<Box className="service-tags" component={RouterLink} to={"/service"}>
									<Chip label={service?.data?.attributes?.tag?.data?.attributes?.name} />
								</Box>
							}
							<Typography className="service-subtitle"
							            variant="h2">{service?.data?.attributes?.subtitle}</Typography>
						</Grid>
						<Grid item sm={6}>
							{/*<img src={service?.data?.attributes?.coverImage?.data?.attributes?.url}*/}
							{/*     className="service-image"*/}
							{/*     alt={`${service?.data?.attributes?.title} cover image`} />*/}
							<Box className="service-icon-background">
								<FontAwesomeIcon icon={["fad", service?.data?.attributes?.icon as IconName]} />
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box className="service-content">
				<Container>
					{reactContent}
				</Container>
			</Box>

			<Container>
				<Box className="service-related">
					<Typography variant="h3" className="service-related-title">
						Suggested Services
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

const Styles = styled.div`
	.service-header {
		background: white;
		margin-bottom: 60px;
		text-align: left;
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
			display: flex;
			justifyContent: "center";
			margin: auto;
			display: block;

			.MuiChip-root {
				margin: 10px 10px 20px;
			}
		}
		
		.service-icon-background {
			background: #00e6f740;	
			border-radius: 10px;
			
			svg {
				font-size: 100px;
				padding: 170px 0;
				text-align: center;
				width: 100%;
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
		padding: 300px 0;
		color: white;
		background: #111;
	}

	.service-related-title {
		font-size: 2rem;
		margin-bottom: 10px;
	}
`;

export default Service;
