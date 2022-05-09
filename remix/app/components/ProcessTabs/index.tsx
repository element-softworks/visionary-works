import React, { useState } from "react";
import {
	Tabs, Tab, Typography, Box, Grid
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

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}


const ProcessTabs: React.FC = () => {
	const theme = useTheme();

	const [value, setValue] = useState(0);

	function a11yProps(index: number) {
		return {
			id: `vertical-tab-${index}`,
			"aria-controls": `vertical-tabpanel-${index}`
		};
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Styles>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h3" className="service-related-title">
						Our process
					</Typography>
				</Grid>
			</Grid>

			<Grid container className="process-tabs">
				<Grid item xs={4}>
					<Tabs
						orientation="vertical"
						variant="scrollable"
						value={value}
						onChange={handleChange}
						aria-label="Vertical tabs example"
						sx={{ borderRight: 1, borderColor: "divider" }}
					>
						<Tab label="Plan" {...a11yProps(0)} />
						<Tab label="Build" {...a11yProps(1)} />
						<Tab label="Inspect" {...a11yProps(2)} />
						<Tab label="Document" {...a11yProps(3)} />
						<Tab label="Deploy" {...a11yProps(4)} />
						<Tab label="Support" {...a11yProps(5)} />
					</Tabs>
				</Grid>
				<Grid item xs={8}>
					<TabPanel value={value} index={0}>
						We need to understand what is required of the API and the integrations required.
					</TabPanel>
					<TabPanel value={value} index={1}>
						Next is the labour-intensive task of developing your API, bespoke to your application.
					</TabPanel>
					<TabPanel value={value} index={2}>
						“Good enough” is not the approach here. The API has complete every task it was planned to
						do; otherwise, failures will show further down the line. Much like a complex infrastructure,
						inspection & analysis must be included to the highest degree to ensure optimum
						functionality.
					</TabPanel>
					<TabPanel value={value} index={3}>
						All teams require communication, especially when it comes to APIs. The web developer needs
						to know to use and interact with the API itself; documentation is written like a very
						detailed instruction manual.
					</TabPanel>
					<TabPanel value={value} index={4}>
						Now that everything is done right, it’s time to watch how it behaves in a live environment.
						Its process is monitored closely by the creator.
					</TabPanel>
					<TabPanel value={value} index={5}>
						We provide support after deployment has complete.
					</TabPanel>
				</Grid>
			</Grid>

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
