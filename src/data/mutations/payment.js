import fetch from 'node-fetch';
import xml2js from 'xml2js';
import dateformat from 'dateformat';
import uuid from 'uuid/v1';
import { GraphQLNonNull, GraphQLID as ID } from 'graphql';
import { sign } from '../../libs/wechatPayment';
import WechatPaymentType from '../types/WechatPaymentType';
import config from '../../config';
import { redis } from '../../redis';
import { Class, Course } from '../models';

const HttpsProxyAgent = require('https-proxy-agent');

const url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

const builder = new xml2js.Builder({
  rootName: 'xml',
  xmldec: {
    version: '1.0',
    encoding: 'UTF-8',
  },
  cdata: true,
});

const parser = new xml2js.Parser({
  explicitRoot: false,
  explicitArray: false,
});

export default {
  type: WechatPaymentType,
  args: {
    class: { type: new GraphQLNonNull(ID) },
  },
  resolve: async (root, args, request) => {
    const clz = await Class.findOne({
      attributes: ['price', 'course', 'beginAt'],
      where: {
        id: args.class,
      },
    });
    const course = await Course.findOne({
      attributes: ['title', 'description'],
      where: {
        id: clz.course,
      },
    });
    const tradeNo = uuid().replace(/-/g, '');

    await redis.setex(
      `order|${tradeNo}`,
      2 * 60 * 60,
      JSON.stringify({
        user: request.user.id,
        class: args.class,
      }),
    );

    const payload = {
      appid: config.wechat.appId,
      mch_id: config.wechat.mchId,
      nonce_str: Math.random().toString(),
      body: `${course.title}-${dateformat(clz.beginAt, 'm月d日开课')}`,
      out_trade_no: tradeNo,
      total_fee: clz.price,
      spbill_create_ip:
        request.headers['x-forwarded-for'] || request.connection.remoteAddress,
      openid: request.user.logins.filter(e => e.name === 'wechat')[0].key,
      notify_url: `${config.api.serverUrl}/payment/callback`,
      trade_type: 'JSAPI',
    };
    payload.sign = sign(payload);
    const reqXml = builder.buildObject(payload);

    const option = {
      headers: {
        'Content-Type': 'application/xml',
      },
      method: 'post',
      body: reqXml,
    };

    if (HttpsProxyAgent && config.proxy) {
      option.agent = new HttpsProxyAgent(config.proxy);
    }

    const resp = await fetch(url, option);
    const respXml = await resp.text();
    try {
      const result = await new Promise((resolve, reject) => {
        parser.parseString(respXml, (err, r) => {
          if (err) {
            reject(err);
          } else {
            resolve(r);
          }
        });
      });
      if (result.return_code === 'SUCCESS') {
        const toSign = {
          appId: config.wechat.appId,
          timeStamp: Math.floor(new Date().getTime() / 1000),
          nonceStr: Math.random().toString(),
          package: `prepay_id=${result.prepay_id}`,
          signType: 'MD5',
        };
        return {
          timestamp: toSign.timeStamp,
          nonceStr: toSign.nonceStr,
          package: toSign.package,
          signType: toSign.signType,
          paySign: sign(toSign),
          tradeNo,
        };
      }
      return {
        timestamp: 0,
        nonceStr: '',
        package: '',
        signType: '',
        tradeNo: '',
        paySign: result.return_code || result.return_msg || 'error',
      };
    } catch (e) {
      return {
        timestamp: 0,
        nonceStr: '',
        package: '',
        signType: '',
        tradeNo: '',
        paySign: e.errmsg || e.errcode || 'error',
      };
    }
  },
};
