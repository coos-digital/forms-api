# 🚀 Deploy Guide - Dokploy

## Pré-requisitos

- Dokploy instalado e configurado
- Repositório Git acessível
- Domínio configurado (opcional)

## 📦 Deploy no Dokploy

### 1. Criar Novo Projeto

1. Acesse o Dokploy
2. Clique em "New Project"
3. Selecione "Git Repository"
4. Cole a URL: `https://github.com/coos-digital/forms-api`
5. Branch: `master`

### 2. Configurar Build

O Dokploy detectará automaticamente o `nixpacks.toml` e usará Bun.

**Configurações automáticas:**
- ✅ Runtime: Bun
- ✅ Install: `bun install --frozen-lockfile`
- ✅ Start: `bun run src/index.ts`
- ✅ Port: 3000

### 3. Configurar Variáveis de Ambiente

No painel do Dokploy, adicione as seguintes variáveis:

```bash
# Obrigatórias
RESEND_API_KEY=re_sua_chave_aqui
FROM_EMAIL=forms@coosdigital.com.br
EMAIL_DEFAULT=contato@coosdigital.com.br

# Opcionais
PORT=3000
LOGO_URL=https://coos.digital/logo.png
EMAIL_LOGISTICA=logistica@coosdigital.com.br
```

### 4. Deploy

1. Clique em "Deploy"
2. Aguarde o build (1-2 minutos)
3. Aplicação estará disponível na URL fornecida

## 🌐 Configurar Domínio

### Opção 1: Subdomínio

1. No Dokploy, vá em "Domains"
2. Adicione: `forms-api.coosdigital.com.br`
3. Configure DNS:
   ```
   Type: CNAME
   Name: forms-api
   Value: seu-servidor-dokploy.com
   ```

### Opção 2: Path-based

Use proxy reverso:
```
https://api.coosdigital.com.br/forms → forms-api:3000
```

## ✅ Verificar Deploy

### Health Check

```bash
curl https://forms-api.coosdigital.com.br
```

Resposta esperada:
```json
{
  "name": "Forms API - Coos Digital",
  "version": "1.0.0",
  "forms": ["logistica"]
}
```

### Testar Envio

```bash
curl -X POST https://forms-api.coosdigital.com.br/submit/logistica \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste Deploy",
    "email": "teste@example.com",
    "mensagem": "Testando deploy"
  }'
```

## 🔄 Atualizar Deploy

### Automático (Webhook)

1. No Dokploy, configure webhook do GitHub
2. Cada push no `master` faz deploy automático

### Manual

1. No Dokploy, clique em "Redeploy"
2. Ou faça push e aguarde webhook

## 📊 Monitoramento

### Logs

No Dokploy:
1. Vá em "Logs"
2. Veja logs em tempo real
3. Filtre por erro/warning

### Métricas

- CPU usage
- Memory usage
- Request count
- Response time

## 🐛 Troubleshooting

### Build falha

**Erro:** `bun: command not found`
- ✅ Solução: Nixpacks detecta automaticamente via `nixpacks.toml`

**Erro:** `Cannot find module`
- ✅ Solução: Rode `bun install` localmente e commit `bun.lock`

### Runtime falha

**Erro:** `RESEND_API_KEY is not defined`
- ✅ Solução: Configure variáveis de ambiente no Dokploy

**Erro:** `Port already in use`
- ✅ Solução: Dokploy gerencia portas automaticamente

### Email não envia

1. Verifique `RESEND_API_KEY` está correta
2. Verifique domínio verificado no Resend
3. Veja logs para erros específicos

## 🔐 Segurança

### Variáveis Sensíveis

- ✅ Use variáveis de ambiente (nunca commit)
- ✅ Resend API Key deve ser secreta
- ✅ Configure CORS se necessário

### HTTPS

- ✅ Dokploy fornece SSL automático via Let's Encrypt
- ✅ Force HTTPS no proxy reverso

## 📝 Checklist de Deploy

- [ ] Repositório no GitHub
- [ ] `nixpacks.toml` configurado
- [ ] Variáveis de ambiente definidas
- [ ] Resend API Key válida
- [ ] Domínio configurado (opcional)
- [ ] Webhook configurado (opcional)
- [ ] Health check funcionando
- [ ] Teste de envio de email OK
- [ ] Logs sem erros
- [ ] SSL ativo

## 🎯 URLs de Produção

Após deploy, atualize nos frontends:

```bash
# .env (frontend)
VITE_FORMS_API_URL=https://forms-api.coosdigital.com.br
```

## 📚 Recursos

- [Dokploy Docs](https://dokploy.com/docs)
- [Nixpacks Docs](https://nixpacks.com)
- [Bun Docs](https://bun.sh)
- [Resend Docs](https://resend.com/docs)
