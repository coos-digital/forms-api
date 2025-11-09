# 📋 Template de Exemplo

Esta pasta serve como template para criar novos formulários.

## 🚀 Como usar este template

### 1. Copie a pasta

```bash
cp -r src/forms/_example src/forms/meu-form
```

### 2. Renomeie os componentes

Em `template.tsx`:
- `ExampleEmail` → `MeuFormEmail`

Em `handler.ts`:
- `handleExample` → `handleMeuForm`
- `ExampleEmail` → `MeuFormEmail`
- `formsConfig.example` → `formsConfig.meuForm`

Em `route.ts`:
- `example` → `meuForm`
- `handleExample` → `handleMeuForm`

### 3. Adicione a configuração

Em `src/forms/config.ts`:

```typescript
export const formsConfig: Record<string, FormConfig> = {
  // ... outros
  meuForm: {
    id: 'meu-form',
    name: 'Meu Form',
    toEmail: process.env.EMAIL_MEU_FORM || 'contato@example.com',
    subject: 'Novo contato - Meu Form',
  },
}
```

### 4. Registre a rota

Em `src/forms/index.ts`:

```typescript
import meuForm from './meu-form/route'

forms.route('/meu-form', meuForm)
```

### 5. Adicione variável de ambiente

Em `.env`:

```bash
EMAIL_MEU_FORM=destino@example.com
```

### 6. Teste!

```bash
curl -X POST http://localhost:3000/submit/meu-form \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste", "email": "teste@example.com"}'
```

## 📝 Estrutura dos arquivos

- **template.tsx** - Visual do email (React Email)
- **handler.ts** - Lógica de processamento e envio
- **route.ts** - Definição de endpoints HTTP

## 💡 Dicas

- Customize os estilos em `template.tsx`
- Adicione validações em `handler.ts`
- Use componentes do React Email para emails responsivos
- Mantenha a separação de responsabilidades
