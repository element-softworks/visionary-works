import { CMSData, CMSMedia } from "~/models/cms";

export type Team = {
	name: string;
	image: {data: CMSMedia};
	jobTitle: string;
	description: string;
	order: number;
};
