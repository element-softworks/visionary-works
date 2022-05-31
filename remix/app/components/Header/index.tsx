import React from 'react';
import { Container, Stack, Box, Link, Button } from '@mui/material';

import { Link as RouterLink, useLocation } from '@remix-run/react';
import styled from '@emotion/styled';

const Header: React.FC<{ innerRef?: any }> = ({ innerRef }) => {
	const location = useLocation();
	const TRANSPARENT_ROUTES = [/\//];
	const INVERTED_ROUTES = [/\//];
	const isTransparent = TRANSPARENT_ROUTES.some((route) => location.pathname.match(route));
	const isInverted = INVERTED_ROUTES.some((route) => location.pathname.match(route));

	return (
		<Styles>
			<Box
				ref={innerRef}
				component="header"
				className={isInverted ? 'header-inverted' : ''}
				sx={
					isTransparent
						? { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }
						: {}
				}
			>
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
										disableElevation
										className="mobile-hidden"
										variant="contained"
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
			display: none;
		}

		&.header-inverted {
			nav {
				ul {
					li:not(:last-of-type) {
						a {
							color: ${({ theme }) => theme.palette.common.white};

							&:hover {
								color: ${({ theme }) => theme.palette.secondary.main};
							}
						}
					}
				}
			}
		}

		nav {
			margin-left: auto;

			@media (max-width: 600px) {
				.mobile-hidden {
					display: none;
				}
			}

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

export default React.forwardRef((props, ref) => <Header {...props} innerRef={ref} />);
