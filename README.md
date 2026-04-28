# Intelekta — Centro de Desenvolvimento Cognitivo e Socioemocional

Site institucional da **Intelekta**, construído com Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4 e Framer Motion.

> **URL de produção:** `https://psicointelekta.com.br` (hospedado na Vercel)

**Desenvolvido por:** [Thales Melo da Penha](https://github.com/Thales-Melo)
**Licença:** Todos os direitos reservados © 2026 Thales Melo da Penha

---

## Índice

- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Pipeline de Leads](#pipeline-de-leads)
- [Roteamento Desktop / Mobile](#roteamento-desktop--mobile)
- [Otimizações de Performance](#otimizações-de-performance)
- [Segurança](#segurança)
- [SEO e Structured Data](#seo-e-structured-data)
- [Analytics](#analytics)
- [Deploy na Vercel](#deploy-na-vercel)
- [Alterando Conteúdo](#alterando-conteúdo)
- [Testes e Qualidade](#testes-e-qualidade)
- [Observações](#observações)

---

## Stack Tecnológica

| Camada                | Tecnologia                                     | Versão        |
| --------------------- | ---------------------------------------------- | -------------- |
| Framework             | Next.js (App Router, Turbopack)                | 16.1.6         |
| UI                    | React                                          | 19.2.4         |
| Estilização         | Tailwind CSS + oklch() color system            | 4.2.0          |
| Animações (desktop) | Framer Motion                                  | 12.37.0        |
| UI Primitives         | Radix UI (Accordion, Select, Label, Separator) | —             |
| Ícones               | Lucide React                                   | 0.564.0        |
| Analytics             | Vercel Analytics + SpeedInsights (cookieless)  | 1.6.1 / 1.0.10 |
| Leads API             | Google Sheets API via googleapis               | 131.0.0        |
| Package manager       | pnpm                                           | —             |
| Linguagem             | TypeScript (strict)                            | 5.7.3          |

---

## Arquitetura do Projeto

```
├── app/
│   ├── layout.tsx            # Root layout: fontes, metadata, JSON-LD, analytics
│   ├── page.tsx              # Página desktop (entrada principal)
│   ├── m/page.tsx            # Página mobile (rewrite interno via proxy)
│   ├── globals.css           # Tokens oklch, tipografia editorial, animações CSS
│   ├── sitemap.ts            # Sitemap dinâmico (auto-atualiza no deploy)
│   ├── robots.ts             # robots.txt dinâmico
│   ├── privacidade/page.tsx  # Política de Privacidade (LGPD)
│   ├── termos/page.tsx       # Termos de Uso
│   └── api/leads/route.ts    # POST endpoint: captura leads → Google Sheets
│
├── components/
│   ├── header.tsx            # Header desktop com scroll-aware + drawer mobile
│   ├── footer.tsx            # Footer com navegação, programas, contato
│   ├── neural-tree.tsx       # Canvas interativo de rede neural (hero)
│   ├── pages/
│   │   ├── home-desktop.tsx  # Composição desktop (static + dynamic imports)
│   │   ├── home-mobile.tsx   # Página mobile completa (Server Component, CSS-only)
│   │   ├── mobile-home-header.tsx
│   │   ├── mobile-contact-form.tsx
│   │   ├── mobile-testimonials-carousel.tsx
│   │   ├── mobile-deferred-widgets.tsx
│   │   └── mobile-faq.tsx
│   ├── sections/             # Seções da landing page
│   │   ├── hero.tsx          # Hero com parallax, word cycling, carrossel
│   │   ├── about.tsx         # Manifesto, valores, marquee
│   │   ├── methodology.tsx   # 3 pilares + timeline
│   │   ├── programs.tsx      # 7 programas com faixas etárias
│   │   ├── team.tsx          # Equipe (3 profissionais)
│   │   ├── testimonials.tsx  # Carrossel de depoimentos (drag)
│   │   ├── faq.tsx           # Accordion Radix + CTA fixo
│   │   └── contact.tsx       # Formulário + WhatsApp + mapa
│   └── ui/                   # Primitives shadcn/ui (Button, Input, Select, etc.)
│
├── lib/
│   ├── device.ts             # Detecção de UA mobile (regex)
│   └── utils.ts              # cn() — clsx + tailwind-merge
│
├── proxy.ts                  # Proxy Next.js 16 (substitui middleware.ts)
├── next.config.mjs           # Config: CSP, Vary, images AVIF, optimizePackageImports
├── scripts/build.mjs         # Build customizado (limpa .next com retry no Windows)
└── public/
    ├── images/               # Imagens locais (logo, hero, equipe, OG)
    ├── llms.txt              # Discoverability para LLMs
    ├── llms-full.txt
    └── site.webmanifest
```

---

## Pré-requisitos

- **Node.js** ≥ 18.17 (recomendado: 20 LTS)
- **pnpm** ≥ 8 (`npm install -g pnpm`)
- Conta Google Cloud com **Google Sheets API** habilitada (para captura de leads)

---

## Variáveis de Ambiente

Copie o `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

| Variável                        | Descrição                               | Obrigatória |
| -------------------------------- | ----------------------------------------- | ------------ |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email da service account do GCP           | Sim          |
| `GOOGLE_PRIVATE_KEY`           | Chave privada (manter os `\n` literais) | Sim          |
| `GOOGLE_SHEET_ID`              | ID da planilha Google Sheets              | Sim          |
| `GOOGLE_SHEET_TAB`             | Nome da aba (padrão:`Leads`)           | Não         |

> **Como obter as credenciais Google:**
>
> 1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
> 2. Crie um projeto (ou use existente)
> 3. Ative a **Google Sheets API**
> 4. Vá em **IAM & Admin → Service Accounts** → Crie uma service account
> 5. Gere uma chave JSON — o `client_email` é o `GOOGLE_SERVICE_ACCOUNT_EMAIL` e o `private_key` é o `GOOGLE_PRIVATE_KEY`
> 6. Compartilhe a planilha Google Sheets com o email da service account (permissão de Editor)

---

## Como Rodar Localmente

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd intelekta

# 2. Instale dependências
pnpm install

# 3. Configure variáveis de ambiente
cp .env.example .env.local
# Preencha os valores no .env.local

# 4. Inicie o servidor de desenvolvimento
pnpm dev
# → Acesse http://localhost:3000
```

---

## Scripts Disponíveis

| Script    | Comando        | O que faz                                             |
| --------- | -------------- | ----------------------------------------------------- |
| `dev`   | `pnpm dev`   | Inicia dev server com Turbopack (hot reload)          |
| `build` | `pnpm build` | Limpa `.next` (retry para Windows) + `next build` |
| `start` | `pnpm start` | Serve o build de produção localmente                |
| `lint`  | `pnpm lint`  | Executa ESLint no projeto                             |

---

## Pipeline de Leads

1. Usuário preenche o formulário de contato (desktop ou mobile)
2. `POST /api/leads` recebe os dados
3. Campo honeypot `website` filtra bots (campo oculto que humanos não preenchem)
4. Rate limit: **5 requisições / 10 min por IP** (Map em memória)
5. Dados gravados na planilha Google Sheets:

| Coluna        | Conteúdo                                |
| ------------- | ---------------------------------------- |
| Data/Hora     | Timestamp ISO                            |
| Nome Completo | Nome do lead                             |
| Telefone      | Número informado                        |
| Programa      | Programa selecionado ou "Não informado" |
| Mensagem      | Mensagem opcional                        |
| UTM Source    | Parâmetro `utm_source` da URL         |
| UTM Medium    | Parâmetro `utm_medium` da URL         |
| UTM Campaign  | Parâmetro `utm_campaign` da URL       |
| Página       | Path da página de origem                |
| User-Agent    | Navegador do usuário                    |
| IP            | Desativado (preenchido com `-`) para conformidade com a LGPD |

6. Após envio, o formulário redireciona para o WhatsApp com mensagem pré-preenchida

---

## Roteamento Desktop / Mobile

O arquivo `proxy.ts` (Next.js 16 Proxy, substituto do middleware) faz roteamento baseado em User-Agent:

- **Desktop UA** → serve `/` (componente `home-desktop.tsx`)
- **Mobile UA** → rewrite interno de `/` para `/m` (componente `home-mobile.tsx`, URL permanece `/`)
- **Acesso direto a `/m`** → redirect 301 para `/` (previne conteúdo duplicado)

Todas as respostas incluem `Vary: User-Agent` para que o CDN mantenha cache separado por dispositivo.

A versão **mobile é um Server Component puro** com animações CSS-only (sem Framer Motion), widgets carregados via `next/dynamic` com `ssr: false`, e formulário em HTML nativo — otimizado para Lighthouse 90+.

---

## Otimizações de Performance

| Otimização          | Implementação                                                 |
| --------------------- | --------------------------------------------------------------- |
| Tree-shaking          | `optimizePackageImports` para framer-motion e lucide-react    |
| CSS chunking          | `cssChunking: 'strict'` previne FOUC                          |
| Imagens               | Formato AVIF-first, cache 1 ano,`sizes` corretos              |
| Fontes                | `next/font/google` com `display: swap` (Lato + Nunito)      |
| Code splitting mobile | `next/dynamic` com `ssr: false` para widgets below-the-fold |
| Bundle reduction      | Desktop: ~40% redução via dynamic imports                     |
| Frame skipping        | Neural tree canvas renderiza a cada 2 frames                    |
| Browserslist          | Chrome 92+, Firefox 90+, Safari 15.4+, Edge 92+                 |

---

## Segurança

| Header                     | Valor                                                                |
| -------------------------- | -------------------------------------------------------------------- |
| Content-Security-Policy    | Whitelist restrita (self, Vercel Analytics, Google Maps, GA4 futuro) |
| Strict-Transport-Security  | `max-age=31536000; includeSubDomains; preload`                     |
| X-Frame-Options            | `DENY`                                                             |
| X-Content-Type-Options     | `nosniff`                                                          |
| Referrer-Policy            | `strict-origin-when-cross-origin`                                  |
| Cross-Origin-Opener-Policy | `same-origin`                                                      |

Proteções no endpoint de leads:

- **Honeypot** contra spam bots
- **Rate limiting** por IP (5 req / 10 min)
- Validação server-side de campos obrigatórios

---

## SEO e Structured Data

- **JSON-LD** no layout: `EducationalOrganization` (7 serviços, 3 funcionárias), `FAQPage` (5 perguntas), `WebSite`
- **Sitemap** dinâmico em `/sitemap.xml` (auto-atualiza data no deploy)
- **robots.txt** dinâmico em `/robots.txt`
- **Open Graph** + Twitter Cards com imagem OG personalizada
- **Canonical URL** correta em desktop e mobile
- **`llms.txt`** e **`llms-full.txt`** para discoverability por LLMs/AI

---

## Analytics

- **Vercel Web Analytics** (`<Analytics />`) — cookieless, LGPD-compliant
- **Vercel SpeedInsights** (`<SpeedInsights />`) — métricas de performance reais

Eventos customizados via `track()`:

| Evento                         | Quando dispara                               |
| ------------------------------ | -------------------------------------------- |
| `cta_header_contato`         | Clique no botão "Contato" do header desktop |
| `cta_header_mobile_whatsapp` | Clique no WhatsApp do header mobile          |
| `lead_submit_success`        | Envio de lead bem-sucedido                   |
| `lead_submit_error`          | Erro no envio de lead                        |
| `cta_whatsapp_abertura`      | Abertura do link WhatsApp                    |

> **Cookies:** O site não utiliza cookies de tracking. Nenhum banner de consentimento é necessário.

---

## Deploy na Vercel

### Primeiro deploy

1. Importe o repositório Git na [Vercel](https://vercel.com/new)
2. **Framework Preset:** Next.js (detectado automaticamente)
3. **Build Command:** `pnpm build` (usa o script customizado)
4. **Output Directory:** `.next` (padrão)
5. Configure as **Environment Variables** (ver seção acima)
6. Deploy 🚀

### Domínio customizado

1. No dashboard Vercel → **Settings → Domains**
2. Adicione `psicointelekta.com.br` e `www.psicointelekta.com.br`
3. Configure DNS no registrador:
   - `A` record → `76.76.21.21`
   - `CNAME` de `www` → `cname.vercel-dns.com`
4. HTTPS é provisionado automaticamente

### Preview deployments

Cada push em branch não-principal gera um deploy de preview com URL única. Envs sensíveis ficam protegidas via **Preview Protection** (habilitar em Settings → General).

### Atualizações

Cada `git push` na branch principal dispara deploy automático (~1-2 min).

---

## Alterando Conteúdo

| O que alterar        | Arquivo                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Textos da hero       | `components/sections/hero.tsx` (desktop), `components/pages/home-mobile.tsx` (mobile)         |
| Programas            | `components/sections/programs.tsx` (desktop), `components/pages/home-mobile.tsx` (mobile)     |
| Equipe               | `components/sections/team.tsx` (desktop), `components/pages/home-mobile.tsx` (mobile)         |
| FAQ                  | `components/sections/faq.tsx` (desktop), `components/pages/home-mobile.tsx` (mobile)          |
| Depoimentos          | `components/sections/testimonials.tsx` (desktop), `components/pages/home-mobile.tsx` (mobile) |
| Dados estruturados   | `app/layout.tsx` (schema JSON-LD)                                                               |
| Privacidade / Termos | `app/privacidade/page.tsx`, `app/termos/page.tsx`                                             |
| Metadata / título   | `app/layout.tsx`                                                                                |
| Imagens              | Substituir arquivos em `public/images/` mantendo o mesmo nome                                   |
| WhatsApp             | Buscar `wa.me/5527988773890` e substituir o número                                             |

---

## Testes e Qualidade

```bash
# Lint
pnpm lint

# Build de produção (valida TypeScript + compilação)
pnpm build

# Lighthouse (após build)
pnpm start
# Rodar PageSpeed Insights ou Chrome DevTools Lighthouse
# Meta: 90+ em todas as categorias (mobile e desktop)
```

---

## Observações

- **GA4 futuro:** A CSP já contempla domínios do Google Analytics. Caso ative, será necessário implementar um consent banner para cookies analytics.
- **Multi-instância:** O rate limit usa Map em memória — reseta em cold starts. Adequado para tráfego típico; para escala, considere Redis/KV.
- **Imagens da equipe:** Devem ser PNG/WebP com fundo transparente para renderizar corretamente sobre o gradiente dos cards.
