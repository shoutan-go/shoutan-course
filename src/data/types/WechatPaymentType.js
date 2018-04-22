import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'WechatPayment',
  fields: {
    timestamp: {
      type: GraphQLInt,
    },
    nonceStr: {
      type: GraphQLString,
    },
    package: {
      type: GraphQLString,
    },
    signType: {
      type: GraphQLString,
    },
    paySign: {
      type: GraphQLString,
    },
    tradeNo: {
      type: GraphQLString,
    },
  },
});
