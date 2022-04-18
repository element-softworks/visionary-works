import React, { useState } from "react";
import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "~/helpers/createEmotionCache";
import { ClientStyleContext } from "~/helpers/contexts";

interface ClientCacheProviderProps {
	children: React.ReactNode;
}
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
	const [cache, setCache] = useState(createEmotionCache());

	return (
		<ClientStyleContext.Provider
			value={{ reset: () => setCache(createEmotionCache()) }}
		>
			<CacheProvider value={cache}>{children}</CacheProvider>
		</ClientStyleContext.Provider>
	);
}

hydrate(
	<ClientCacheProvider>
		<RemixBrowser />
	</ClientCacheProvider>,
	document
);
