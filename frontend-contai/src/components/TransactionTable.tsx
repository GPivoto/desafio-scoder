import { useEffect, useState } from 'react';
import { api } from '../services/api';

type Lancamento = {
  id: number;
  data: string;
  descricao: string;
  valor: number;
  tipo: 'Crédito' | 'Débito';
};

type Agrupados = {
  [mesAno: string]: Lancamento[];
};

export default function TabelaLancamentos() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

  useEffect(() => {
    async function carregarLancamentos() {
      const { data } = await api.get('/lancamentos');

      // Garante que 'valor' será tratado como número
      const lancamentosConvertidos: Lancamento[] = data.map((l: any) => ({
        ...l,
        valor: Number(l.valor),
      }));

      setLancamentos(lancamentosConvertidos);
    }

    carregarLancamentos();
  }, []);

  const agrupados: Agrupados = lancamentos.reduce((acc, lancamento) => {
    const dataObj = new Date(lancamento.data);
    const mesAno = dataObj.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    if (!acc[mesAno]) acc[mesAno] = [];
    acc[mesAno].push(lancamento);

    return acc;
  }, {} as Agrupados);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {Object.entries(agrupados).map(([mesAno, lista]) => {
        const totalCredito = lista
          .filter(l => l.tipo === 'Crédito')
          .reduce((soma, l) => soma + Number(l.valor), 0);

        const totalDebito = lista
          .filter(l => l.tipo === 'Débito')
          .reduce((soma, l) => soma + Number(l.valor), 0);

        return (
          <div key={mesAno} className="mb-8 border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">{mesAno}</h2>
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
                {lista.map(l => (
                  <tr key={l.id}>
                    <td>{new Date(l.data).toLocaleDateString()}</td>
                    <td>{l.descricao}</td>
                    <td>R$ {Number(l.valor).toFixed(2)}</td>
                    <td>{l.tipo}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold border-t">
                  <td colSpan={2}>Totais</td>
                  <td className="text-green-600">Crédito: R$ {totalCredito.toFixed(2)}</td>
                  <td className="text-red-600">Débito: R$ {totalDebito.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}
    </div>
  );
}
