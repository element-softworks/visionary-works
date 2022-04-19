import React, { useEffect } from "react";
import {
	Card,
	Avatar,
	Stack,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	IconButton,
	Container,
	Grid
} from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import wave2 from "~/images/wave2.svg";

const Team: React.FC<{}> = ({}) => {
	const theme = useTheme();

	return (
		<Styles>
			<Container>

				<Box className="image-wave2">
					<img alt="wave" src={wave2} />
				</Box>
				<Grid container>
					<Grid item xs={6}>
						<Typography component="h2">
							Ready to start your
							next big project?
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Styles>
	);
};

const Styles = styled.div`
	padding: ${({ theme }) => theme.spacing(10)};
	h2 {
		font-size: 4rem;
		font-weight: bold;
		line-height: 1.3;
	}

	.image-wave2 {
		max-width: 100%;
		overflow-x: hidden;
		img {
			max-width: 150%;
			margin: ${({ theme }) => theme.spacing(-2, -6)}
		}
	}
`;

export default Team;
