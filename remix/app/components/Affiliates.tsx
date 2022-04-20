import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import styled from '@emotion/styled';

const Affiliates: React.FC<{logos: {attributes: { name: string, url: string }}[]}> = ({ logos }) => {
	useEffect(() => {}, []);

	return (
		<Styles>
			<Stack spacing={20} direction="row" component="ul">
				{logos?.map((logo , i) => (
					<li key={i}>
						<img alt={logo.attributes?.name} src={logo.attributes?.url} />
					</li>
				))}
			</Stack>
		</Styles>
	);
};

const Styles = styled.div`
	max-width: 100%;
	overflow: hidden;
	ul {
		list-style: none;
		justify-content: flex-start;
		flex-wrap: nowrap;
		white-space: nowrap;
		animation: loop linear 4s infinite;
		
		li {
			flex: 0 0 150px;
			margin-left: ${({ theme }) => theme.spacing(10)};

			img {
				width: 100%;
				max-height: 50px;
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
