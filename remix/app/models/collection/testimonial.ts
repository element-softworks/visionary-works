import { CMSData, CMSMedia } from "~/models/cms";

export type Testimonial = {
	feedback: string;
	image: CMSMedia;
	company: string;
	name: string;
};
