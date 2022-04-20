import { CMSData, CMSMedia } from "~/models/cms";

export interface Service {
	id: number;
	title: string;
	description: string;
	right?: boolean;
}

export type Homepage = {
	hero: {
		title: string;
		subtitle: string;
		cta: string;
		logos: {
			data: CMSMedia[];
		}
	}
	intro: {
		id: number;
		title: string;
		subtitle: string;
		highlighted: string;
		services: Service[];
	}
};
