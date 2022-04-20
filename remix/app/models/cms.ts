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

export interface CMSImageDetail {
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

export interface CMSImage {
	data: {
		id: number,
		attributes: {
			name: string;
			alternativeText: string;
			caption: string;
			width: number;
			height: number;
			formats: {
				thumbnail: CMSImageDetail;
				medium: CMSImageDetail;
				small: CMSImageDetail;
			},
			hash: string;
			ext: string;
			mime: string;
			size: number;
			url: string;
			previewUrl: any;
			provider: string;
			provider_metadata: any;
			createdAt: string;
			updatedAt: string;
		}
	};
}
