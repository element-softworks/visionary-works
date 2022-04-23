import { CMSAuthor, CMSData, CMSMedia } from "~/models/cms";

export type Blog = {
	title: string;
	content: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	coverImage: {data: CMSMedia};
	author: {data: CMSAuthor};
};
