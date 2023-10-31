import express from 'express';
import conn from './banco/db.js';
import router from './routes/router.js';

const application = express();

application.use(express.json());
application.use('/',router);

(async()=>{
       try{
          await conn.sync();
          console.log("Todos os modelos estão sincronizados com o banco de dados");
       }catch(err){
          console.error("Erro ao sincronizar os modelos com o banco de dados ",err);
       }
})();

application.listen(3000,()=>{
           console.log("O servidor estar rodando no endereço local: http://localhost:3000");
})