const travelCards = [
  {
    title: 'Ride options',
    description:
      'There’s more than one way to move with QRide, no matter where you are or where you’re headed next.',
    action: 'Search ride options',
    visual: 'coast',
  },
  {
    title: '700+ airports',
    description:
      'You can request a ride to and from most major airports. Schedule a ride to the airport for one less thing to worry about.',
    action: 'Search airports',
    visual: 'airport',
  },
  {
    title: '15,000+ cities',
    description:
      'The app is available in thousands of cities worldwide, so you can request a ride even when you’re far from home.',
    action: 'Search cities',
    visual: 'city',
  },
]

const faqItems = [
  {
    question: 'Can I have a lost item delivered to me?',
    answer:
      'QRide can support quick package and item delivery in supported cities. Choose the package option in the app and send essentials across town.',
    link: 'Get details',
  },
  {
    question: 'Can I rent a car using QRide?',
    answer:
      'Yes. You can browse rental-style ride options in supported markets and plan your trip with flexible durations.',
    link: 'Find out more about rentals',
  },
  {
    question: 'Can I request a ride that picks up friends in different locations?',
    answer:
      'Yes. Set up a group ride in QRide, invite your friends, and coordinate pickup order before you head out together.',
    link: 'Learn more',
  },
  {
    question: 'Can I request a taxi on QRide?',
    answer:
      'QRide makes it easier to request available taxi options in supported cities without needing to find a taxi stand or call a local cab company.',
    link: 'Learn about requesting a taxi',
  },
  {
    question: 'Is there a QRide ride option for 5 people?',
    answer:
      'Yes. Larger vehicle categories help groups and families travel together with more space for passengers and luggage.',
    link: 'Get details about QRide XL',
  },
]

function TravelVisual({ visual }: { visual: string }) {
  if (visual === 'airport') {
    return (
      <div className="relative h-64 rounded-[24px] bg-[linear-gradient(160deg,#d9f2f0,#f4d7a1)]">
        <div className="absolute left-8 top-12 h-40 w-16 rounded-[2rem] bg-[#2f7f99]" />
        <div className="absolute left-24 top-16 h-28 w-44 rounded-[1.5rem] bg-[#51b3c5]" />
        <div className="absolute bottom-10 left-8 h-24 w-14 rounded-xl bg-[#2f2f2f]" />
        <div className="absolute bottom-14 left-28 h-28 w-20 rounded-[1.5rem] bg-[#ffe7b8]" />
        <div className="absolute bottom-10 right-10 h-20 w-28 rounded-[1.7rem] bg-[#61c2da] shadow-sm" />
        <div className="absolute right-24 top-20 text-5xl text-white/80">✈</div>
      </div>
    )
  }

  if (visual === 'city') {
    return (
      <div className="relative h-64 rounded-[24px] bg-[linear-gradient(160deg,#b7d8ee,#fff0cb)]">
        <div className="absolute bottom-0 left-6 h-44 w-28 rounded-t-[2rem] bg-[#7ea7c8]" />
        <div className="absolute bottom-0 left-40 h-36 w-24 rounded-t-[2rem] bg-[#9ac0db]" />
        <div className="absolute bottom-0 right-16 h-52 w-24 rounded-t-[2rem] bg-[#5a88b4]" />
        <div className="absolute bottom-10 left-20 h-16 w-32 rounded-[1.8rem] bg-[#93a5b6]" />
        <div className="absolute bottom-14 left-28 h-10 w-10 rounded-full bg-[#203040]" />
        <div className="absolute bottom-14 left-54 h-10 w-10 rounded-full bg-[#203040]" />
      </div>
    )
  }

  return (
    <div className="relative h-64 rounded-[24px] bg-[linear-gradient(160deg,#8ad6f0,#f7ebba)]">
      <div className="absolute left-0 top-24 h-32 w-full bg-[#8ab6db]" />
      <div className="absolute bottom-0 left-0 h-28 w-full bg-[#c6dff0]" />
      <div className="absolute left-16 top-20 h-6 w-40 rounded-full bg-white/60" />
      <div className="absolute bottom-10 left-16 h-20 w-48 rounded-[2rem] bg-white shadow-sm" />
      <div className="absolute bottom-14 left-24 h-7 w-16 rounded-t-full border-[8px] border-black border-b-0" />
      <div className="absolute bottom-8 left-28 h-8 w-8 rounded-full border-4 border-black bg-white" />
      <div className="absolute bottom-8 left-68 h-8 w-8 rounded-full border-4 border-black bg-white" />
    </div>
  )
}

export function HomeSections() {
  return (
    <>
      <section className="bg-[#f3f3f3]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-5 py-14 md:px-8 lg:grid-cols-[1.6fr_0.8fr]">
          <div className="rounded-[28px] bg-[#a9d7df] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">
                    Plan for later
                  </p>
                  <h2 className="text-4xl font-semibold tracking-[-0.05em] text-black md:text-6xl">
                    Get your ride right with QRide Reserve
                  </h2>
                </div>
                <div className="space-y-3">
                  <p className="text-xl font-semibold text-black">
                    Choose date and time
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white px-4 py-4">
                      <p className="text-sm text-slate-500">Date</p>
                      <p className="mt-2 text-lg font-medium text-slate-700">Calendar</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-4">
                      <p className="text-sm text-slate-500">Time</p>
                      <p className="mt-2 text-lg font-medium text-slate-700">Pickup time</p>
                    </div>
                  </div>
                </div>
                <button
                  className="rounded-2xl bg-black px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#1a1a1a]"
                  type="button"
                >
                  Next
                </button>
              </div>

              <div className="relative min-h-[280px] overflow-hidden rounded-[24px] bg-white/30">
                <div className="absolute right-8 top-10 h-56 w-56 rotate-[30deg] rounded-[2.5rem] bg-[#f3f5fa]" />
                <div className="absolute right-20 top-12 h-44 w-10 rotate-[35deg] rounded-full bg-[#7b4d38]" />
                <div className="absolute right-[7.5rem] top-[10rem] h-24 w-24 rounded-full border-[10px] border-[#dbe4f5] bg-black" />
                <div className="absolute right-[9.3rem] top-[11.4rem] h-2 w-9 rounded-full bg-[#ff9c73]" />
                <div className="absolute right-[10.2rem] top-[10.8rem] h-9 w-2 rounded-full bg-[#ff9c73]" />
              </div>
            </div>
          </div>

          <aside className="rounded-[28px] border border-black/10 bg-white p-6">
            <h3 className="text-3xl font-semibold tracking-tight text-black">
              Benefits
            </h3>
            <div className="mt-6 space-y-6 text-lg text-slate-800">
              <div className="border-b border-black/10 pb-5">
                Choose your exact pickup time up to 90 days in advance.
              </div>
              <div className="border-b border-black/10 pb-5">
                Extra wait time included to meet your ride.
              </div>
              <div>Cancel at no charge up to 60 minutes in advance.</div>
            </div>
            <a className="mt-8 inline-block underline underline-offset-4" href="/">
              See terms
            </a>
          </aside>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-5 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <h2 className="text-5xl font-semibold tracking-[-0.05em]">QRide One</h2>
            <p className="max-w-xl text-xl leading-8 text-white/85">
              One membership for member pricing and premium experiences on rides,
              deliveries, and more.
            </p>
            <button
              className="rounded-2xl bg-white px-7 py-4 text-lg font-semibold text-black transition hover:bg-white/90"
              type="button"
            >
              Try it now
            </button>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-[28px]">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="absolute rounded-[1.1rem] bg-[linear-gradient(160deg,#ffcf70,#8a3412)]"
                style={{
                  width: `${index % 2 === 0 ? 110 : 82}px`,
                  height: `${index % 2 === 0 ? 82 : 62}px`,
                  left: `${18 + index * 8}%`,
                  top: `${10 + (index % 4) * 14}%`,
                  transform: `rotate(${index % 2 === 0 ? 18 : -20}deg)`,
                }}
              >
                <span className="flex h-full items-center justify-center text-4xl font-semibold text-black/50">
                  Q
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f3]">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1fr_1fr]">
          <div className="relative flex justify-center">
            <div className="relative h-[360px] w-[320px] rounded-[2.5rem] bg-white shadow-sm ring-1 ring-black/10">
              <div className="border-b border-black/10 px-6 py-5 text-3xl font-semibold text-black">
                Group ride
              </div>
              <div className="px-4 py-5">
                <div className="rounded-[1.5rem] bg-white p-5 shadow-lg ring-1 ring-black/10">
                  <p className="text-2xl font-semibold text-black">Set pickup order</p>
                  <div className="mt-6 space-y-5">
                    {['Brian', 'Sarah'].map((name, index) => (
                      <div
                        key={name}
                        className="flex items-center justify-between border-b border-black/10 pb-4 last:border-b-0"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-lg font-medium text-black">{name}</p>
                            <div className="mt-2 h-3 w-28 rounded-full bg-slate-200" />
                          </div>
                        </div>
                        <span className="text-2xl text-slate-500">≡</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="max-w-lg text-5xl font-semibold tracking-[-0.05em] text-black">
              Ride with friends seamlessly
            </h2>
            <p className="max-w-xl text-xl leading-8 text-slate-700">
              Riding with friends just got easier. Set up a group ride in QRide,
              invite your friends, and arrive at your destination together.
            </p>
            <a className="text-lg font-medium underline underline-offset-4" href="/">
              Learn more
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f3]">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-16 md:px-8">
          <div className="space-y-10">
            <h2 className="text-5xl font-semibold tracking-[-0.05em] text-black">
              Use the QRide app to help you travel your way
            </h2>

            <div className="grid gap-8 lg:grid-cols-3">
              {travelCards.map((card) => (
                <article key={card.title} className="space-y-5">
                  <TravelVisual visual={card.visual} />
                  <div className="space-y-3">
                    <h3 className="text-[2rem] font-semibold tracking-tight text-black">
                      {card.title}
                    </h3>
                    <p className="text-lg leading-8 text-slate-700">
                      {card.description}
                    </p>
                  </div>
                  <button
                    className="rounded-2xl bg-black px-7 py-4 text-lg font-semibold text-white transition hover:bg-[#1a1a1a]"
                    type="button"
                  >
                    {card.action}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <h2 className="max-w-md text-5xl font-semibold tracking-[-0.05em]">
              Looking for business solutions?
            </h2>
            <p className="max-w-xl text-lg leading-8 text-white/85">
              Get information about how companies leverage QRide for business
              travel, courtesy rides, meal programs, and item delivery.
            </p>
            <ul className="space-y-4 text-lg text-white/90">
              <li>Business travel</li>
              <li>Courtesy rides</li>
              <li>Meal programs</li>
              <li>Item delivery</li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <button
                className="rounded-2xl bg-white px-7 py-4 text-lg font-semibold text-black transition hover:bg-white/90"
                type="button"
              >
                Get started
              </button>
              <a className="self-center text-lg underline underline-offset-4" href="/">
                Check out our solutions
              </a>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#17458f,#fdb34c)]">
            <div className="absolute left-14 top-14 h-40 w-56 rounded-[1.8rem] bg-[#f8f6ef] shadow-lg" />
            <div className="absolute left-24 top-24 h-24 w-40 rounded-[1rem] bg-[#244f9d]" />
            <div className="absolute right-16 top-8 h-64 w-40 rounded-[4rem] bg-[#ffe6c2]" />
            <div className="absolute right-24 top-4 h-36 w-20 rounded-full bg-[#d6542a]" />
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f3]">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-16 md:px-8">
          <div className="space-y-10">
            <h2 className="text-5xl font-semibold tracking-[-0.05em] text-black">
              Frequently asked questions
            </h2>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={item.question}
                  className="border-b border-black/10 py-6"
                  open={index === 0}
                >
                  <summary className="cursor-pointer list-none text-2xl font-semibold text-black">
                    {item.question}
                  </summary>
                  <div className="mt-5 max-w-5xl space-y-5 text-lg leading-8 text-slate-700">
                    <p>{item.answer}</p>
                    <a className="underline underline-offset-4" href="/">
                      {item.link}
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efefef]">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-16 md:px-8">
          <div className="space-y-10">
            <h2 className="text-5xl font-semibold tracking-[-0.05em] text-black">
              Do more in the app
            </h2>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="flex items-center justify-between rounded-[28px] bg-white p-8">
                <div className="flex items-center gap-6">
                  <div className="grid h-36 w-36 grid-cols-6 gap-[2px] rounded-2xl bg-white p-3 ring-1 ring-black/10">
                    {Array.from({ length: 36 }).map((_, index) => (
                      <span
                        key={index}
                        className={`${index % 3 === 0 || index % 5 === 0 ? 'bg-black' : 'bg-white'} rounded-sm border border-black/10`}
                      />
                    ))}
                  </div>
                  <div>
                    <h3 className="text-4xl font-semibold tracking-tight text-black">
                      Download the QRide app
                    </h3>
                    <p className="mt-2 text-lg text-slate-600">Scan to download</p>
                  </div>
                </div>
                <span className="text-5xl text-black">→</span>
              </article>

              <article className="flex items-center justify-between rounded-[28px] bg-white p-8">
                <div className="flex items-center gap-6">
                  <div className="flex h-36 w-36 items-center justify-center rounded-[2.5rem] bg-black text-5xl font-semibold text-white">
                    Q
                  </div>
                  <div>
                    <h3 className="text-4xl font-semibold tracking-tight text-black">
                      Sign up to ride
                    </h3>
                    <p className="mt-2 text-lg text-slate-600">
                      Create your QRide account
                    </p>
                  </div>
                </div>
                <span className="text-5xl text-black">→</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f3]">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-16 text-base leading-8 text-slate-700 md:px-8">
          <div className="space-y-8">
            <p>
              Join the millions of riders who trust QRide for everyday travel.
              Get doorstep pickup and dropoff to your chosen destination at the
              tap of a button and choose from a range of ride options.
            </p>
            <p>
              Limited-period offers may apply to first trips completed within
              promotional windows. Discounts, eligibility, and availability
              depend on the city, product type, and account status.
            </p>
            <p>
              Offers cannot be combined with other promotions or promo codes and
              may be changed, suspended, or withdrawn without prior notice.
              Terms and conditions apply.
            </p>
            <p>Certain requirements and features vary by country, region, and city.</p>
          </div>
        </div>
      </section>
    </>
  )
}
