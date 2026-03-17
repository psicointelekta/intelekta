# Intelekta — Landing Page

Site institucional em Next.js 16 (App Router) com Tailwind v4 e animações framer-motion.

## Como rodar
1. Instale dependências: `pnpm install`
2. Crie um `.env.local` com:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL=`
   - `GOOGLE_PRIVATE_KEY=` (mantenha os `\n` ou use múltiplas linhas)
   - `GOOGLE_SHEET_ID=` (planilha com aba `Leads`)
3. Dev server: `pnpm dev`
4. Build: `pnpm build` e `pnpm start`

## Analytics
- Vercel Web Analytics já habilitado (`<Analytics />`). Eventos de CTA e envio de lead usam `track()`.

## Pipeline de leads
- Formulário envia dados para `/api/leads` que grava na planilha via service account e abre o WhatsApp.
- Campos: nome, telefone, programa, mensagem, UTMs, user-agent, IP, data/hora.

## Acessibilidade e UX
- Skip-link, foco visível, menu mobile com focus-trap, máscaras leves para telefone.

## Assets
- Favicon/manifest no diretório `public/`.
- Logo local em `/public/images/logo-intelekta.webp`.
- OG image em `/public/og-image.svg`.

## Entrega / Deploy
- Indicada Vercel (plano Hobby atende o tráfego típico; sem custo adicional).
- Configure domínio do cliente no projeto Vercel e ative Preview Protection para envs sensíveis.

## Testes rápidos
- `pnpm lint`
- `pnpm build`
- Rodar Lighthouse (mobile/desktop) meta 90+.

## Observações
- Caso opte por GA4 no futuro, incluir consent banner e ajustar CSP para gtag.
