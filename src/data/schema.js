import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';
import wechat from './queries/wechat';
import classes from './queries/classes';
import course from './queries/course';
import lesson from './queries/lesson';
import couponQuery from './queries/coupon';
import clz from './queries/class';
import payment from './mutations/payment';
import couponMutation from './mutations/coupon';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      wechat,
      classes,
      course,
      lesson,
      coupon: couponQuery,
      class: clz,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      payment,
      coupon: couponMutation,
    },
  }),
});

export default schema;
