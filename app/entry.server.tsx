import * as React from "react";
import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "~/helpers/createEmotionCache";
import { ServerStyleContext } from "~/helpers/contexts";

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const MuiRemixServer = ({ chunks }: { chunks?: any }) => (
      <ServerStyleContext.Provider value={chunks?.styles}>
        <CacheProvider value={cache}>
          <RemixServer context={remixContext} url={request.url} />
        </CacheProvider>
      </ServerStyleContext.Provider>
  );

  // Render the component to a string.
  const html = renderToString(<MuiRemixServer />);
  const chunks = extractCriticalToChunks(html);
  // const styles = constructStyleTagsFromChunks(chunks);
  const markup = renderToString(<MuiRemixServer chunks={chunks} />);

  responseHeaders.set("Content-Type", "text/html");

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
