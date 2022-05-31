import { useLoaderData, Link as RouterLink } from '@remix-run/react';
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
	alpha,
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	IconButton,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import { Parallax } from 'react-scroll-parallax';
import { cms } from '~/utils/cms.server';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { getSeoMeta } from '~/seo';
import Affiliates from '~/components/Affiliates';
import monitor from '~/images/monitor.png';
import mobile from '~/images/mobile.png';
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
import { ArrowForward, KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
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
	const [heroImages] = useState([
		{ name: 'Ginger chick', src: '/development.jpg' },
		{ name: 'Reuben Developing', src: '/development-2.png' },
	]);
	const [titleVerbIndex, setTitleVerbIndex] = useState(0);
	const [heroImageIndex, setHeroImageIndex] = useState(0);
	const services = intro?.services;
	const [show, set] = useState(false);
	const { height: headerHeight } = useContext(HeaderHeightContext);

	useEffect(() => {
		const titleVerbInterval = setInterval(() => {
			setTitleVerbIndex((state) => (state + 1) % titleVerbs.length);
		}, 4000);

		const heroImageInterval = setInterval(() => {
			setHeroImageIndex((state) => (state + 1) % heroImages.length);
		}, 6000);

		return () => {
			clearInterval(titleVerbInterval);
			clearInterval(heroImageInterval);
		};
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

	const heroImageTransitions = useTransition(heroImages[heroImageIndex], {
		from: { opacity: 0 },
		enter: { opacity: 0.5 },
		leave: { opacity: 0 },
		delay: 200,
		config: config.molasses,
	});

	const [$heroText, { offsetHeight: heroTextHeight }] = useDimensions();

	const $intro = useRef<HTMLDivElement>(null);

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
					<IconButton
						className="heading-action"
						color="primary"
						onClick={() => $intro?.current?.scrollIntoView?.({ behavior: 'smooth' })}
					>
						<KeyboardArrowDown />
					</IconButton>
				</Container>
				<Affiliates logos={hero?.logos?.data} />

				{/*<img src="/development.jpg" />*/}
				{heroImageTransitions((styles, item) => (
					<animated.img
						className="hero-team"
						alt={item.name}
						src={item.src}
						style={{
							opacity: styles.opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
						}}
					/>
				))}
			</Stack>

			<Intro data={intro} ref={$intro} />

			<Box className="services">
				{services?.map((service: any, i: number) => (
					<div className="service">
						<Grid key={i} container alignItems="center" className="service-grid">
							<Grid item xs={12} lg={6} order={i % 2 ? -1 : 1}>
								<Stack
									className="service-content"
									spacing={4}
									sx={{
										paddingLeft: i % 2 ? 4 : 0,
										paddingRight: i % 2 ? 0 : 4,
									}}
								>
									<Stack spacing={2}>
										<Typography variant="h3">{service?.title}</Typography>
										<Typography className="service-content-description">
											{/*{service.description}*/}
											Morbi leo risus, porta ac consectetur ac, vestibulum at
											eros. Etiam porta sem malesuada magna mollis euismod.
											Nullam id dolor id nibh ultricies vehicula ut id elit.
										</Typography>
									</Stack>
									<div>
										<Button
											component={RouterLink}
											to="/service/web-development"
											startIcon={<KeyboardArrowRight />}
											variant="contained"
										>
											Learn more
										</Button>
									</div>
								</Stack>
							</Grid>

							<Grid item xs={0} lg={6} order={i % 2 ? 1 : -1}>
								<Box className="service-image">
									<Parallax
										className="service-image-animated-wrapper"
										speed={0}
										scale={[1, 1.25, 'easeInQuad']}
									>
										<img
											alt={service?.title}
											src={i % 2 ? '/services-app.png' : '/service-1.jpg'}
										/>
									</Parallax>
								</Box>
							</Grid>
						</Grid>
					</div>
				))}
			</Box>

			<Box mt={10} />
			<Box className="projects">
				<Container>
					<Stack direction="row" alignItems="center">
						<Stack spacing={2} sx={{ flexGrow: 1 }}>
							<Typography variant="h3">{projectTitle}</Typography>
							<Typography>{projectDescription}</Typography>
						</Stack>
						<div>
							<IconButton
								component={RouterLink}
								to="/projects"
								color="inherit"
								sx={{ backgroundColor: 'primary.main' }}
								size="large"
							>
								<ArrowForward />
							</IconButton>
						</div>
					</Stack>

					{/*<img alt="Web Development" src={projects} className="project-images" />*/}
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
		//background-color: ${grey[200]};
		background-color: ${({ theme }) => theme.palette.common.black};
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
	    top: 0;
	    right: 0;
		object-fit: cover;
	    opacity: 0.5;
		object-position: top left;
		width: 50vw;
		height: 100vh;
		transform-origin: top center;
	    display: none;
	    will-change: opacity;

		${({ theme }) => theme.breakpoints.up('md')} {
		  display: block;
		}
	  }

		h1 {
			color: ${({ theme }) => theme.palette.common.white};
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
		  	color: ${({ theme }) => theme.palette.common.white};
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
	  background-color: ${({ theme }) => theme.palette.common.black};
	  color: ${({ theme }) => theme.palette.common.white};

	  .service {
		min-height: 100vh;
		position: relative;
		
	    .service-grid {
	      min-height: 100%;
	    }
	    
	    .service-content {
		  max-width: 40vw;
		  margin: 0 auto;

		  .service-content-description {
		    max-width: 800px;
		    max-width: 65ch;
		  }
	    }

		.service-image {
		  height: 100vh;
		  overflow: hidden;
		  top: 0;
		  bottom: 0;

		  .service-image-animated-wrapper {
			height: 100%;
			width: 100%;
		  }

		  img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		  }
		}
	  }
	}
  
  
	//
	// .image-wave {
	// 	max-width: 100%;
	// 	overflow-x: hidden;
	// 	background-color: #191919;
	// 	margin: ${({ theme }) => theme.spacing(-6, 0)};
	//
	// 	img {
	// 		max-width: 150%;
	// 		margin: ${({ theme }) => theme.spacing(0, -6)};
	// 	}
	// }

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
