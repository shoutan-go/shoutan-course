import { GraphQLID as ID, GraphQLNonNull } from 'graphql';
import { Course } from '../models';
import CourseType from '../types/CourseType';

export default {
  type: CourseType,
  args: {
    id: { type: new GraphQLNonNull(ID) },
  },
  async resolve(root, { id }) {
    return Course.findById(id);
  },
};
