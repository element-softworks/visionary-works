import { grey } from '@mui/material/colors';
import { createTheme, lighten } from '@mui/material';
import { css } from '@emotion/react';

const theme = createTheme({
	palette: {
		primary: {
			main: '#00AFD4',
			gradient:
				'radial-gradient(75% 20% at 90% 0%,#00586A 0%,#00AFD4 93%),radial-gradient(113% 91% at 17% -2%, #00586A 0%, #00AFD4 99%),linear-gradient(90deg, #f2c8b6 20%, #00AFD4 99%),radial-gradient(50% 75% at 50% 50%, #95fadf 52%, #073aff00 99%),linear-gradient(341deg, #00AFD4 39%, #eaa9e3 71%, #eaa9e300 86%),radial-gradient(100% 100% at 50% 50%,#f2c8b600 0%,#fff695 22%,#fff69566 58%,#00AFD4 99%),linear-gradient(292deg, #ffae7d9c 0%, #ffd75700 95%),linear-gradient(178deg, #95fadf 3%, #eaa9e3 100%)',
		},
		secondary: {
			main: '#4E4E4E',
		},
		background: {
			paper: grey[100],
		},
		common: {
			black: '#191919',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1280,
			xl: 1536,
		},
	},
	typography: {
		fontFamily: ['F37Ginger'].join(', '),
		h1: {
			fontSize: '6rem',
			fontWeight: 700,
		},
		h2: {
			fontSize: '4.375rem',
			fontWeight: 700,
		},
		h3: {
			fontSize: '3.75rem',
			fontWeight: 700,
		},
		h4: {
			fontWeight: 700,
		},
		h5: {
			fontWeight: 700,
		},
		h6: {
			fontWeight: 700,
		},
		body2: {
			fontSize: '1.5rem',
		},
	},
});

theme.components = {
	MuiTypography: {
		styleOverrides: {
			h1: {
				lineHeight: `1.1`,
			},
			body1: {
				lineHeight: `1.75`,
			},
		},
	},
	MuiContainer: {
		styleOverrides: {
			root: css`
				${theme.breakpoints.up('sm')} {
					padding-left: ${theme.spacing(6)};
					padding-right: ${theme.spacing(6)};
				}

				${theme.breakpoints.up('lg')} {
					padding-left: ${theme.spacing(3)};
					padding-right: ${theme.spacing(3)};
				}
			`,
		},
	},
	MuiLink: {
		styleOverrides: {
			root: css`
				color: ${theme.palette.secondary.main};
				text-decoration-color: ${lighten(theme.palette.secondary.main, 0.3)};

				&:hover {
					text-decoration-color: ${theme.palette.secondary.main};
				}
			`,
		},
	},
	MuiButton: {
		styleOverrides: {
			root: css`
				border-radius: 4rem;
				font-weight: 700;
				text-transform: none;
				letter-spacing: 0.075rem;
				padding: 0.5rem 1.75rem;
			`,
			contained: css`
				color: ${theme.palette.common.white};
			`,
		},
		variants: [
			{
				props: { variant: 'contained', color: 'primary' },
				style: css`
					background-image: ${theme.palette.primary.gradient};
					background-size: 300%;
					background-position: left top;
					transition: ${theme.transitions.create([
						'background-position',
						'background-size',
						'box-shadow',
					])};

					&:hover {
						background-size: 150%;
					}
				`,
			},
			{
				props: { variant: 'inverse' },
				style:
					theme?.palette?.mode === 'light'
						? {
								backgroundColor: theme.palette.common.black,
								color: theme.palette.common.white,
								'&:hover, &:focus': {
									backgroundColor: grey['900'],
									color: theme.palette.common.white,
								},
						  }
						: {
								backgroundColor: theme.palette.common.white,
								color: theme.palette.common.black,
								'&:hover, &:focus': {
									backgroundColor: grey['200'],
									color: theme.palette.common.black,
								},
						  },
			},
		],
	},
};

export default theme;
