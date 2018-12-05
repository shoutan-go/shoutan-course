import DataType from 'sequelize';
import Model from '../sequelize';

const Course = Model.define('Course', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  image: {
    type: DataType.STRING(255),
  },
  title: {
    type: DataType.STRING(255),
  },
  description: {
    type: DataType.TEXT,
  },
  validatedIn: {
    type: DataType.STRING(1024),
  },
});

export default Course;
