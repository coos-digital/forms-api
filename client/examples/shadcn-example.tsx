/**
 * 📋 Exemplo com shadcn/ui + React Hook Form
 * 
 * Para o projeto logistica (que usa shadcn)
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { submitForm } from '../submitForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

interface FormData {
  nome: string
  email: string
  telefone?: string
  empresa?: string
  mensagem: string
}

export function LogisticaForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()
  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    try {
      const result = await submitForm('logistica', data)

      if (result.success) {
        toast({
          title: "Sucesso!",
          description: "Sua mensagem foi enviada. Entraremos em contato em breve.",
        })
        reset()
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome *</Label>
        <Input
          id="nome"
          {...register('nome', { required: 'Nome é obrigatório' })}
          placeholder="Seu nome completo"
        />
        {errors.nome && (
          <p className="text-sm text-red-500">{errors.nome.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido'
            }
          })}
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone</Label>
        <Input
          id="telefone"
          type="tel"
          {...register('telefone')}
          placeholder="(11) 99999-9999"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="empresa">Empresa</Label>
        <Input
          id="empresa"
          {...register('empresa')}
          placeholder="Nome da empresa"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensagem">Mensagem *</Label>
        <Textarea
          id="mensagem"
          {...register('mensagem', { required: 'Mensagem é obrigatória' })}
          placeholder="Como podemos ajudar?"
          rows={4}
        />
        {errors.mensagem && (
          <p className="text-sm text-red-500">{errors.mensagem.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
      </Button>
    </form>
  )
}
