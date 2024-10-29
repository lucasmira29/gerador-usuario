
# Gerador de Usuários

Este é um projeto que utiliza a API [Random User](https://randomuser.me/) para gerar usuários aleatórios e salvá-los em um banco de dados MongoDB. O projeto inclui uma interface web que permite visualizar, listar e deletar usuários, com o back-end hospedado na Vercel e o banco de dados no MongoDB Atlas.

## Índice

- [Instalação](#instalação)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/lucasmira29/gerador-usuario.git
   cd gerador-usuario
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```



## Tecnologias Utilizadas

- **Front-end**: HTML, CSS, JavaScript
- **Back-end**: Node.js, Express.js
- **Banco de Dados**: MongoDB Atlas
- **Hospedagem**: Vercel (back-end), MongoDB Atlas (banco de dados)

## Funcionalidades

- **Gerar Usuário**: Cria um usuário aleatório consumindo a API Random User e o exibe na interface.
- **Salvar Usuário**: Armazena os dados do usuário no MongoDB Atlas.
- **Listar Usuários**: Exibe todos os usuários cadastrados no banco de dados.
- **Deletar Usuário**: Remove o usuário do banco de dados com a opção de exclusão.

## Deploy

Para hospedar na Vercel:

1. Configure o MongoDB Atlas para permitir acesso global (IP `0.0.0.0/0`).
2. Suba o projeto para um repositório Git e conecte-o à Vercel.
3. Em **Settings > Environment Variables** na Vercel, configure `STRING_CONEXAO_BD` e `API_URL`.
4. Faça o deploy.

A URL gerada pela Vercel será o seu novo endpoint da API e deve ser configurada em `API_URL`.

## Endpoints da API

- **Gerar Usuário**: `POST /gerar-usuarios` - Gera um novo usuário e o salva no banco de dados.
- **Listar Usuários**: `GET /usuarios` - Lista todos os usuários salvos.
- **Deletar Usuário**: `DELETE /usuarios/:id` - Deleta um usuário pelo ID.

---

Projeto desenvolvido por Lucas de Mira.
