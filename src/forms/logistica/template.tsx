import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
} from '@react-email/components'
import type { FormData } from '../../types'

interface LogisticaEmailProps {
  data: FormData
}

export function LogisticaEmail({ data }: LogisticaEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Novo Contato - Logística</Heading>
          
          <Hr style={styles.hr} />
          
          <Section>
            {Object.entries(data).map(([key, value]) => (
              <Text key={key} style={styles.field}>
                <strong style={styles.label}>{key}:</strong> {value}
              </Text>
            ))}
          </Section>
          
          <Hr style={styles.hr} />
          
          <Text style={styles.footer}>
            Enviado via Forms API - Coos Digital
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
  footer: {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
  },
}
