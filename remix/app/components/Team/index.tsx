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
import { Homepage } from "~/models/single/homepage";

const TeamSection: React.FC<{team: Homepage["team"]}> = ({team}) => {
	const theme = useTheme();

	return (
		<Styles>
			<Container>
				<Grid container alignItems="center">
					<Grid item xs={5}>
						<Typography component="h2" className="team-title">
							{team?.title}
						</Typography>
						<Typography component="p" className="team-paragraph">
							{team?.description}
						</Typography>
						<Button variant="contained" disableElevation>
							{team?.button}
						</Button>
					</Grid>
					<Grid item xs={1}>
					</Grid>
					<Grid item xs={6}>
						<img alt="Team photo" className="team-image" src={team?.image?.data?.attributes?.url} />
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
	
	.team-title {
		font-size: 3.5rem;
		margin-top: ${({ theme }) => theme.spacing(2)};
	}
	.team-image {
		max-width: 100%;
	}
	
	.team-paragraph {
		max-width: 390px;
		margin: ${({ theme }) => theme.spacing(3, 0)};
	}
`;

export default TeamSection;
