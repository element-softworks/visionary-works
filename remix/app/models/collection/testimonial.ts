import { CMSData, CMSMedia } from "~/models/cms";

export type Testimonial = {
	feedback: string;
	image: {data: CMSMedia};
	company: string;
	name: string;
};
