import { useState } from 'react'
import heroImg from '../assets/hero.png'
import { LocationAutocompleteInput } from './LocationAutocompleteInput'

type RideHeroProps = {
  rideTabs: string[]
}

export function RideHero({ rideTabs }: RideHeroProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Pickup now')
  const [pickupLocation, setPickupLocation] = useState('')
  const [dropoffLocation, setDropoffLocation] = useState('')

  return (
    <>
      <section className="bg-[#f3f3f3]">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-6 md:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-[2.15rem] font-semibold tracking-tight text-black">
              Ride
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[1rem] text-slate-500">
              {rideTabs.map((item, index) => (
                <a
                  key={item}
                  className={`transition hover:text-black ${
                    index === 0 ? 'font-medium text-black' : ''
                  }`}
                  href="/"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f3]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 py-10 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="flex items-center gap-2 text-[1.05rem] text-black">
                <span className="text-lg">•</span>
                <span>IN</span>
                <a className="underline decoration-black underline-offset-4" href="/">
                  Change city
                </a>
              </p>
              <h2 className="max-w-[12ch] text-5xl font-semibold tracking-[-0.05em] text-black md:text-7xl">
                Request a ride for now or later
              </h2>
            </div>

            <div className="space-y-3 text-base text-black">
              <p className="font-medium">
                Up to 50% off your first 5 QRide rides. T&amp;Cs apply.*
              </p>
              <p className="text-slate-600">*Valid within 15 days of signup.</p>
            </div>

            <div className="space-y-4">
              <div className="relative inline-block">
                <button
                  className="inline-flex items-center gap-3 rounded-full bg-[#d9d9d9] px-5 py-4 text-lg font-medium text-black"
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white">
                    ●
                  </span>
                  {selectedOption}
                  <span className="text-sm">▼</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 top-full z-10 mt-2 w-full min-w-[200px] rounded-xl bg-white p-2 shadow-xl ring-1 ring-black ring-opacity-5">
                    <button
                      className="block w-full rounded-lg px-4 py-3 text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedOption('Pickup now')
                        setIsDropdownOpen(false)
                      }}
                    >
                      Pickup now
                    </button>
                    <button
                      className="block w-full rounded-lg px-4 py-3 text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedOption('Schedule later')
                        setIsDropdownOpen(false)
                      }}
                    >
                      Schedule later
                    </button>
                  </div>
                )}
              </div>

              <div className="max-w-[420px] space-y-3">
                <LocationAutocompleteInput
                  icon="○"
                  placeholder="Pickup location"
                  value={pickupLocation}
                  onChange={setPickupLocation}
                  actionIcon="➤"
                />
                <LocationAutocompleteInput
                  icon="□"
                  placeholder="Dropoff location"
                  value={dropoffLocation}
                  onChange={setDropoffLocation}
                />
              </div>

              <button
                className="rounded-2xl bg-black px-7 py-4 text-lg font-semibold text-white transition hover:bg-[#1a1a1a]"
                type="button"
              >
                See prices
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] bg-[#d7b19a] lg:justify-self-end">
            <img
              src={heroImg}
              alt="QRide pickup scene"
              className="h-full w-full max-w-[640px] object-cover"
            />
          </div>
        </div>
      </section>
    </>
  )
}
