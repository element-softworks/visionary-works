import { CMSData, CMSMedia } from "~/models/cms";

export type About = {
	title: string;
	heroImage: {data: CMSMedia};
	heroText: string;
	services: {
		title: string;
		description: string;
		list: {
			title: string;
			description: string;
			image: {data: CMSMedia};
		}[]
	}
};
