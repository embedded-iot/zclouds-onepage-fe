const CracoLessPlugin = require('craco-less');

const isAdminMode = process.env.REACT_APP_MODE === 'admin';

module.exports = {
  eslint: {
    enable: true,
  },
  typescript: {
    enableTypeChecking: true
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
              'menu-item-height': '58px',
              'menu-inline-toplevel-item-height': '58px',
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
