// remix.config.js
const { withEsbuildOverride } = require('remix-esbuild-override');
const GlobalsPolyfills = require('@esbuild-plugins/node-globals-polyfill').default;

withEsbuildOverride((option, { isServer }) => {
	if (isServer)
		option.plugins = [
			GlobalsPolyfills({
				buffer: true,
			}),
			...option.plugins,
		];

	return option;
});

module.exports = {
	serverBuildTarget: 'cloudflare-pages',
	server: './server.js',
	devServerBroadcastDelay: 1000,
	ignoredRouteFiles: ['.*']
};
