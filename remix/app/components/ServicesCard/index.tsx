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
import { Service } from "~/models/collection/service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-common-types";

const ServicesCard: React.FC<{ content: Service; }> = ({ content }) => {
	const theme = useTheme();

	console.log({content});
	return (
		<Styles>
			<Card className="card">
				{/*<CardMedia*/}
				{/*	component="img"*/}
				{/*	sx={{ width: "100%" }}*/}
				{/*	image={content?.coverImage?.data?.attributes?.url}*/}
				{/*	alt="Image"*/}
				{/*/>*/}
				<Box className="card-background">
					{!!content?.icon &&

						<FontAwesomeIcon icon={[content?.slug === 'e-commerce' ? 'fab' : "fad", content?.icon as IconName]} />}
				</Box>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<CardContent className={"card-content"}>
						<div>
							<Typography component="h5">
								{content?.title}
							</Typography>

							{/*{content?.publishedAt && <Box className="card-content-author">*/}
							{/*	<Typography variant="subtitle1" color="text.secondary" component="p">*/}
							{/*		{format(new Date(content?.publishedAt), "PPPP")}*/}
							{/*	</Typography>*/}
							{/*</Box>}*/}

							{!!content?.subtitle && <Typography variant="body1" className="card-content-text">
								{content?.subtitle}
							</Typography>}

							{!!content?.content &&
								<Button className="card-content-button" variant="contained" disableElevation
								        component={RouterLink} to={`/services/${content?.slug}`}>
									Read More
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
		
		.card-background {
			background: #00e6f740;
			border-radius: 10px;

			svg {
				font-size: 100px;
				padding: 100px 0;
				text-align: center;
				width: 100%;
			}
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

			.card-content-text {
				word-break: break-word;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				line-height: 32px;
				font-size: 15px;
				max-height: 100px;
				min-height: 100px;
				-webkit-line-clamp: 4;
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

export default ServicesCard;
