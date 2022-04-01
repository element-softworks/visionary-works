import React, {useEffect} from 'react';
import { Stack } from '@mui/material';
import styled from '@emotion/styled';

const Affiliates: React.FC = () => {
	const affiliates: { image: string; name: string }[] = [
		{
			image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
			name: 'Affiliate Name',
		},
		{
			image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
			name: 'Affiliate Name',
		},
		{
			image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
			name: 'Affiliate Name',
		},
		{
			image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
			name: 'Affiliate Name',
		},
		{
			image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
			name: 'Affiliate Name',
		},
		{
			image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
			name: 'Affiliate Name',
		},
		{
			image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
			name: 'Affiliate Name',
		},
		{
			image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
			name: 'Affiliate Name',
		},
	];

	useEffect(() => {

	}, []);

	return (
		<Styles>
			<Stack spacing={20} direction="row" component="ul">
				{[...affiliates, ...affiliates]?.map(({ image, name }, i) => (
					<li key={i}>
						<img src={image} alt={name} />
					</li>
				))}
			</Stack>
		</Styles>
	);
};

const Styles = styled.div`
	ul {
		list-style: none;
		justify-content: flex-start;
		flex-wrap: nowrap;
		white-space: nowrap;
		animation: loop linear 4s infinite;

		li {
			flex: 0 0 150px;
			margin-left: ${({ theme }) => theme.spacing(10)};

			&:nth-child(1) {
				background: red;
			}
			&:nth-child(2) {
				background: orange;
			}
			&:nth-child(3) {
				background: yellow;
			}
			&:nth-child(4) {
				background: green;
			}
			&:nth-child(5) {
				background: blue;
			}
			&:nth-child(6) {
				background: indigo;
			}
			&:nth-child(7) {
				background: violet;
			}
			&:nth-child(8) {
				background: black;
			}

			img {
				width: 100%;
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
