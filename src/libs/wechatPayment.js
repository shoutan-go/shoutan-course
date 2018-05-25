import xml2js from 'xml2js';
import md5 from 'md5';
import querystring from 'querystring';
import fetch from 'node-fetch';
import { redis } from '../redis';
import config from '../config';
import Order from '../data/models/Order';

const parser = new xml2js.Parser({
  explicitRoot: false,
  explicitArray: false,
});

const builder = new xml2js.Builder({
  rootName: 'xml',
  xmldec: {
    version: '1.0',
    encoding: 'UTF-8',
  },
  cdata: true,
});

export function sign(payload) {
  const ordered = {};
  Object.keys(payload)
    .sort()
    .forEach(key => {
      if (payload[key] && key !== 'sign') {
        ordered[key] = payload[key];
      }
    });
  const stringA = querystring.unescape(querystring.stringify(ordered));
  const stringSignTemp = `${stringA}&key=${config.wechat.key}`;
  return md5(stringSignTemp).toUpperCase();
}

const url = 'https://api.mch.weixin.qq.com/pay/orderquery';

export function notify(req, res) {
  parser.parseString(req.body, (err, result) => {
    console.info(err, result);
    if (sign(result) === result.sign && result.return_code === 'SUCCESS') {
      redis
        .getAsync(`order|${result.out_trade_no}`)
        .then(data => JSON.parse(data))
        .then(json => {
          Order.create(json).then(() => {
            const xml = builder.buildObject({
              return_code: 'SUCCESS',
            });
            res.set('Content-Type', 'text/xml');
            res.send(xml);
          });
        });
    }
  });
}
export function query(tradeNo) {
  return redis
    .getAsync(`order|${tradeNo}`)
    .then(data => JSON.parse(data))
    .then(json =>
      Order.count({
        where: json,
      })
        .then(c => {
          if (c >= 1) {
            return true;
          }
          const payload = {
            appid: config.wechatPayment.appid,
            mch_id: config.wechatPayment.mch_id,
            nonce_str: Math.random().toString(),
            out_trade_no: tradeNo,
          };
          payload.sign = sign(payload);
          const xml = builder.buildObject(payload);
          return fetch(url, {
            headers: {
              'Content-Type': 'application/xml',
            },
            method: 'post',
            body: xml,
          })
            .then(
              resp =>
                new Promise((resolve, reject) => {
                  parser.parseString(resp, (err, r) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(r);
                    }
                  });
                }),
            )
            .then(
              result =>
                result.return_code === 'SUCCESS' &&
                result.result_code === 'SUCCESS',
            );
        })
        .then(r => {
          if (r) {
            return Order.create(json).then(() => r);
          }
          return r;
        }),
    );
}
