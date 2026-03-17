import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Intelekta',
  description: 'Política de privacidade e proteção de dados pessoais da Intelekta, em conformidade com a LGPD.',
}

const LAST_UPDATE = '17 de março de 2026'

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link href="/" className="inline-block mb-10">
          <Image
            src="/images/logo-intelekta.webp"
            alt="Intelekta"
            width={140}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <h1 className="font-serif text-editorial-lg text-foreground mb-4">
          Política de Privacidade
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Última atualização: {LAST_UPDATE}
        </p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">1. Introdução</h2>
            <p className="text-sm">
              A <strong>Intelekta — Centro de Desenvolvimento Cognitivo e Socioemocional</strong>,
              com sede na Rua Afonso Pena, 403, Praia da Costa, Vila Velha – ES, CEP 29101-010,
              é responsável pelo tratamento dos dados pessoais coletados por meio deste website,
              em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei n.º 13.709/2018 — LGPD)</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">2. Dados Coletados</h2>
            <p className="text-sm mb-3">Podemos coletar os seguintes dados pessoais:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Dados de contato</strong>: nome, telefone e programa de interesse, quando fornecidos voluntariamente pelo formulário de contato ou WhatsApp.</li>
              <li><strong>Dados de navegação</strong>: páginas visitadas, tempo de permanência e tipo de dispositivo, coletados de forma anônima pela ferramenta <em>Vercel Analytics</em>.</li>
            </ul>
            <p className="text-sm mt-3">
              Não coletamos dados sensíveis (origem racial, convicção religiosa, dados de saúde, etc.) por meio deste website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">3. Finalidade do Tratamento</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Responder solicitações de contato e agendamento de aulas experimentais.</li>
              <li>Melhorar a experiência de navegação e o desempenho do site.</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">4. Compartilhamento de Dados</h2>
            <p className="text-sm">
              Seus dados <strong>não são vendidos, alugados ou compartilhados</strong> com terceiros para fins comerciais. Poderão ser compartilhados apenas com:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li><strong>Vercel Inc.</strong> — hospedagem do site e analytics (dados anônimos de navegação).</li>
              <li><strong>Autoridades competentes</strong> — quando exigido por lei ou decisão judicial.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">5. Cookies</h2>
            <p className="text-sm">
              Este site utiliza apenas cookies técnicos essenciais para o funcionamento correto da plataforma.
              Não utilizamos cookies de rastreamento publicitário ou de terceiros.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">6. Segurança</h2>
            <p className="text-sm">
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados,
              incluindo conexão HTTPS/TLS, cabeçalhos de segurança (HSTS, CSP, X-Frame-Options)
              e hospedagem em infraestrutura com certificações de segurança.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">7. Seus Direitos (LGPD)</h2>
            <p className="text-sm mb-3">Você tem direito a:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Confirmar a existência de tratamento dos seus dados.</li>
              <li>Acessar, corrigir ou atualizar seus dados pessoais.</li>
              <li>Solicitar a eliminação dos seus dados pessoais.</li>
              <li>Revogar o consentimento a qualquer momento.</li>
              <li>Obter informações sobre o compartilhamento dos seus dados.</li>
            </ul>
            <p className="text-sm mt-3">
              Para exercer seus direitos, entre em contato pelo e-mail{' '}
              <a href="mailto:contato@intelektamente.com" className="text-primary hover:underline">contato@intelektamente.com</a>{' '}
              ou pelo WhatsApp{' '}
              <a href="https://wa.me/5527996194455" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">(27) 99619-4455</a>.
              Responderemos em até 15 dias úteis.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">8. Alterações nesta Política</h2>
            <p className="text-sm">
              Esta política poderá ser atualizada periodicamente. Recomendamos que consulte esta
              página regularmente. A data da última atualização está indicada no topo deste documento.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">9. Contato</h2>
            <p className="text-sm">
              Se tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais, entre em contato:
            </p>
            <ul className="list-none space-y-1 text-sm mt-3">
              <li><strong>Intelekta</strong></li>
              <li>Rua Afonso Pena, 403 — Praia da Costa, Vila Velha – ES</li>
              <li>E-mail: <a href="mailto:contato@intelektamente.com" className="text-primary hover:underline">contato@intelektamente.com</a></li>
              <li>WhatsApp: <a href="https://wa.me/5527996194455" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">(27) 99619-4455</a></li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-sm text-primary hover:underline">
            &larr; Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  )
}
