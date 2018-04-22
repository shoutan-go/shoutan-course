import DataType from 'sequelize';
import Model from '../sequelize';

const Order = Model.define(
  'Order',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    user: {
      type: DataType.UUID,
    },
    class: {
      type: DataType.UUID,
    },
  },
  { indexes: [{ unique: true, fields: ['user', 'class'] }] },
);

export default Order;
