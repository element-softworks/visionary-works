import { CMSData } from '~/models/cms';
import { getPagesContext } from "remix-pages-context";

/*const LOCAL_URL = 'http://localhost:1337';
const PROD_URL = 'https://element-softworks-cms.herokuapp.com';
// const cmsUrl = process.env.CMS_URL;
const isProd = NODE_ENV === 'production';*/

const cms = async <Data = unknown>(endpoint: string, populate?: string) => {
	const ctx = getPagesContext();
	const basename = ctx.env.CMS_URL ?? `http://localhost:1337`;
	const url = `${basename}/api${
		endpoint?.charAt(0) === '/' ? endpoint : `/${endpoint}?populate=${populate || '*'}`
	}`;
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${ctx.env.CMS_TOKEN}`
		}
	});

	console.log({url});
	const data: CMSData<Data> = await response.json();
	return data;
};

export { cms };
