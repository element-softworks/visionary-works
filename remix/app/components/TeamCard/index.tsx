import React, { useEffect } from "react";
import {
	Card,
	Avatar,
	CardMedia,
	CardContent,
	Typography,
	Button,
	Box, Grid
} from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { Testimonial } from "~/models/collection/testimonial";
import { Link as RouterLink } from "remix";

import { format } from "date-fns";
import { CMSAuthor, CMSMedia, CMSTag } from "~/models/cms";
import { Team } from "~/models/collection/team";


const TeamMember: React.FC<{ content: Team; fullWidth: boolean }> = ({ content, fullWidth }) => {
	const theme = useTheme();

	return (
		<Styles>
			<div className={`card-wrapper ${fullWidth ? 'card-wrapper-long' : 'card-wrapper-small'}`}>
				<Card className="card" elevation={0}>
					<Grid container>
						<Grid item sm={4}>
							<CardMedia
								component="img"
								className="card-image"
								image={content?.image?.data?.attributes?.url}
								alt="Image"
							/>
						</Grid>
						<Grid item sm={8}>
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<CardContent className={"card-content"}>
									<div>
										<Typography component="h5">
											{content?.name}
										</Typography>

										<Typography component="h6">
											{content?.jobTitle}
										</Typography>

										{!!content?.description &&
											<Typography variant="body1" className="card-content-text">
												{content?.description}
											</Typography>}

										{/*{!!content?.description &&*/}
										{/*	<Button className="card-content-button" variant="contained" disableElevation*/}
										{/*	        component={RouterLink} to={`/${type}/${content?.slug}`}>*/}
										{/*		{readMore ?? "Read More"}*/}
										{/*	</Button>}*/}

									</div>
								</CardContent>
							</Box>
						</Grid>
					</Grid>
				</Card>
			</div>
		</Styles>
	);
};

const Styles = styled.div`
	.card-wrapper {
		transition: width 500ms ease-in-out;
		//width: 30%;
		width: 235px;
		overflow: hidden;
		border-radius: 15px;
		&.card-wrapper-long {
			width: 100%;	
		}
		cursor: pointer;
	}
	.card {
		min-width: 710px;
		display: flex;
		border-radius: 15px;
		flex-direction: column;
		margin-bottom: 30px;
		background: white;

		.card-image {
			height: 100%;
			width: 100%;
		}

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

			h6 {
				opacity: 0.5;
				font-weight: 900;
				margin-bottom: 5px;
			}

			.card-content-text {
				word-break: break-word;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				line-height: 28px;
				font-size: 16px;
				max-height: 256px;
				-webkit-line-clamp: 7;
				-webkit-box-orient: vertical;
				min-height: 170px;
			}

			.card-content-author {
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.card-content-button {
				margin: 20px 0 10px;
			}
		}
	}
`;

export default TeamMember;
