import DataType from 'sequelize';
import Model from '../sequelize';

const Class = Model.define('Class', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  teacher: {
    type: DataType.STRING(255),
  },
  course: {
    type: DataType.UUID,
  },
  beginAt: {
    type: DataType.DATEONLY,
    resolve: parent => parent.beginAt,
  },
  price: {
    type: DataType.INTEGER,
  },
});

export default Class;
