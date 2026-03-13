import heroImg from './assets/hero.png'

function App() {
  return (
    <main className="min-h-screen bg-city-grid px-6 py-10 text-ink md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="glass-panel overflow-hidden">
          <div className="grid gap-10 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-12">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-ember/10 px-4 py-2 text-sm font-semibold text-ember">
                Ride Booking Platform
              </span>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
                  Dispatch riders, drivers, and payments from one control plane.
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                  React on the frontend, Spring Boot in the API layer, MySQL in
                  the data tier, and Docker-based environments that reload while
                  you build.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  href="http://localhost:5173"
                >
                  Open frontend
                </a>
                <a
                  className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-ocean hover:text-ocean"
                  href="http://localhost:8080"
                >
                  Check backend
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <article className="rounded-2xl bg-slate-950 px-4 py-4 text-white">
                  <p className="text-2xl font-semibold">3</p>
                  <p className="mt-1 text-sm text-slate-300">Containers in dev compose</p>
                </article>
                <article className="rounded-2xl bg-white px-4 py-4 ring-1 ring-slate-200">
                  <p className="text-2xl font-semibold text-ocean">HMR</p>
                  <p className="mt-1 text-sm text-slate-600">Frontend updates without rebuilds</p>
                </article>
                <article className="rounded-2xl bg-white px-4 py-4 ring-1 ring-slate-200">
                  <p className="text-2xl font-semibold text-ember">CI/CD</p>
                  <p className="mt-1 text-sm text-slate-600">Lint, test, build, Docker checks</p>
                </article>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-8 rounded-full bg-ocean/10 blur-3xl" />
              <img
                src={heroImg}
                alt="Ride booking dashboard preview"
                className="relative w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-lift"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <article className="glass-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Frontend
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Tailwind 3 + Vite</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Running in Docker with bind mounts, polling file watching, and Vite
              HMR exposed on port 5173.
            </p>
          </article>
          <article className="glass-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Backend
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Spring Boot Dev Flow</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Maven-based quality gates, Docker image builds, and database-backed
              compose startup with MySQL health checks.
            </p>
          </article>
          <article className="glass-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Delivery
            </p>
            <h2 className="mt-3 text-2xl font-semibold">GitHub Actions</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              CI validates frontend and backend on pull requests, then builds
              deployable Docker images and supports environment-based delivery.
            </p>
          </article>
        </section>
      </div>
    </main>
  )
}

export default App
