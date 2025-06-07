
import { useState } from 'react';
import Formulario from './components/TransactionForm';
import TabelaLancamentos from './components/TransactionTable';

function App() {
  const [atualizar, setAtualizar] = useState(false);

  const handleNovoLancamento = () => {
    setAtualizar(!atualizar);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">ContAI - Lançamentos</h1>
      <Formulario onNovoLancamento={handleNovoLancamento} />
      <TabelaLancamentos key={String(atualizar)} />
    </div>
  );
}

export default App;
