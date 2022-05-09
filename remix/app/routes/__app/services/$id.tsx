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
import ServicesCard from "~/components/ServicesCard";
import ProcessTabs from "~/components/ProcessTabs";
import { Link as RouterLink } from "remix";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-common-types";
import Slider from "~/components/Slider";
import { Project } from "~/models/collection/project";
import FaqsList from "~/components/FaqsList";

type Data = {
	service: CMSData<Service>;
	services: CMSDataList<Service>;
	projects: CMSDataList<Project>;
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
	const projects: any = await cms<Data>(`projects`, ["*"]);

	// const firstService = service?.data?.[0]
	return json({
		service: {
			data: service?.data?.[0]
		},
		projects,
		// services: {
		// 	data: services?.data?.filter((service: Service) => {
		// 		console.log( service?.attributes?.slug, params?.id);
		// 		return service?.attributes?.slug !== params?.id
		// 	})
		// }
		services: {
			data: services?.data?.filter((s: { attributes: Service }) => {
				console.log(242, s?.attributes?.tag?.data?.attributes?.name, s?.attributes?.title);
				return s?.attributes?.slug !== params?.id;// && s?.attributes?.tag?.data?.attributes?.name === service?.attributes?.tag?.data?.attributes?.name
			})
		}
	});
};

const Service = () => {
	const { service, services, projects } = useLoaderData<Data>();
	const theme = useTheme();
	const [reactContent, setMarkdownSource] = useRemark();

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
							            variant="h1">{service?.data?.attributes?.title}</Typography>
							{!!service?.data?.attributes?.tag?.data?.attributes?.name &&
								<Box className="service-tags" component={RouterLink} to={"/service"}>
									<Chip label={service?.data?.attributes?.tag?.data?.attributes?.name} />
								</Box>
							}
							<Typography className="service-subtitle"
							            variant="h2">{service?.data?.attributes?.subtitle}</Typography>
						</Grid>
						<Grid item sm={6}>
							<Box className="service-icon-background">
								{!!service?.data?.attributes?.icon &&
									<FontAwesomeIcon icon={["fad", service?.data?.attributes?.icon as IconName]} />}
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box className="service-content">
				<Container>
					<Grid container className="service-content-wrapper" spacing={2}>
						<Grid item sm={7}>
							<Typography className="service-subtitle"
							            variant="h3">{service?.data?.attributes?.contentTitle}</Typography>
							{reactContent}
						</Grid>
						<Grid item sm={5}>
							<img src={service?.data?.attributes?.coverImage?.data?.attributes?.url}
							     className="service-image"
							     alt={`${service?.data?.attributes?.title} cover image`} />
						</Grid>
					</Grid>

					<Typography className="service-what-can-we-provide" variant="h4">What can we provide?</Typography>

					<Grid container spacing={2}>
						{services?.data?.map((service, i) => <Grid key={i} item md={4}>
							<ServicesCard content={service?.attributes} />
						</Grid>)}
					</Grid>

				</Container>
			</Box>

			<Box className="service-related">
				<Container>
					<ProcessTabs />
				</Container>
			</Box>


			<Box className="projects-related">
				<Container>
					<Typography className="projects-related-title"
					            variant="h4">Checkout our recent {service?.data?.attributes?.title} projects</Typography>

				</Container>
				<Slider>
					{projects?.data?.map((t, i) => (
						<ContentCard blog={t?.attributes} key={i} readMore="Read More" />
					))}
				</Slider>
			</Box>


			<Box className="faqs">
				<Container>
					<Typography className="service-subtitle"
					            variant="h4">Got a {service?.data?.attributes?.title} related question?</Typography>
					<FaqsList />
				</Container>
			</Box>
		</Styles>
	);
};

const Styles = styled.div`
	.service-header {
		background: white;
		//margin-bottom: 60px;
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
			//justify-content: center;
			margin: auto;
			text-decoration: none;

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

	.service-content {
		padding: 100px 0;
		color: white;
		background: #111;

		.service-content-wrapper {
			align-items: center;
			margin-bottom: 100px;

			.service-image {
				max-width: 100%;
				border-radius: 5px;
			}
		}

		.service-what-can-we-provide {
			font-size: 1.5rem;
			max-width: 600px;
			display: block;
			margin-bottom: 30px;
		}
	}

	.service-related {
		background: white;

		.service-related-title {
			font-size: 2rem;
			margin-bottom: 10px;
		}
	}

	.projects-related {
		padding: 150px 0;
		background: #00afd4c2;
		
		.projects-related-title {
			padding-bottom: 30px;
		}
	}

	.faqs {
		background: #00afd4c2;
	}
`;

export default Service;
