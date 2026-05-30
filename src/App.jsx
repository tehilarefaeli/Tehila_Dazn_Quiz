import { Link, Route, Routes } from 'react-router-dom'
import Quiz from './components/quiz/Quiz.jsx'
import './App.scss'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="app">
            <section className="app__card">
              <h1 className="app__title">Ancient Rome Quiz</h1>
              <p className="app__subtitle">
                Five questions on the Roman Empire — 20 seconds each. How much do you know?
              </p>
              <Link to="/quiz" className="app__start-btn">
                Start Quiz
              </Link>
            </section>
          </main>
        }
      />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
}

export default App
