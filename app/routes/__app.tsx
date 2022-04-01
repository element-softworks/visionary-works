import React from 'react';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import { json, LoaderFunction, Outlet, Link as RouterLink } from 'remix';
import useStyle from '~/helpers/hooks/useStyle';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

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
	return (
		<Styles>
			<Box sx={{ py: 2 }} component="header">
				<Container maxWidth="lg">
					<Stack direction="row" alignItems="center">
						<Typography component="span" sx={{ flexGrow: 1 }}>
							<b>Visionary Works</b>
						</Typography>
						<Box component="nav">
							<Stack direction="row" spacing={10} component="ul" alignItems="center">
								<li>
									<Link component={RouterLink} to="/about">
										About
									</Link>
								</li>
								<li>
									<Link component={RouterLink} to="/about">
										Projects
									</Link>
								</li>
								<li>
									<Link component={RouterLink} to="/about">
										Blog
									</Link>
								</li>
								<li>
									<Button variant="inverse" component={RouterLink} to="/contact">
										Contact
									</Button>
								</li>
							</Stack>
						</Box>
					</Stack>
				</Container>
			</Box>
			<Box component="main">
				<Outlet />
			</Box>
			<footer></footer>
		</Styles>
	);
};

const Styles = styled.div`
	header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;

		nav {
			margin-left: auto;

			ul {
				list-style: none;

				li:not(:last-of-type) {
					a {
						text-decoration: none;
						color: ${({ theme }) => theme.palette.text.primary};
						transition: ${({ theme }) => theme.transitions.create(['color'])};

						&:hover {
							color: ${({ theme }) => theme.palette.secondary.main};
						}
					}
				}
			}
		}
	}
`;

export default Layout;
