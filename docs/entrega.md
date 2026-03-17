# Entrega — Intelekta

## Links
- Produção: https://intelektamente.com
- Preview Vercel: _gerado pelo projeto_
- Planilha de leads: `https://docs.google.com/spreadsheets/d/{GOOGLE_SHEET_ID}` (aba `Leads`)
- OG: `/public/og-image.svg`

## Checklist técnico
- [ ] Variáveis em `.env.local`: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`
- [ ] Domínio do cliente conectado na Vercel
- [ ] Preview Protection ativado para env sensíveis
- [ ] `pnpm lint` sem erros
- [ ] `pnpm build` sem erros
- [ ] Lighthouse (mobile/desktop) ≥ 90 em Performance, A11y, Best Practices, SEO
- [ ] Teste manual: menu mobile focus-trap, CTAs com scroll suave, envio de lead (planilha + WhatsApp), mapa renderizando
- [ ] Analytics: eventos aparecendo no painel Vercel

## Proposta de valor (para cobrança de R$1000)
- Site completo com copy AIDA, SEO on-page, OG/social cards, Structured Data (Organization + FAQ).
- Performance otimizada (Next 16, Tailwind 4, images otimizadas, preconnect de fontes).
- Acessibilidade básica (skip-link, foco visível, contraste, aria labels).
- Pipeline de leads: registro em planilha + abertura automática no WhatsApp, com UTMs e device.
- Handoff completo (README, este checklist, assets otimizados, favicon/manifest, páginas legais LGPD).
- Suporte pós-entrega opcional: plano de manutenção/otimização mensal.

## Domínio e hospedagem
- Hospedagem em Vercel plano Hobby: custo zero até ~100 GB/mês de bandwidth (adequado para tráfego atual).
- Cliente já possui domínio: apenas configurar DNS para os CNAMEs/ALIAS da Vercel.

## Observações operacionais
- Caso precise GA4 futuramente: incluir banner de consentimento, atualizar CSP e adicionar `gtag.js`.
- Atualize a data das páginas legais se mudar o conteúdo.
