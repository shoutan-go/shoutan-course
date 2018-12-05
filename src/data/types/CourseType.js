import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import LessonType from './LessonType';
import { Lesson } from '../models';

export default new ObjectType({
  name: 'Course',
  fields: {
    id: { type: new NonNull(ID) },
    image: { type: new NonNull(StringType) },
    title: { type: new NonNull(StringType) },
    description: { type: new NonNull(StringType) },
    validatedIn: {
      type: new NonNull(StringType),
      resolve: parent => JSON.parse(parent.validatedIn),
    },
    lessons: {
      type: new List(LessonType),
      resolve: parent =>
        Lesson.findAll({
          where: {
            course: parent.id,
          },
          order: [['order', 'asc']],
        }),
    },
  },
});
