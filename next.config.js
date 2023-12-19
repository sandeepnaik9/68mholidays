module.exports = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });
  
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'www.68mholidays.com',
          port: '',
          pathname: '/uploads/locations/**',
        },
      ],
    },
    
  };