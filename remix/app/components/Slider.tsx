import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ArrowForward, ArrowRight } from '@mui/icons-material';
import { Swiper as SwiperClass } from 'swiper/types';

const Slider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const $next = useRef(null);
	const [swiper, setSwiper] = useState<SwiperClass | null>(null);
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up('md'));
	const lg = useMediaQuery(theme.breakpoints.up('lg'));

	return (
		<Styles>
			{/*<Swiper*/}
			{/*	className="swiper-container"*/}
			{/*	spaceBetween={100}*/}
			{/*	// slidesPerView={lg ? "auto" : md ? 1.5 : 1.25}*/}
			{/*	slidesPerView="auto"*/}
			{/*	centeredSlides={md}*/}
			{/*	loop*/}
			{/*	autoplay*/}
			{/*	onSlideChange={() => console.log('slide change')}*/}
			{/*	onSwiper={(swiper) => setSwiper(swiper)}*/}
			{/*	navigation={{*/}
			{/*		nextEl: '.slider-next',*/}
			{/*	}}*/}
			{/*	// onSlideChangeTransitionStart={(swiper) => swiper.slideTo()}*/}
			{/*>*/}
			{/*	{React.Children.map(children, (child, i) => (*/}
			{/*		<SwiperSlide key={i}>{child}</SwiperSlide>*/}
			{/*	))}*/}

			{/*	<IconButton*/}
			{/*		size="large"*/}
			{/*		color="inherit"*/}
			{/*		ref={$next}*/}
			{/*		className="slider-next"*/}
			{/*		onClick={() => swiper?.slideNext()}*/}
			{/*	>*/}
			{/*		<ArrowForward />*/}
			{/*	</IconButton>*/}
			{/*</Swiper>*/}
		</Styles>
	);
};

export default Slider;

const Styles = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;

	.swiper-container {
		//height: calc(432 * (16rem / 750));
		padding: 0 12px;
		overflow: hidden;
		width: 100%;
		position: relative;

		.slider-next {
			position: absolute;
			right: 15%;
			top: 50%;
			transform: translateY(-50%);
			z-index: 1;
			background: ${({ theme }) => theme.palette.primary.main};
			color: ${({ theme }) => theme.palette.common.white};
		}

		.swiper-slide {
			position: relative;
			width: 70%;
			max-width: 1000px;
			//height: calc(432 * (16rem / 750));
			overflow: hidden;
			opacity: 0.3;
			transition: opacity 0.5s ease-out;
			
			&.swiper-slide-active {
				opacity: 1;
			}
		}
	}
`;
