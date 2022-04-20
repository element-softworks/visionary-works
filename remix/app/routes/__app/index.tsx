import { json, LoaderFunction, useLoaderData, Link as RouterLink, MetaFunction } from "remix";
import { Box, Button, Container, Grid, Link, Stack, Typography } from "@mui/material";
import { cms } from "~/utils/cms.server";
import React from "react";
import styled from "@emotion/styled";
import { getSeoMeta } from "~/seo";
import Affiliates from "~/components/Affiliates";
import notepad from "~/images/notepad.png";
import monitor from "~/images/monitor.png";
import mobile from "~/images/mobile.png";
import wave from "~/images/wave.svg";
import projects from "~/images/projects.png";
import Testimonials from "~/components/ContentCards";
import Team from "~/components/Team";

export const meta: MetaFunction = () => ({ ...getSeoMeta(), title: "Visionary Works" });

export const loader: LoaderFunction = async () => {
	const caseStudies = await cms("case-studies");
	const testimonials = await cms("testimonials");
	const homepage = await cms("homepage", "hero.logos");

	return json({ caseStudies, testimonials, homepage });
};

const Home: React.FC = () => {
	const { testimonials, homepage } = useLoaderData();
	console.log({ testimonials, homepage });

	const firstWord = homepage?.data?.attributes?.hero?.title?.split(' ')?.[0];
	return (
		<Styles>
			<Stack justifyContent="center" className="hero">
				<Container>
					<Typography gutterBottom variant="h1" align="center">
						<span>{firstWord}</span>
						{homepage.data.attributes.hero.title?.replace(firstWord, '')}

					</Typography>
					<Typography gutterBottom variant="h2" align="center">
						{homepage.data.attributes.hero.subtitle}
					</Typography>
					<Box mt={8} />
					<Button variant="contained" disableElevation>{homepage.data.attributes.hero.cta}</Button>
				</Container>
			</Stack>
			{homepage?.data?.attributes?.hero?.logos?.data?.map((logo: any, i: number) => {
				return <div>{logo?.attributes?.url}<br/></div>
			})}
			<Affiliates logos={homepage?.data?.attributes?.hero?.logos?.data}/>
			<Box mt={8} />
			<Box className="intro">
				<Container sx={{ py: 8 }}>
					<Grid container>
						<Grid item xs={12} lg={8}>
							<Typography sx={{ mb: 8 }} variant="h3">
								We get it, you’re trying to scale your company, and user{" "}
								<Box component="span" sx={{ color: "primary.main" }}>
									expectations
								</Box>{" "}
								got a lot more complex.
							</Typography>
							<Typography>
								We are an innovative creative agency that specialises in bespoke
								software development, we can generate ideas and motion them into
								production-grade websites, iOS apps, Android apps and desktop
								applications.
							</Typography>
						</Grid>
						<Grid item lg={4}>
							<img alt="Web Development" src={notepad} className="image-notepad" />
						</Grid>
					</Grid>
				</Container>
			</Box>
			<Box className="services">
				<Container>
					<Grid container alignItems="center">
						<Grid item lg={6}>
							<img alt="Web Development" src={monitor} className="image-notepad" />
						</Grid>
						<Grid item xs={12} lg={6}>
							<Typography sx={{ mb: 2 }} variant="h3">
								Web Development
							</Typography>
							<Typography>
								Nullam id dolor id nibh ultricies vehicula ut id elit. Vivamus sagittis lacus vel augue
								laoreet rutrum faucibus dolor auctor.
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</Box>
			<Box className="image-wave">
				<img alt="Web Development" src={wave} />
			</Box>
			<Box className="services">
				<Container>
					<Grid container alignItems="center">
						<Grid item xs={12} lg={6}>
							<Typography sx={{ mb: 2 }} variant="h3">
								App Development
							</Typography>
							<Typography>
								Nullam id dolor id nibh ultricies vehicula ut id elit. Vivamus sagittis lacus vel augue
								laoreet rutrum faucibus dolor auctor.
							</Typography>
						</Grid>

						<Grid item lg={6}>
							<img alt="Web Development" src={mobile} className="image-notepad" />
						</Grid>
					</Grid>
				</Container>
			</Box>
			<Box className="projects">
				<Container>
					<Grid container alignItems="center">
						<Grid item xs={12} lg={6}>
							<Typography sx={{ mb: 2 }} variant="h3">
								Projects
							</Typography>
							<Typography>
								A selection of our favourite projects.
							</Typography>
						</Grid>

						<Grid item lg={12}>
							<img alt="Web Development" src={projects} className="project-images" />
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Testimonials testimonials={testimonials} />
			<Team />

			<Box className="news">
				<Container>
					<Grid container alignItems="center">
						<Grid item xs={12} lg={6}>
							<Typography sx={{ mb: 2 }} variant="h3">
								Checkout our latest news
							</Typography>
							<Typography>
								A selection of our favourite projects.
							</Typography>
						</Grid>

						<Grid item lg={12}>
							<img alt="Web Development" src={projects} className="project-images" />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Styles>
	);
};

const Styles = styled.div`
	.hero {
		background-color: ${({ theme }) => theme.palette.common.white};
		height: 100vh;
		min-height: 900px;

		h1 {
			color: #4D4D4D;
			max-width: 1000px;
			margin: auto;
			display: block;
			> span {
				display: block;

				background-size: 100% 100%;
				background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
				//background-blend-mode: hue, hard-light, hard-light, hard-light, lighten, normal;
				// FF doesn't have a prefix
				background-clip: text;
				text-fill-color: transparent;

				animation: gradient-loop 4s infinite alternate;
				background-image: ${({ theme }) => theme.palette.primary.gradient};
			}

			@media (max-width: 600px) {
				font-size: 40px;
			},
		}

		h2 {
			font-size: 1.6rem;
			max-width: 900px;
			display: block;
			margin: auto;
			margin-top: ${({ theme }) => theme.spacing(2)};
		}

		button {
			display: block;
			margin: auto;
		}

		@keyframes gradient-loop {
			from {
				/* radial-gradient(farthest-corner at top right, ..) */
				background-position: left top;
				background-size: 200% 100%;
			}
			//49.9% {
			//	background-position: left top;
			//}
			50% {
				/* radial-gradient(farthest-corner at top center, ..) */
				background-size: 100% 100%;
			}
			//50.1% {
			//	background-position: right top;
			//}
			to {
				/* radial-gradient(farthest-corner at top left, ..) */
				background-position: right top;
				background-size: 200% 100%;
			}
		}
	}

	.intro {
		position: relative;
		background-color: #191919;
		color: ${({ theme }) => theme.palette.common.white};
		padding: ${({ theme }) => theme.spacing(12, 0)};
		align-items: center;

		p {
			max-width: 600px;
		}

		.image-notepad {
			max-width: 100%;
		}
	}


	.services {
		position: relative;
		background-color: #191919;
		color: ${({ theme }) => theme.palette.common.white};
		align-items: center;

		p {
			max-width: 600px;
		}

		.image-notepad {
			max-width: 100%;
		}
	}

	.image-wave {
		max-width: 100%;
		overflow-x: hidden;
		background-color: #191919;
		img {
			max-width: 150%;
			margin: ${({ theme }) => theme.spacing(-2, -6)}
		}
	}
	
	.projects {
		padding: ${({ theme }) => theme.spacing(12, 0)};
		.project-images {
			max-width: 100%;
		}
	}
	
	.news {
		background: #191919;
		padding: ${({ theme }) => theme.spacing(12, 0)};
		color: white;
		.project-images {
			max-width: 100%;
		}
	}
`;

export default Home;
