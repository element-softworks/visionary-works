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
						<Box className="slider-item" key={i}>
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
		// todo: change images to white color
		filter: invert(1);

		.slider-container {
			align-items: center;
		}

		.slider-item {
			position: relative;
			flex: 0 0 auto;
			padding: 0 60px;

			img {
				width: 100%;
				max-height: 60px;
				min-width: 125px;
			}

			${({ theme }) => theme.breakpoints.up('md')} {
				padding: 0 80px;

				img {
					max-width: 150px;
				}
			}

			svg {
				* {
					fill: ${({ theme }) => theme.palette.common.white};
				}
			}
		}
	}
`;

export default Affiliates;
