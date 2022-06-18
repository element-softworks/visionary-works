import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import useEmblaCarousel from 'embla-carousel-react';

const Slider: React.FC<{
	children: React.ReactNode;
}> = ({ children: _children }) => {
	const [sliderRef, sliderApi] = useEmblaCarousel({
		align: 'center',
		loop: true,
	});
	const $next = useRef(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const scrollNext = useCallback(() => {
		if (sliderApi) {
			sliderApi.scrollNext();
		}
	}, [sliderApi]);

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

	const children = useMemo(
		() =>
			React.Children.count(_children) < 3
				? [...React.Children.toArray(_children), ...React.Children.toArray(_children)]
				: _children,
		[_children]
	);

	return (
		<Styles>
			<div ref={sliderRef} className="slider">
				<div className="slider-container">
					{React.Children.map(children, (child, i) => (
						<div
							className={`slider-item ${
								activeIndex === i ? 'slider-item-active' : ''
							}`}
							key={i}
						>
							{child}
						</div>
					))}
				</div>

				<IconButton
					size="large"
					color="primary"
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
			opacity: 0.5;
			position: relative;
			flex: 0 0 87.5%;
			padding-right: ${({ theme }) => theme.spacing(4)};
			transition: ${({ theme }) => theme.transitions.create(['opacity'])};

			${({ theme }) => theme.breakpoints.up('md')} {
				flex: 0 0 75%;
			}

			${({ theme }) => theme.breakpoints.up('lg')} {
				flex: 0 0 50%;
			}
		}

		.slider-item-active {
			opacity: 1;
		}

		.slider-next {
			position: absolute;
			left: 93.75%;
			top: 50%;
			transform: translateY(-50%) translateX(-50%);

			${({ theme }) => theme.breakpoints.up('md')} {
				left: 87.5%;
			}

			${({ theme }) => theme.breakpoints.up('lg')} {
				left: 75%;
			}
		}
	}
`;
