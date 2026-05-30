import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ResaultQuiz from './ResaultQuiz'

function renderResults({ score = 3, total = 5, onRestart = vi.fn() } = {}) {
  return {
    onRestart,
    ...render(<ResaultQuiz score={score} total={total} onRestart={onRestart} />),
  }
}

describe('ResaultQuiz page', () => {


  it('shows feedback based on score percentage', () => {
    const { rerender } = render(
      <ResaultQuiz score={5} total={5} onRestart={vi.fn()} />
    )
    expect(screen.getByRole('heading', { name: /flawless victory/i })).toBeInTheDocument()

    rerender(<ResaultQuiz score={0} total={5} onRestart={vi.fn()} />)
    expect(screen.getByRole('heading', { name: /keep practicing/i })).toBeInTheDocument()
  })

  it('calls onRestart when Try Again is clicked', () => {
    const onRestart = vi.fn()
    renderResults({ onRestart })

    fireEvent.click(screen.getByRole('button', { name: /try again/i }))

    expect(onRestart).toHaveBeenCalledTimes(1)
  })
})
