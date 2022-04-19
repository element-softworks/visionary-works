import { CMSData } from '~/models/cms';

/*const LOCAL_URL = 'http://localhost:1337';
const PROD_URL = 'https://element-softworks-cms.herokuapp.com';
// const cmsUrl = process.env.CMS_URL;
const isProd = NODE_ENV === 'production';*/

const token = `9af5ba667433f853a4338be8ba6d7d9f1f1a399848ed4108b350ca29645328e0e3d731cb6984708b8dcebf8e2bda62158d0ed54c6324bbaffb2ee357738a11a8611a9f331baf60aec8dc8bd938b67baa76e7509a218eeae4a71ed83f84d2c6ff07736d7b80eedabddc12c01531fc1af563f4111e4bec7a5ec0c5b8480304a214`;

const cms = async <Data = unknown>(endpoint: string) => {
	const url = `${`http://localhost:1337/`}api${
		endpoint?.charAt(0) === '/' ? endpoint : `/${endpoint}?populate=*`
	}`;
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	console.log({url});
	const data: CMSData<Data> = await response.json();
	return data;
};

export { cms };
