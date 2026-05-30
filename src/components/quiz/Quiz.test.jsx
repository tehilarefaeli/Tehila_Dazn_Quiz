import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Quiz from './Quiz'

function renderQuiz() {
  return render(
    <MemoryRouter>
      <Quiz />
    </MemoryRouter>
  )
}

describe('Quiz page', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('shows progress, timer, and answer choices', () => {
    renderQuiz()

    const choices = screen.getAllByRole('button')
    expect(choices.length).toBeGreaterThanOrEqual(2)
    expect(choices.length).toBeLessThanOrEqual(4)
  })

  it('selects an answer when a choice is clicked', () => {
    renderQuiz()

    const choices = screen.getAllByRole('button')
    fireEvent.click(choices[0])

    expect(choices[0]).toHaveClass('quiz__choice--selected')
  })

  it('shows hint when 10 seconds or fewer remain', () => {
    renderQuiz()

    act(() => {
      vi.advanceTimersByTime(11000)
    })

    expect(screen.getByRole('note')).toBeInTheDocument()
  })
})
