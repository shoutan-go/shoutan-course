import { GraphQLID as ID, GraphQLNonNull } from 'graphql';
import { Class } from '../models';
import ClassType from '../types/ClassType';

export default {
  type: ClassType,
  args: {
    id: { type: new GraphQLNonNull(ID) },
  },
  async resolve(root, { id }) {
    return Class.findById(id);
  },
};
