import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the main ride booking heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /dispatch riders, drivers, and payments from one control plane/i,
      }),
    ).toBeInTheDocument()
  })
})
