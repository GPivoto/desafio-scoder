import { useState } from 'react';
import { api } from '../services/api';

export default function Formulario({ onNovoLancamento }: { onNovoLancamento: () => void }) {
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'Crédito' | 'Débito'>('Crédito');

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validações
  const dataRegex = /^\d{4}-\d{2}-\d{2}$/; // yyyy-mm-dd (padrão HTML)
  if (!dataRegex.test(data)) {
    alert("Data inválida. Use o formato DD/MM/AAAA.");
    return;
  }

  if (parseFloat(valor) <= 0) {
    alert("O valor deve ser maior que zero.");
    return;
  }

  if (!['Crédito', 'Débito'].includes(tipo)) {
    alert("Tipo inválido. Escolha Crédito ou Débito.");
    return;
  }

  try {
    await api.post('/lancamentos', {
      data,
      descricao,
      valor: parseFloat(valor),
      tipo,
    });

    setData('');
    setDescricao('');
    setValor('');
    onNovoLancamento();
  } catch (err) {
    console.error("Erro ao cadastrar lançamento:", err);
    alert("Erro ao cadastrar. Tente novamente.");
  }
};



  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md mx-auto p-4 border">
      <input type="date" value={data} onChange={e => setData(e.target.value)} required />
      <input type="text" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
      <input type="number" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} required />
      <select value={tipo} onChange={e => setTipo(e.target.value as 'Crédito' | 'Débito')}>
        <option value="Crédito">Crédito</option>
        <option value="Débito">Débito</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white py-1 px-3">Cadastrar</button>
    </form>
  );
}