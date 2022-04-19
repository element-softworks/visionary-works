import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { RemixServer } from 'remix';
import type { EntryContext } from 'remix';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache, { key } from '~/helpers/createEmotionCache';
import { ServerStyleContext, ServerStyleContextData } from '~/helpers/contexts';

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	const MuiRemixServer = ({ chunks = [] }: { chunks?: ServerStyleContextData[] }) => (
		<ServerStyleContext.Provider value={chunks}>
			<CacheProvider value={cache}>
				<RemixServer context={remixContext} url={request.url} />
			</CacheProvider>
		</ServerStyleContext.Provider>
	);

	// Render the component to a string.
	const html = renderToString(<MuiRemixServer />);
	const { styles: chunks } = extractCriticalToChunks(html);
	const markup = renderToString(<MuiRemixServer chunks={chunks} />);

	responseHeaders.set('Content-Type', 'text/html');

	return new Response(`<!DOCTYPE html>${markup}`, {
		status: responseStatusCode,
		headers: responseHeaders,
	});
}
