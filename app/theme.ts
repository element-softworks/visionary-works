import { grey } from '@mui/material/colors';
import { createTheme, lighten } from '@mui/material';
import { css } from '@emotion/react';

const theme = createTheme({
	palette: {
		primary: {
			main: '#00AFD4',
			gradient:
				'radial-gradient(75% 20% at 90% 0%,#8160e7ff 0%,#ff000000 93%),radial-gradient(113% 91% at 17% -2%, #4c78faff 0%, #ff000000 99%),linear-gradient(90deg, #f2c8b6 20%, #ff000000 99%),radial-gradient(50% 75% at 50% 50%, #95fadf 52%, #073aff00 99%),linear-gradient(341deg, #ff000000 39%, #eaa9e3 71%, #eaa9e300 86%),radial-gradient(100% 100% at 50% 50%,#f2c8b600 0%,#fff695 22%,#fff69566 58%,#ff000000 99%),linear-gradient(292deg, #ffae7d9c 0%, #ffd75700 95%),linear-gradient(178deg, #95fadf 3%, #eaa9e3 100%)',
		},
		secondary: {
			main: '#E2826B',
		},
		background: {
			paper: grey[100],
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
			fontSize: '9rem',
			fontWeight: 700,
		},
		h2: {
			fontSize: '2.5rem',
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
			contained: css`
				color: ${theme.palette.common.white};
			`,
		},
	},
};

export default theme;
