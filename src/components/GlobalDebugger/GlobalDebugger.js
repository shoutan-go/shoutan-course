/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

class GlobalDebugger extends React.Component {
  render() {
    if (typeof window !== 'undefined') {

      function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      }

      if(getParameterByName('debug') != null){
        window.onerror = function(msg, url, line, col, error) {
          var extra = !col ? '' : '\ncolumn: ' + col;
          extra += !error ? '' : '\nerror: ' + error;
          alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
          var suppressErrorAlert = true;
          return suppressErrorAlert;
        };
      }
    }
    return <div />;
  }
}

export default GlobalDebugger;
