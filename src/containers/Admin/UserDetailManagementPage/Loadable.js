/**
 * Asynchronously loads the component for FeaturePage
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/Common/LoadingIndicator';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
