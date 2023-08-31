# API Pizzaria

**Pizzaria** é uma API que tem como objetivo, uma gestão interna de produtos de pizzarias, desde a criação de produtos até as ordens de serviços, com intuito de solicitar demandas de pedidos para clientes.
Api contempla toda gestão interna como:

* Cadastro de usuários
* Cadastro de valor do Item
* Ordens de pedidos
* Cadastro de Produtos
* E suas categorias

> Essa aplicação é feita para **Serviços de Pizzaria** em **NestJS**.

 * A api é construida através do framework **NestJS** que tem diversas dependencias para garantir a soluçao do serviço.
 * A API está em construção
 * A versão de compilação do core NestJS é a **9.0.0**
 * Atualmente usamos o *NPM ou Yarn* script **start:dev** para dar manutenção no código.


## Como instalar/buildar?
### 1- Clonar App

<details><summary><b>Mostrar instruções</b></summary>

* Após copiar o caminho do repositorio
* Crie um diretório (sem espaços e caracteres especiais)
* Abra o GitBash dentro da pasta criada e coloque o comando `git clone + url`
* *O Git irá clonar o projeto no seu PC*

</details>

### 2- Instalar todas as dependências

Na pasta do projeto, rodar o comando `npm i` para instalar todas as dependências.

<details><summary><b>Mostrar instruções</b></summary>

* Abra sua IDE ou Editor de códigos
* Digite `npm run start:dev` ou `yarn start:dev` no terminal para rodas em ambiente de desenvolvimento
* Para build do projeto usamos o script `npm run build` ou `yarn build`
</details>

### Detalhes
##### Váriaveis de Ambiente
<details><summary><b>Mostrar instruções</b></summary>

```
src
├── common
│   └── envs
│   │   ├── development.env
│   │   ├── production.env
│   │   ├── local.env
│   └── helpers
│   │   ├── env.helper.ts
...etc.
```

Para ambiente de desenvolvimento, digite no terminal: `npm run start:dev` \
Para ambiente de produçao, digite no terminal: `npm run start:prod`
</details>

#### Swagger
<details><summary><b>Mostrar instruções</b></summary>
Para acessar as rotas e documentaçao das rotas e suas propriedades basta acessar ao endpoint: http://localhost:5555/v1/docs

Para ver a documentaçao em JSON basta adicionar `-json` no fim do link: http://localhost:5555/v1/docs-json

Para ver a documentaçao em YML basta adicionar `-yaml` no fim do link: http://localhost:5555/v1/docs-yaml
</details>

#### Docker
<details><summary><b>Mostrar instruções</b></summary>

Para rodar a aplicaçao instale o Docker em sua máquina e utilize o comando `docker-compose up -d` para rodar em modo detached.

O Docker sobe os containers do NodeJS usando o NestJS como framework dependendo do serviço **db** que tem a imagem do Postgres para testarmos o funcionamento da API com a integraçao ao banco de dados.

As variavéis de ambientes do MySQL se encontram na pasta **src/common.envs**.
</details>

#### Rotas Usuário
<details><summary><b>Mostrar instruções</b></summary>

As rotas ficam no endereço **localhost:5555**

```http
POST localhost:5555/v1/user
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. e-mail válido para cadastrar usuário|
| `password` | `string` | **Obrigatório**. tamanho mínimo de 4 caractéres e máximo de 20 |
| `name` | `string` | **Obrigatório**. name válido para cadastrar usuário|


```http
GET localhost:5555/v1/user/${email}
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. e-mail cadastrado do usuário|
</details>
