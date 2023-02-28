const CracoLessPlugin = require('craco-less');

const isAdminMode = process.env.REACT_APP_MODE === 'admin';

module.exports = {
  eslint: {
    enable: false,
  },
  typescript: {
    enableTypeChecking: false
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': isAdminMode ? '#8270DB' : '#F37644',
              'link-color': isAdminMode ? '#8270DB' : '#F37644',
              'menu-item-active-bg': isAdminMode ? '#8270DB' : '#F37644',
              // 'menu-highlight-color': isAdminMode ? '#fff' : '#fff',
              'border-radius-base': '4px',
              'font-size-base': '16px',
              'line-height-base': '24px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
