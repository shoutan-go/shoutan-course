import { GraphQLID as ID, GraphQLNonNull } from 'graphql';
import { Coupon, Order } from '../models';
import CouponType from '../types/CouponType';
import sequelize from '../sequelize';

export default {
  type: CouponType,
  args: {
    id: { type: new GraphQLNonNull(ID) },
  },
  async resolve(root, { id }, request) {
    console.log('Mutation Coupon!');
    const coupon = await Coupon.findById(id);
    if (coupon.used) {
      throw new Error('Coupon used');
    }
    return sequelize
      .transaction(t =>
        Coupon.update(
          {
            used: true,
          },
          {
            where: {
              id,
              used: false,
            },
            transaction: t,
          },
        ).then(affectedCount => {
          if (affectedCount > 0) {
            return Order.create(
              {
                user: request.user.id,
                class: coupon.class,
              },
              {
                transaction: t,
              },
            );
          }
          throw new Error('invalid coupon');
        }),
      )
      .then(() => Coupon.findById(id));
  },
};
