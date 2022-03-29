import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { json, LoaderFunction, Outlet } from 'remix';
import useStyle from '~/helpers/hooks/useStyle';
import { Theme } from '@emotion/react';

// using authenticated session with cloudflare pages
export const loader: LoaderFunction = async ({ context, request }) => {
	// console.log("context.sessionStorage", context.sessionStorage);
	//
	// const session = await context.sessionStorage.getSession(
	//     request.headers.get("Cookie")
	// )
	//
	// const headers = {}
	//
	// if (!session.has("userId")) {
	//   session.set("userId", `user:${Math.random()}`)
	//   console.log("context.sessionStorage", context.sessionStorage, "session", session);
	//   // @ts-ignore
	//   headers["Set-Cookie"] = await context.sessionStorage.commitSession(session)
	// } else {
	//   console.log(session.get("userId"));
	// }

	// return json(null, { headers })

	return json(null);
};

const Layout: React.FC = () => {
	const Styles = useStyle(styles);

	return (
		<Styles>
			<Box sx={{ py: 2 }} component="header">
				<Container>
					<Typography>
						<b>Element Softworks</b>
					</Typography>
				</Container>
			</Box>
			<Box component="main">
				<Outlet />
			</Box>
			<footer></footer>
		</Styles>
	);
};

const styles = (theme: Theme) => `
	header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
	}
`;

export default Layout;
