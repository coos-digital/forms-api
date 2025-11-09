/**
 * 🚀 Forms API Client (JavaScript)
 * 
 * Função utilitária para enviar formulários para a Forms API.
 * Copie este arquivo para qualquer projeto e use!
 * 
 * @example
 * import { submitForm } from './submitForm.js'
 * 
 * const result = await submitForm('logistica', {
 *   nome: 'João',
 *   email: 'joao@example.com'
 * })
 */

// ⚙️ Configure a URL da sua API aqui
const API_URL = typeof import.meta !== 'undefined' 
  ? import.meta.env?.VITE_FORMS_API_URL 
  : process.env?.FORMS_API_URL || 'http://localhost:3000'

/**
 * Envia um formulário para a Forms API
 * 
 * @param {string} formName - Nome do formulário (ex: 'logistica', 'contato')
 * @param {Object} data - Dados do formulário
 * @param {Object} [options] - Opções adicionais
 * @param {string} [options.apiUrl] - URL customizada da API
 * @param {Object} [options.headers] - Headers adicionais
 * @param {number} [options.timeout=10000] - Timeout em ms
 * @returns {Promise<Object>} Resposta da API
 */
export async function submitForm(formName, data, options = {}) {
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

    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }

    throw error
  }
}

/**
 * Versão com callback (para compatibilidade)
 */
export function submitFormCallback(formName, data, callback, options = {}) {
  submitForm(formName, data, options)
    .then(result => callback(null, result))
    .catch(error => callback(error, null))
}
