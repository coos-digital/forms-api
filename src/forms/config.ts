import type { FormConfig } from '../types'

export const formsConfig: Record<string, FormConfig> = {
  logistica: {
    id: 'logistica',
    name: 'Logística',
    toEmail: process.env.EMAIL_LOGISTICA || 'contato@example.com',
    subject: 'Novo contato - Logística',
  },
  
  // Exemplo (descomente e customize para adicionar novo form)
  // example: {
  //   id: 'example',
  //   name: 'Example Form',
  //   toEmail: process.env.EMAIL_EXAMPLE || 'contato@example.com',
  //   subject: 'Novo contato - Example',
  // },
}

