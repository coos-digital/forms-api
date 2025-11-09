/**
 * EXEMPLO DE TEMPLATE
 * 
 * Copie esta pasta e customize para criar um novo formulário.
 */

import React from 'react'
import { Text, Section, Button } from '@react-email/components'
import type { FormData } from '../../types'
import { BaseEmailTemplate } from '../shared/BaseEmailTemplate'

interface ExampleEmailProps {
  data: FormData
}

export function ExampleEmail({ data }: ExampleEmailProps) {
  return (
    <BaseEmailTemplate title="Novo Contato - Exemplo">
      {/* Dados do formulário */}
      <Section>
        {Object.entries(data).map(([key, value]) => (
          <Text key={key} style={styles.field}>
            <span style={styles.label}>{key}:</span>{' '}
            <span style={styles.value}>{value}</span>
          </Text>
        ))}
      </Section>

      {/* Call to Action (opcional) */}
      <Section style={styles.buttonContainer}>
        <Button href="https://coos.digital" style={styles.button}>
          Acessar Dashboard
        </Button>
      </Section>
    </BaseEmailTemplate>
  )
}

const styles = {
  field: {
    fontSize: '15px',
    lineHeight: '24px',
    color: '#1a1a1a',
    margin: '12px 0',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    borderLeft: '3px solid #ff6b35',
  },
  label: {
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
    textTransform: 'capitalize' as const,
  },
  value: {
    color: '#4a4a4a',
  },
  buttonContainer: {
    textAlign: 'center' as const,
    margin: '32px 0',
  },
  button: {
    backgroundColor: '#ff6b35',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '14px 32px',
    border: 'none',
  },
}
