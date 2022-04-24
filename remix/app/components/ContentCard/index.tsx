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
import { Link as RouterLink } from 'remix';

import { SkipPrevious, PlayArrow, SkipNext } from "@mui/icons-material";
import { Blog } from "~/models/collection/blog";
import { format } from "date-fns";

const ContentCard: React.FC<{ testimonial?: Testimonial; blog?: Blog; readMore?: string }> = ({ testimonial, blog, readMore}) => {
	const theme = useTheme();

	return (
		<Styles>
			<Card className="card">
				<CardMedia
					component="img"
					sx={{ width: 300, height: 450 }}
					image={!!blog ? blog?.coverImage?.data?.attributes?.url : testimonial?.image?.data?.attributes?.url}
					alt="Live from space album cover"
				/>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<CardContent className={"card-content"}>
						<div>
							<Typography component="h5">
								{blog ? blog?.title : testimonial?.feedback}
							</Typography>

							{!!blog?.content && <Typography variant="body1" className="card-content-text">
								{blog ? blog?.content : testimonial?.feedback}
							</Typography>}

							{!!blog?.content && <Button className="card-content-button" variant="contained" disableElevation component={RouterLink} to={`/blog/${blog?.slug}`}>
								{readMore ?? 'More'}
							</Button>}

						</div>

						<Box className="card-content-author">
							<Avatar>
								{`${blog ? blog?.author?.data?.attributes?.firstname : testimonial?.name}`?.charAt(0)}<br />
							</Avatar>
							<Typography variant="subtitle1" color="text.secondary" component="p">
								{blog ? `${blog?.author?.data?.attributes?.firstname} ${blog?.author?.data?.attributes?.lastname}` : testimonial?.name}<br />
								{blog ? format(new Date(blog?.publishedAt), "PPPP"): testimonial?.company}
							</Typography>
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

			.card-content-text {
				word-break: break-word;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				line-height: 32px;
				font-size: 18px;
				max-height: 190px;
				-webkit-line-clamp: 5;
				-webkit-box-orient: vertical;
			}
			
			.card-content-author {
				display: flex;
				flex-direction: row;
				align-items: center;
				
				p {
					margin-left: 10px;
				}
			}
			
			.card-content-button {
				margin-top: 10px;
			}
		}
	}
`;

export default ContentCard;
