# 🚀 Forms API Client

Função utilitária para enviar formulários. **Copie e cole em qualquer projeto!**

## 📦 Instalação

### Opção 1: Copiar arquivo

```bash
# TypeScript
cp client/submitForm.ts src/lib/submitForm.ts

# JavaScript
cp client/submitForm.js src/lib/submitForm.js
```

### Opção 2: Download direto

```bash
# TypeScript
curl -o src/lib/submitForm.ts https://raw.githubusercontent.com/coos-digital/forms-api/master/client/submitForm.ts

# JavaScript
curl -o src/lib/submitForm.js https://raw.githubusercontent.com/coos-digital/forms-api/master/client/submitForm.js
```

## ⚙️ Configuração

### Variável de ambiente

```bash
# .env
VITE_FORMS_API_URL=https://forms-api.coosdigital.com.br
# ou
FORMS_API_URL=https://forms-api.coosdigital.com.br
```

### Ou configure direto no código

Edite a constante `API_URL` no arquivo:

```typescript
const API_URL = 'https://forms-api.coosdigital.com.br'
```

## 🎯 Uso

### Básico

```typescript
import { submitForm } from './lib/submitForm'

const result = await submitForm('logistica', {
  nome: 'João Silva',
  email: 'joao@example.com',
  telefone: '(11) 99999-9999',
  mensagem: 'Gostaria de mais informações'
})

if (result.success) {
  console.log('Enviado!', result.id)
}
```

### Com try/catch

```typescript
try {
  const result = await submitForm('contato', formData)
  alert('Formulário enviado com sucesso!')
} catch (error) {
  console.error('Erro:', error.message)
  alert('Erro ao enviar formulário')
}
```

### Com opções customizadas

```typescript
await submitForm('logistica', data, {
  apiUrl: 'https://api.production.com',
  timeout: 5000,
  headers: {
    'X-Custom-Header': 'value'
  }
})
```

## ⚛️ React

### Componente de formulário

```tsx
import { useState } from 'react'
import { submitForm } from '@/lib/submitForm'

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      await submitForm('logistica', data)
      alert('Enviado com sucesso!')
      e.currentTarget.reset()
    } catch (error) {
      alert('Erro ao enviar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" required />
      <input name="email" type="email" required />
      <button disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
```

### Com React Hook Form

```tsx
import { useForm } from 'react-hook-form'
import { submitForm } from '@/lib/submitForm'

export function ContactForm() {
  const { register, handleSubmit, formState } = useForm()

  const onSubmit = async (data) => {
    try {
      await submitForm('logistica', data)
      alert('Enviado!')
    } catch (error) {
      alert('Erro!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('nome', { required: true })} />
      <input {...register('email', { required: true })} />
      <button disabled={formState.isSubmitting}>Enviar</button>
    </form>
  )
}
```

### Com Hook customizado (incluído no arquivo)

```tsx
import { useSubmitForm } from '@/lib/submitForm'

export function ContactForm() {
  const { submit, loading, error } = useSubmitForm('logistica')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      await submit(data)
      alert('Enviado!')
    } catch (err) {
      // error já está setado no estado
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" />
      <input name="email" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
```

## 🎨 Exemplos Avançados

### Com validação antes de enviar

```typescript
const validateForm = (data) => {
  if (!data.email.includes('@')) {
    throw new Error('Email inválido')
  }
  if (data.telefone.length < 10) {
    throw new Error('Telefone inválido')
  }
}

try {
  validateForm(formData)
  await submitForm('logistica', formData)
} catch (error) {
  alert(error.message)
}
```

### Com loading state e toast

```typescript
import { toast } from 'sonner' // ou react-hot-toast

const handleSubmit = async (data) => {
  const toastId = toast.loading('Enviando...')

  try {
    await submitForm('logistica', data)
    toast.success('Enviado com sucesso!', { id: toastId })
  } catch (error) {
    toast.error('Erro ao enviar', { id: toastId })
  }
}
```

### Com retry automático

```typescript
async function submitWithRetry(formName, data, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await submitForm(formName, data)
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
```

## 🔧 API

### `submitForm(formName, data, options?)`

**Parâmetros:**
- `formName` (string) - Nome do formulário ('logistica', 'contato', etc)
- `data` (object) - Dados do formulário
- `options` (object, opcional)
  - `apiUrl` (string) - URL customizada da API
  - `headers` (object) - Headers HTTP adicionais
  - `timeout` (number) - Timeout em ms (padrão: 10000)

**Retorna:**
```typescript
{
  success: boolean
  id?: string        // ID do email enviado
  message?: string   // Mensagem de sucesso
  error?: string     // Mensagem de erro (se houver)
}
```

**Throws:**
- `Error` - Se a requisição falhar

### `useSubmitForm(formName, options?)` (React Hook)

**Parâmetros:**
- `formName` (string) - Nome do formulário
- `options` (object, opcional) - Mesmas opções de `submitForm`

**Retorna:**
```typescript
{
  submit: (data: object) => Promise<SubmitFormResponse>
  loading: boolean
  error: string | null
}
```

## 🌐 Outros Frameworks

### Vue.js

```vue
<script setup>
import { ref } from 'vue'
import { submitForm } from '@/lib/submitForm'

const loading = ref(false)

async function handleSubmit(event) {
  loading.value = true
  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData)

  try {
    await submitForm('logistica', data)
    alert('Enviado!')
  } catch (error) {
    alert('Erro!')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input name="nome" />
    <button :disabled="loading">Enviar</button>
  </form>
</template>
```

### Svelte

```svelte
<script>
  import { submitForm } from '$lib/submitForm'
  
  let loading = false

  async function handleSubmit(event) {
    loading = true
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    try {
      await submitForm('logistica', data)
      alert('Enviado!')
    } catch (error) {
      alert('Erro!')
    } finally {
      loading = false
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input name="nome" />
  <button disabled={loading}>Enviar</button>
</form>
```

### Vanilla JavaScript

```html
<form id="contact-form">
  <input name="nome" required />
  <input name="email" type="email" required />
  <button type="submit">Enviar</button>
</form>

<script type="module">
  import { submitForm } from './submitForm.js'

  document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      await submitForm('logistica', data)
      alert('Enviado com sucesso!')
      e.target.reset()
    } catch (error) {
      alert('Erro: ' + error.message)
    }
  })
</script>
```

## 💡 Dicas

✅ Configure a URL da API via variável de ambiente  
✅ Use try/catch para tratar erros  
✅ Adicione loading state para melhor UX  
✅ Valide dados antes de enviar  
✅ Mostre feedback visual (toast, alert, etc)  
✅ Limpe o formulário após envio bem-sucedido  

## 🆘 Troubleshooting

### CORS Error

Certifique-se que a API tem CORS habilitado (já está por padrão).

### Timeout

Aumente o timeout se necessário:

```typescript
await submitForm('logistica', data, { timeout: 30000 })
```

### Network Error

Verifique se a URL da API está correta e acessível.

## 📝 Licença

Livre para usar em qualquer projeto!
