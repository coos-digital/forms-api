import React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Text,
  Link,
  Hr,
} from '@react-email/components'

interface BaseEmailTemplateProps {
  title: string
  children: React.ReactNode
  logoUrl?: string
}

export function BaseEmailTemplate({ 
  title, 
  children,
  logoUrl = process.env.LOGO_URL || 'https://coos.digital/logo.png'
}: BaseEmailTemplateProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header com logo */}
          <Section style={styles.header}>
            <Link href="https://coos.digital" style={styles.logoLink}>
              <Img
                src={logoUrl}
                alt="coOS"
                width="120"
                height="40"
                style={styles.logo}
              />
            </Link>
          </Section>

          {/* Título */}
          <Section style={styles.titleSection}>
            <Text style={styles.title}>{title}</Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Conteúdo */}
          <Section style={styles.content}>
            {children}
          </Section>

          <Hr style={styles.divider} />

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Enviado via{' '}
              <Link href="https://coos.digital" style={styles.footerLink}>
                coOS
              </Link>
            </Text>
            <Text style={styles.footerSubtext}>
              Soluções digitais que transformam negócios
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: '#f4f4f4',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: 0,
  },
  container: {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    maxWidth: '600px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    backgroundColor: '#1a1a1a',
    padding: '24px',
    textAlign: 'center' as const,
  },
  logoLink: {
    display: 'inline-block',
  },
  logo: {
    display: 'block',
    margin: '0 auto',
  },
  titleSection: {
    padding: '32px 24px 0',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    margin: '0',
    lineHeight: '1.3',
  },
  divider: {
    borderColor: '#e5e5e5',
    margin: '24px 0',
  },
  content: {
    padding: '0 24px',
  },
  footer: {
    backgroundColor: '#1a1a1a',
    padding: '24px',
    textAlign: 'center' as const,
  },
  footerText: {
    fontSize: '14px',
    color: '#ffffff',
    margin: '0 0 8px',
  },
  footerLink: {
    color: '#ff6b35',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  footerSubtext: {
    fontSize: '12px',
    color: '#999999',
    margin: '0',
  },
}
