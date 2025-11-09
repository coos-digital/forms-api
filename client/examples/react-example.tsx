/**
 * 📋 Exemplo de Integração - React + TypeScript
 * 
 * Copie este componente para o projeto logistica
 */

import { useState } from 'react'
import { submitForm } from '../submitForm'

export function LogisticaContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const result = await submitForm('logistica', data)
      
      if (result.success) {
        setSuccess(true)
        e.currentTarget.reset()
        
        // Opcional: scroll para o topo ou mostrar mensagem
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error) {
      console.error('Erro ao enviar:', error)
      alert('Erro ao enviar formulário. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
          ✅ Formulário enviado com sucesso! Entraremos em contato em breve.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium mb-1">
            Nome *
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="Seu nome completo"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block text-sm font-medium mb-1">
            Telefone
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            className="w-full px-3 py-2 border rounded"
            placeholder="(11) 99999-9999"
          />
        </div>

        <div>
          <label htmlFor="empresa" className="block text-sm font-medium mb-1">
            Empresa
          </label>
          <input
            id="empresa"
            name="empresa"
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Nome da empresa"
          />
        </div>

        <div>
          <label htmlFor="mensagem" className="block text-sm font-medium mb-1">
            Mensagem *
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            required
            rows={4}
            className="w-full px-3 py-2 border rounded"
            placeholder="Como podemos ajudar?"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>
    </div>
  )
}
