import { CMSAuthor, CMSData, CMSMedia, CMSTag } from "~/models/cms";

export type Blog = {
	title: string;
	content: any;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	coverImage: {data: CMSMedia};
	author: {data: CMSAuthor};
	tags: {data: CMSTag[]};
};
