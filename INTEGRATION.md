# Integração com Frontend

## React/TypeScript

```typescript
// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function submitForm(landingPage: string, data: Record<string, any>) {
  const response = await fetch(`${API_URL}/submit/${landingPage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Erro ao enviar formulário')
  }

  return response.json()
}
```

## Exemplo de uso em componente

```typescript
// src/components/ContactForm.tsx
import { useState } from 'react'
import { submitForm } from '@/lib/api'

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      await submitForm('logistica', data)
      alert('Formulário enviado com sucesso!')
      e.currentTarget.reset()
    } catch (error) {
      alert('Erro ao enviar formulário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" placeholder="Nome" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="telefone" placeholder="Telefone" />
      <textarea name="mensagem" placeholder="Mensagem" />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
```

## Variáveis de ambiente no frontend

```env
# .env
VITE_API_URL=https://forms-api.coosdigital.com.br
```
