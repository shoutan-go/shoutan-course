import DataType from 'sequelize';
import Model from '../sequelize';

const Coupon = Model.define('Coupon', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  class: {
    type: DataType.UUID,
  },
  used: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Coupon;
