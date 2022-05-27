import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import {
	Typography,
	Chip,
	useTheme,
	Container,
	Grid,
	Box,
	CardMedia,
	CardContent,
	Card,
} from '@mui/material';
import useStyle from '~/helpers/hooks/useStyle';
import { Theme } from '@emotion/react';
import { cms } from '~/utils/cms.server';
import { CMSData, CMSDataList } from '~/models/cms';
import { getSeoMeta } from '~/seo';
import { About } from '~/models/single/about';
import Header from '~/components/Header';
import { useRemark } from 'react-remark';
import React, { useEffect, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import { format } from 'date-fns';
import ContentCard from '~/components/ContentCard';
import ContentCardSmall from '~/components/ContentCardSmall';
import { Service } from '~/models/collection/service';
import { Team } from '~/models/collection/team';
import TeamCard from '~/components/TeamCard';
import styled from '@emotion/styled';

type Data = {
	about: CMSData<About>;
	services: CMSDataList<Service>;
	team: CMSDataList<Team>;
};

export const meta: MetaFunction = ({ data }) => {
	return getSeoMeta({
		title: data?.about?.data?.attributes?.title ?? 'About',
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	const about: any = await cms<Data>(`about`, ['heroImage', 'services.list.image']);
	// const services: any = await cms<Data>(`services`, ["*"]);
	const team: any = await cms<Data>(`team-members`, ['*']);

	return json({
		about,
		// services,
		team,
	});
};

const AboutPage = () => {
	const { about, team } = useLoaderData<Data>();
	// const Styles = useStyle(styles);
	const theme = useTheme();
	const [reactContent, setMarkdownSource] = useRemark();

	const [lineOne, setLineOne] = useState<number>(0);
	const [lineTwo, setLineTwo] = useState<number>(0);

	console.log('team', team);

	return (
		<Styles>
			<Box className="about-header">
				<Container>
					<Grid container spacing={3}>
						<Grid item sm={7}>
							<Typography className="about-title" variant="h1">
								{about?.data?.attributes?.title}
							</Typography>
							<Typography className="about-header-text">
								{about?.data?.attributes?.heroText}
							</Typography>
						</Grid>
						<Grid item sm={5}>
							<img
								src={about?.data?.attributes?.heroImage?.data?.attributes?.url}
								alt="team photo"
								className="about-header-image"
							/>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Container>
				<Box className="about-team">
					<Typography variant="h3" className="about-related-title"></Typography>
					<Grid container spacing={2}>
						{about?.data?.attributes?.services?.list?.map((service, i) => (
							<Grid className="grid-smooth" item md={4}>
								<Card className="card-services" elevation={0} key={i}>
									<CardMedia
										component="img"
										sx={{ width: 300, height: 450 }}
										image={service?.image?.data?.attributes?.url}
										alt={`${service.title} image`}
									/>
									<CardContent className={'card-content'}>
										<div>
											<Typography component="h5">{service?.title}</Typography>

											{!!service?.description && (
												<Typography
													variant="body1"
													className="card-content-text"
												>
													{service?.description}
												</Typography>
											)}
										</div>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>

			<Container>
				<Box className="about-team">
					<Typography variant="h3" className="about-related-title"></Typography>
					<Grid container spacing={2}>
						{team?.data
							?.sort((a, b) => {
								return a?.attributes?.order - b?.attributes?.order;
							})
							?.map((member, i) => (
								<Grid className="grid-smooth" item md={6}>
									<TeamCard key={i} content={member?.attributes} />
								</Grid>
							))}
					</Grid>
				</Box>
			</Container>
		</Styles>
	);
};

const Styles = styled.div`
	background: #f5f5f5;

	.about-header {
		text-align: center;
		padding: 100px 0;
		background: white;

		.about-title {
			padding: 20px 0;
			text-align: right;
		}

		.about-header-image {
			max-width: 100%;
		}

		.about-header-text {
			text-align: right;
		}

		.about-tags {
			justify-content: center;
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

	.about-team {
		margin: 80px -100px;
	}

	.grid-smooth {
		transition: all 500ms ease-in-out;
	}

	.about-related-title {
		font-size: 2rem;
		margin-bottom: 10px;
	}

	.card-services {
		h5 {
			background: red;
		}
	}
`;

export default AboutPage;
