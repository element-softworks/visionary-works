import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
	alpha,
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Grid,
	IconButton,
	Link,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import { cms } from '~/utils/cms.server';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getSeoMeta } from '~/seo';
import Affiliates from '~/components/Affiliates';
import monitor from '~/images/monitor.png';
import mobile from '~/images/mobile.png';
import wave from '~/images/wave.svg';
import TeamSection from '~/components/Team';
import Intro from '~/components/Home/Intro';
import Slider from '~/components/Slider';
import ContentCard from '~/components/ContentCard';
import { CMSData, CMSDataList } from '~/models/cms';
import { Homepage } from '~/models/single/homepage';
import { Testimonial } from '~/models/collection/testimonial';
import { Blog } from '~/models/collection/blog';
import Faqs from '~/components/Faqs';
import { config, animated, useTransition } from 'react-spring';
import { grey } from '@mui/material/colors';
import { HeaderHeightContext } from '~/helpers/contexts';
import { KeyboardArrowDown } from '@mui/icons-material';
import { shuffle } from '~/helpers/common';
import teamAbigail from '~/images/team/abigail.jpg';
import teamDarryl from '~/images/team/darryl.jpg';
import teamJacob from '~/images/team/jacob.jpg';
import teamJoe from '~/images/team/joe.jpg';
import teamLauren from '~/images/team/lauren.jpg';
import teamLuke from '~/images/team/luke.jpg';
import teamNatalie from '~/images/team/natalie.jpg';
import useDimensions from '~/helpers/hooks/useDimensions';

type Data = {
	page: CMSData<Homepage>;
	testimonials: CMSDataList<Testimonial>;
	blogs: CMSDataList<Blog>;
	teamImages: { name: string; src: string }[];
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

	const teamImages = shuffle([
		{ name: 'Abigail', src: teamAbigail },
		{ name: 'Darryl', src: teamDarryl },
		{ name: 'Jacob', src: teamJacob },
		{ name: 'Joe', src: teamJoe },
		{ name: 'Lauren', src: teamLauren },
		{ name: 'Luke', src: teamLuke },
		{ name: 'Natalie', src: teamNatalie },
	]);

	return json({ testimonials, page, blogs, teamImages });
};

const Home: React.FC = () => {
	const theme = useTheme();
	const {
		testimonials,
		teamImages,
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
	const [titleVerbs] = useState(['Visionary', 'Innovative', 'Revolutionary']);
	const [titleVerbIndex, setTitleVerbIndex] = useState(0);
	const services = intro?.services;
	const [show, set] = useState(false);
	const { height: headerHeight } = useContext(HeaderHeightContext);

	useEffect(() => {
		const interval = setInterval(() => {
			setTitleVerbIndex((state) => (state + 1) % titleVerbs.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	const textTransitions = useTransition(titleVerbs[titleVerbIndex], {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		delay: 200,
		config: config.molasses,
		reverse: show,
		onRest: () => set(!show),
	});

	const [$heroText, { offsetHeight: heroTextHeight }] = useDimensions();

	return (
		<Styles>
			<Stack className="hero" style={{ paddingTop: `${headerHeight}px` }}>
				<Container className="hero-content">
					<Typography gutterBottom variant="h1" align="center">
						<Box
							component="span"
							style={{
								display: 'flex',
								flexWrap: 'wrap',
							}}
						>
							<Box ref={$heroText} sx={{ marginRight: 2.5 }}>
								We are a {` `}
							</Box>
							<span
								className="heading-animated-text-wrapper"
								style={{
									height: heroTextHeight,
								}}
							>
								{textTransitions((styles, item) => (
									<animated.span
										className="heading-animated-text"
										style={{ ...styles }}
									>
										{item}
									</animated.span>
								))}
							</span>
						</Box>
						web development agency.
					</Typography>
					<Typography gutterBottom variant="h2" align="center">
						{hero?.subtitle}
					</Typography>
					<Box mt={4} />
					<IconButton className="heading-action" color="primary">
						<KeyboardArrowDown />
					</IconButton>
				</Container>
				<Affiliates logos={hero?.logos?.data} />

				<img alt="Visionary Works Team" className="hero-team" src="/team.jpg" />
			</Stack>

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
			<TeamSection team={team} teamImages={teamImages} />
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
		background-color: ${grey[200]};
		height: 100vh;
		min-height: 900px;
	  	position: relative;
	  
	  .hero-content {
	    margin-top: auto;
	    position: relative;
	    z-index: 1;
	  }
	  
	  .hero-team {
		position: absolute;
	    top: 40%;
		object-fit: cover;
	    opacity: 0.5;
		transform: translateY(-50%) scaleX(-1);
		object-position: top right;
		max-width: 50vw;
		min-height: 40vw;
		transform-origin: top center;
		right: 0;

		${({ theme }) => theme.breakpoints.up('md')} {
		  max-width: 50vw;
		  min-height: 28vw;
		  right: -50%;
		  transform-origin: left;
		}
	  }

		h1 {
			color: #4D4D4D;
			display: block;
		  	text-align: left;

			> span {
			  	display: block;
			  
				  .heading-animated-text-wrapper {
				    min-width: 600px;
				    display: inline-flex;

					.heading-animated-text {
					  position: absolute;
					  color: ${({ theme }) => theme.palette.primary.main};
					  will-change: opacity;
					  
					  //background-size: 100% 100%;
					  //background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
					  ////background-blend-mode: hue, hard-light, hard-light, hard-light, lighten, normal;
					  //// FF doesn't have a prefix
					  //background-clip: text;
					  //text-fill-color: transparent;
					  //
					  //animation: gradient-loop 4s infinite alternate;
					  // background-image: // // ({ theme }) // => /*theme.palette.primary.gradient};
					}
				  }
			}

			@media (max-width: 600px) {
				font-size: 40px;
			},
		}

		h2 {
			font-size: 1.2rem;
		  	font-weight: 400;
			display: block;
			margin-top: ${({ theme }) => theme.spacing(2)};
		  	text-align: left;
		  	max-width: 800px;
		  	max-width: 65ch;
		  	line-height: 150%;
		}
	  
	  .heading-action {
	    background: ${({ theme }) => alpha(theme.palette.primary.main, 0.25)};
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
