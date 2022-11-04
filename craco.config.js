const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#0065FF',
              'link-color': '#0065FF',
              'border-radius-base': '4px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
