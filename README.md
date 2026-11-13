# ConsulTech – Gestão de Consultores

**Integrantes:** Rafael dos Santos Souza Oliveira e Shara Marillia Alencar Guimarães

**Objetivo:** API para cadastro e consulta de consultores, permitindo à empresa
saber quem está disponível e quais são suas especialidades.

## Tecnologias
Node.js · Express · MySQL · Docker · Jest · Supertest

## Como executar

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e **aberto** (aguarde aparecer "Engine running").

### Passo a passo

1. Abra um terminal na pasta raiz do projeto (a que contém o arquivo `docker-compose.yml`).

2. Suba a aplicação e o banco de dados:

   ```cmd
   docker compose up --build
   ```

3. Aguarde a primeira execução (pode levar alguns minutos, pois as imagens são baixadas). A aplicação estará pronta quando aparecerem estas mensagens no terminal:

   ```
   Banco de dados conectado e tabelas prontas.
   ConsulTech rodando na porta 3000
   ```

   > Mensagens como "Banco indisponível (tentativa 1/10)" são normais: a API aguarda o MySQL terminar de iniciar.

4. Acesse a API em `http://localhost:3000/consultores` no navegador. Na primeira execução, a resposta será uma lista vazia (`[]`).

O comando `docker compose up --build` sobe dois containers: o **MySQL** (banco de dados) e a **API** (Node.js + Express). As tabelas `consultores` e `especialidades` são criadas automaticamente na inicialização.

### Testando a API

**Cadastrar um consultor** (`POST /consultores`):

```json
{
  "nome": "Joaquim Barros",
  "especialidades": ["PHP", "Cloud"],
  "experiencia": 5,
  "disponivel": true,
  "contato": "joaquim@email.com"
}
```

Resposta esperada: status `201 Created`, com o consultor e o `id` gerado.

**Listar os consultores** (`GET /consultores`): resposta com status `200 OK` e a lista de consultores cadastrados.

**Regra de negócio:** todo consultor deve possuir pelo menos uma especialidade. Um cadastro com `"especialidades": []` retorna status `400 Bad Request`.

Os testes podem ser feitos com Postman, Thunder Client ou pelo terminal (PowerShell):

```powershell
Invoke-RestMethod -Uri http://localhost:3000/consultores -Method Post -ContentType "application/json" -Body '{"nome":"Joaquim Barros","especialidades":["PHP","Cloud"],"experiencia":5,"disponivel":true,"contato":"joaquim@email.com"}'

Invoke-RestMethod -Uri http://localhost:3000/consultores
```

### Executando os testes automatizados

Os testes usam Jest e Supertest e não precisam do Docker nem do banco de dados. É necessário ter o Node.js instalado.

```cmd
npm install
npm test
```

### Parando a aplicação

- Para parar, pressione `Ctrl + C` no terminal onde a aplicação está rodando.
- Para remover os containers mantendo os dados do banco: `docker compose down`
- Para remover os containers **e apagar os dados** do banco: `docker compose down -v`

### Acessando o banco de dados (opcional)

O MySQL fica disponível no computador com os dados abaixo (por exemplo, no DBeaver ou MySQL Workbench):

| Campo | Valor |
|---|---|
| Host | `localhost` |
| Porta | `3307` |
| Usuário | `consultech` |
| Senha | `consultech` |
| Banco | `consultech` |

Também é possível consultar os dados pelo terminal:

```cmd
docker compose exec db mysql -uconsultech -pconsultech consultech -e "SELECT * FROM consultores; SELECT * FROM especialidades;"
```

## Endpoints
- `GET /consultores` – lista os consultores
- `POST /consultores` – cadastra um consultor (exemplo de JSON abaixo)

## Testes
```cmd
npm install
npm test
```
