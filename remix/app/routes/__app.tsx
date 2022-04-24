import React from "react";
import { Box, Button, Container, CssBaseline, Grid, Link, Stack, Typography } from "@mui/material";
import { json, LoaderFunction, Outlet, Link as RouterLink } from "remix";
import useStyle from "~/helpers/hooks/useStyle";
import { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

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
										to="/services"
									>
										Services
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
						<Grid item sm={6}>
							<Typography
								variant="h5"
								className="footer-title"
							>
								<b>Contact Us</b>
							</Typography>
							<Typography
								variant="h5"
								component="a" target="_blank"
								href="mailto:hello@visionary-works.co.uk"
							>
								hello@visionary-works.co.uk
							</Typography>
							<br />
							<Typography variant="h5" component="a" target="_blank" href="tel:01206455355">
								01206 455355
							</Typography>

							<br />
							<Box className="footer-socials">
								<Typography
									variant="h4"
									component="a" target="_blank"
									href="http://instagram.com/elementsoftworks"
								>
									<FontAwesomeIcon icon={faInstagram} />
								</Typography>
								<Typography
									variant="h4"
									component="a" target="_blank"
									href="https://www.linkedin.com/company/element-softworks-ltd/"
								>
									<FontAwesomeIcon icon={faLinkedinIn} />
								</Typography>
								<Typography
									variant="h4"
									component="a" target="_blank"
									href="https://www.facebook.com/elementsoftworks"
								>
									<FontAwesomeIcon icon={faFacebookF} />
								</Typography>
								<Typography
									variant="h4"
									component="a" target="_blank"
									href="https://tiktok.com"
								>
									<FontAwesomeIcon icon={faTiktok} />
								</Typography>
							</Box>
						</Grid>
						<Grid item sm={6}>
							<Typography
								align="right"
								variant="h5"
								className="footer-title"
							>
								<b>Visit Us</b>
							</Typography>

							<Typography
								align="right"
								variant="h5"
							>
								Visionary Works<br />
								Innovation Centre<br />
								Knowledge Gateway<br />
								Boundary Road<br />
								Colchester, CO4 3ZQ
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</footer>

			<footer className="footer-second">
				<Container>
					<Grid container>
						<Grid item sm={6}>
							<Typography>
								Company No. 09486419&nbsp;&nbsp;·&nbsp;&nbsp; VAT No. GB279997505
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
			},
		ul {
			list-style: none;

			li:not(:last-of-type) {
				a {
					text-decoration: none;
					color: ${({ theme }) => theme.palette.text.primary};
					transition: ${({ theme }) => theme.transitions.create(["color"])};

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
		padding: ${({ theme }) => theme.spacing(12, 0, 10)};
		color: ${({ theme }) => theme.palette.common.white};


		h5 {
			font-weight: 400;
			margin-bottom: 20px;

			&.footer-title {
				font-weight: 700;
				color: ${({ theme }) => theme.palette.primary.main};
			}
		}

		.footer-socials {
			display: block;
			margin-top: 40px;

			a {
				margin-right: 30px;
			}
		}

		a {
			color: ${({ theme }) => theme.palette.common.white};
			text-decoration: none;
			opacity: 1;

			&:hover {
				opacity: 0.7;
			}
		}

		&.footer-second {
			background: #222;
		}
	}
`;

export default Layout;
