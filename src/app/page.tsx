import Link from "next/link";

const highlights = [
  "Crie bolões privados para cada grupo",
  "Convide a galera por link ou código",
  "Dê seus chutes antes da bola rolar",
  "Acompanhe ranking e conquistas em tempo real",
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6 sm:max-w-5xl sm:px-8">
      <nav className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0f7b4f]">
            Copa 2026
          </p>
          <h1 className="text-xl font-black">Bolao Dos Dengo</h1>
        </div>
        <Link
          className="rounded-full bg-[#0f7b4f] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-green-900/20"
          href="/pools"
        >
          Entrar
        </Link>
      </nav>

      <section className="flex flex-1 flex-col justify-center py-12 sm:grid sm:grid-cols-[1.05fr_0.95fr] sm:items-center sm:gap-10">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-[#6d4b09] shadow-sm">
            Bolao simples, disputa séria.
          </p>
          <h2 className="text-5xl font-black leading-[0.94] tracking-tight sm:text-6xl">
            Seu grupo competindo jogo a jogo.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#6d5c4b]">
            Chute placares, acompanhe pontuação automática e veja quem crava
            mais resultados na Copa do Mundo masculina de 2026.
          </p>
          <div className="mt-8 grid gap-3">
            <Link
              className="rounded-2xl bg-[#0f7b4f] px-5 py-4 text-center text-base font-black text-white shadow-xl shadow-green-900/20"
              href="/pools/new"
            >
              Criar meu bolao
            </Link>
            <Link
              className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-center text-base font-black"
              href="/join"
            >
              Tenho um convite
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-[#20130a] p-4 text-white shadow-2xl sm:mt-0">
          <div className="rounded-[1.5rem] bg-white/10 p-4">
            <p className="text-sm font-bold text-[#f4b63f]">Rodada de hoje</p>
            <div className="mt-4 rounded-2xl bg-white p-4 text-[#20130a]">
              <div className="flex items-center justify-between text-sm font-bold text-[#6d5c4b]">
                <span>Brasil</span>
                <span>20:00</span>
                <span>Japao</span>
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="rounded-2xl bg-[#fff8ef] p-4 text-center text-3xl font-black">
                  2
                </div>
                <span className="font-black">x</span>
                <div className="rounded-2xl bg-[#fff8ef] p-4 text-center text-3xl font-black">
                  1
                </div>
              </div>
              <p className="mt-4 rounded-xl bg-[#f4b63f]/20 px-3 py-2 text-center text-sm font-bold text-[#6d4b09]">
                Editavel ate o inicio da partida
              </p>
            </div>
          </div>
          <ul className="mt-5 grid gap-3 text-sm font-semibold text-white/86">
            {highlights.map((highlight) => (
              <li key={highlight} className="rounded-2xl bg-white/10 px-4 py-3">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
