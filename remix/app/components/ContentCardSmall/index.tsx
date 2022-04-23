import React, { useEffect } from "react";
import {
	Card,
	Avatar,
	CardMedia,
	CardContent,
	Typography,
	Button,
	Box
} from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { Testimonial } from "~/models/collection/testimonial";
import { Link as RouterLink } from "remix";

import { SkipPrevious, PlayArrow, SkipNext } from "@mui/icons-material";
import { Blog } from "~/models/collection/blog";
import { format } from "date-fns";

const ContentCardSmall: React.FC<{ blog: Blog; readMore?: string; type?: 'blog' | 'projects' }> = ({ blog, readMore, type = "blog" }) => {
	const theme = useTheme();

	return (
		<Styles>
			<Card className="card">
				<CardMedia
					component="img"
					sx={{ width: "100%" }}
					image={blog?.coverImage?.data?.attributes?.url}
					alt="Live from space album cover"
				/>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<CardContent className={"card-content"}>
						<div>
							<Typography component="h5">
								{blog?.title}
							</Typography>

							<Box className="card-content-author">
								<Typography variant="subtitle1" color="text.secondary" component="p">
									{format(new Date(blog?.publishedAt), "PPPP")}
								</Typography>
							</Box>

							{!!blog?.content && <Typography variant="body1" className="card-content-text">
								{blog?.content}
							</Typography>}

							{!!blog?.content &&
								<Button className="card-content-button" variant="contained" disableElevation
								        component={RouterLink} to={`/${type}/${blog?.slug}`}>
									{readMore ?? "Read More"}
								</Button>}

						</div>

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
		flex-direction: column;
		margin-bottom: 30px;

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

			.card-content-text {
				word-break: break-word;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				line-height: 32px;
				font-size: 18px;
				max-height: 100px;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
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

export default ContentCardSmall;
