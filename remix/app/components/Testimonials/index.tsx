import { json, LoaderFunction, useLoaderData, Link as RouterLink, MetaFunction } from "remix";
import { Box, Button, Container, Grid, Link, Stack, Typography } from "@mui/material";
import { cms } from "~/utils/cms.server";
import React from "react";
import styled from "@emotion/styled";
import { getSeoMeta } from "~/seo";
import { CMSDataList } from "~/models/cms";
import { Testimonial as TestimonialType } from "~/models/testimonial";
import Testimonial from "~/components/Testimonial";

type Data = {
	testimonials: CMSDataList<TestimonialType[]>;
};

export const meta: MetaFunction = () => ({ ...getSeoMeta(), title: "Visionary Works2" });

export const loader: LoaderFunction = async () => {
	console.log("test");
	const testimonials = await cms("testimonials");

	console.log({ testimonialsLoader: testimonials });

	return json({ testimonials });
};

const Testimonials: React.FC<{ testimonials: CMSDataList<TestimonialType> }> = ({ testimonials }) => {
	// const test = useLoaderData();
	console.log({ testimonials });

	return (
		<Styles>
			<Container maxWidth={false}>
				<Grid container spacing={2}>
					{testimonials?.data?.map((testimonial, i) =>
						<Grid item sm={6} key={i}>
							<Testimonial testimonial={testimonial.attributes} />
						</Grid>
					)}
				</Grid>
			</Container>
		</Styles>
	);
};

const Styles = styled.div`
	margin: ${({ theme }) => theme.spacing(2, 0)}
`;

export default Testimonials;
