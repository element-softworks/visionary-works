export interface CMSData<Data = unknown> {
	data: {
		id: number;
		attributes: Data;
	};
	meta: {
		pagination: {
			page: number;
			pageCount: number;
			pageSize: number;
			total: number;
		}
	};
	error?: {
		status: number;
		name: string;
		message: string;
	};
}

export interface CMSDataList<Data = unknown> {
	data: {
		id: number;
		attributes: Data;
	}[];
	meta: {
		pagination: {
			page: number;
			pageCount: number;
			pageSize: number;
			total: number;
		}
	};
}

export interface CMSMediaDetail {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: any;
	width: number;
	height: number;
	size: number;
	url: string;
}

export interface CMSAuthor {
	id: number;
	attributes: {
		firstname: string;
		lastname: string;
		username: string;
		preferedLanguage: string;
		createdAt: string;
		updatedAt: string;
	}
}
export interface CMSTag {
	id: number;
	attributes: {
		name: string;
		createdAt: string;
		updatedAt: string;
	}
}

export interface CMSMedia {
	id: number;
	attributes: {
		name: string;
		alternativeText: string;
		caption: string;
		width: number;
		height: number;
		formats: {
			thumbnail: CMSMediaDetail;
			medium: CMSMediaDetail;
			small: CMSMediaDetail;
		} | null;
		hash: string;
		ext: string;
		mime: string;
		size: number;
		url: string;
		previewUrl: any;
		provider: "aws-s3" | string;
		provider_metadata: any;
		createdAt: string;
		updatedAt: string;
	}
}
