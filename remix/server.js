import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import { createCloudflareKVSessionStorage } from '@remix-run/cloudflare';
import * as build from '@remix-run/dev/server-build';

const handleRequest = createPagesFunctionHandler({
	build,
	mode: process.env.NODE_ENV,
	getLoadContext: ({ data, env }) => {
		const sessionStorage = createCloudflareKVSessionStorage({
			cookie: {
				name: '__session',
				secrets: ['v#nugZ.a/gB=OV|rO5Q7'],
				secure: true,
				sameSite: 'strict',
			},
			kv: env.sessionStorage,
		});

		return { sessionStorage, env };
	},
});

export function onRequest(context) {
	return handleRequest(context);
}
