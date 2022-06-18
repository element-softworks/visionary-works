import React from 'react';
import { Typography, Button, Container, Grid, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { Homepage } from '~/models/single/homepage';
import { Parallax } from 'react-scroll-parallax';

const TeamSection: React.FC<{
	team: Homepage['team'];
	teamImages: { name: string; src: string; speed: number }[];
}> = ({ team, teamImages }) => {
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<Styles>
			<Container>
				<Grid container spacing={3} alignItems="center">
					{!md && (
						<Grid item xs={12} md={6} xl={7}>
							<div className="team-images team-images-mobile team-images-mobile-first">
								{teamImages?.slice(0, 3)?.map((team, i) => (
									<Parallax
										key={`${team.src}_${i}`}
										speed={team.speed}
										className="team-image"
									>
										<img alt={team.name} src={team.src} />
									</Parallax>
								))}
							</div>
						</Grid>
					)}
					<Grid item xs={12} md={6} xl={5}>
						<Parallax speed={10} opacity={[0, 1, [0.57, 0.17, 0, 1]]}>
							<Typography component="h2" className="team-title">
								{team?.title}
							</Typography>
							<Typography component="p" className="team-paragraph">
								{team?.description}
							</Typography>
							<Button variant="contained" disableElevation>
								{team?.button}
							</Button>
						</Parallax>
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
									<Parallax
										key={`${team.src}_${i}`}
										speed={team.speed}
										className="team-image"
									>
										<img alt={team.name} src={team.src} />
									</Parallax>
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
		height: 770px;

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

			&.team-images-mobile-second {
				margin-top: 8vw;

				.team-image {
					&:nth-child(1) {
						top: 2vw;
						left: 3vw;
						width: 18vw;
					}

					&:nth-child(2) {
						top: 6vw;
						left: 36vw;
						width: 16vw;
					}

					&:nth-child(3) {
						top: 0vw;
						left: 68vw;
						width: 20vw;
					}
				}
			}
		}

		.team-image {
			position: absolute;
			top: -9999px;
			left: -9999px;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}

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
