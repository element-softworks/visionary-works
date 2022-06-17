import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { grey } from '@mui/material/colors';
import { Link as RouterLink } from '@remix-run/react';

const Slider: React.FC = () => {
	const [sliderRef, sliderApi] = useEmblaCarousel(
		{
			loop: true,
		},
		[AutoPlay()]
	);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const handleSelect = () => {
		if (!sliderApi) return;
		setActiveIndex(sliderApi.selectedScrollSnap());
	};

	useEffect(() => {
		if (!sliderApi) return;

		setActiveIndex(sliderApi?.selectedScrollSnap());
		sliderApi.on('select', handleSelect);

		return () => {
			sliderApi.off('select', handleSelect);
		};
	}, [sliderApi]);

	const _projects = [
		{
			name: 'Live You',
			shortName: 'live-you',
			images: ['https://images.pexels.com/photos/12194751/pexels-photo-12194751.jpeg'],
			tags: [
				{ id: 1, name: 'Development' },
				{ id: 2, name: 'Design' },
				{ id: 3, name: 'Branding' },
			],
			year: '2021',
		},
		{
			name: 'Retreat East',
			shortName: 'retreat-east',
			images: ['https://images.pexels.com/photos/11908917/pexels-photo-11908917.jpeg'],
			tags: [
				{ id: 1, name: 'Development' },
				{ id: 2, name: 'Design' },
				{ id: 3, name: 'Branding' },
			],
			year: '2020',
		},
		{
			name: 'Wensum Water Retreats',
			shortName: 'wensum-water-retreats',
			images: ['https://images.pexels.com/photos/12143040/pexels-photo-12143040.jpeg'],
			tags: [
				{ id: 1, name: 'Development' },
				{ id: 2, name: 'Design' },
				{ id: 3, name: 'Branding' },
			],
			year: '2022',
		},
		{
			name: 'Greyzip',
			shortName: 'greyzip',
			images: ['https://images.pexels.com/photos/2883926/pexels-photo-2883926.jpeg'],
			tags: [
				{ id: 1, name: 'Development' },
				{ id: 2, name: 'Design' },
			],
			year: '2022',
		},
	];

	const projects = _projects.length < 6 ? [..._projects, ..._projects] : _projects;

	return (
		<Styles>
			<div ref={sliderRef} className="slider">
				<div className="slider-container">
					{projects.map((project, i) => (
						<Box
							className={`slider-item ${
								activeIndex === i ? 'slider-item-active' : ''
							}`}
							key={i}
							sx={{ height: { xs: 350, md: 540 } }}
						>
							<Stack
								component={RouterLink}
								to={project?.shortName}
								className="slider-item-content"
							>
								<Box className="slider-item-content-image">
									<Box
										component="img"
										alt={project.name}
										src={project.images[0]}
									/>
								</Box>

								<Stack className="slider-item-content-text">
									<Stack direction="row" spacing={3}>
										<Stack
											className="slider-item-content-text-tags"
											direction="row"
											component="ul"
										>
											<li>
												<Typography variant="caption">Design</Typography>
											</li>
											<li>
												<Typography variant="caption">
													Development
												</Typography>
											</li>
										</Stack>
										<Typography>2022</Typography>
									</Stack>
									<Typography className="slider-item-content-text-title">
										<b>{project?.name}</b>
									</Typography>
								</Stack>
							</Stack>
						</Box>
					))}
				</div>
			</div>
		</Styles>
	);
};

export default Slider;

const Styles = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;

	.slider {
		width: 100%;
		overflow: hidden;

		.slider-container {
			display: flex;
			padding: ${({ theme }) => `${theme.spacing(1)} 0`};
		}

		.slider-item {
			position: relative;
			flex: 0 0 50%;
			padding-right: ${({ theme }) => theme.spacing(4)};

			${({ theme }) => theme.breakpoints.up('md')} {
				flex: 0 0 33.333%;
			}

			${({ theme }) => theme.breakpoints.up('lg')} {
				flex: 0 0 25%;
			}

			.slider-item-content {
				height: 100%;
				min-height: 0;
				display: flex;
				flex-direction: column;
				text-decoration: none;

				.slider-item-content-text {
					flex: 0 1 auto;
					padding-top: ${({ theme }) => theme.spacing(2)};

					.slider-item-content-text-tags {
						list-style: none;
						flex-grow: 1;
						padding-left: 0;
						margin: 0;

						li {
							margin-top: 0;

							&:first-child {
								&::before {
									content: none;
								}
							}

							&::before {
								content: '•';
								padding-left: ${({ theme }) => theme.spacing(1)};
								padding-right: ${({ theme }) => theme.spacing(1)};
								color: ${grey['500']};
								vertical-align: middle;
							}
						}
					}
				}

				.slider-item-content-image {
					flex: 1 0 0;
					display: flex;
					flex-direction: column;
					min-height: 0;
					height: 100%;
					overflow: hidden;

					img {
						transition: ${({ theme }) => theme.transitions.create(['transform'])};
						transform: scale(1);
					}

					&:hover {
						img {
							transform: scale(1.1);
						}
					}

					img {
						object-fit: cover;
						height: 100%;
						width: 100%;
						flex: 0 1 auto;
					}
				}
			}
		}

		.slider-item-active {
		}
	}
`;
