/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3002,

  baseUrl: process.env.BASE_URL || '',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3002}`,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit!' },
  },

  // Redis
  redis: process.env.REDIS || 'redis://localhost:6379',

  sessionSecret: process.env.SESSION_SECRET || "It's a secret",

  wechat: {
    appId: 'wxc67a197c5c3f004e',
    appSecret: '60e541fff59447a7267502f974cc262d',
    mchId: '1501164041',
    key: 'CGTGMzB6p6u3UvZ2bDo34eRkWfXCtpBx',
  },

  proxy: process.env.PROXY,
};
