import Link from "next/link";

const highlights = [
  "Crie bolões privados para cada grupo",
  "Convide a galera por link ou código",
  "Dê seus chutes antes da bola rolar",
  "Acompanhe ranking e conquistas em tempo real",
];

export default function HomePage() {
  return (
    <main className="m-page">
      <nav className="m-container flex h-16 items-center justify-between border-b m-hairline">
        <div className="flex items-center gap-4">
          <div className="m-stripe w-14" aria-hidden="true">
            <span />
          </div>
          <h1 className="m-link">Bolao Dos Dengo</h1>
        </div>
        <Link className="m-link" href="/pools">
          Entrar →
        </Link>
      </nav>

      <section className="m-photo-band">
        <div className="m-container grid min-h-[calc(100vh-4rem)] items-end py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:py-24">
          <div className="max-w-4xl">
            <p className="m-eyebrow">Copa do Mundo 2026</p>
            <h2 className="m-display mt-4 text-5xl md:text-7xl lg:text-[80px]">
              Seu grupo competindo jogo a jogo.
            </h2>
            <p className="m-body mt-6 max-w-2xl text-lg">
              Chute placares, acompanhe pontuação automática e veja quem crava
              mais resultados em uma experiência mobile-first com precisão de
              paddock.
            </p>
            <div className="mt-10 grid gap-3 sm:flex">
              <Link className="m-button" href="/pools/new">
                Criar meu bolao
              </Link>
              <Link className="m-button m-button-secondary" href="/join">
                Tenho um convite
              </Link>
            </div>
          </div>

          <div className="m-card mt-12 p-6 md:mt-0">
            <p className="m-eyebrow">Rodada de hoje</p>
            <div className="m-stripe mt-4" aria-hidden="true">
              <span />
            </div>
            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
              <strong className="m-link">Brasil</strong>
              <span className="text-[var(--muted)]">20:00</span>
              <strong className="m-link">Japao</strong>
            </div>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="m-spec-cell p-5 text-center text-4xl font-bold">
                2
              </div>
              <span className="m-eyebrow text-center">x</span>
              <div className="m-spec-cell p-5 text-center text-4xl font-bold">
                1
              </div>
            </div>
            <p className="m-body mt-5 border-t pt-4 text-sm m-hairline">
              Editavel ate o inicio da partida.
            </p>
          </div>
        </div>
      </section>

      <section className="m-container py-24">
        <p className="m-eyebrow">Sistema de disputa</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight) => (
            <article className="m-card p-6" key={highlight}>
              <h3 className="border-t pt-6 text-xl font-bold uppercase leading-tight m-hairline">
                {highlight}
              </h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
