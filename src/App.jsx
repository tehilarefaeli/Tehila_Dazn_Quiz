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
            <h1>Ancient Rome Quiz</h1>
            <Link to="/quiz" className="start-quiz-btn">
              Start Quiz
            </Link>
          </main>
        }
      />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
}

export default App
