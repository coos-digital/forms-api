import { render } from '@react-email/components'
import { Resend } from 'resend'
import type { Context } from 'hono'
import { LogisticaEmail } from './template'
import { formsConfig } from '../config'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function handleLogistica(c: Context) {
  const body = await c.req.json()
  const config = formsConfig.logistica

  const emailHtml = await render(<LogisticaEmail data={body} />)

  const { data, error } = await resend.emails.send({
    from: 'forms@coosdigital.com.br',
    to: config.toEmail,
    subject: config.subject,
    html: emailHtml,
  })

  if (error) {
    return c.json({ error: error.message }, 500)
  }

  return c.json({ success: true, id: data?.id })
}
