import { GraphQLID as ID, GraphQLNonNull } from 'graphql';
import { Lesson } from '../models';
import LessonType from '../types/LessonType';

export default {
  type: LessonType,
  args: {
    id: { type: new GraphQLNonNull(ID) },
  },
  async resolve(root, { id }) {
    return Lesson.findById(id);
  },
};
