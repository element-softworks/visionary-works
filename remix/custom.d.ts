import { Theme as MaterialUITheme } from '@mui/material';

declare module '@emotion/react' {
	export interface Theme extends MaterialUITheme {}
}

declare module '@mui/material/styles/createPalette' {
	interface SimplePaletteColorOptions {
		gradient?: string;
	}

	interface PaletteColor {
		gradient?: string;
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		inverse: true;
	}
}
