import type { FormConfig } from '../types'

const DEFAULT_EMAIL = process.env.EMAIL_DEFAULT || 'contato@example.com'

export const formsConfig: Record<string, FormConfig> = {
  logistica: {
    id: 'logistica',
    name: 'Logística',
    toEmail: process.env.EMAIL_LOGISTICA || DEFAULT_EMAIL,
    subject: 'Novo contato - Logística',
  },
  
  blackfriday: {
    id: 'blackfriday',
    name: 'Black Friday',
    toEmail: process.env.EMAIL_BLACKFRIDAY || DEFAULT_EMAIL,
    subject: 'Novo Pedido - Black Friday',
  },
  
  // Exemplo (descomente e customize para adicionar novo form)
  // example: {
  //   id: 'example',
  //   name: 'Example Form',
  //   toEmail: process.env.EMAIL_EXAMPLE || DEFAULT_EMAIL,
  //   subject: 'Novo contato - Example',
  // },
}

