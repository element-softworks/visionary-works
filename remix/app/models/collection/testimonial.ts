import { CMSData, CMSImage } from "~/models/cms";

export type Testimonial = {
	feedback: string;
	image: CMSImage;
	company: string;
	name: string;
};
