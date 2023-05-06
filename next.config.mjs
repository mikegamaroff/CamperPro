const nextConfig = {
	reactStrictMode: true,
	env: {
		COUCHDB_URL: process.env.COUCHDB_URL,
		COUCHDB_NAME: process.env.COUCHDB_NAME,
		JWT_SECRET: process.env.JWT_SECRET
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.component\.svg$/,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack']
		});

		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.[jt]sx?$/,
			exclude: /\.component\.svg$/,
			use: ['url-loader']
		});

		return config;
	}
};

export default nextConfig;
