import path from 'path';

export default {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.prisma$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
      },
    });
    return config;
  },
};
