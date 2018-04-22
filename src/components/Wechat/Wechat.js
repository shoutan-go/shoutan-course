/* eslint-disable no-undef */
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

class Wechat extends React.Component {
  render() {
    if (typeof window !== 'undefined') {
      fetch('/graphql', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          query: `
          {
            wechat(url: "${window.location.href}") {
              appId
              timestamp
              nonceStr
              signature
            }
          }
          `,
        }),
      })
        .then(resp => resp.json())
        .then(json => {
          wx.config({
            debug: false,
            ...json.data.wechat,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
          });
        });
    }
    return <div />;
  }
}

export default Wechat;
