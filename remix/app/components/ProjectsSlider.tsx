import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

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
							sx={{ height: 450 }}
						>
							<Box
								component="img"
								alt={project.name}
								src={project.images[0]}
								sx={{ height: '100%', width: '100%' }}
							/>
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
		}

		.slider-item-active {
		}
	}
`;
