import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import ClassType from './ClassType';
import { Class } from '../models';

export default new ObjectType({
  name: 'Coupon',
  fields: {
    id: { type: new NonNull(ID) },
    class: {
      type: new NonNull(ClassType),
      resolve: parent =>
        Class.findOne({
          where: {
            id: parent.class,
          },
        }),
    },
    used: { type: new NonNull(BooleanType) },
  },
});
