# 🚀 Quick Start Guide

## 📦 Setup Inicial (5 minutos)

### 1. Instalar Bun (se não tiver)

```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Instalar dependências

```bash
bun install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` e adicione sua chave do Resend:

```bash
RESEND_API_KEY=re_sua_chave_aqui
EMAIL_LOGISTICA=seu-email@example.com
```

### 4. Rodar o servidor

```bash
bun run dev
```

Pronto! API rodando em `http://localhost:3000` 🎉

---

## 🎯 Criar Novo Formulário (10 minutos)

### Passo 1: Copiar template

```bash
cp -r src/forms/_example src/forms/contato
```

### Passo 2: Editar template de email

Abra `src/forms/contato/template.tsx`:

```tsx
// Renomeie ExampleEmail para ContatoEmail
export function ContatoEmail({ data }: ContatoEmailProps) {
  return (
    <Html lang="pt-BR">
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading>Novo Contato</Heading>
          
          <Text>Nome: {data.nome}</Text>
          <Text>Email: {data.email}</Text>
          <Text>Mensagem: {data.mensagem}</Text>
        </Container>
      </Body>
    </Html>
  )
}
```

### Passo 3: Editar handler

Abra `src/forms/contato/handler.ts`:

```tsx
import { ContatoEmail } from './template'

export async function handleContato(c: Context) {
  const body = await c.req.json()
  const config = formsConfig.contato  // ← mude aqui
  
  const emailHtml = await render(<ContatoEmail data={body} />)
  
  // ... resto do código
}
```

### Passo 4: Editar rota

Abra `src/forms/contato/route.ts`:

```tsx
import { handleContato } from './handler'

const contato = new Hono()
contato.post('/', handleContato)

export default contato
```

### Passo 5: Adicionar configuração

Abra `src/forms/config.ts`:

```tsx
export const formsConfig: Record<string, FormConfig> = {
  logistica: { /* ... */ },
  
  contato: {
    id: 'contato',
    name: 'Contato',
    toEmail: process.env.EMAIL_CONTATO || 'contato@example.com',
    subject: 'Novo contato do site',
  },
}
```

### Passo 6: Registrar rota

Abra `src/forms/index.ts`:

```tsx
import logistica from './logistica/route'
import contato from './contato/route'  // ← adicione

const forms = new Hono()

forms.route('/logistica', logistica)
forms.route('/contato', contato)  // ← adicione

export default forms
```

### Passo 7: Adicionar variável de ambiente

Adicione no `.env`:

```bash
EMAIL_CONTATO=contato@seusite.com
```

### Passo 8: Testar!

```bash
curl -X POST http://localhost:3000/submit/contato \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "mensagem": "Olá, gostaria de mais informações"
  }'
```

Resposta esperada:

```json
{
  "success": true,
  "id": "abc123...",
  "message": "Email enviado com sucesso!"
}
```

---

## 🎨 Customizar Template de Email

### Componentes disponíveis

```tsx
import {
  Html,        // Container HTML
  Head,        // Head do HTML
  Body,        // Body do HTML
  Container,   // Container centralizado
  Heading,     // Títulos (h1, h2, etc)
  Text,        // Parágrafos
  Button,      // Botões com link
  Link,        // Links
  Hr,          // Linha horizontal
  Section,     // Seção
  Row,         // Linha (grid)
  Column,      // Coluna (grid)
  Img,         // Imagem
} from '@react-email/components'
```

### Exemplo completo

```tsx
export function MeuEmail({ data }: Props) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc' }}>
        <Container style={{ maxWidth: '600px' }}>
          
          {/* Logo */}
          <Img 
            src="https://seusite.com/logo.png" 
            alt="Logo"
            width="150"
          />
          
          {/* Título */}
          <Heading style={{ fontSize: '24px' }}>
            Novo Contato
          </Heading>
          
          {/* Conteúdo */}
          <Text>Nome: {data.nome}</Text>
          <Text>Email: {data.email}</Text>
          
          <Hr />
          
          {/* Grid de 2 colunas */}
          <Section>
            <Row>
              <Column>
                <Text>Telefone:</Text>
                <Text>{data.telefone}</Text>
              </Column>
              <Column>
                <Text>Empresa:</Text>
                <Text>{data.empresa}</Text>
              </Column>
            </Row>
          </Section>
          
          {/* Botão */}
          <Button
            href="https://seusite.com/dashboard"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '5px',
            }}
          >
            Ver no Dashboard
          </Button>
          
          {/* Footer */}
          <Text style={{ fontSize: '12px', color: '#999' }}>
            Enviado via Forms API
          </Text>
          
        </Container>
      </Body>
    </Html>
  )
}
```

---

## 🔧 Dicas de DX

### Hot Reload

O Bun recarrega automaticamente quando você salva arquivos. Não precisa reiniciar o servidor!

### TypeScript

Use autocomplete do seu editor:
- `Ctrl + Space` para ver propriedades disponíveis
- Hover sobre tipos para ver documentação

### Estrutura de pastas

```
src/forms/
├── _example/          ← Template para copiar
├── logistica/         ← Form de logística
├── contato/           ← Seu novo form
├── config.ts          ← Configurações
└── index.ts           ← Registro de rotas
```

### Debugging

Adicione logs no handler:

```tsx
export async function handleContato(c: Context) {
  const body = await c.req.json()
  console.log('📧 Dados recebidos:', body)
  
  // ... resto do código
}
```

---

## 📚 Próximos Passos

- ✅ Leia [ARCHITECTURE.md](./ARCHITECTURE.md) para entender a estrutura
- ✅ Veja [INTEGRATION.md](./INTEGRATION.md) para integrar com frontend
- ✅ Customize templates em `src/forms/*/template.tsx`
- ✅ Adicione validações em `src/forms/*/handler.ts`

---

## 🆘 Problemas Comuns

### Erro: "RESEND_API_KEY is not defined"

Solução: Configure o `.env` com sua chave do Resend.

### Erro: "Form not found"

Solução: Verifique se registrou a rota em `src/forms/index.ts`.

### Email não chega

Solução: 
1. Verifique se o email de destino está correto no `.env`
2. Confira se o domínio está verificado no Resend
3. Veja os logs do console para erros

### TypeScript errors

Solução: Rode `bun install` para instalar todas as dependências.

---

## 💬 Suporte

Dúvidas? Abra uma issue no GitHub ou consulte a documentação completa.
