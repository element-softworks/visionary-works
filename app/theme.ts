import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material';

export default createTheme({
	palette: {
		primary: {
			main: '#facc00',
		},
		background: {
			paper: grey[100],
		},
	},
	typography: {
		fontFamily: ['F37Ginger'].join(', '),
		h1: {
			fontSize: '3.9rem',
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
