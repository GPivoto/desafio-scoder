// src/components/ListaLancamentos.tsx
import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Lancamento {
  id: number;
  data: string;
  descricao: string;
  valor: number | string; // Pode vir string da API, por isso mantemos assim aqui
  tipo: 'Crédito' | 'Débito';
}

export default function ListaLancamentos({ atualizar }: { atualizar: boolean }) {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

  useEffect(() => {
    const fetchLancamentos = async () => {
      try {
        const response = await api.get('/lancamentos');
        setLancamentos(response.data);
      } catch (err) {
        console.error('Erro ao buscar lançamentos:', err);
      }
    };

    fetchLancamentos();
  }, [atualizar]);

  // Agrupar por mês/ano
  const agrupados = lancamentos.reduce((acc: Record<string, Lancamento[]>, lanc) => {
    const data = new Date(lanc.data);
    if (isNaN(data.getTime())) return acc;

    const mesAno = data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    if (!acc[mesAno]) acc[mesAno] = [];
    acc[mesAno].push(lanc);
    return acc;
  }, {});

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {Object.entries(agrupados).map(([mesAno, lancs]) => {
        const totalCredito = lancs
          .filter(l => l.tipo === 'Crédito')
          .reduce((soma, l) => soma + (Number(l.valor) || 0), 0);

        const totalDebito = lancs
          .filter(l => l.tipo === 'Débito')
          .reduce((soma, l) => soma + (Number(l.valor) || 0), 0);

        return (
          <div key={mesAno} className="mb-6 border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{mesAno}</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {lancs.map((lanc) => (
                  <tr key={lanc.id}>
                    <td>{new Date(lanc.data).toLocaleDateString()}</td>
                    <td>{lanc.descricao}</td>
                    <td>R$ {(Number(lanc.valor) || 0).toFixed(2)}</td>
                    <td>{lanc.tipo}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="font-bold">Totais:</td>
                  <td className="text-green-600">R$ {totalCredito.toFixed(2)}</td>
                  <td className="text-red-600">R$ {totalDebito.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}
    </div>
  );
}
