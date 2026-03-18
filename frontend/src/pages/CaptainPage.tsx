import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthSection } from '../components/AuthSection'
import { useAuth } from '../context/useAuth'
import { acceptRide, getCaptainRides, getOpenRides, type Ride } from '../services/rideService'

export function CaptainPage() {
  const { isAuthenticated, session } = useAuth()
  const [openRides, setOpenRides] = useState<Ride[]>([])
  const [myRides, setMyRides] = useState<Ride[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated || session?.role !== 'DRIVER') {
      return
    }

    async function loadDashboard() {
      try {
        const [openResults, currentResults] = await Promise.all([
          getOpenRides(),
          getCaptainRides(),
        ])
        setOpenRides(openResults)
        setMyRides(currentResults)
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Unable to load captain dashboard.',
        )
      }
    }

    void loadDashboard()
  }, [isAuthenticated, session?.role])

  async function handleAcceptRide(rideId: number) {
    try {
      const accepted = await acceptRide(rideId)
      setOpenRides((current) => current.filter((ride) => ride.id !== rideId))
      setMyRides((current) => [accepted, ...current])
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Unable to accept ride.',
      )
    }
  }

  if (!isAuthenticated || session?.role !== 'DRIVER') {
    return (
      <main className="min-h-screen bg-[#f6f6f1]">
        <AuthSection initialMode="signup" forceRole="DRIVER" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f6f6f1]">
      <section className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Captain dashboard
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-black">
              Manage nearby QRide requests
            </h1>
          </div>
          <Link className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white" to="/home">
            Back to home
          </Link>
        </div>

        {error ? (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-[28px] bg-white p-6">
            <h2 className="text-3xl font-semibold tracking-tight text-black">
              Available ride requests
            </h2>
            <div className="mt-5 space-y-4">
              {openRides.length === 0 ? (
                <p className="text-slate-500">No open requests right now.</p>
              ) : (
                openRides.map((ride) => (
                  <article key={ride.id} className="rounded-2xl border border-black/10 p-4">
                    <p className="font-semibold text-black">
                      {ride.pickupLocation} to {ride.dropoffLocation}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Rider: {ride.riderEmail} • Fare: ₹{ride.estimatedFare}
                    </p>
                    <button
                      className="mt-4 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
                      type="button"
                      onClick={() => void handleAcceptRide(ride.id)}
                    >
                      Accept ride
                    </button>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[28px] bg-white p-6">
            <h2 className="text-3xl font-semibold tracking-tight text-black">
              Accepted rides
            </h2>
            <div className="mt-5 space-y-4">
              {myRides.length === 0 ? (
                <p className="text-slate-500">No assigned rides yet.</p>
              ) : (
                myRides.map((ride) => (
                  <article key={ride.id} className="rounded-2xl border border-black/10 p-4">
                    <p className="font-semibold text-black">
                      {ride.pickupLocation} to {ride.dropoffLocation}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Status: {ride.status} • Rider: {ride.riderEmail}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
