import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import styled from '@emotion/styled';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Box } from '@mui/system';

const autoplay = Autoplay();

const Affiliates: React.FC<{ logos: { attributes: { name: string; url: string } }[] }> = ({
	logos,
}) => {
	const [sliderRef] = useEmblaCarousel(
		{
			align: 'start',
			loop: true,
		},
		[autoplay]
	);

	const _logos = [...logos, ...logos];

	return (
		<Styles>
			<Box className="slider" ref={sliderRef} sx={{ overflow: 'hidden' }}>
				<Box className="slider-container" sx={{ display: 'flex' }}>
					{_logos?.map((logo, i) => (
						<Box
							className="slider-item"
							sx={{ position: 'relative', flex: '0 0 150px', padding: '0 80px' }}
							key={i}
						>
							<img alt={logo.attributes?.name} src={logo.attributes?.url} />
						</Box>
					))}
				</Box>
			</Box>
		</Styles>
	);
};

const Styles = styled.div`
	margin-top: auto;
	padding-bottom: ${({ theme }) => theme.spacing(4)};

	.slider {
		.slider-container {
			align-items: center;
		}

		.slider-item {
			img {
				width: 100%;
				max-height: 80px;
				min-width: 200px;
				padding: 0 40px;
			}

			svg {
				* {
					fill: black;
				}
			}
		}
	}
`;

export default Affiliates;
