import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LocationAutocompleteInput } from '../components/LocationAutocompleteInput'
import { getDistanceTime } from '../services/locationService'
import { createRide, getUserRides, type Ride } from '../services/rideService'

const rideTypes = [
  { name: 'Bike', multiplier: 0.8, eta: '3 min away' },
  { name: 'Mini', multiplier: 1, eta: '5 min away' },
  { name: 'Sedan', multiplier: 1.35, eta: '7 min away' },
]

export function RidePage() {
  const [pickupLocation, setPickupLocation] = useState('')
  const [dropoffLocation, setDropoffLocation] = useState('')
  const [riderNotes, setRiderNotes] = useState('')
  const [selectedRideType, setSelectedRideType] = useState('Mini')
  const [distanceKm, setDistanceKm] = useState<number | null>(null)
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null)
  const [rides, setRides] = useState<Ride[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loadingEstimate, setLoadingEstimate] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const baseFare = useMemo(() => {
    if (!distanceKm) {
      return 120
    }

    const selected = rideTypes.find((rideType) => rideType.name === selectedRideType)
    const multiplier = selected?.multiplier ?? 1
    return Number((distanceKm * 18 * multiplier + 45).toFixed(2))
  }, [distanceKm, selectedRideType])

  useEffect(() => {
    async function loadRides() {
      try {
        const results = await getUserRides()
        setRides(results)
      } catch {
        setRides([])
      }
    }

    void loadRides()
  }, [])

  async function handleEstimate() {
    if (!pickupLocation.trim() || !dropoffLocation.trim()) {
      setError('Pickup and destination are required.')
      return
    }

    setLoadingEstimate(true)
    setError('')

    try {
      const estimate = await getDistanceTime(pickupLocation, dropoffLocation)
      setDistanceKm(estimate.distanceKm)
      setDurationMinutes(estimate.durationMinutes)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to fetch distance and time.',
      )
    } finally {
      setLoadingEstimate(false)
    }
  }

  async function handleConfirmRide() {
    setSubmitting(true)
    setError('')
    setMessage('')

    try {
      const ride = await createRide({
        pickupLocation,
        dropoffLocation,
        scheduledAt: new Date(Date.now() + 15 * 60 * 1000).toISOString().slice(0, 19),
        estimatedFare: baseFare,
        riderNotes,
      })
      setMessage(`Ride #${ride.id} created successfully.`)
      setRides((current) => [ride, ...current])
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Unable to create ride.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f6f1]">
      <section className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Rider console
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-black">
              Plan and confirm your QRide trip
            </h1>
          </div>
          <Link className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white" to="/home">
            Back to home
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] bg-white p-6 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.45)] md:p-8">
            <div className="space-y-4">
              <LocationAutocompleteInput
                icon="●"
                placeholder="Pickup location"
                value={pickupLocation}
                onChange={setPickupLocation}
              />
              <LocationAutocompleteInput
                icon="■"
                placeholder="Destination"
                value={dropoffLocation}
                onChange={setDropoffLocation}
              />
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">Notes for driver</span>
                <textarea
                  className="min-h-28 w-full rounded-2xl border border-black/10 bg-[#f8f8f4] px-4 py-4 outline-none transition focus:border-black"
                  value={riderNotes}
                  onChange={(event) => setRiderNotes(event.target.value)}
                  placeholder="Gate number, landmark, or pickup notes"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-2xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-[#1a1a1a]"
                type="button"
                onClick={() => void handleEstimate()}
                disabled={loadingEstimate}
              >
                {loadingEstimate ? 'Calculating...' : 'Find ride'}
              </button>
              <button
                className="rounded-2xl border border-black px-6 py-4 text-lg font-semibold text-black"
                type="button"
                onClick={() => void handleConfirmRide()}
                disabled={submitting}
              >
                {submitting ? 'Confirming...' : 'Confirm ride'}
              </button>
            </div>

            {error ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            {message ? (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {rideTypes.map((rideType) => (
                <button
                  key={rideType.name}
                  className={`rounded-[28px] border p-5 text-left transition ${
                    selectedRideType === rideType.name
                      ? 'border-black bg-black text-white'
                      : 'border-black/10 bg-white text-black'
                  }`}
                  type="button"
                  onClick={() => setSelectedRideType(rideType.name)}
                >
                  <p className="text-2xl font-semibold">{rideType.name}</p>
                  <p className="mt-2 text-sm">{rideType.eta}</p>
                </button>
              ))}
            </div>

            <div className="rounded-[28px] bg-white p-6">
              <h2 className="text-3xl font-semibold tracking-tight text-black">
                Trip estimate
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#f6f6f1] p-4">
                  <p className="text-sm text-slate-500">Distance</p>
                  <p className="mt-2 text-2xl font-semibold text-black">
                    {distanceKm ? `${distanceKm} km` : '--'}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f6f6f1] p-4">
                  <p className="text-sm text-slate-500">Estimated time</p>
                  <p className="mt-2 text-2xl font-semibold text-black">
                    {durationMinutes ? `${durationMinutes} min` : '--'}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f6f6f1] p-4">
                  <p className="text-sm text-slate-500">Estimated fare</p>
                  <p className="mt-2 text-2xl font-semibold text-black">₹{baseFare}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-6">
              <h2 className="text-3xl font-semibold tracking-tight text-black">
                Your recent rides
              </h2>
              <div className="mt-5 space-y-3">
                {rides.length === 0 ? (
                  <p className="text-slate-500">No rides created yet.</p>
                ) : (
                  rides.map((ride) => (
                    <article
                      key={ride.id}
                      className="rounded-2xl border border-black/10 p-4"
                    >
                      <p className="font-semibold text-black">
                        {ride.pickupLocation} to {ride.dropoffLocation}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Status: {ride.status} • Fare: ₹{ride.estimatedFare}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
