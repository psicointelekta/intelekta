# Manual de Uso do Site — Intelekta

Guia completo para a equipe da Intelekta sobre como acompanhar leads, acessar dados e solicitar alterações no site.

---

## Índice

- [1. Painel de Leads (Planilha Google Sheets)](#1-painel-de-leads-planilha-google-sheets)
- [2. Entendendo os Dados da Planilha](#2-entendendo-os-dados-da-planilha)
- [3. Como Funcionam os UTMs](#3-como-funcionam-os-utms)
- [4. Analytics do Site (Vercel)](#4-analytics-do-site-vercel)
- [5. Como Solicitar Alterações de Texto](#5-como-solicitar-alterações-de-texto)
- [6. Como Atualizar Imagens](#6-como-atualizar-imagens)
- [7. Como Alterar o Número do WhatsApp](#7-como-alterar-o-número-do-whatsapp)
- [8. Páginas Legais (Privacidade e Termos)](#8-páginas-legais-privacidade-e-termos)
- [9. Como Funciona o Formulário de Contato](#9-como-funciona-o-formulário-de-contato)
- [10. Dashboard da Vercel (Hospedagem)](#10-dashboard-da-vercel-hospedagem)
- [11. Perguntas Frequentes](#11-perguntas-frequentes)
- [12. Como Atualizar as Novidades e Avisos (Portal Admin)](#12-como-atualizar-as-novidades-e-avisos-portal-admin)
- [13. Contato para Suporte Técnico](#13-contato-para-suporte-técnico)

---

## 1. Painel de Leads (Planilha Google Sheets)

### Como acessar

Todos os leads capturados pelo site são registrados automaticamente em uma **planilha do Google Sheets**. Para acessá-la:

1. Abra o Google Sheets: [sheets.google.com](https://sheets.google.com)
2. Faça login com a conta Google que tem acesso à planilha
3. Procure a planilha **"Intelekta — Leads"** (ou o nome definido na configuração)
4. Clique na aba **"Leads"** na parte inferior da planilha

> **Dica:** Salve a planilha nos favoritos do navegador para acesso rápido. Recomendamos verificar diariamente.

### O que fazer ao receber um lead

1. Abra a planilha e verifique as linhas mais recentes (as novas entram por último)
2. Entre em contato com o lead o mais rápido possível — idealmente em até 2 horas
3. Registre na planilha o status do atendimento (pode criar uma coluna extra "Status" para isso)

### Organizando a planilha

Você pode personalizar a planilha livremente:

- **Adicionar colunas** (ex: "Status", "Observações", "Data de retorno") — adicione após a coluna K
- **Aplicar filtros** para visualizar apenas leads de um programa específico
- **Colorir linhas** por status (verde = convertido, amarelo = em andamento, etc.)
- **Criar gráficos** para acompanhar volume de leads por mês

> ⚠️ **Importante:** Nunca altere as colunas A até K da linha 1 (cabeçalhos). O site depende delas para gravar novos leads corretamente.

---

## 2. Entendendo os Dados da Planilha

Cada lead preenche automaticamente as seguintes colunas:

| Coluna                       | O que significa                             | Exemplo                         |
| ---------------------------- | ------------------------------------------- | ------------------------------- |
| **A — Data/Hora**     | Quando o formulário foi enviado            | `2026-03-22T14:30:00.000Z`    |
| **B — Nome Completo** | Nome informado pelo visitante               | `Maria Silva`                 |
| **C — Telefone**      | Número de telefone                         | `(27) 98877-3890`             |
| **D — Programa**      | Programa de interesse selecionado           | `Neuroeducação`             |
| **E — Mensagem**      | Mensagem opcional do visitante              | `Gostaria de saber horários` |
| **F — UTM Source**    | De onde veio o visitante (ver seção UTMs) | `instagram`                   |
| **G — UTM Medium**    | Tipo de mídia/canal                        | `social`                      |
| **H — UTM Campaign**  | Nome da campanha                            | `lancamento-julho`            |
| **I — Página**       | Qual página do site ele estava             | `/`                           |
| **J — User-Agent**    | Navegador e dispositivo utilizado           | `Mozilla/5.0 (iPhone...)`     |
| **K — IP**            | Endereço IP do visitante                   | `189.40.xxx.xxx`              |

### Dicas de leitura

- **Data/Hora** está no formato UTC (horário de Greenwich). Para converter para Brasília, subtraia 3 horas.
- Se **Programa** mostra "Não informado", o visitante não selecionou nenhum programa.
- Se **UTM Source/Medium/Campaign** estão vazios, o visitante acessou o site diretamente (digitou a URL ou veio do Google orgânico).

---

## 3. Como Funcionam os UTMs

UTMs são parâmetros adicionados ao link do site para rastrear de onde vêm os visitantes. Isso é especialmente útil para campanhas em redes sociais ou anúncios.

### Como criar um link com UTM

Adicione os parâmetros ao final da URL do site. Exemplo:

```
https://intelektamente.com/?utm_source=instagram&utm_medium=social&utm_campaign=lancamento-marco
```

| Parâmetro       | Para que serve       | Exemplos                                                     |
| ---------------- | -------------------- | ------------------------------------------------------------ |
| `utm_source`   | Plataforma de origem | `instagram`, `google`, `facebook`, `whatsapp`        |
| `utm_medium`   | Tipo de tráfego     | `social`, `cpc` (anúncio pago), `email`, `referral` |
| `utm_campaign` | Nome da campanha     | `lancamento-marco`, `dia-das-maes`, `promo-ferias`     |

### Exemplos de links prontos

**Instagram (bio ou stories):**

```
https://psicointelekta.com.br/?utm_source=instagram&utm_medium=social&utm_campaign=bio-link
```

**Anúncio pago no Facebook:**

```
https://psicointelekta.com.br/?utm_source=facebook&utm_medium=cpc&utm_campaign=campanha-neuroeducacao
```

**WhatsApp (mensagem para grupos):**

```
https://psicointelekta.com.br/?utm_source=whatsapp&utm_medium=social&utm_campaign=indicacao
```

**E-mail marketing:**

```
https://psicointelekta.com.br/?utm_source=email&utm_medium=email&utm_campaign=newsletter-marco
```

> **Ferramenta útil:** Use o [Campaign URL Builder do Google](https://ga-dev-tools.google/campaign-url-builder/) para gerar links com UTMs facilmente.

---

## 4. Analytics do Site (Vercel)

O site utiliza o **Vercel Analytics**, um painel de métricas que mostra dados de visitação sem usar cookies (totalmente adequado à LGPD).

### Como acessar

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Selecione o projeto **intelekta**
3. No menu lateral, clique em **Analytics**

### O que você pode ver

- **Visitantes únicos** por dia/semana/mês
- **Páginas mais acessadas**
- **Países e regiões** dos visitantes
- **Dispositivos** (mobile vs desktop)
- **Referrers** (de onde os visitantes vieram)
- **Eventos personalizados** (cliques em CTAs, envios de formulário)

### Eventos rastreados

| Nome do evento                 | Significado                                             |
| ------------------------------ | ------------------------------------------------------- |
| `cta_header_contato`         | Alguém clicou no botão "Contato" no header do desktop |
| `cta_header_mobile_whatsapp` | Alguém clicou no ícone WhatsApp do header mobile      |
| `lead_submit_success`        | Um lead foi enviado com sucesso                         |
| `lead_submit_error`          | Houve erro ao enviar um lead                            |
| `cta_whatsapp_abertura`      | Alguém abriu o link do WhatsApp                        |

### Performance (SpeedInsights)

No mesmo painel, a aba **Speed Insights** mostra a velocidade real do site para visitantes. Métricas monitoradas:

- **FCP** (First Contentful Paint) — quanto tempo até aparecer o primeiro conteúdo
- **LCP** (Largest Contentful Paint) — quanto tempo até a maior imagem/texto carregar
- **CLS** (Cumulative Layout Shift) — se o layout "pula" durante o carregamento

---

## 5. Como Solicitar Alterações de Texto

Para alterar textos no site, envie ao desenvolvedor uma mensagem com:

1. **A seção** do site que deseja alterar (ex: "Seção de Programas", "Hero principal", "FAQ")
2. **O texto atual** que deve ser substituído
3. **O novo texto** exato que deseja

### Mapa de seções do site

| Seção               | O que contém                                 | Exemplo de texto                                    |
| --------------------- | --------------------------------------------- | --------------------------------------------------- |
| **Hero**        | Título principal, subtítulo e botões       | "Fortalecendo mentes, emoções e futuros"          |
| **Sobre**       | Manifesto, valores da Intelekta, card do Mascote | "Cada criança é um universo..."                   |
| **Metodologia** | Os 3 pilares + timeline                       | "Avaliação", "Ativação", "Autonomia"            |
| **Programas**   | Nomes, descrições e tags dos 7 programas    | "Neuroeducação", "Xadrez Pedagógico", etc.       |
| **Equipe**      | Nomes, cargos, bios e especialidades          | "Suzidarle Pereira — Psicóloga e Neuropsicóloga" |
| **Depoimentos** | Frases de pais/responsáveis                  | "A evolução do meu filho foi notável..."         |
| **FAQ**         | Perguntas e respostas frequentes              | "Qual a faixa etária atendida?"                    |
| **Contato**     | Telefone, endereço, horários                | "(27) 98877-3890"                                   |
| **Footer**      | Links, endereço, copyright                   | Links de navegação e redes sociais                |

### Exemplo de solicitação

> "Olá, gostaria de alterar o texto da bio da Fabiana Lima na seção Equipe.
>
> **Texto atual:** Palestrante e professora há 12 anos dedicada ao desenvolvimento integral de crianças e adolescentes.
>
> **Novo texto:** Palestrante e professora há 14 anos dedicada ao desenvolvimento integral de crianças e adolescentes."

> ⚠️ **Importante:** Todo texto existe em **duas versões** (desktop e mobile). Ao solicitar uma alteração, ambas serão atualizadas.

---

## 6. Como Atualizar Imagens

### Fotos da equipe

Para substituir uma foto de profissional:

1. A foto deve ser em formato **WebP ou PNG** com **fundo transparente**
2. Resolução recomendada: **800×1000 pixels** (retrato vertical)
3. Envie ao desenvolvedor indicando de qual profissional é a foto
4. Nomeie o arquivo de forma clara (ex: `suzidarle_pereira_retrato.webp`)

### Imagens do carrossel (hero)

- Proporção: **Horizontal (3:2)**
- Resolução recomendada: **1200×800px** ou **1500×1000px**
- Formato: **WebP** (proporciona melhor carregamento e qualidade)

### Imagem OG (compartilhamento em redes sociais)

A imagem que aparece quando alguém compartilha o link do site:

- Tamanho: **1200×630px**
- Formato: PNG ou WebP
- Deve conter o logo e uma frase de destaque

### Logo

- Formato: **WebP** com fundo transparente
- A versão atual é `logo-intelekta.webp`

---

## 7. Como Alterar o Número do WhatsApp

O número do WhatsApp aparece em vários locais do site:

- Botão do header mobile
- Seção de contato (desktop e mobile)
- Redirecionamento após envio do formulário

Para alterar, informe ao desenvolvedor o **novo número completo com DDI e DDD**:

- Formato: `5527988773890` (55 = Brasil, 27 = DDD, número sem espaços)

---

## 8. Páginas Legais (Privacidade e Termos)

O site possui duas páginas legais acessíveis pelo footer:

- **Política de Privacidade** (`/privacidade`) — descreve como dados são tratados (LGPD)
- **Termos de Uso** (`/termos`) — regras de uso do site

Para alterar, envie ao desenvolvedor o texto revisado. Recomendamos revisão por um advogado especializado em LGPD se houver mudanças significativas.

---

## 9. Como Funciona o Formulário de Contato

### Fluxo do visitante

1. O visitante preenche: **nome**, **telefone**, **programa de interesse** (opcional) e **mensagem** (opcional)
2. Clica em **"Enviar"**
3. Os dados são gravados automaticamente na planilha
4. É enviada uma mensagem para o TELEGRAM da equipe do Intelekta (esse formulário é voltado principalmente para usuários de computador)

### Proteções contra spam

- **Campo honeypot:** Um campo invisível que bots preenchem e humanos não. Se preenchido, o envio é silenciosamente descartado.
- **Rate limit:** Máximo de 5 envios a cada 10 minutos por IP. Após isso, aparece uma mensagem pedindo para aguardar.

### Se os leads pararam de chegar

Possíveis causas:

1. **Credenciais Google expiraram** — verificar no painel Vercel se as variáveis de ambiente estão corretas
2. **Planilha ficou sem espaço** — Google Sheets suporta até 10 milhões de células; raramente um problema
3. **Permissão da service account foi removida** — verificar se o email da service account ainda tem acesso de Editor na planilha

---

## 10. Dashboard da Vercel (Hospedagem)

### Acessar o dashboard

1. Vá para [vercel.com](https://vercel.com)
2. Faça login com a conta associada ao projeto
3. Selecione o projeto **intelekta**

### O que você pode verificar

| Funcionalidade         | Onde encontrar                              |
| ---------------------- | ------------------------------------------- |
| Status do deploy       | Página inicial do projeto                  |
| Logs de erro           | **Logs** no menu lateral              |
| Analytics              | **Analytics** no menu lateral         |
| Performance            | **Speed Insights** no menu lateral    |
| Domínio               | **Settings → Domains**               |
| Variáveis de ambiente | **Settings → Environment Variables** |

### Deploys automáticos

Toda vez que o código é atualizado no repositório Git, a Vercel faz o deploy automaticamente em 1-2 minutos. Você pode acompanhar o status na aba **Deployments**.

---

## 11. Perguntas Frequentes

### O site usa cookies?

**Não.** O site não utiliza nenhum cookie de rastreamento. O analytics é feito pelo Vercel Analytics, que é cookieless (não precisa de banner de consentimento).

### Preciso de um banner de aceitar cookies?

**Não.** Como o site não coleta cookies de terceiros nem utiliza rastreamento invasivo, não é necessário exibir banner de cookies. Isso está alinhado com a LGPD.

### Quanto custa a hospedagem?

O plano **Hobby (gratuito)** da Vercel atende o tráfego típico do site. Para sites com tráfego muito alto, o plano **Pro** custa US$ 20/mês.

### O site funciona no celular?

Sim. O site possui uma **versão mobile dedicada**, otimizada para velocidade e usabilidade em smartphones. O redirecionamento é automático — o visitante não precisa fazer nada.

### Posso fazer alterações diretamente na Vercel?

Não. Alterações de conteúdo precisam ser feitas no código-fonte e enviadas via Git. A Vercel faz o deploy automaticamente após receber as mudanças.

### O que acontece se o Google Sheets ficar offline?

O site continua funcionando normalmente. Apenas a gravação do lead falhará temporariamente. O visitante ainda será redirecionado para o WhatsApp. Quando o Sheets voltar, novos leads serão gravados normalmente (os do período offline não são recuperados automaticamente).

### Como adicionar um novo programa?

Envie ao desenvolvedor:

- Nome do programa
- Subtítulo/tagline
- Descrição (2-3 frases)
- Tags (ex: "Lúdico", "Todas as idades")
- Faixa etária atendida
- Imagem representativa (se houver)

---

## 12. Como Atualizar as Novidades e Avisos (Portal Admin)

Agora o site possui um **Portal Administrativo** exclusivo onde você pode gerenciar as novidades que aparecem no topo do site (Hero) de forma muito mais simples.

### Como acessar

1. Acesse o endereço: `https://psicointelekta.com.br/admin` (ou o domínio oficial do site).
2. Digite a **Senha Administrativa** fornecida pelo desenvolvedor.

### Como gerenciar

- **Para Adicionar:** 
  - Preencha o Título, Categoria e Data.
  - **Upload de Imagem:** Clique no campo "Imagem de Fundo" e selecione um arquivo do seu computador.
  - **Preview:** À direita do formulário, você verá uma simulação em tempo real de como o destaque ficará no site. Use isso para ajustar o texto e a imagem antes de publicar.
  - Clique em **"Publicar Agora no Hero"**.

- **Para Excluir:** 
  - Role a página até "Publicações Ativas".
  - Clique no ícone da **Lixeira vermelha** ao lado do item.

> [!TIP]
> **Armazenamento Seguro:** O site utiliza agora o **Vercel Blob**, o que garante que suas imagens fiquem salvas permanentemente na nuvem, independentemente de atualizações no site. Ao excluir uma novidade no painel, a imagem também é removida automaticamente para manter tudo organizado.

---

## 13. Contato para Suporte Técnico

Para qualquer questão técnica relacionada ao site:

| Tipo de solicitação          | O que informar                               |
| ------------------------------ | -------------------------------------------- |
| **Alteração de texto** | Seção, texto atual, texto novo             |
| **Troca de imagem**      | Qual imagem, nova imagem em WebP/PNG         |
| **Bug ou erro**          | Print da tela + dispositivo + navegador      |
| **Leads não chegando**  | Desde quando parou + último lead registrado |
| **Nova funcionalidade**  | Descrição do que deseja                    |

### Canais de suporte

> **⚠️ Preencha abaixo com os dados reais de contato do desenvolvedor:**

- **Email:** `[email do desenvolvedor]`
- **WhatsApp:** `[número do desenvolvedor]`
- **Horário de atendimento:** `[ex: Seg-Sex, 9h-18h]`

### Prazos típicos

| Tipo                         | Prazo estimado              |
| ---------------------------- | --------------------------- |
| Correção de bug crítico   | Até 24 horas               |
| Alteração de texto simples | Até 48 horas               |
| Troca de imagem              | Até 48 horas               |
| Nova funcionalidade          | Sob orçamento e cronograma |

---

*Documento atualizado em março de 2026.*
