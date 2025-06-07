import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { AppDataSource } from '../ormconfig';
import lancamentoRoutes from './routes/lancamentoRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());
app.use(lancamentoRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Banco conectado ✅');
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco', err);
  });
