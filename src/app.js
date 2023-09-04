import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import manipulador404 from './middleware/manipulador404.js';
import manipuladorDeErros from './middleware/manipuladorDeErros.js';

db.on('error', console.error.bind(console, 'Erro de conexão MongoDB:'));
db.once('open', () => {
  console.log('Conexão com MongoDB Atlas estabelecida com sucesso!');
});

const app = express();
app.use(express.json());
routes(app);

//middlewares
app.use(manipuladorDeErros);
app.use(manipulador404);

export default app;
