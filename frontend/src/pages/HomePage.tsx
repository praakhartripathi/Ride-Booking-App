import { AuthSection } from '../components/AuthSection'
import { ExploreSection } from '../components/ExploreSection'
import { HomeSections } from '../components/HomeSections'
import { Navbar } from '../components/Navbar'
import { RideHero } from '../components/RideHero'

const navItems = ['Ride', 'Drive', 'Business', 'About']
const rideTabs = [
  'Request a ride',
  'Reserve a ride',
  'See prices',
  'Explore ride options',
  'Airport rides',
]

export function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f6f1] text-ink">
      <Navbar navItems={navItems} />
      <RideHero rideTabs={rideTabs} />
      <ExploreSection />
      <HomeSections />
      <AuthSection />

      <section className="bg-[#f6f6f1]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-5 px-5 py-8 md:px-8 lg:grid-cols-4">
          <article className="rounded-[28px] bg-white p-6">
            <h3 className="text-lg font-semibold text-black">Ride with QRide</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fast booking for city trips, airport runs, and daily commuting.
            </p>
          </article>
          <article className="rounded-[28px] bg-white p-6">
            <h3 className="text-lg font-semibold text-black">Drive on your time</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Create a QRide account and switch to driver mode when you are ready.
            </p>
          </article>
          <article className="rounded-[28px] bg-white p-6">
            <h3 className="text-lg font-semibold text-black">Business travel</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Centralize employee travel and trip visibility under one QRide flow.
            </p>
          </article>
          <article className="rounded-[28px] bg-white p-6">
            <h3 className="text-lg font-semibold text-black">Built for API-first delivery</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              React frontend and Spring Boot backend stay connected across local development and Docker.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
