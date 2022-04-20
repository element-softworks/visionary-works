import React, { useEffect } from "react";
import { Card, Avatar, Stack, CardMedia, CardContent, Typography, CardActions, Button, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { Testimonial } from "~/models/collection/testimonial";

import { SkipPrevious, PlayArrow, SkipNext } from "@mui/icons-material";

const ContentCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
	const theme = useTheme();

	return (
		<Styles>
			<Card className="card">
				<CardMedia
					component="img"
					sx={{ width: 300, height: 450 }}
					image={`http://localhost:1337${testimonial?.image?.data?.attributes?.url}`}
					alt="Live from space album cover"
				/>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<CardContent className={"card-content"}>
						<Typography component="h5">
							{testimonial.feedback}
						</Typography>

						<Box className="card-content-author">
							<Typography variant="subtitle1" color="text.secondary" component="p">
								{testimonial.name}<br />
								{testimonial.company}
							</Typography>
							<Avatar>H</Avatar>
						</Box>
					</CardContent>
				</Box>
			</Card>
		</Styles>
	);
};

const Styles = styled.div`
	.card {
		display: flex;
		border-radius: 15px;

		.card-content {
			padding: ${({ theme }) => theme.spacing(5)};
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			h5 {
				font-size: 1.5rem;
				font-weight: bold;
			}
			
			.card-content-author {
				justify-content: space-between;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		}
	}
`;

export default ContentCard;
