import { Link, useNavigate } from 'react-router-dom'

type NavbarProps = {
  navItems: string[]
  onLoginClick?: () => void
  onSignupClick?: () => void
}

export function Navbar({ navItems, onLoginClick, onSignupClick }: NavbarProps) {
  const navigate = useNavigate()

  return (
    <header className="bg-black text-white">
      <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link className="text-[2rem] font-semibold tracking-tight" to="/home">
            QRide
          </Link>
          <div className="hidden items-center gap-7 text-[1.02rem] font-medium lg:flex">
            {navItems.map((item) => (
              <Link
                key={item}
                className="transition hover:text-white/80"
                to={item === 'Drive' ? '/captain' : '/home'}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-6 text-[1.02rem] font-medium md:flex">
          <button className="rounded-full bg-transparent px-0 py-0 text-white" type="button">
            EN
          </button>
          <Link className="transition hover:text-white/80" to="/home">
            Help
          </Link>
          <button
            className="rounded-full bg-transparent px-0 py-0 text-white transition hover:text-white/80"
            type="button"
            onClick={onLoginClick ?? (() => navigate('/login'))}
          >
            Log in
          </button>
          <button
            className="rounded-full bg-white px-5 py-3 text-black transition hover:bg-white/90"
            type="button"
            onClick={onSignupClick ?? (() => navigate('/register'))}
          >
            Sign up
          </button>
        </div>
      </nav>
    </header>
  )
}
