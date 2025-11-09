/**
 * EXEMPLO DE TEMPLATE
 * 
 * Copie esta pasta e customize para criar um novo formulário.
 * 
 * Passos:
 * 1. Copie a pasta _example para o nome do seu form
 * 2. Customize este template
 * 3. Ajuste o handler.ts
 * 4. Registre em forms/index.ts
 */

import React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
  Button,
  Link,
} from '@react-email/components'
import type { FormData } from '../../types'

interface ExampleEmailProps {
  data: FormData
}

export function ExampleEmail({ data }: ExampleEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Heading style={styles.heading}>
            Novo Contato - Exemplo
          </Heading>
          
          <Hr style={styles.hr} />
          
          {/* Dados do formulário */}
          <Section>
            {Object.entries(data).map(([key, value]) => (
              <Text key={key} style={styles.field}>
                <strong style={styles.label}>{key}:</strong> {value}
              </Text>
            ))}
          </Section>
          
          {/* Call to Action (opcional) */}
          <Section style={styles.buttonContainer}>
            <Button
              href="https://coosdigital.com.br"
              style={styles.button}
            >
              Acessar Dashboard
            </Button>
          </Section>
          
          <Hr style={styles.hr} />
          
          {/* Footer */}
          <Text style={styles.footer}>
            Enviado via Forms API - Coos Digital
          </Text>
          
          <Text style={styles.footer}>
            <Link href="https://coosdigital.com.br" style={styles.link}>
              coosdigital.com.br
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '400',
    color: '#484848',
    padding: '17px 0 0',
  },
  hr: {
    borderColor: '#dfe1e4',
    margin: '24px 0',
  },
  field: {
    fontSize: '14px',
    lineHeight: '24px',
    color: '#484848',
    margin: '8px 0',
  },
  label: {
    color: '#000',
    textTransform: 'capitalize' as const,
  },
  buttonContainer: {
    textAlign: 'center' as const,
    margin: '32px 0',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '12px 24px',
  },
  footer: {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
    margin: '4px 0',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
}
