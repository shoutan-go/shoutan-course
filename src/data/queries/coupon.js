import { GraphQLID as ID, GraphQLNonNull } from 'graphql';
import { Coupon } from '../models';
import CouponType from '../types/CouponType';

export default {
  type: CouponType,
  args: {
    id: { type: new GraphQLNonNull(ID) },
  },
  async resolve(root, { id }) {
    return Coupon.findById(id);
  },
};
