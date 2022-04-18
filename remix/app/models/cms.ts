export interface CMSData<Data = unknown> {
	data: {
		id: number;
		attributes: Data;
	}
	meta: {
		pagination: {
			page: number;
			pageCount: number;
			pageSize: number;
			total: number;
		}
	}
}

export interface CMSDataList<Data = unknown> {
	data: {
		id: number;
		attributes: Data;
	}[]
	meta: {
		pagination: {
			page: number;
			pageCount: number;
			pageSize: number;
			total: number;
		}
	}
}
