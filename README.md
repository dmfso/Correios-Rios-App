# Correios Rios — Protótipo de envio via barco

Protótipo funcional (React + Vite) do fluxo:

**Abrir app → Pedir envio → Opções de entrega → Pedido feito**

Feito como parte do redesenho da interface de logística fluvial da agência
flutuante dos Correios.

## Rodando localmente

Pré-requisitos: [Node.js](https://nodejs.org) 18+ instalado.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
  App.jsx      -> todo o fluxo (4 telas) e estilos
  main.jsx     -> ponto de entrada React
index.html
```

## Stack

- React 18
- Vite
- lucide-react (ícones)
