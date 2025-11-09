# Forms API - Coos Digital

API centralizada para envio de formulários de landing pages via email usando **Hono + Resend + React Email + Bun**.

## 🚀 Tecnologias

- **Hono** - Framework web ultrafast
- **Resend** - Serviço de envio de emails
- **React Email** - Templates de email com React
- **Bun** - Runtime JavaScript/TypeScript

## ⚡ Quick Start

**Novo por aqui?** Leia o [QUICKSTART.md](./QUICKSTART.md) para começar em 5 minutos!

## 📦 Instalação

```bash
bun install
```

## ⚙️ Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure suas variáveis de ambiente:
- `RESEND_API_KEY`: Sua chave da API Resend
- `FROM_EMAIL`: Email de origem (remetente)
- `EMAIL_DEFAULT`: Email padrão para todos os formulários
- `EMAIL_LOGISTICA`: (Opcional) Email específico para logística
- Adicione mais emails específicos conforme necessário

## 🏃 Executar

```bash
# Desenvolvimento (com hot reload)
bun run dev

# Produção
bun start
```

## 📡 Uso

### Endpoint

```
POST /submit/:formName
```

### Exemplo de requisição

```bash
curl -X POST http://localhost:3000/submit/logistica \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "(11) 99999-9999",
    "mensagem": "Gostaria de mais informações"
  }'
```

### Resposta de sucesso

```json
{
  "success": true,
  "id": "4ef2ae98-7ab1-4edd-9cb1-3e8f3e3e3e3e"
}
```

## 📁 Arquitetura

Este projeto segue uma arquitetura modular onde cada formulário é um módulo independente.

**Leia a documentação completa:** [ARCHITECTURE.md](./ARCHITECTURE.md)

```
src/
├── index.ts              # Entry point
├── types.ts              # Tipos compartilhados
└── forms/
    ├── index.ts          # Agrupa rotas
    ├── config.ts         # Configurações
    └── logistica/        # Módulo do formulário
        ├── route.ts      # Rota HTTP
        ├── handler.ts    # Lógica
        └── template.tsx  # Template React Email
```

## 🔧 Adicionar novo formulário

Veja o guia completo em [ARCHITECTURE.md](./ARCHITECTURE.md#-como-adicionar-um-novo-formulário)

**Resumo:**
1. Criar pasta `src/forms/meu-form/`
2. Criar `template.tsx`, `handler.ts`, `route.ts`
3. Adicionar config em `config.ts`
4. Registrar rota em `forms/index.ts`
5. Adicionar variável de ambiente

## 📚 Documentação

- [Arquitetura](./ARCHITECTURE.md) - Estrutura e padrões do projeto
- [Integração Frontend](./INTEGRATION.md) - Como integrar com React
- **[Client Utility](./client/README.md) - Função pronta para copiar e usar** ⭐

## 🎯 Uso no Frontend

### Copie a função utilitária

```bash
# TypeScript
curl -o src/lib/submitForm.ts https://raw.githubusercontent.com/coos-digital/forms-api/master/client/submitForm.ts

# JavaScript
curl -o src/lib/submitForm.js https://raw.githubusercontent.com/coos-digital/forms-api/master/client/submitForm.js
```

### Use no seu projeto

```typescript
import { submitForm } from '@/lib/submitForm'

// Configure a URL da API no .env
// VITE_FORMS_API_URL=https://forms-api.coosdigital.com.br

const result = await submitForm('logistica', {
  nome: 'João Silva',
  email: 'joao@example.com',
  mensagem: 'Gostaria de mais informações'
})

if (result.success) {
  console.log('Enviado!', result.id)
}
```

Veja mais exemplos em [client/README.md](./client/README.md)

## 📚 Documentação

## 📝 Licença

Coos Digital © 2025

