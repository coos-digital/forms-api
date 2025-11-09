import { Hono } from 'hono'
import { cors } from 'hono/cors'
import forms from './forms'

const app = new Hono()

app.use('/*', cors())

app.get('/', (c) => c.json({
  name: 'Forms API - Coos Digital',
  version: '1.0.0',
  forms: ['logistica'],
}))

app.route('/submit', forms)

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
}

