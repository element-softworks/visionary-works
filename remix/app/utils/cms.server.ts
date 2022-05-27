import { CMSData } from '~/models/cms';

/*const LOCAL_URL = 'http://localhost:1337';
const PROD_URL = 'https://element-softworks-cms.herokuapp.com';
// const cmsUrl = process.env.CMS_URL;
const isProd = NODE_ENV === 'production';*/

const cms = async <Data = unknown>(
	endpoint: string,
	populate?: string[] | null,
	filter?: string
) => {
	const basename = process.env.CMS_URL ?? `http://localhost:1337`;
	const url = `${basename}/api${
		endpoint?.charAt(0) === '/'
			? endpoint
			: `/${endpoint}${!!filter ? filter : ''}${
					populate === null
						? ''
						: `${!!filter ? '&' : '?'}populate=${populate?.join('&populate=') ?? '*'}`
			  }`
	}`;

	const response = await fetch(url, {
		headers: new Headers({
			'Cache-Control': 'max-age=3600',
		}),
	});
	const data: CMSData<Data> = await response.json();

	console.log({ error: !!data.error ? data.error : 'No error' }, url);

	if (data?.error && process.env.BYPASS_CMS_CONNECTION === 'true') {
		return { data: { attributes: {} } };
	}

	if (data?.error && process.env.BYPASS_CMS_CONNECTION !== 'true') {
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
