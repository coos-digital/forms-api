import React from 'react'
import { Resend } from 'resend'
import type { Context } from 'hono'
import { BlackFridayEmail } from './template'
import { formsConfig } from '../config'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL || 'forms@example.com'

export async function handleBlackFriday(c: Context) {
  try {
    const body = await c.req.json()
    
    const config = formsConfig.blackfriday
    
    if (!config) {
      return c.json({ error: 'Formulário não configurado' }, 404)
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: config.toEmail,
      subject: config.subject,
      react: <BlackFridayEmail data={body} />,
    })

    if (error) {
      console.error('Erro ao enviar email:', error)
      return c.json({ error: error.message }, 500)
    }

    return c.json({ 
      success: true, 
      id: data?.id,
      message: 'Pedido enviado com sucesso!'
    })
  } catch (error) {
    console.error('Erro no handler:', error)
    return c.json({ error: 'Erro interno do servidor' }, 500)
  }
}
