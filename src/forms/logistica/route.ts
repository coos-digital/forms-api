import { Hono } from 'hono'
import { handleLogistica } from './handler'

const logistica = new Hono()

logistica.post('/', handleLogistica)

export default logistica
