import React  from "react";
import {
	Typography,
	Grid, Container
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import Styles from './style';

const Header: React.FC<{ title: string }> = ({ title }) => {
	const theme = useTheme();

	return (
		<Styles theme={theme}>
			<Container>
				<Grid container>
					<Grid item lg={6}>
						<Typography variant="h1">{title}</Typography>
					</Grid>
				</Grid>
			</Container>
		</Styles>
	);
};

export default Header;
