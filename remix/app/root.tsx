import React, { useContext } from 'react';
import {
	json,
	Links,
	LinksFunction,
	LiveReload,
	LoaderFunction,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
	useLoaderData,
} from 'remix';
import { setPagesContext } from 'remix-pages-context';
import type { MetaFunction } from 'remix';
import {
	ThemeProvider as EmotionThemeProvider,
	withEmotionCache,
	Global,
	css,
} from '@emotion/react';
import { ClientStyleContext, ServerStyleContext } from '~/helpers/contexts';
import {
	Container,
	unstable_useEnhancedEffect as useEnhancedEffect,
	ThemeProvider,
	CssBaseline,
	lighten,
	Typography,
} from '@mui/material';
import { Message, messageSession } from './sessions';
import { getMessage } from './utils/message.server';
import globalStyles from '~/global.css';
import { getSeo } from '~/seo';
import theme from '~/theme';
import SnackbarProvider from '~/components/Snackbar';
import { MessageContext } from '~/helpers/contexts';
import swiperStyles from 'swiper/css';

console.log('swiperStyles', swiperStyles);

const [seoMeta, seoLinks] = getSeo();

export const meta: MetaFunction = () => ({ ...seoMeta });

export const links: LinksFunction = () => {
	return [
		...seoLinks,
		{
			rel: 'stylesheet',
			href: globalStyles,
		},
		{
			rel: 'stylesheet',
			href: swiperStyles,
		},
	];
};

interface DocumentProps {
	children: React.ReactNode;
	title?: string;
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
	const serverStyleData = useContext(ServerStyleContext);
	const clientStyleData = useContext(ClientStyleContext);

	// Only executed on client
	useEnhancedEffect(() => {
		// re-link sheet container
		emotionCache.sheet.container = document.head;

		// re-inject tags
		const tags = emotionCache.sheet.tags;
		emotionCache.sheet.flush();
		tags.forEach((tag) => {
			(emotionCache.sheet as any)._insertTag(tag);
		});

		// reset cache to re-apply global styles
		clientStyleData.reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
				{serverStyleData?.map(({ key, ids, css }) => (
					<style
						key={key}
						data-emotion={`${key} ${ids.join(' ')}`}
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: css }}
					/>
				))}
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
});

type Data = {
	message: Message | null;
};

export const loader: LoaderFunction = async ({ request, context }) => {
	setPagesContext(context);

	const session = await messageSession.getSession(request.headers.get('Cookie'));
	const message = await getMessage(request);

	return json<Data>(
		{ message },
		// this will clear the message from cookie
		{
			headers: {
				'Set-Cookie': await messageSession.commitSession(session),
			},
		}
	);
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
const App = () => {
	const { message } = useLoaderData<Data>();

	return (
		<Document>
			<ThemeProvider theme={theme}>
				<EmotionThemeProvider theme={theme}>
					<MessageContext.Provider value={{ message }}>
						<SnackbarProvider>
							<CssBaseline />
							<Global
								styles={css`
									a {
										color: ${theme.palette.secondary.main};
										text-decoration-color: ${lighten(
											theme.palette.secondary.main,
											0.3
										)};

										&:hover {
											text-decoration-color: ${theme.palette.secondary.main};
										}
									}
								`}
							/>

							<Outlet />
						</SnackbarProvider>
					</MessageContext.Provider>
				</EmotionThemeProvider>
			</ThemeProvider>
		</Document>
	);
};

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export const ErrorBoundary = ({ error }: { error: Error }) => {
	console.log({ error });

	return (
		<Document title="Error!">
			<ThemeProvider theme={theme}>
				<EmotionThemeProvider theme={theme}>
					<CssBaseline />
					<div className="error">
						<Container>
							<Typography variant="h1">{error?.name}</Typography>
							<Typography>{error.message}</Typography>
						</Container>
					</div>
				</EmotionThemeProvider>
			</ThemeProvider>
		</Document>
	);
};

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export const CatchBoundary = () => {
	const caught = useCatch();

	let message;

	switch (caught.status) {
		case 401:
			message = 'Oops! Looks like you tried to visit a page that you do not have access to.';
			break;
		case 404:
			message = 'Oops! Looks like you tried to visit a page that does not exist.';
			break;

		default:
			throw new Error(caught.data || caught.statusText);
	}

	return (
		<Document title={`${caught.status} ${caught.statusText}`}>
			<ThemeProvider theme={theme}>
				<EmotionThemeProvider theme={theme}>
					<CssBaseline />
					<div className="error">
						<Typography variant="h1">
							{caught.status}: {caught.statusText}
						</Typography>
						<Typography>{message}</Typography>
					</div>
				</EmotionThemeProvider>
			</ThemeProvider>
		</Document>
	);
};

export default App;
