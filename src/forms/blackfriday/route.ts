import { Hono } from 'hono'
import { handleBlackFriday } from './handler.tsx'

const blackfriday = new Hono()

blackfriday.post('/', handleBlackFriday)

export default blackfriday
