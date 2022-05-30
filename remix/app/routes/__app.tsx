import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, CssBaseline, Grid, Link, Stack, Typography } from '@mui/material';
import { json, LoaderFunction, Outlet, Link as RouterLink } from 'remix';
import useStyle from '~/helpers/hooks/useStyle';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {
	faLinkedinIn,
	faFacebookF,
	faInstagram,
	faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import Header from '~/components/Header';
import { HeaderHeightContext } from '~/helpers/contexts';
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
	const $header: any = useRef(null);
	const [headerHeight, setHeaderHeight] = useState(null);

	const handleHeaderHeight = () => {
		setHeaderHeight($header?.current?.offsetHeight ?? null);
	};

	useEffect(() => {
		window.addEventListener('resize', handleHeaderHeight);
		handleHeaderHeight();

		return () => {
			window.removeEventListener('resize', handleHeaderHeight);
		};
	}, []);

	return (
		<Styles>
			<CssBaseline />
			<Header ref={$header} />
			<HeaderHeightContext.Provider value={{ height: headerHeight }}>
				<Box component="main">
					<Outlet />
				</Box>
			</HeaderHeightContext.Provider>
			<footer>
				<Container>
					<Grid container sx={{ mb: 2 }}>
						<Grid item sm={6}>
							<Typography variant="h5" className="footer-title">
								<b>Contact Us</b>
							</Typography>
							<Typography
								variant="h5"
								component="a"
								target="_blank"
								href="mailto:hello@visionary-works.co.uk"
							>
								hello@visionary-works.co.uk
							</Typography>
							<br />
							<Typography
								variant="h5"
								component="a"
								target="_blank"
								href="tel:01206455355"
							>
								01206 455355
							</Typography>

							<br />
							<Box className="footer-socials">
								<Typography
									variant="h4"
									component="a"
									target="_blank"
									href="http://instagram.com/elementsoftworks"
								>
									<FontAwesomeIcon icon={faInstagram} />
								</Typography>
								<Typography
									variant="h4"
									component="a"
									target="_blank"
									href="https://www.linkedin.com/company/element-softworks-ltd/"
								>
									<FontAwesomeIcon icon={faLinkedinIn} />
								</Typography>
								<Typography
									variant="h4"
									component="a"
									target="_blank"
									href="https://www.facebook.com/elementsoftworks"
								>
									<FontAwesomeIcon icon={faFacebookF} />
								</Typography>
								<Typography
									variant="h4"
									component="a"
									target="_blank"
									href="https://tiktok.com"
								>
									<FontAwesomeIcon icon={faTiktok} />
								</Typography>
							</Box>
						</Grid>
						<Grid item sm={6}>
							<Typography align="right" variant="h5" className="footer-title">
								<b>Visit Us</b>
							</Typography>

							<Typography align="right" variant="h5" className="footer-address">
								Visionary Works
								<br />
								Innovation Centre
								<br />
								Knowledge Gateway
								<br />
								Boundary Road
								<br />
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
	footer {
		background-color: #000;
		padding: ${({ theme }) => theme.spacing(12, 0, 8)};
		color: ${({ theme }) => theme.palette.common.white};

		h5 {
			font-weight: 400;
			margin-bottom: 20px;

			&.footer-title {
				font-weight: 700;
				color: ${({ theme }) => theme.palette.primary.main};
			}

			&.footer-address {
				font-size: 1.3rem;
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
			background: #000;
			padding: 30px;
			border-top: 3px solid #191919;
		}
	}
`;

export default Layout;
