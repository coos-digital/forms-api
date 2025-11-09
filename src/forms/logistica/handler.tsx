/** @jsx React.createElement */
import React from 'react'
import { Resend } from 'resend'
import type { Context } from 'hono'
import { LogisticaEmail } from './template'
import { formsConfig } from '../config'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL || 'forms@example.com'

export async function handleLogistica(c: Context) {
  const body = await c.req.json()
  const config = formsConfig.logistica

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: config.toEmail,
    subject: config.subject,
    react: <LogisticaEmail data={body} />,
  })

  if (error) {
    return c.json({ error: error.message }, 500)
  }

  return c.json({ success: true, id: data?.id })
}
