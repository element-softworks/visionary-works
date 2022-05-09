import React, { useState } from "react";
import {
	Tabs, Tab, Typography, Box, Grid, Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}


const ProcessTabs: React.FC = () => {
	const theme = useTheme();

	return (
		<Styles>
			<div>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>What is React.js?</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
							malesuada lacus ex, sit amet blandit leo lobortis eget.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography>What is a website?</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
							malesuada lacus ex, sit amet blandit leo lobortis eget.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel3a-content"
						id="panel3a-header"
					>
						<Typography>How important is SEO??</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
							malesuada lacus ex, sit amet blandit leo lobortis eget.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</div>


		</Styles>
	);
};

const Styles = styled.div`
	//flex-grow: 1;
	////background-color: 'background.paper',
	//display: flex;
	//height: 400px;
	padding: 100px 0;

	.process-tabs {

	}

`;

export default ProcessTabs;
