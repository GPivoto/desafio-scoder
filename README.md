# Sistema de Lançamentos Contábeis - ContAI

## Descrição do Projeto

Este projeto é uma aplicação fullstack desenvolvida para a empresa ContAI, que visa otimizar o processo de registro e visualização de lançamentos contábeis. A aplicação permite cadastrar lançamentos financeiros e exibi-los organizados por mês e ano, facilitando a gestão financeira e a tomada de decisões.

O frontend foi desenvolvido em **React** com **TypeScript**, enquanto o backend utiliza **Express** com **TypeScript** e **TypeORM** conectado a um banco de dados relacional **PostgreSQL**.

---

## Funcionalidades

- Cadastro de lançamentos financeiros com os campos:

  - Data do lançamento (formato DD/MM/AAAA)
  - Descrição do lançamento
  - Valor (número positivo)
  - Tipo do lançamento (Crédito ou Débito)

- Validações:

  - Data válida
  - Valor positivo
  - Tipo deve ser "Crédito" ou "Débito"

- Visualização dos lançamentos:
  - Tabela agrupada por mês e ano
  - Exibição dos dados: Data, Descrição, Valor e Tipo
  - Totais mensais para créditos e débitos exibidos no final de cada mês

---

## Tecnologias Utilizadas

- **Frontend:**

  - React
  - TypeScript
  - Axios (para requisições HTTP)
  - Tailwind CSS (estilização)

- **Backend:**
  - Node.js com Express
  - TypeScript
  - TypeORM (para comunicação com o banco)
  - PostgreSQL (banco de dados relacional)

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado (versão 16 ou superior recomendada)
- PostgreSQL instalado e configurado

### Configuração do Backend

1. Acesse a pasta do backend:

   ```bash
   cd backend

   ```

2. Instale as dependências:
   npm install

3. Configure o arquivo .env com as informações do banco PostgreSQL (crie o arquivo se não existir):
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   PORT=5000

4. Execute as migrations para criar as tabelas no banco:
   npm run typeorm migration:run

5. Inicie o servidor backend:
   npm run dev

Configuração do Frontend
1.Acesse a pasta do frontend:

    cd frontend

2.Instale as dependências:
    npm install

3.Configure o arquivo de ambiente para apontar para o backend (exemplo .env.local):

VITE_API_URL=http://localhost:5000

4.Inicie a aplicação React:

npm run dev

5.Abra o navegador e acesse:

http://localhost:3000
