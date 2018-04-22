import DataType from 'sequelize';
import Model from '../sequelize';

const Lesson = Model.define('Lesson', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  course: {
    type: DataType.UUID,
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
  video: {
    type: DataType.STRING(255),
  },
  validatedIn: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
});

export default Lesson;
