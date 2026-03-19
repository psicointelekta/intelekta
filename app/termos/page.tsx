import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Termos de Uso | Intelekta',
  description: 'Termos de uso do website da Intelekta — Centro de Desenvolvimento Cognitivo e Socioemocional.',
}

const LAST_UPDATE = '17 de março de 2026'

export default function TermosPage() {
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
          Termos de Uso
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Última atualização: {LAST_UPDATE}
        </p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">1. Aceitação dos Termos</h2>
            <p className="text-sm">
              Ao acessar e utilizar o website da <strong>Intelekta</strong> (intelektamente.com), você
              concorda com estes Termos de Uso. Caso não concorde, solicitamos que não utilize o site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">2. Sobre a Intelekta</h2>
            <p className="text-sm">
              A Intelekta é um <strong>centro de educação complementar</strong> especializado em
              desenvolvimento cognitivo e socioemocional, fundamentado em neurociência. Nossos serviços
              <strong> não substituem</strong> acompanhamento psicológico, psiquiátrico, pedagógico ou
              médico. Recomendamos que tratamentos clínicos sejam realizados por profissionais habilitados.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">3. Uso do Website</h2>
            <p className="text-sm mb-3">Ao utilizar este site, você se compromete a:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Fornecer informações verdadeiras no formulário de contato.</li>
              <li>Não utilizar o site para fins ilícitos ou que possam danificar, desabilitar ou sobrecarregar a infraestrutura.</li>
              <li>Não tentar acessar áreas restritas ou sistemas internos.</li>
              <li>Respeitar os direitos de propriedade intelectual descritos nestes termos.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">4. Propriedade Intelectual</h2>
            <p className="text-sm">
              Todo o conteúdo deste website — incluindo textos, imagens, logotipos, design, código-fonte
              e identidade visual — é de propriedade da Intelekta ou de seus licenciantes e está protegido
              pelas leis brasileiras de propriedade intelectual (Lei n.º 9.610/1998).
              É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">5. Agendamento e Aulas Experimentais</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>A aula experimental gratuita está sujeita à disponibilidade de vagas e horários.</li>
              <li>O agendamento realizado via WhatsApp ou formulário de contato não garante a reserva até confirmação por parte da equipe.</li>
              <li>A Intelekta reserva-se o direito de cancelar ou reagendar aulas experimentais mediante aviso prévio.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">6. Limitação de Responsabilidade</h2>
            <p className="text-sm">
              A Intelekta não se responsabiliza por:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>Resultados individuais, que podem variar conforme o perfil, frequência e engajamento de cada aluno.</li>
              <li>Indisponibilidade temporária do site por manutenção ou falhas técnicas.</li>
              <li>Conteúdo de sites de terceiros eventualmente referenciados.</li>
              <li>Decisões tomadas com base exclusiva nas informações disponibilizadas no site.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">7. Links Externos</h2>
            <p className="text-sm">
              Este site pode conter links para plataformas de terceiros (Instagram, WhatsApp, Google Maps).
              A Intelekta não se responsabiliza pelo conteúdo, políticas de privacidade ou práticas desses serviços externos.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">8. Alterações nos Termos</h2>
            <p className="text-sm">
              A Intelekta poderá alterar estes Termos de Uso a qualquer momento. As alterações entram em vigor
              na data de sua publicação nesta página. Recomendamos a consulta periódica.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">9. Legislação Aplicável</h2>
            <p className="text-sm">
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro
              da Comarca de Vila Velha, ES, para dirimir quaisquer controvérsias.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-3">10. Contato</h2>
            <p className="text-sm">
              Para dúvidas sobre estes Termos de Uso:
            </p>
            <ul className="list-none space-y-1 text-sm mt-3">
              <li><strong>Intelekta</strong></li>
              <li>Rua Afonso Pena, 403 — Praia da Costa, Vila Velha – ES</li>
              <li>E-mail: <a href="mailto:contato@intelektamente.com" className="text-primary hover:underline">contato@intelektamente.com</a></li>
              <li>WhatsApp: <a href="https://wa.me/5527988773890" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">(27) 98877-3890</a></li>
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
