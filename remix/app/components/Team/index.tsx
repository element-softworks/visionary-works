import React from 'react';
import { Typography, Button, Container, Grid, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { Homepage } from '~/models/single/homepage';
import teamAbigail from '~/images/team/abigail.jpg';
import teamDarryl from '~/images/team/darryl.jpg';
import teamJacob from '~/images/team/jacob.jpg';
import teamJoe from '~/images/team/joe.jpg';
import teamLauren from '~/images/team/lauren.jpg';
import teamLuke from '~/images/team/luke.jpg';
import teamNatalie from '~/images/team/natalie.jpg';
import { shuffle } from '~/helpers/common';

const TeamSection: React.FC<{ team: Homepage['team'] }> = ({ team }) => {
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up('md'));
	const teamImages = shuffle([
		{ name: 'Abigail', src: teamAbigail },
		{ name: 'Darryl', src: teamDarryl },
		{ name: 'Jacob', src: teamJacob },
		{ name: 'Joe', src: teamJoe },
		{ name: 'Lauren', src: teamLauren },
		{ name: 'Luke', src: teamLuke },
		{ name: 'Natalie', src: teamNatalie },
	]);

	return (
		<Styles>
			<Container>
				<Grid container spacing={3} alignItems="center">
					{!md && (
						<Grid item xs={12} md={6} xl={7}>
							<div className="team-images team-images-mobile team-images-mobile-first">
								{teamImages?.slice(0, 3)?.map((team, i) => (
									<img
										key={`${team.src}_${i}`}
										className="team-image"
										alt={team.name}
										src={team.src}
									/>
								))}
							</div>
						</Grid>
					)}
					<Grid item xs={12} md={6} xl={5}>
						<Typography component="h2" className="team-title">
							{team?.title}
						</Typography>
						<Typography component="p" className="team-paragraph">
							{team?.description}
						</Typography>
						<Button variant="contained" disableElevation>
							{team?.button}
						</Button>
					</Grid>
					<Grid item xs={12} md={6} xl={7}>
						<div
							className={`team-images ${
								!md ? 'team-images-mobile team-images-mobile-second' : ''
							}`}
						>
							{teamImages
								?.slice(!md ? 3 : 0, !md ? 6 : teamImages.length)
								?.map((team, i) => (
									<img
										key={`${team.src}_${i}`}
										className="team-image"
										alt={team.name}
										src={team.src}
									/>
								))}
						</div>
					</Grid>
				</Grid>
			</Container>
		</Styles>
	);
};

const Styles = styled.div`
	h2 {
		font-size: 4rem;
		font-weight: bold;
		line-height: 1.3;
	}

	.team-title {
		font-size: 3.5rem;
		margin-top: ${({ theme }) => theme.spacing(2)};
	}

	.team-images {
		position: relative;
		height: 750px;

		&.team-images-mobile {
			height: 30vw;

			&.team-images-mobile-first {
				.team-image {
					&:nth-child(1) {
						top: 7.5vw;
						left: 3vw;
						width: 20vw;
					}

					&:nth-child(2) {
						top: 0;
						left: 38vw;
						width: 16vw;
					}

					&:nth-child(3) {
						top: 5vw;
						left: 68vw;
						width: 14vw;
					}
				}
			}
		}

		.team-image {
			position: absolute;
			border-radius: 50%;
			top: -9999px;
			left: -9999px;

			&:nth-child(1) {
				top: 50px;
				left: 50px;
				width: 175px;
			}

			&:nth-child(2) {
				top: 0px;
				left: 450px;
				width: 175px;
			}

			&:nth-child(3) {
				top: 400px;
				left: 0;
				width: 115px;
			}

			&:nth-child(4) {
				top: 325px;
				left: 300px;
				width: 130px;
			}

			&:nth-child(5) {
				top: 250px;
				left: 650px;
				width: 165px;
			}

			&:nth-child(6) {
				top: 600px;
				left: 150px;
				width: 150px;
			}

			&:nth-child(7) {
				top: 550px;
				left: 550px;
				width: 130px;
			}
		}
	}

	.team-paragraph {
		max-width: 390px;
		margin: ${({ theme }) => theme.spacing(3, 0)};
	}
`;

export default TeamSection;
