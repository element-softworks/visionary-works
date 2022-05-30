import React, { useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '~/helpers/createEmotionCache';
import { ClientStyleContext } from '~/helpers/contexts';

interface ClientCacheProviderProps {
	children: React.ReactNode;
}
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
	const [cache, setCache] = useState(createEmotionCache());

	return (
		<ClientStyleContext.Provider value={{ reset: () => setCache(createEmotionCache()) }}>
			<CacheProvider value={cache}>{children}</CacheProvider>
		</ClientStyleContext.Provider>
	);
}

hydrateRoot(
	document,
	<ClientCacheProvider>
		<RemixBrowser />
	</ClientCacheProvider>
);
