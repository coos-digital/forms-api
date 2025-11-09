# Arquitetura do Forms API

## 📁 Estrutura de Pastas

```
forms-api/
├── src/
│   ├── index.ts              # Entry point - monta todas as rotas
│   ├── types.ts              # Tipos TypeScript compartilhados
│   └── forms/
│       ├── index.ts          # Agrupa todas as rotas de formulários
│       ├── config.ts         # Configuração centralizada de formulários
│       │
│       ├── logistica/        # Módulo do formulário de logística
│       │   ├── route.ts      # Define a rota Hono
│       │   ├── handler.ts    # Lógica de processamento
│       │   └── template.tsx  # Template React Email
│       │
│       └── outro-form/       # Exemplo de novo formulário
│           ├── route.ts
│           ├── handler.ts
│           └── template.tsx
│
├── package.json
├── tsconfig.json
└── .env
```

## 🎯 Princípios de Design

### 1. **Modularidade**
Cada formulário é um módulo independente com sua própria pasta contendo:
- `route.ts` - Rotas HTTP
- `handler.ts` - Lógica de negócio
- `template.tsx` - Template de email

### 2. **Separação de Responsabilidades**
- **Routes**: Apenas definem endpoints e delegam para handlers
- **Handlers**: Processam dados e orquestram envio de email
- **Templates**: Apenas renderizam HTML do email
- **Config**: Centraliza configurações de todos os formulários

### 3. **Escalabilidade**
Adicionar um novo formulário é simples e não afeta os existentes.

### 4. **Type Safety**
TypeScript em todo o projeto garante segurança de tipos.

## 🚀 Como Adicionar um Novo Formulário

### Passo 1: Criar a estrutura de pastas

```bash
mkdir -p src/forms/meu-form
```

### Passo 2: Criar o template (`src/forms/meu-form/template.tsx`)

```tsx
import { Html, Body, Container, Heading, Text } from '@react-email/components'
import type { FormData } from '../../types'

interface MeuFormEmailProps {
  data: FormData
}

export function MeuFormEmail({ data }: MeuFormEmailProps) {
  return (
    <Html lang="pt-BR">
      <Body>
        <Container>
          <Heading>Novo Contato - Meu Form</Heading>
          <Text>Nome: {data.nome}</Text>
          <Text>Email: {data.email}</Text>
        </Container>
      </Body>
    </Html>
  )
}
```

### Passo 3: Criar o handler (`src/forms/meu-form/handler.ts`)

```typescript
import { render } from '@react-email/components'
import { Resend } from 'resend'
import type { Context } from 'hono'
import { MeuFormEmail } from './template'
import { formsConfig } from '../config'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function handleMeuForm(c: Context) {
  const body = await c.req.json()
  const config = formsConfig.meuForm

  const emailHtml = await render(<MeuFormEmail data={body} />)

  const { data, error } = await resend.emails.send({
    from: 'forms@coosdigital.com.br',
    to: config.toEmail,
    subject: config.subject,
    html: emailHtml,
  })

  if (error) {
    return c.json({ error: error.message }, 500)
  }

  return c.json({ success: true, id: data?.id })
}
```

### Passo 4: Criar a rota (`src/forms/meu-form/route.ts`)

```typescript
import { Hono } from 'hono'
import { handleMeuForm } from './handler'

const meuForm = new Hono()

meuForm.post('/', handleMeuForm)

export default meuForm
```

### Passo 5: Adicionar configuração (`src/forms/config.ts`)

```typescript
const DEFAULT_EMAIL = process.env.EMAIL_DEFAULT || 'contato@example.com'

export const formsConfig: Record<string, FormConfig> = {
  // ... outros forms
  meuForm: {
    id: 'meu-form',
    name: 'Meu Form',
    toEmail: process.env.EMAIL_MEU_FORM || DEFAULT_EMAIL, // ← Usa padrão se não especificado
    subject: 'Novo contato - Meu Form',
  },
}
```

### Passo 6: Registrar a rota (`src/forms/index.ts`)

```typescript
import meuForm from './meu-form/route'

const forms = new Hono()

forms.route('/logistica', logistica)
forms.route('/meu-form', meuForm)  // ← Adicione aqui

export default forms
```

### Passo 7: Adicionar variável de ambiente (`.env`)

```bash
# Opcional: apenas se quiser email específico
# Se não adicionar, usará o EMAIL_DEFAULT
EMAIL_MEU_FORM=destino@example.com
```

**Dica:** Se todos os forms vão para o mesmo email, basta configurar `EMAIL_DEFAULT` e não precisa adicionar variáveis específicas!

## 🎨 Customizando Templates

Os templates usam React Email, que oferece componentes otimizados para email:

```tsx
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
  Section,
  Row,
  Column,
  Link,
  Img,
} from '@react-email/components'
```

### Exemplo com mais componentes:

```tsx
export function RichEmail({ data }: EmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc' }}>
        <Container>
          <Img src="https://example.com/logo.png" alt="Logo" />
          
          <Heading>Bem-vindo!</Heading>
          
          <Text>Olá {data.nome},</Text>
          
          <Button href="https://example.com">
            Clique aqui
          </Button>
          
          <Hr />
          
          <Section>
            <Row>
              <Column>Coluna 1</Column>
              <Column>Coluna 2</Column>
            </Row>
          </Section>
          
          <Link href="https://example.com">Link</Link>
        </Container>
      </Body>
    </Html>
  )
}
```

## 🔧 Vantagens desta Arquitetura

✅ **DX Excelente**: Estrutura clara e previsível  
✅ **Fácil Manutenção**: Cada form é isolado  
✅ **Escalável**: Adicione infinitos formulários sem conflitos  
✅ **Type Safe**: TypeScript previne erros  
✅ **Templates Reutilizáveis**: React Email facilita criação de emails  
✅ **Hot Reload**: Bun recarrega automaticamente durante desenvolvimento  
✅ **Testável**: Cada módulo pode ser testado isoladamente  

## 📊 Fluxo de Dados

```
Frontend
   ↓
POST /submit/logistica
   ↓
src/index.ts (CORS + routing)
   ↓
src/forms/index.ts (agrupa rotas)
   ↓
src/forms/logistica/route.ts
   ↓
src/forms/logistica/handler.ts
   ↓
src/forms/logistica/template.tsx → React Email → HTML
   ↓
Resend API → Email enviado ✉️
```

## 🎯 Endpoints

- `GET /` - Info da API
- `POST /submit/logistica` - Envia formulário de logística
- `POST /submit/meu-form` - Envia formulário customizado
