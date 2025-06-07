import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Lancamento } from '../entities/Lancamento';

export const criarLancamento = async (req: Request, res: Response) => {
  try {
    const repo = AppDataSource.getRepository(Lancamento);
    const { data, descricao, valor, tipo } = req.body;

    const novo = repo.create({ data, descricao, valor, tipo });
    await repo.save(novo);

    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar lançamento' });
  }
};

export const listarLancamentos = async (_: Request, res: Response) => {
  try {
    const repo = AppDataSource.getRepository(Lancamento);
    const lista = await repo.find();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar lançamentos' });
  }
};
