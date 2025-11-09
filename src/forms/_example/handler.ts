/**
 * EXEMPLO DE HANDLER
 * 
 * Este arquivo processa a requisição e envia o email.
 * Customize conforme necessário.
 */

import { render } from '@react-email/components'
import { Resend } from 'resend'
import type { Context } from 'hono'
import { ExampleEmail } from './template'
import { formsConfig } from '../config'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function handleExample(c: Context) {
  try {
    const body = await c.req.json()
    
    // Validação básica (customize conforme necessário)
    if (!body.email) {
      return c.json({ error: 'Email é obrigatório' }, 400)
    }

    const config = formsConfig.example
    
    // Se não tiver config, usa email padrão
    if (!config) {
      return c.json({ error: 'Formulário não configurado' }, 404)
    }
    const emailHtml = await render(<ExampleEmail data={body} />)

    const { data, error } = await resend.emails.send({
      from: 'forms@coosdigital.com.br',
      to: config.toEmail,
      subject: config.subject,
      html: emailHtml,
      // Opcional: enviar cópia para o usuário
      // replyTo: body.email,
    })

    if (error) {
      console.error('Erro ao enviar email:', error)
      return c.json({ error: error.message }, 500)
    }

    return c.json({ 
      success: true, 
      id: data?.id,
      message: 'Email enviado com sucesso!'
    })
  } catch (error) {
    console.error('Erro no handler:', error)
    return c.json({ error: 'Erro interno do servidor' }, 500)
  }
}
