import { Hono } from 'hono'
import logistica from './logistica/route'
import blackfriday from './blackfriday/route'

const forms = new Hono()

forms.route('/logistica', logistica)
forms.route('/blackfriday', blackfriday)
// Adicione mais rotas aqui:
// forms.route('/outro-form', outroForm)

export default forms
