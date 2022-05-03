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
import React, { useEffect, useState } from "react";
import parseISO from "date-fns/parseISO";
import { format } from "date-fns";
import ContentCard from "~/components/ContentCard";
import ContentCardSmall from "~/components/ContentCardSmall";
import { Service } from "~/models/collection/service";
import { Team } from "~/models/collection/team";
import TeamCard from "~/components/TeamCard";
import styled from "@emotion/styled";

type Data = {
	about: CMSData<About>;
	services: CMSDataList<Service>;
	team: CMSDataList<Team>;
};

export const meta: MetaFunction = ({ data }) => {
	return getSeoMeta({
		title: data?.about?.data?.attributes?.title ?? "About"
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	const about: any = await cms<Data>(`about`, ["*"]);
	const services: any = await cms<Data>(`services`, ["*"]);
	const team: any = await cms<Data>(`team-members`, ["*"]);

	return json({
		about,
		services,
		team
	});
};

const AboutPage = () => {
	const { about, services, team } = useLoaderData<Data>();
	// const Styles = useStyle(styles);
	const theme = useTheme();
	const [reactContent, setMarkdownSource] = useRemark();

	const [lineOne, setLineOne] = useState<number>(0);
	const [lineTwo, setLineTwo] = useState<number>(2);
	const [lineThree, setLineThree] = useState<number>(1);

	console.log("team", team);

	return (
		<Styles>
			<Container>
				<Box className="about-header">
					<Typography className="about-title" variant="h1">
						{about?.data?.attributes?.title}
					</Typography>
				</Box>
				<Box className="about-team">
					<Typography variant="h3" className="about-related-title">
					</Typography>
					<Grid container spacing={2}>
						{team?.data?.slice(0, 3)?.sort((a, b) => {
							return a?.attributes?.order - b?.attributes?.order;
						})?.map((member, i) => <Grid md={6} className={`grid-smooth ${lineOne === i ? 'grid-smooth-large' : ''}`} item onClick={() => {
							setLineOne(i)
						}}>
							<TeamCard key={i} content={member?.attributes} fullWidth={lineOne === i}  />
						</Grid>)}
					</Grid>
					<Grid container spacing={2}>
						{team?.data?.slice(3, 6)?.sort((a, b) => {
							return a?.attributes?.order - b?.attributes?.order;
						})?.map((member, i) => <Grid md={6} className={`grid-smooth ${lineTwo === i ? 'grid-smooth-large' : ''}`} item onClick={() => {
							setLineTwo(i)
						}}>
							<TeamCard key={i} content={member?.attributes} fullWidth={lineTwo === i}  />
						</Grid>)}
					</Grid>
					<Grid container spacing={2}>
						{team?.data?.slice(6, 9)?.sort((a, b) => {
							return a?.attributes?.order - b?.attributes?.order;
						})?.map((member, i) => <Grid md={6} className={`grid-smooth ${lineThree === i ? 'grid-smooth-large' : ''}`} item onClick={() => {
							setLineThree(i)
						}}>
							<TeamCard key={i} content={member?.attributes} fullWidth={lineThree === i}  />
						</Grid>)}
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
		background: transparent;

		.about-title {
			padding: 20px 0;
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
		margin: 0 -50px;
	}
	
	.grid-smooth {
		transition: all 500ms ease-in-out;
		width: 20%;
		flex-basis: 20%;
		&.grid-smooth-large {
			width: 60%;
			max-width: 60%;
			flex-basis: 60%;
		}
	}
	.about-related-title {
		font-size: 2rem;
		margin-bottom: 10px;
	}
`;

export default AboutPage;
