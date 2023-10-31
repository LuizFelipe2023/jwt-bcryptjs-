import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const conn = new Sequelize(process.env.db_name,process.env.db_user,process.env.db_password,{
      host: 'localhost',
      dialect: 'mysql'
});
try{
   (async()=>{
      await conn.authenticate();
      console.log("Conexão feita com sucesso");
   })();
}catch(err){
      console.error("Erro ao conectar-se ao banco de dados ",err);
}
export default conn;