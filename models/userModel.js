import { DataTypes } from "sequelize";
import conn from '../banco/db.js'

const User = conn.define('User',{
      name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
      },
      password:{
        type:DataTypes.STRING,
        allowNull: false
      }
});
export default User;