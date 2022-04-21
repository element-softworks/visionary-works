import { CMSData, CMSMedia } from "~/models/cms";

export type Homepage = {
	hero: {
		title: string;
		subtitle: string;
		cta: string;
		logos: CMSMedia[];
	}
};
