import { CMSAuthor, CMSData, CMSMedia, CMSTag } from "~/models/cms";

export type Service = {
	title: string;
	subtitle: string;
	content: any;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	coverImage: {data: CMSMedia};
	author: {data: CMSAuthor};
	tag: {data: CMSTag};
};

