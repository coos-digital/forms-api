/**
 * EXEMPLO DE ROTA
 * 
 * Define os endpoints HTTP para este formulário.
 * Você pode adicionar mais rotas se necessário (GET, PUT, DELETE, etc.)
 */

import { Hono } from 'hono'
import { handleExample } from './handler'

const example = new Hono()

// POST /submit/example
example.post('/', handleExample)

// Exemplo: adicionar endpoint GET para testar
// example.get('/', (c) => c.json({ message: 'Example form endpoint' }))

export default example
