const exploreCards = [
  {
    title: 'Ride',
    description:
      'Go anywhere with QRide. Request a ride, hop in, and go.',
    visual: 'sedan',
  },
  {
    title: 'Reserve',
    description:
      'Reserve your ride in advance so you can relax on the day of your trip.',
    visual: 'calendar',
  },
  {
    title: 'Intercity',
    description:
      'Get convenient, affordable outstation cabs anytime at your door.',
    visual: 'traveler',
  },
]

function CardVisual({ visual }: { visual: string }) {
  if (visual === 'calendar') {
    return (
      <div className="relative h-24 w-32">
        <div className="absolute left-3 top-2 h-16 w-16 rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
          <div className="h-4 rounded-t-2xl bg-[#ff5a3d]" />
          <div className="grid grid-cols-3 gap-1 p-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} className="h-2 rounded-full bg-slate-200" />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-white shadow-sm">
          <div className="relative h-8 w-8 rounded-full border-2 border-black">
            <span className="absolute left-1/2 top-1 h-3 w-[2px] -translate-x-1/2 rounded bg-black" />
            <span className="absolute left-1/2 top-1/2 h-[2px] w-3 rounded bg-black" />
          </div>
        </div>
      </div>
    )
  }

  if (visual === 'traveler') {
    return (
      <div className="relative h-24 w-32">
        <div className="absolute bottom-2 left-2 flex items-end gap-2">
          <div className="flex flex-col items-center">
            <span className="h-5 w-5 rounded-full bg-black" />
            <span className="mt-1 h-10 w-3 rounded-full bg-[#1d4ed8]" />
          </div>
          <div className="mb-1 h-10 w-5 rounded-md bg-[#111827]" />
        </div>
        <div className="absolute bottom-0 right-0 h-14 w-24 rounded-[1.5rem] bg-white shadow-sm ring-1 ring-black/10">
          <div className="absolute left-3 top-5 h-5 w-8 rounded-t-full border-[5px] border-black border-b-0" />
          <div className="absolute left-5 top-7 h-3 w-7 rounded bg-slate-100" />
          <span className="absolute bottom-1 left-4 h-4 w-4 rounded-full border-2 border-black" />
          <span className="absolute bottom-1 right-4 h-4 w-4 rounded-full border-2 border-black" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-24 w-32">
      <div className="absolute bottom-0 right-0 h-14 w-24 rounded-[1.6rem] bg-white shadow-sm ring-1 ring-black/10">
        <div className="absolute left-3 top-5 h-5 w-8 rounded-t-full border-[5px] border-black border-b-0" />
        <div className="absolute left-5 top-7 h-7 w-8 rounded bg-slate-100" />
        <span className="absolute bottom-1 left-4 h-4 w-4 rounded-full border-2 border-black" />
        <span className="absolute bottom-1 right-4 h-4 w-4 rounded-full border-2 border-black" />
      </div>
      <div className="absolute bottom-2 right-6 h-3 w-12 -rotate-6 rounded-full bg-black/10 blur-sm" />
    </div>
  )
}

export function ExploreSection() {
  return (
    <section className="bg-[#f3f3f3]">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8 md:py-14">
        <div className="space-y-8">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-black md:text-6xl">
            Explore what you can do with QRide
          </h2>

          <div className="grid gap-5 lg:grid-cols-3">
            {exploreCards.map((card) => (
              <article
                key={card.title}
                className="grid gap-4 rounded-[22px] bg-[#e9e9e9] p-5 md:grid-cols-[1fr_132px] md:items-center"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-[2rem] font-semibold tracking-tight text-black">
                      {card.title}
                    </h3>
                    <p className="max-w-xs text-base leading-7 text-slate-700">
                      {card.description}
                    </p>
                  </div>
                  <button
                    className="rounded-full bg-[#f3f3f3] px-5 py-3 text-lg font-semibold text-black transition hover:bg-white"
                    type="button"
                  >
                    Details
                  </button>
                </div>

                <div className="flex justify-end">
                  <CardVisual visual={card.visual} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
