import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Resend } from 'resend'

const app = new Hono()

const resend = new Resend(process.env.RESEND_API_KEY)

// Mapeamento de landing pages para emails de destino
const emailMapping: Record<string, string> = {
  logistica: process.env.EMAIL_LOGISTICA || 'contato@example.com',
  // Adicione mais landing pages aqui
}

app.use('/*', cors())

app.get('/', (c) => c.text('Forms API - Coos Digital'))

app.post('/submit/:landingPage', async (c) => {
  const { landingPage } = c.req.param()
  const body = await c.req.json()

  const toEmail = emailMapping[landingPage]
  
  if (!toEmail) {
    return c.json({ error: 'Landing page não encontrada' }, 404)
  }

  const { data, error } = await resend.emails.send({
    from: 'forms@coosdigital.com.br',
    to: toEmail,
    subject: `Novo formulário - ${landingPage}`,
    html: `
      <h2>Novo formulário recebido</h2>
      <p><strong>Landing Page:</strong> ${landingPage}</p>
      <hr>
      <pre>${JSON.stringify(body, null, 2)}</pre>
    `,
  })

  if (error) {
    return c.json({ error: error.message }, 500)
  }

  return c.json({ success: true, id: data?.id })
})

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
}
