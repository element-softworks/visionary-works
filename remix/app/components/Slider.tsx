import React from 'react';
import { Box, IconButton } from '@mui/material';
import useDimensions from '~/helpers/hooks/useDimensions';
import styled from '@emotion/styled';
import { ArrowRight } from '@mui/icons-material';

const Slider: React.FC<{
	step: number;
	onNextStep: (newStep: number) => void;
	width?: number;
	children: React.ReactNode;
}> = ({ children, step, onNextStep, width = 33.333333 }) => {
	const [$slider, { offsetWidth }] = useDimensions();
	const totalSteps = React.Children.count(children) - 1;
	const _slides = React.Children.map(children, (child, i) => (
		<Box className="slider-item" key={i} style={{ width: `${width}%` }}>
			{child}
		</Box>
	));
	const slides = _slides?.reduce(
		(acc: React.ReactNode[], curr: React.ReactNode, i) => [
			...acc,
			...(i === 0 || i === totalSteps - 1
				? [
						<Box className="slider-item" key={i} style={{ width: `${width}%` }}>
							{React.Children.toArray(children)?.[i === 0 ? totalSteps - 1 : 0]}
						</Box>,
						curr,
				  ]
				: [curr]),
		],
		[]
	);

	console.log({ slides });

	// const handleNext = () => {};

	return (
		<Styles>
			<div ref={$slider}>
				<Box className="slider-container">
					<Box
						className={`slider-content`}
						style={{
							transform: `translateX(-${(offsetWidth / 100) * width * step}px)`,
						}}
					>
						{slides}
					</Box>

					<IconButton onClick={() => onNextStep(step === totalSteps ? 0 : step + 1)}>
						<ArrowRight />
					</IconButton>
				</Box>
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
	align-items: end;

	${({ theme }) => theme.breakpoints.down('md')} {
		width: calc(100% + ${({ theme }) => theme.spacing(2)});
		margin-left: -${({ theme }) => theme.spacing(1)};
	}

	.slider-container {
		overflow-y: hidden;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;

		&::-webkit-scrollbar {
			-webkit-appearance: none !important;
			display: none !important;
		}

		${({ theme }) => theme.breakpoints.up('lg')} {
			overflow-x: hidden;
		}

		.slider-content {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			width: 100%;
			will-change: transform;
			transition: ${({ theme }) =>
				theme.transitions.create('transform', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				})};

			.slider-item {
				transition: transform 300ms linear;
				width: 33.333333%;
				padding-left: ${({ theme }) => theme.spacing(1)};
				padding-right: ${({ theme }) => theme.spacing(1)};
				grid-row: 1;
				flex: 0 0 auto;

				> *:first-of-type {
					height: 100%;
					margin-bottom: 0;
				}
			}
		}
	}

	${({ theme }) => theme.breakpoints.up('lg')} {
		.slider-outer-container {
			.slider-item-container {
				padding: ${({ theme }) => theme.spacing(0, 2, 0, 0)};
			}
		}
	}
`;
