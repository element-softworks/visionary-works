import createCache from '@emotion/cache';

export const key = 'css';

export default function createEmotionCache() {
	return createCache({ key });
}
