import { GraphQLList as List } from 'graphql';
import { Class } from '../models';
import ClassType from '../types/ClassType';

export default {
  type: new List(ClassType),
  async resolve() {
    return Class.findAll({
      order: [
        ['createdAt', 'desc'],
      ],
    });
  },
};
