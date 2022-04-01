import { json, LoaderFunction, useLoaderData, Link as RouterLink, MetaFunction } from 'remix';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import { cms } from '~/utils/cms.server';
import React from 'react';
import styled from '@emotion/styled';
import { getSeoMeta } from '~/seo';
import Affiliates from "~/components/Affiliates";

export const meta: MetaFunction = () => ({ ...getSeoMeta(), title: 'Visionary Works' });

export const loader: LoaderFunction = async () => {
	const caseStudies = await cms('case-studies');

	console.log({ caseStudiesLoader: caseStudies });

	return json({ caseStudies });
};

const Home: React.FC = () => {
	const { caseStudies } = useLoaderData();
	console.log({ caseStudies });

	return (
		<Styles>
			<Stack justifyContent="center" className="hero">
				<Container>
					<Typography gutterBottom variant="h1">
						<span>Visionary</span>
						<span>
							<span className="hero-gradient hero-gradient-one">Innovative</span>
						</span>
						<span>
							<span className="hero-gradient hero-gradient-two">Software</span>
						</span>
					</Typography>
					<Typography gutterBottom>
						Visionary Works develops software for small-medium business to large-scale
						enterprise. Do you need a new evolution in your company? Have a new project
						that you need planned and built? Our highly-skilled team can scale a product
						lifecycle from idea-generation, to{' '}
						<a href="https://visionary-creative.co.uk" target="__blank">
							design
						</a>
						,{' '}
						<Link component={RouterLink} to="/services/web-development#development">
							development
						</Link>{' '}
						and{' '}
						<Link component={RouterLink} to="/services/web-development#deployment">
							deployment
						</Link>
						.
					</Typography>
					<Box mt={8} />
					<Button variant="contained">Learn More</Button>
				</Container>
			</Stack>
			<Affiliates />
		</Styles>
	);
};

const Styles = styled.div`
	.hero {
		background-color: ${({ theme }) => theme.palette.common.white};
		height: 100vh;
		min-height: 900px;

		h1 {
			> span {
				display: block;

				.hero-gradient {
					background-size: 100% 100%;
					background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
					//background-blend-mode: hue, hard-light, hard-light, hard-light, lighten, normal;
					// FF doesn't have a prefix
					background-clip: text;
					text-fill-color: transparent;

					animation: gradient-loop 4s infinite alternate;
					background-image: ${({ theme }) => theme.palette.primary.gradient};

					&.hero-gradient-one {
					}
					&.hero-gradient-two {
					}
				}
			}
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
`;

export default Home;
