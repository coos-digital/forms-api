import { Hono } from 'hono'
import logistica from './logistica/route'

const forms = new Hono()

forms.route('/logistica', logistica)
// Adicione mais rotas aqui:
// forms.route('/outro-form', outroForm)

export default forms
