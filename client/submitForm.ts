/**
 * 🚀 Forms API Client
 * 
 * Função utilitária para enviar formulários para a Forms API.
 * Copie este arquivo para qualquer projeto e use!
 * 
 * @example
 * ```ts
 * import { submitForm } from './submitForm'
 * 
 * const result = await submitForm('logistica', {
 *   nome: 'João',
 *   email: 'joao@example.com'
 * })
 * ```
 */

// ⚙️ Configure a URL da sua API aqui
const API_URL = import.meta.env.VITE_FORMS_API_URL || 
                process.env.FORMS_API_URL || 
                'http://localhost:3000'

export interface SubmitFormResponse {
  success: boolean
  id?: string
  message?: string
  error?: string
}

export interface SubmitFormOptions {
  /** URL customizada da API (sobrescreve a padrão) */
  apiUrl?: string
  /** Headers adicionais */
  headers?: Record<string, string>
  /** Timeout em ms (padrão: 10000) */
  timeout?: number
}

/**
 * Envia um formulário para a Forms API
 * 
 * @param formName - Nome do formulário (ex: 'logistica', 'contato')
 * @param data - Dados do formulário
 * @param options - Opções adicionais
 * @returns Resposta da API
 * 
 * @example
 * ```ts
 * // Uso básico
 * await submitForm('logistica', { nome: 'João', email: 'joao@example.com' })
 * 
 * // Com opções
 * await submitForm('contato', data, {
 *   apiUrl: 'https://api.production.com',
 *   timeout: 5000
 * })
 * ```
 */
export async function submitForm(
  formName: string,
  data: Record<string, any>,
  options: SubmitFormOptions = {}
): Promise<SubmitFormResponse> {
  const {
    apiUrl = API_URL,
    headers = {},
    timeout = 10000,
  } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(`${apiUrl}/submit/${formName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}`)
    }

    return result
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }

    throw new Error('Unknown error')
  }
}

/**
 * Hook React para enviar formulários (opcional)
 * 
 * @example
 * ```tsx
 * const { submit, loading, error } = useSubmitForm('logistica')
 * 
 * const handleSubmit = async (data) => {
 *   const result = await submit(data)
 *   if (result.success) {
 *     alert('Enviado!')
 *   }
 * }
 * ```
 */
export function useSubmitForm(formName: string, options?: SubmitFormOptions) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (data: Record<string, any>) => {
    setLoading(true)
    setError(null)

    try {
      const result = await submitForm(formName, data, options)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao enviar'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, error }
}

// Para usar em React, importe useState
let useState: any
try {
  // @ts-ignore
  useState = require('react').useState
} catch {
  // Não está em ambiente React
}
