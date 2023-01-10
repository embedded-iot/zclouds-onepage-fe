const CracoLessPlugin = require('craco-less');

const isAdminMode = process.env.REACT_APP_ADMIN_MODE === 'true';

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': isAdminMode ? '#8270DB' : '#0065FF',
              'link-color': isAdminMode ? '#8270DB' : '#0065FF',
              'menu-item-active-bg': isAdminMode ? '#8270DB' : '#0065FF',
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
