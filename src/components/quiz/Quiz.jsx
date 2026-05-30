import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import allQuestions from '../../data/MockData.json'
import ResaultQuiz from '../resaultQuiz/ResaultQuiz'
import './Quiz.scss'

const QUESTION_SECONDS = 20
const REVEAL_SECONDS = 1
const HINT_SHOW_AT_SECONDS_LEFT = 10

function pickRandomFive(pool) {
  const sortData = [...pool].sort(() => Math.random() - 0.5)
  return sortData.slice(0, 5)
}

function Quiz() {
  const navigate = useNavigate()
  const [questions] = useState(() => pickRandomFive(allQuestions))
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_SECONDS)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [showCorrect, setShowCorrect] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [timeLeftForCorrectAnswer, setTimeLeftForCorrectAnswer] = useState(-1)
  const selectedRef = useRef(null)

  const isFinished = currentQuestion >= questions.length

  const handleRestart = () => {
    navigate('/')
  }
  const current = isFinished ? null : questions[currentQuestion]
  const showHint =
    !showCorrect &&
    selectedAnswerIndex === null &&
    secondsLeft <= HINT_SHOW_AT_SECONDS_LEFT

  useEffect(() => {
    if (isFinished) return

    setSecondsLeft(QUESTION_SECONDS)
    setSelectedAnswerIndex(null)
    setShowCorrect(false)
    selectedRef.current = null

    const tickId = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)

    let nextId
    const revealId = setTimeout(() => {
      const question = questions[currentQuestion]
      const picked = selectedRef.current

      if (picked !== null && picked === question.answer_index) {
        setCorrectAnswersCount((c) => c + 1)
      }

      setShowCorrect(true)
      nextId = setTimeout(() => {
        setCurrentQuestion((i) => i + 1)
      }, REVEAL_SECONDS * 1000)
    }, QUESTION_SECONDS * 1000)

    return () => {
      clearInterval(tickId)
      clearTimeout(revealId)
      clearTimeout(nextId)
    }
  }, [currentQuestion, isFinished])

  return (
    <main className={`quiz${isFinished ? ' quiz--finished' : ''}`}>
      {!isFinished && <h1 className="quiz__page-title">Quiz</h1>}

      {isFinished ? (
        <ResaultQuiz
          score={correctAnswersCount}
          total={questions.length}
          onRestart={handleRestart}
        />
      ) : (
        <section className="quiz__card" aria-live="polite">
          <header className="quiz__header">
            <p className="quiz__progress">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <p className="quiz__timer" aria-label={`${secondsLeft} seconds remaining`}>
              {secondsLeft}s
            </p>
          </header>

          <div className="quiz__body">
            <p className="quiz__question">{current.question}</p>
            {showHint && (
              <p className="quiz__hint" role="note">
                {current.hint}
              </p>
            )}
            {showCorrect && timeLeftForCorrectAnswer >= 0 ? (
              <p className="quiz__time-feedback" role="status">
                You answered in {timeLeftForCorrectAnswer}s
              </p>
            ) : null}
            <ul className="quiz__choices">
              {current.choices.map((choice, index) => {
                let choiceModifier = ''
                if (showCorrect) {
                  if (index === current.answer_index) {
                    choiceModifier = ' quiz__choice--correct'
                  } else if (selectedAnswerIndex === index) {
                    choiceModifier = ' quiz__choice--wrong'
                  }
                } else if (selectedAnswerIndex === index) {
                  choiceModifier = ' quiz__choice--selected'
                }


                return (
                  <li key={index}>
                    <button
                      type="button"
                      className={`quiz__choice${choiceModifier}`}
                      onClick={() => {
                        setSelectedAnswerIndex(index)
                        selectedRef.current = index
                        if (index === current.answer_index) {
                          setTimeLeftForCorrectAnswer(QUESTION_SECONDS - secondsLeft)
                        } else {
                          setTimeLeftForCorrectAnswer(-1)
                        }
                      }}
                      disabled={showCorrect}
                    >
                      {choice}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}
    </main>
  )
}

export default Quiz
