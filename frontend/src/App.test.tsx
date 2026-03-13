import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the qride navbar and auth actions', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /qride/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /go anywhere with qride/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /sign up for qride/i }),
    ).toBeInTheDocument()
  })
})
