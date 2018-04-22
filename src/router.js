/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import UniversalRouter from 'universal-router';
import querystring from 'querystring';
import routes from './routes';
// import config from './config';
function createRouter(baseUrl) {
  return new UniversalRouter(routes, {
    baseUrl,
    resolveRoute(context, params) {
      if (context.route.protected && !context.store.getState().user) {
        return {
          redirect: `${context.baseUrl}/login/wechat`,
          from: `${context.pathname}?${querystring.stringify(context.query)}`,
        };
      }
      if (typeof context.route.load === 'function') {
        return context.route
          .load()
          .then(action => action.default(context, params));
      }
      if (typeof context.route.action === 'function') {
        return context.route.action(context, params);
      }
      return undefined;
    },
  });
}

export default createRouter;
