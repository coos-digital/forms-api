import React from 'react'
import { Text, Section } from '@react-email/components'
import type { FormData } from '../../types'
import { BaseEmailTemplate } from '../shared/BaseEmailTemplate'

interface BlackFridayEmailProps {
  data: FormData
}

export function BlackFridayEmail({ data }: BlackFridayEmailProps) {
  return (
    <BaseEmailTemplate title="Novo Pedido - Black Friday">
      <Section>
        {Object.entries(data).map(([key, value]) => (
          <Text key={key} style={styles.field}>
            <span style={styles.label}>{formatLabel(key)}:</span>{' '}
            <span style={styles.value}>{value}</span>
          </Text>
        ))}
      </Section>
    </BaseEmailTemplate>
  )
}

function formatLabel(key: string): string {
  const labels: Record<string, string> = {
    nome: 'Nome',
    email: 'Email',
    telefone: 'Telefone',
    empresa: 'Empresa',
    produtos: 'Produtos',
    observacoes: 'Observações',
  }
  return labels[key] || key.charAt(0).toUpperCase() + key.slice(1)
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
    display: 'inline-block',
    minWidth: '140px',
  },
  value: {
    color: '#4a4a4a',
  },
}
