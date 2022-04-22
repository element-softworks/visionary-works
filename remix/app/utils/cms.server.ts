import { CMSData } from '~/models/cms';
import { getPagesContext } from 'remix-pages-context';

/*const LOCAL_URL = 'http://localhost:1337';
const PROD_URL = 'https://element-softworks-cms.herokuapp.com';
// const cmsUrl = process.env.CMS_URL;
const isProd = NODE_ENV === 'production';*/

const cms = async <Data = unknown>(endpoint: string, populate?: string[]) => {
	const ctx = getPagesContext();
	const basename = ctx.env.CMS_URL ?? `http://localhost:1337`;
	const url = `${basename}/api${
		endpoint?.charAt(0) === '/'
			? endpoint
			: `/${endpoint}?populate=${populate?.join('&populate=') ?? '*'}`
	}`;

	const response = await fetch(url, {
		headers: new Headers({
			'Cache-Control': 'max-age=3600',
			...(ctx?.env?.CMS_TOKEN
				? {
						Authorization: `Bearer ${ctx?.env?.CMS_TOKEN}`,
				  }
				: {}),
		}),
	});
	const data: CMSData<Data> = await response.json();

	console.log({ error: data.error }, url);
	if (data?.error && ctx.env.BYPASS_CMS_CONNECTION === 'true') {
		return { data: { attributes: {} } };
	}

	if (data?.error && ctx.env.BYPASS_CMS_CONNECTION !== 'true') {
		if (data?.error?.name === 'NotFoundError') {
			throw {
				...(data?.error ?? {}),
				message: `CMS data for ${url} could not be found.`,
			};
		}

		throw data.error;
	}

	return data;
};

export { cms };
