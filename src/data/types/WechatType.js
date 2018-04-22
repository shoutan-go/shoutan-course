import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'Wechat',
  fields: {
    appId: {
      type: GraphQLString,
    },
    timestamp: {
      type: GraphQLInt,
    },
    nonceStr: {
      type: GraphQLString,
    },
    signature: {
      type: GraphQLString,
    },
  },
});
