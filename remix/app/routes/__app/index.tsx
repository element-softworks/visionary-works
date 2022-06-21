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
	useMediaQuery,
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
import {
	ArrowForward,
	Instagram,
	KeyboardArrowDown,
	KeyboardArrowRight,
	Public,
} from '@mui/icons-material';
import { shuffle } from '~/helpers/common';
import teamAbigail from '~/images/team/abigail.jpg';
import teamDarryl from '~/images/team/darryl.jpg';
import teamJacob from '~/images/team/jacob.jpg';
import teamJoe from '~/images/team/joe.jpg';
import teamLauren from '~/images/team/lauren.jpg';
import teamLuke from '~/images/team/luke.jpg';
import teamNatalie from '~/images/team/natalie.jpg';
import useDimensions from '~/helpers/hooks/useDimensions';
import { format } from 'date-fns';
import Truncate from 'react-truncate';
import ProjectsSlider from '~/components/ProjectsSlider';

type Data = {
	page: CMSData<Homepage>;
	testimonials: CMSDataList<Testimonial>;
	blogs: CMSDataList<Blog>;
	teamImages: { name: string; src: string; speed: number }[];
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

	const randomSpeed = () => {
		let num = Math.floor(Math.random() * 5) + 1; // this will get a number between 1 and 10;
		num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
		return num;
	};

	const teamImages = shuffle([
		{ name: 'Abigail', src: teamAbigail, speed: randomSpeed() },
		{ name: 'Darryl', src: teamDarryl, speed: randomSpeed() },
		{ name: 'Jacob', src: teamJacob, speed: randomSpeed() },
		{ name: 'Joe', src: teamJoe, speed: randomSpeed() },
		{ name: 'Lauren', src: teamLauren, speed: randomSpeed() },
		{ name: 'Luke', src: teamLuke, speed: randomSpeed() },
		{ name: 'Natalie', src: teamNatalie, speed: randomSpeed() },
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
	const md = useMediaQuery(theme.breakpoints.up('md'));

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
		enter: { opacity: md ? 0.5 : 0.25 },
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
							<Grid
								item
								xs={12}
								md={8}
								lg={6}
								order={{ xs: 1, md: i % 2 ? -1 : 1 }}
								sx={{ height: { xs: 'auto', md: '100%' }, display: 'flex' }}
							>
								<Stack
									className="service-content"
									spacing={4}
									sx={{
										paddingLeft: { xs: 0, md: i % 2 ? 4 : 0 },
										paddingRight: { xs: 0, md: i % 2 ? 0 : 4 },
									}}
								>
									<Stack spacing={2}>
										<Typography variant="h2">{service?.title}</Typography>
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

							<Grid
								item
								xs={12}
								md={4}
								lg={6}
								order={{ xs: -1, md: i % 2 ? 1 : -1 }}
								sx={{ height: { xs: '250px', md: '100%' } }}
							>
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
							<Typography variant="h2" component="h3">
								{projectTitle}
							</Typography>
							<Typography>{projectDescription}</Typography>
						</Stack>
						<div>
							<IconButton
								component={RouterLink}
								to="/projects"
								color="primary"
								sx={{ backgroundColor: 'primary.main' }}
								size="large"
							>
								<ArrowForward />
							</IconButton>
						</div>
					</Stack>
				</Container>

				<Box mt={4} />
				<ProjectsSlider />
			</Box>

			<Box mt={10} />

			<Slider>
				{testimonials?.data?.map(({ attributes: testimonial }, i) => (
					<Card className="testimonial" key={i} sx={{ display: 'flex', height: '100%' }}>
						<CardMedia
							component="img"
							sx={{ width: 300, height: 450, display: { xs: 'none', md: 'block' } }}
							image={testimonial?.image?.data?.attributes?.url}
							alt={testimonial?.name}
						/>
						<CardContent>
							<Stack
								sx={{
									height: '100%',
								}}
							>
								<Typography
									className="testimonial-feedback"
									variant="h4"
									component="h3"
									sx={{
										flexGrow: 1,
										order: { xs: 1, md: -1 },
										marginTop: { xs: 3, md: 0 },
									}}
								>
									{testimonial?.feedback}
								</Typography>
								<Stack
									direction="row"
									alignItems="center"
									sx={{ order: { xs: -1, md: 1 } }}
								>
									<Stack sx={{ flexGrow: 1 }}>
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

									<Stack
										direction="row"
										spacing={1}
										className="testimonial-feedback-social"
									>
										<IconButton
											className="testimonial-feedback-social-instagram"
											component="a"
											target="_blank"
											rel="noopener noreferrer"
											href="https://www.instagram.com/happydaysphotouk/"
										>
											<Instagram />
										</IconButton>
										<IconButton
											className="testimonial-feedback-social-website"
											component="a"
											target="_blank"
											rel="noopener noreferrer"
											href="https://happydaysphoto.co.uk/"
										>
											<Public />
										</IconButton>
									</Stack>
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
					<Typography className="news-title" variant="h2" component="h3">
						{newsTitle}
					</Typography>
					<Box mt={8} />
				</Container>
				<Slider>
					{blogs?.data?.map(({ attributes: article }, i) => (
						// <ContentCard blog={t?.attributes} key={i} readMore={blogReadMore} />
						<Card
							className="article"
							key={i}
							sx={{
								display: 'flex',
								height: '100%',
								flexDirection: { xs: 'column', md: 'row' },
							}}
						>
							<CardMedia
								component="img"
								sx={{
									width: { xs: '100%', md: 300 },
									height: { xs: 300, md: 450 },
								}}
								image={article?.coverImage?.data?.attributes?.url}
								alt={article?.title}
							/>
							<CardContent>
								<Stack
									sx={{
										height: '100%',
										// paddingLeft: { xs: 3, lg: 4 },
										// paddingRight: { xs: 3, lg: 4 },
										// paddingTop: 2,
										// paddingBottom: 2,
									}}
									spacing={4}
								>
									<Stack spacing={2} sx={{ flexGrow: 1 }}>
										<Typography
											className="testimonial-feedback"
											variant="h4"
											component="h3"
										>
											{article?.title}
										</Typography>
										<Typography>
											<Truncate lines={5} ellipsis="&hellip;">
												{article?.content}
											</Truncate>
										</Typography>
										<div>
											<Button variant="contained">Read more</Button>
										</div>
									</Stack>
									<Stack direction="row" alignItems="center" spacing={2}>
										<div>
											<Avatar>
												{article?.author?.data?.attributes?.firstname?.charAt(
													0
												)}
											</Avatar>
										</div>
										<Stack>
											<Typography
												variant="subtitle1"
												color="text.secondary"
												component="p"
											>
												{article?.author?.data?.attributes?.firstname}
											</Typography>
											{!!article?.publishedAt && (
												<Typography
													variant="subtitle1"
													color="text.secondary"
													component="p"
												>
													{format(
														new Date(article?.publishedAt),
														'dd/MM/yy'
													)}
												</Typography>
											)}
										</Stack>
									</Stack>
								</Stack>
							</CardContent>
						</Card>
					))}
				</Slider>

				<Container>
					<Faqs
						faqs={
							/*faq*/ [
								{
									question: 'How can we start a project together?',
									answer: 'Answer',
								},
								{
									question: 'How much do projects usually cost?',
									answer: 'Answer',
								},
								{
									question: 'What sectors do you work with?',
									answer: 'Answer',
								},
								{
									question:
										'What do you need from me in order to prepare a quote?',
									answer: 'Answer',
								},
								{
									question: 'How do you structure your team and projects?',
									answer: 'Answer',
								},
								{
									question: 'Who are Visionary Works?',
									answer: 'Answer',
								},
							]
						}
						title={faqTitle}
						image={faqImage}
					/>
				</Container>
			</Box>
		</Styles>
	);
};

const Styles = styled.div`
  .hero {
	background-color: ${({ theme }) => theme.palette.common.black};
	height: 100vh;
	min-height: 700px;
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
	  width: 100vw;
	  height: 100vh;
	  transform-origin: top center;
	  display: block;
	  will-change: opacity;

	  ${({ theme }) => theme.breakpoints.up('md')} {
		width: 50vw;
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
		background-position: left top;
		background-size: 200% 100%;
	  }

	  50% {
		background-size: 100% 100%;
	  }

	  to {
		background-position: right top;
		background-size: 200% 100%;
	  }
	}
  }

  .services {
	background-color: ${({ theme }) => theme.palette.common.black};
	color: ${({ theme }) => theme.palette.common.white};
	padding-bottom: ${({ theme }) => theme.spacing(8)};

	${({ theme }) => theme.breakpoints.up('sm')} {
	  padding-bottom: 0;
	}

	.service {
	  height: auto;
	  min-height: auto;
	  position: relative;

	  ${({ theme }) => theme.breakpoints.up('md')} {
		height: 100vh;
		min-height: 600px;
	  }

	  .service-grid {
		height: auto;

		${({ theme }) => theme.breakpoints.up('md')} {
		  height: 100%;
		}
	  }

	  .service-content {
		max-width: 80vw;
		margin: auto;
		padding: ${({ theme }) => theme.spacing(10, 0)};

		${({ theme }) => theme.breakpoints.up('sm')} {
		  max-width: 60vw;
		}

		${({ theme }) => theme.breakpoints.up('md')} {
		  max-width: 40vw;
		  padding: 0;
		}

		.service-content-description {
		  max-width: 800px;
		  max-width: 65ch;
		}
	  }

	  .service-image {
		height: 100%;
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

  .projects {
	.project-images {
	  max-width: 100%;
	}
  }

  .article {
	img {
	  width: 100%;

	  ${({ theme }) => theme.breakpoints.up('md')} {
		width: 250px;
	  }

	  ${({ theme }) => theme.breakpoints.up('xl')} {
		width: 300px;
	  }
	}
  }

  .testimonial-feedback-social-instagram {
	color: #C13584;
	background-color: ${alpha('#C13584', 0.25)};

	&:hover, &:focus {
	  background-color: ${alpha('#C13584', 0.4)};
	}
  }

  .testimonial-feedback-social-website {
	color: ${({ theme }) => theme.palette.secondary.main};
	background-color: ${({ theme }) => alpha(theme.palette.secondary.main, 0.25)};

	&:hover, &:focus {
	  background-color: ${({ theme }) => alpha(theme.palette.secondary.main, 0.4)};
	}
  }

  .testimonial {
	img {
	  width: 300px;

	  ${({ theme }) => theme.breakpoints.up('md')} {
		width: 250px;
	  }

	  ${({ theme }) => theme.breakpoints.up('xl')} {
		width: 300px;
	  }
	}

	.testimonial-feedback {
	  font-size: 1.1rem;

	  ${({ theme }) => theme.breakpoints.up('xl')} {
		font-size: 1.2rem;
	  }
	}
  }


	.news {
		background: #191919;
		padding: ${({ theme }) => theme.spacing(12, 0)};
		color: ${({ theme }) => theme.palette.common.white};
	  
	  .news-title {
	    max-width: 500px;
		max-width: 15ch;
	  }
	
		.project-images {
			max-width: 100%;
		}
	}
`;

export default Home;
