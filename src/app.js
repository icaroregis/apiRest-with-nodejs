import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';

db.on('error', console.error.bind(console, 'Erro de conexão MongoDB:'));
db.once('open', () => {
  console.log('Conexão com MongoDB Atlas estabelecida com sucesso!');
});

const app = express();
app.use(express.json());
routes(app);

export default app;
