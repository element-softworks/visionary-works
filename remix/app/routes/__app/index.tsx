import { json, LoaderFunction, useLoaderData, Link as RouterLink, MetaFunction } from 'remix';
import { Box, Button, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { cms } from '~/utils/cms.server';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { getSeoMeta } from '~/seo';
import Affiliates from '~/components/Affiliates';
import notepad from '~/images/notepad.png';
import monitor from '~/images/monitor.png';
import mobile from '~/images/mobile.png';
import wave from '~/images/wave.svg';
import projects from '~/images/projects.png';
import Testimonials from '~/components/ContentCards';
import Team from '~/components/Team';
import reactStringReplace from 'react-string-replace';

export const meta: MetaFunction = () => ({ ...getSeoMeta(), title: 'Visionary Works' });

export const loader: LoaderFunction = async () => {
	// const caseStudies = await cms('case-studies');
	const testimonials = await cms('testimonials');
	const page = await cms('homepage', ['hero.logos', 'intro.services']);

	console.log({page});
	return json({ testimonials, page });
};

const Home: React.FC = () => {
	const {
		testimonials,
		page: {
			data: {
				attributes: { hero, intro },
			},
		},
	} = useLoaderData();

	const [windowHeight, setWindowHeight] = useState<number | null>(null);
	const [scrollY, setScrollY] = useState<number | null>(null);
	const [introY, setIntroY] = useState<number | null>(null);
	const [introContentY, setIntroContentY] = useState<number | null>(null);
	const [introContentHeight, setIntroContentHeight] = useState<number | null>(null);
	const [introContentOffsetTop, setIntroContentOffsetTop] = useState<number | null>(null);
	const $intro = useRef<HTMLDivElement>(null);
	const $introContent = useRef<HTMLDivElement>(null);

	console.log('introY', introY);

	const handleScroll = () => {
		setIntroContentY($introContent?.current?.getBoundingClientRect?.()?.top ?? 0);
		setWindowHeight(window.innerHeight);
		setScrollY(window.scrollY);
		setIntroY($intro?.current?.getBoundingClientRect?.()?.top ?? 0);
		setIntroContentHeight($introContent?.current?.offsetHeight ?? 0);
		setIntroContentOffsetTop($introContent?.current?.offsetTop ?? 0);
	};

	const handleResize = () => {
		setIntroContentY($introContent?.current?.getBoundingClientRect?.()?.top ?? 0);
		setWindowHeight(window.innerHeight);
		setScrollY(window.scrollY);
		setIntroY($intro?.current?.getBoundingClientRect?.()?.top ?? 0);
		setIntroContentHeight($introContent?.current?.offsetHeight ?? 0);
		setIntroContentOffsetTop($introContent?.current?.offsetTop ?? 0);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const percentScrolled = (scrollY ?? 0) / (windowHeight ?? 0);
	const introContentPercentScrolled = (introContentY ?? 0) / (introContentHeight ?? 0);
	// const introFeatureOpacity = 1 - (introContentY ?? 0) / (windowHeight ?? 0);

	const introFeatureOpacity =
		1 - ((scrollY ?? 0) - (introContentY ?? 0)) / ($intro?.current?.offsetHeight ?? 0) + 0.2;
	const introFeatureFill =
		1 -
		(($intro?.current?.offsetHeight + windowHeight ?? 0) - (scrollY ?? 0)) /
			($intro?.current?.offsetHeight ?? 0);
	const firstWord = hero?.title?.split(' ')?.[0];
	const highlighted = intro?.highlighted;
	const services = intro?.services;

	console.log('introFeatureFill', introFeatureFill);
	console.log('$intro?.current?.offsetTop', $intro?.current?.offsetTop);
	console.log(
		'(scrollY ?? 0) - ($intro?.current?.offsetTop ?? 0)',
		(scrollY ?? 0) - ($intro?.current?.offsetTop ?? 0)
	);

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
			<Box mt={8} />
			<Box
				className="intro"
				ref={$intro}
				style={{ paddingTop: !!windowHeight ? windowHeight * 3 : undefined }}
			>
				<div
					className="intro-feature-wrapper"
					style={{
						position:
							typeof introY === 'number' &&
							introY <= 0 &&
							introContentPercentScrolled >= 0
								? 'fixed'
								: 'absolute',
						transform: `translateY(${
							introContentPercentScrolled <= 0 &&
							typeof introContentOffsetTop === 'number'
								? introContentOffsetTop
								: 0
						})`,
						// top: introY !== null && introY <= 0 ? `${Math.abs(introY)}px` : undefined,
					}}
				>
					<div
						className="intro-feature"
						style={{
							height: windowHeight ?? undefined,
							opacity: introFeatureOpacity,
						}}
					>
						<div style={{ transform: `translateX(0%)` }}>
							<span
								className="intro-feature-text"
								style={{
									transform: `translateX(${
										((scrollY ?? 0) -
											(($introContent?.current?.offsetTop ?? 0) +
												(windowHeight ?? 0))) *
										0.165
									}px) translateZ(0)`,
								}}
							>
								Visionary
							</span>
						</div>
						<div style={{ transform: `translateX(0%)` }}>
							<span
								className="intro-feature-text"
								style={{
									transform: `translateX(${
										(($introContent?.current?.offsetTop ?? 0) +
											(windowHeight ?? 0) -
											(scrollY ?? 0)) *
										0.165
									}px) translateZ(0)`,
									color: `rgba(255, 255, 255, ${introFeatureFill})`,
									'-webkit-text-fill-color': `rgba(255, 255, 255, ${introFeatureFill})`,
								}}
							>
								Revolutionary
							</span>
						</div>
						<div style={{ transform: `translateX(0%)` }}>
							<span
								className="intro-feature-text"
								style={{
									marginLeft: 'auto',
									transform: `translateX(${
										((scrollY ?? 0) -
											(($introContent?.current?.offsetTop ?? 0) +
												(windowHeight ?? 0))) *
										0.165
									}px) translateZ(0)`,
								}}
							>
								Innovative
							</span>
						</div>
					</div>
				</div>

				<Container
					className="intro-content"
					sx={{ py: 12 }}
					ref={$introContent}
					style={{ minHeight: windowHeight ?? undefined }}
				>
					<Grid container>
						<Grid item xs={12} lg={8}>
							<Typography sx={{ mb: 8 }} variant="h3">
								{reactStringReplace(intro?.title, highlighted, (match, i) => (
									<Box component="span" sx={{ color: 'primary.main' }}>
										{highlighted}
									</Box>
								))}
							</Typography>
							<Typography>{intro?.subtitle}</Typography>
						</Grid>
						<Grid item lg={4}>
							<img alt="Web Development" src={notepad} className="image-notepad" />
						</Grid>
					</Grid>
				</Container>
			</Box>
			<Box className="services">
				{services?.map((service: any, i: number) => (
					<React.Fragment key={i}>
						<Container>
							<Grid container alignItems="center" key={i}>
								{!service.right && (
									<Grid item lg={6}>
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
								</Grid>
								{service.right && (
									<Grid item lg={6}>
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
								Projects
							</Typography>
							<Typography>A selection of our favourite projects.</Typography>
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
							<Typography>A selection of our favourite projects.</Typography>
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
		padding: ${({ theme }) => theme.spacing(14, 0)};
		align-items: center;
	  	padding-top: ${700 * 4}px;
	  	overflow: hidden;
	  
		  .intro-content {
		    position: relative;
		    z-index: 1;
		  }

		p {
			max-width: 600px;
		}

		.image-notepad {
			max-width: 100%;
		}
	  
		.intro-feature-wrapper {
			position: absolute;
			top: 0;
		}
	  
		.intro-feature {
			position: absolute;
			opacity: 1;
		  	top: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
		  	will-change: opacity;
		  
		   > * {
			 display: inline-flex;
		   }
		  
		  	.intro-feature-text {
				font-size: 15rem;
				display: block;
				color: white;
				will-change: transform;
				letter-spacing: -2px;
				line-height: .9;
				position: relative;
				color: black;
				-webkit-text-fill-color: ${({ theme }) =>
					theme.palette.common.black}; /* Will override color (regardless of order) */
				-webkit-text-stroke-width: 3px;
				-webkit-text-stroke-color: white;
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
