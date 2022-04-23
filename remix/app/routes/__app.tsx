import React from 'react';
import { Box, Button, Container, CssBaseline, Grid, Link, Stack, Typography } from '@mui/material';
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
			<CssBaseline />
			<Box component="header">
				<Container maxWidth="lg">
					<Stack direction="row" alignItems="center">
						<Box component="span" sx={{ flexGrow: 1 }}>
							<Link component={RouterLink} to="/">
								<img className="logo" alt="Logo" src="/logo-draft.svg" />
							</Link>
						</Box>
						<Box component="nav">
							<Stack spacing={10} direction="row" component="ul" alignItems="center">
								<li>
									<Link
										style={{ color: 'green' }}
										className="mobile-hidden"
										component={RouterLink}
										to="/about"
									>
										About
									</Link>
								</li>
								<li>
									<Link
										className="mobile-hidden"
										component={RouterLink}
										to="/projects"
									>
										Projects
									</Link>
								</li>
								<li>
									<Link
										className="mobile-hidden"
										component={RouterLink}
										to="/blog"
									>
										Blog
									</Link>
								</li>
								<li>
									<Button
										className="mobile-hidden"
										variant="inverse"
										component={RouterLink}
										to="/contact"
									>
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
			<footer>
				<Container>
					<Grid container sx={{ mb: 2 }}>
						<Grid item sm={6} sx={{ mb: 10 }}>
							<Typography
								variant="h5"
								component="a"
								href="mailto:hello@visionary-works.co.uk"
							>
								hello@visionary-works.co.uk
							</Typography>
							<br />
							<Typography variant="h5" component="a" href="tel:01206455355">
								01206 455355
							</Typography>
						</Grid>
						<Grid item sm={6}></Grid>
					</Grid>
					<Grid container>
						<Grid item sm={6}>
							<Typography>
								Company No. 09486419 VAT No. GB279997505
								<br />
								Element Softworks Ltd. Registered company in England and Wales
								2015-2022 ©
							</Typography>
						</Grid>
						<Grid item sm={6}>
							<Typography align="right">
								Terms and Conditions
								<br />
								Privacy Policy
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</footer>
		</Styles>
	);
};

const Styles = styled.div`
	header {
		//position: absolute;
		//top: 0;
		//left: 0;
		//right: 0;
		//z-index: 1;

		.logo {
			height: 45px;
		}

		nav {
			margin-left: auto;

			@media (max-width: 600px) {
				.mobile-hidden {
					display: none;
				}
			}
			,
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

	footer {
		background-color: #111111;
		padding: ${({ theme }) => theme.spacing(12, 0)};
		color: ${({ theme }) => theme.palette.common.white};

		a {
			color: ${({ theme }) => theme.palette.common.white};
			text-decoration: none;
			opacity: 1;

			&:hover {
				opacity: 0.7;
			}
		}
	}
`;

export default Layout;
