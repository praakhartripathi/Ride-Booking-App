import { AuthSection } from '../components/AuthSection'
import { Navbar } from '../components/Navbar'

export function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f1] text-ink">
      <Navbar navItems={['Ride', 'Drive', 'Business', 'About']} />
      <AuthSection initialMode="signup" />
    </main>
  )
}
