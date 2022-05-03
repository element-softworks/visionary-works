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

import { format } from "date-fns";
import { CMSAuthor, CMSMedia, CMSTag } from "~/models/cms";

export type Content = {
	title: string;
	content: any;
	slug: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
	coverImage: {data: CMSMedia};
	author?: {data: CMSAuthor};
	tags?: {data: CMSTag[]};
};

const ContentCardSmall: React.FC<{ content: Content; readMore?: string; type?: 'blog' | 'projects' | 'services' | 'team' }> = ({ content, readMore, type = "blog" }) => {
	const theme = useTheme();

	return (
		<Styles>
			<Card className="card">
				<CardMedia
					component="img"
					sx={{ width: "100%" }}
					image={content?.coverImage?.data?.attributes?.url}
					alt="Image"
				/>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<CardContent className={"card-content"}>
						<div>
							<Typography component="h5">
								{content?.title}
							</Typography>

							{content?.publishedAt && <Box className="card-content-author">
								<Typography variant="subtitle1" color="text.secondary" component="p">
									{format(new Date(content?.publishedAt), "PPPP")}
								</Typography>
							</Box>}

							{!!content?.content && <Typography variant="body1" className="card-content-text">
								{content?.content}
							</Typography>}

							{!!content?.content &&
								<Button className="card-content-button" variant="contained" disableElevation
								        component={RouterLink} to={`/${type}/${content?.slug}`}>
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
		background: white;
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
