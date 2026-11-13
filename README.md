# ConsulTech – Gestão de Consultores

**Integrantes:** Rafael dos Santos Souza Oliveira e Shara Marillia Alencar Guimarães

**Objetivo:** API para cadastro e consulta de consultores, permitindo à empresa
saber quem está disponível e quais são suas especialidades.

## Tecnologias
Node.js · Express · MySQL · Docker · Jest · Supertest

## Como executar
```bash
docker compose up --build
```
A API ficará disponível em http://localhost:3000

## Endpoints
- `GET /consultores` – lista os consultores
- `POST /consultores` – cadastra um consultor (exemplo de JSON abaixo)

## Testes
```bash
npm install
npm test
```