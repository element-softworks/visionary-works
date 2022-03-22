import { CMSData } from '~/models/cms';

const LOCAL_URL = 'http://localhost:1337';
const PROD_URL = 'https://element-softworks-cms.herokuapp.com';

const cms = async <Data = unknown>(endpoint: string) => {
	const url = `${process.env.NODE_ENV === 'production' ? PROD_URL : LOCAL_URL}/api${
		endpoint?.charAt(0) === '/' ? endpoint : `/${endpoint}`
	}`;
	const response = await fetch(url);
	const data: CMSData<Data> = await response.json();
	return data;
};

export { cms };
