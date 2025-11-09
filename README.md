# Forms API - Coos Digital

API centralizada para envio de formulários de landing pages via email usando Hono + Resend + Bun.

## 🚀 Tecnologias

- **Hono** - Framework web ultrafast
- **Resend** - Serviço de envio de emails
- **Bun** - Runtime JavaScript/TypeScript

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
- `EMAIL_LOGISTICA`: Email de destino para a landing page de logística
- Adicione mais emails conforme necessário

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
POST /submit/:landingPage
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

## 🔧 Adicionar nova landing page

1. Adicione a variável de ambiente no `.env`:
```
EMAIL_NOVA_LANDING=destino@example.com
```

2. Adicione o mapeamento em `src/index.ts`:
```typescript
const emailMapping: Record<string, string> = {
  logistica: process.env.EMAIL_LOGISTICA || 'contato@example.com',
  novaLanding: process.env.EMAIL_NOVA_LANDING || 'contato@example.com',
}
```

## 📝 Licença

Coos Digital © 2025
