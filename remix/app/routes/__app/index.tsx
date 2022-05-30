import { useLoaderData, Link as RouterLink } from '@remix-run/react';
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Link,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import { cms } from '~/utils/cms.server';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { getSeoMeta } from '~/seo';
import Affiliates from '~/components/Affiliates';
import monitor from '~/images/monitor.png';
import mobile from '~/images/mobile.png';
import wave from '~/images/wave.svg';
import projects from '~/images/projects.png';
import TeamSection from '~/components/Team';
import Intro from '~/components/Home/Intro';
import Slider from '~/components/Slider';
import ContentCard from '~/components/ContentCard';
import { CMSData, CMSDataList } from '~/models/cms';
import { Homepage } from '~/models/single/homepage';
import { Testimonial } from '~/models/collection/testimonial';
import { Blog } from '~/models/collection/blog';
import Faqs from '~/components/Faqs';
import { format } from 'date-fns';

type Data = {
	page: CMSData<Homepage>;
	testimonials: CMSDataList<Testimonial>;
	blogs: CMSDataList<Blog>;
};

export const meta: MetaFunction = () => ({ ...getSeoMeta(), title: 'Visionary Works' });

export const loader: LoaderFunction = async () => {
	const testimonials = await cms<Data['testimonials']>('testimonials');
	const page = await cms<Data['page']>('homepage', [
		'hero.logos',
		'intro.services',
		'team',
		'team.image',
		'faq',
		'faqImage',
	]);
	const blogs = await cms<Data['blogs']>('blogs', ['author', 'coverImage']);

	return json({ testimonials, page, blogs });
};

const Home: React.FC = () => {
	const theme = useTheme();
	const {
		testimonials,
		page: {
			data: {
				attributes: {
					hero,
					intro,
					team,
					projectTitle,
					projectDescription,
					newsTitle,
					faqTitle,
					faqImage,
					faq,
					blogReadMore,
				},
			},
		},
		blogs,
	} = useLoaderData<Data>();
	const [step, setStep] = useState(0);
	const firstWord = hero?.title?.split(' ')?.[0];
	const services = intro?.services;

	console.log({ team });

	return (
		<Styles>
			<Stack justifyContent="center" className="hero">
				<Container>
					<Typography gutterBottom variant="h1" align="center">
						<span>{firstWord}</span>
						{hero?.title?.replace(firstWord, '')}
					</Typography>
					<Typography gutterBottom variant="h2" align="center">
						{hero?.subtitle}
					</Typography>
					<Box mt={8} />
					<Button variant="contained" disableElevation>
						{hero?.cta}
					</Button>
				</Container>
			</Stack>
			<Affiliates logos={hero?.logos?.data} />
			<Intro data={intro} />
			<Box className="services">
				{services?.map((service: any, i: number) => (
					<React.Fragment key={i}>
						<Container>
							<Grid container alignItems="center" key={i}>
								{!service.right && (
									<Grid item xs={12} md={6}>
										<img
											alt={`${service?.title} icon`}
											src={i === 1 ? mobile : monitor}
											className="image-notepad"
										/>
									</Grid>
								)}
								<Grid item xs={12} lg={6}>
									<Typography sx={{ mb: 2 }} variant="h3">
										{service?.title}
									</Typography>
									<Typography>{service.description}</Typography>
									<Button variant="contained">Hello</Button>
								</Grid>
								{service.right && (
									<Grid item md={6}>
										<img
											alt={`${service?.title} icon`}
											src={i === 1 ? mobile : monitor}
										/>
									</Grid>
								)}
							</Grid>
						</Container>
						{services[services.length - 1]?.title !== service?.title && (
							<Box className="image-wave">
								<img alt="Wave" src={wave} className="image-wave" />
							</Box>
						)}
					</React.Fragment>
				))}
			</Box>

			<Box className="projects">
				<Container>
					<Grid container alignItems="center">
						<Grid item xs={12} lg={6}>
							<Typography sx={{ mb: 2 }} variant="h3">
								{projectTitle}
							</Typography>
							<Typography>{projectDescription}</Typography>
						</Grid>

						<Grid item lg={12}>
							{/*<img alt="Web Development" src={projects} className="project-images" />*/}
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box mt={10} />

			<Slider>
				{testimonials?.data?.map(({ attributes: testimonial }, i) => (
					<Card key={i} sx={{ display: 'flex' }}>
						<CardMedia
							component="img"
							sx={{ width: 300, height: 450 }}
							image={testimonial?.image?.data?.attributes?.url}
							alt={testimonial?.name}
						/>
						<CardContent>
							<Typography variant="h5">{testimonial?.feedback}</Typography>
							<Stack direction="row" alignItems="center">
								<Avatar>{testimonial?.name?.charAt(0)}</Avatar>

								<Stack spacing={2}>
									<Typography
										variant="subtitle1"
										color="text.secondary"
										component="p"
									>
										{testimonial?.name}
									</Typography>
									<Typography
										variant="subtitle1"
										color="text.secondary"
										component="p"
									>
										{testimonial?.company}
									</Typography>
								</Stack>
							</Stack>
						</CardContent>
					</Card>
				))}
			</Slider>

			<Box sx={{ mt: theme.spacing(20) }} />
			<TeamSection team={team} />
			<Box sx={{ mt: theme.spacing(20) }} />

			<Box className="news">
				<Container>
					<Typography sx={{ mb: 2 }} variant="h3">
						{newsTitle}
					</Typography>
				</Container>
				<Slider>
					{blogs?.data?.map((t, i) => (
						<ContentCard blog={t?.attributes} key={i} readMore={blogReadMore} />
					))}
				</Slider>

				<Container>
					<Faqs faqs={faq} title={faqTitle} image={faqImage} />
				</Container>
			</Box>
		</Styles>
	);
};

const Styles = styled.div`
	.hero {
		background-color: ${({ theme }) => theme.palette.common.white};
		height: 80vh;
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
		margin: ${({ theme }) => theme.spacing(-6, 0)};

		img {
			max-width: 150%;
			margin: ${({ theme }) => theme.spacing(0, -6)};
		}
	}

	.projects {
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
