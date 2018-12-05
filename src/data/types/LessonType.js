import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as Int,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { Op } from 'sequelize';
import { Order, Class } from '../models';

export default new ObjectType({
  name: 'Lesson',
  fields: {
    id: { type: new NonNull(ID) },
    image: { type: new NonNull(StringType) },
    title: { type: new NonNull(StringType) },
    description: { type: new NonNull(StringType) },
    video: {
      type: StringType,
      resolve: async (parent, args, request) => {
        if (request.user) {
          const list = await Order.findAll({
            attributes: ['class'],
            where: {
              user: request.user.id,
            },
          });
          const count = await Class.count({
            where: {
              id: {
                [Op.in]: list.map(e => e.class),
              },
              course: parent.course,
            },
          });
          if (count >= 1) {
            return parent.video;
          }
        }
        return null;
      },
    },
    order: { type: Int },
  },
});
