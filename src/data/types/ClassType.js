import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as Int,
  GraphQLBoolean as BooleanType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import CourseType from './CourseType';
import { Course, Order } from '../models';

export default new ObjectType({
  name: 'Class',
  fields: {
    id: { type: new NonNull(ID) },
    teacher: { type: new NonNull(StringType) },
    course: {
      type: new NonNull(CourseType),
      resolve: parent => Course.findById(parent.course),
    },
    price: { type: new NonNull(Int) },
    paid: {
      type: new NonNull(BooleanType),
      resolve: async (parent, args, request) => {
        if (request.user) {
          const count = await Order.count({
            where: {
              user: request.user.id,
              class: parent.id,
            },
          });
          return count >= 1;
        }
        return false;
      },
    },
    beginAt: {
      type: new NonNull(StringType),
      resolve: parent => parent.beginAt,
    },
    validatedIn: {
      type: new List(Int),
      resolve: parent => JSON.parse(parent.validatedIn),
    },
  },
});
