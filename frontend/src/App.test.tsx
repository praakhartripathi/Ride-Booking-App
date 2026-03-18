import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the qride homepage flow', () => {
    window.history.pushState({}, '', '/home')
    render(<App />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByText('QRide')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /go anywhere with qride/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/plan for later/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /frequently asked questions/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /sign up for qride/i }),
    ).toBeInTheDocument()
  })
})
