import { Box, Container, Grid, Typography } from '@mui/material';
import reactStringReplace from 'react-string-replace';
import notepad from '~/images/notepad.png';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const Intro: React.FC<{ data: any }> = ({ data: { title, subtitle, highlighted } }) => {
	const [windowHeight, setWindowHeight] = useState<number | null>(null);
	const [scrollY, setScrollY] = useState<number | null>(null);
	const [introY, setIntroY] = useState<number | null>(null);
	const [introHeight, setIntroHeight] = useState<number | null>(null);
	const [introContentY, setIntroContentY] = useState<number | null>(null);
	const [introContentHeight, setIntroContentHeight] = useState<number | null>(null);
	const [introContentOffsetTop, setIntroContentOffsetTop] = useState<number | null>(null);
	const $intro = useRef<HTMLDivElement>(null);
	const $introContentWrapper = useRef<HTMLDivElement>(null);
	const $introContent = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.addEventListener('scroll', handleRecalculate);
		window.addEventListener('resize', handleRecalculate);
		handleRecalculate();

		return () => {
			window.removeEventListener('scroll', handleRecalculate);
		};
	}, []);

	const handleRecalculate = () => {
		setIntroContentY($introContentWrapper?.current?.getBoundingClientRect?.()?.top ?? 0);
		setWindowHeight(window.innerHeight);
		setScrollY(window.scrollY);
		setIntroY($intro?.current?.getBoundingClientRect?.()?.top ?? 0);
		setIntroHeight($intro?.current?.offsetHeight ?? 0);
		setIntroContentHeight($introContentWrapper?.current?.offsetHeight ?? 0);
		setIntroContentOffsetTop($introContentWrapper?.current?.offsetTop ?? 0);
	};

	const introContentPercentScrolled = (introContentY ?? 0) / (introContentHeight ?? 0);
	const introFeatureOpacity =
		1 - ((scrollY ?? 0) - (introContentY ?? 0)) / (introHeight ?? 0) + 0.2;
	const introFeatureFill =
		1 -
		((windowHeight ?? 0) - ((scrollY ?? 0) - (introContentOffsetTop ?? 0))) /
			(introContentOffsetTop ?? 0);

	console.log({
		introContentY,
		windowHeight,
		introContentHeight,
		introContentOffsetTop,
		'(windowHeight - introContentHeight)': windowHeight - introContentHeight,
		calc: introContentY - (windowHeight - introContentHeight) / 2,
	});

	return (
		<Styled>
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
								? `${introContentOffsetTop}px`
								: 0
						})`,
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
									WebkitTextFillColor: `rgba(255, 255, 255, ${introFeatureFill})`,
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
					ref={$introContentWrapper}
					style={{ minHeight: windowHeight ?? undefined }}
				>
					<Grid container ref={$introContent}>
						<Grid item xs={12} lg={8}>
							<Typography sx={{ mb: 8 }} variant="h3">
								{reactStringReplace(title, highlighted, (match, i) => (
									<Box component="span" sx={{ color: 'primary.main' }}>
										{highlighted}
									</Box>
								))}
							</Typography>
							<Typography>{subtitle}</Typography>
						</Grid>
						<Grid item lg={4}>
							<img alt="Web Development" src={notepad} className="image-notepad" />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Styled>
	);
};

export default Intro;

const Styled = styled.div`
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
			display: flex;
			align-items: center;
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
				line-height: 0.9;
				position: relative;
				color: black;
				-webkit-text-fill-color: ${({ theme }) =>
					theme.palette.common.black}; /* Will override color (regardless of order) */
				-webkit-text-stroke-width: 3px;
				-webkit-text-stroke-color: white;
			}
		}
	}
`;
