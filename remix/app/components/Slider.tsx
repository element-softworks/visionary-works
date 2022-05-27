import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ArrowForward, ArrowRight } from '@mui/icons-material';
import useEmblaCarousel from 'embla-carousel-react';

const Slider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [sliderRef, sliderApi] = useEmblaCarousel({
		align: 'center',
		loop: true,
	});
	const $next = useRef(null);
	// const [swiper, setSwiper] = useState<SwiperClass | null>(null);
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up('md'));
	const lg = useMediaQuery(theme.breakpoints.up('lg'));

	const scrollNext = useCallback(() => {
		if (sliderApi) sliderApi.scrollNext();
	}, [sliderApi]);

	// const activeSlideNode = useMemo(() => {
	// 	if (sliderApi) return sliderApi.slideNodes()?.[];
	// 	return null;
	// }, [sliderApi]);

	const handleSelect = (event: any) => {
		console.log('event select:', event);
	};

	useEffect(() => {
		if (!sliderApi) return;

		sliderApi.on('select', handleSelect);

		return () => {
			sliderApi.off('select', handleSelect);
		};
	}, [sliderApi]);

	return (
		<Styles>
			<div ref={sliderRef} className="slider">
				<div className="slider-container">
					{React.Children.map(children, (child, i) => (
						<div className="slider-item" key={i}>
							{child}
						</div>
					))}
				</div>

				<IconButton
					size="large"
					color="inherit"
					ref={$next}
					className="slider-next"
					onClick={scrollNext}
				>
					<ArrowForward />
				</IconButton>
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
		overflow: hidden;

		.slider-container {
			display: flex;
			padding: ${({ theme }) => `${theme.spacing(1)} 0`};
		}

		.slider-item {
			position: relative;
			flex: 0 0 87.5%;
			padding-right: ${({ theme }) => theme.spacing(4)};

			${({ theme }) => theme.breakpoints.up('md')} {
				flex: 0 0 75%;
			}

			${({ theme }) => theme.breakpoints.up('lg')} {
				flex: 0 0 50%;
			}
		}

		.slider-next {
			position: absolute;
			left: 93.75%;
			top: 50%;
			transform: translateY(-50%) translateX(-50%);
			background: ${({ theme }) => theme.palette.primary.main};
			color: ${({ theme }) => theme.palette.common.white};

			${({ theme }) => theme.breakpoints.up('md')} {
				left: 87.5%;
			}

			${({ theme }) => theme.breakpoints.up('lg')} {
				left: 75%;
			}
		}
	}
`;
