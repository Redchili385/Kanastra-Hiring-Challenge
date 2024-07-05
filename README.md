# Kanastra Hiring Challenge (Soft. Engineers Backend) - Take Home

Desafio técnico para a posição de Software Engineering Full-stack.

Este repositório contém a solução do desafio descrito neste link: https://kanastra.notion.site/Hiring-Challenge-Soft-Engineers-Backend-Take-Home-65cd4195a1ff42f68ff446f8859d2d7f

Devido às limitações de tempo, alguns pontos das informações importantes não foram totalmente implementados

Este projeto visa seguir os padrões de arquitetura propostos no livro Clean Architecture: A Craftsman's Guide to Software Structure and Design, escrito por Robert Cecil Martin.

Este é um projeto executado em Node.js e escrito na linguagem Typescript. O Framework utilizado em requisições HTTP foi o Express.

# Configuração

Para executar o projeto há duas maneiras

- Instale o docker e rode o comando "docker-compose up"
- Instale o node e o npm e execute "npm install" (Node 20 recomendado)

# Execução

Com o comando docker-compose, o app já é executado na porta 3000, utilizando o npm local, basta inserir o comando "npm install"

# Testes

No momento, os testes podem ser executados localmente utilizando o comando "npm test"

# Utilização da API

Para enviar o arquivo input.csv, basta enviar uma solicitação POST para "http://localhost:3000/debts" se estiver rodando com o docker localmente, e enviar utilizando o form-data com a chave "input" e selecionando o arquivo input.csv.

O servidor irá printar no console os processos necessários, abstraidos, e retornará 200 em caso de sucesso.
