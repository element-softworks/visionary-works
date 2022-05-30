import React, { useEffect, useState } from "react";
import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { Testimonial } from "~/models/collection/testimonial";

import { SkipPrevious, PlayArrow, SkipNext } from "@mui/icons-material";
import { Homepage } from "~/models/single/homepage";

const Faqs: React.FC<{ faqs?: Homepage["faq"], title: string, image: Homepage["faqImage"] }> = ({ faqs, title, image }) => {
	const theme = useTheme();
	const [expanded, setExpanded] = useState<string | null>(null);

	const handleChange = (panel: any) => (event: any, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Styles>
			<Grid container alignItems="center">
				<Grid item md={6}>
					<Typography sx={{ mb: 2 }} variant="h3" className="faq-title">
						{title}
					</Typography>
					{faqs?.map((faq, i: number) =>
						<Accordion expanded={expanded === `question-${i}`} key={i}
						           onChange={handleChange(`question-${i}`)} className="accordion">
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls={`question-${i}-content`}
								id={`question-${i}-header`}
							>
								<Typography><b>{faq?.question}</b></Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									{faq?.answer}
								</Typography>
							</AccordionDetails>
						</Accordion>
					)}
				</Grid>
				<Grid item md={6}>
					<img alt="FAQ Icon" src={image?.data?.attributes?.url} />
				</Grid>
			</Grid>
		</Styles>
	);
};

const Styles = styled.div`
	padding: ${({ theme }) => theme.spacing(10, 0)};

	.faq-title {
		color: ${({ theme }) => theme.palette.primary.main};
	}
	
	.accordion {
		background-color: ${({ theme }) => theme.palette.text.secondary};
		color: white;
	}
	
	img {
		max-width: 100%;
	}
`;

export default Faqs;
