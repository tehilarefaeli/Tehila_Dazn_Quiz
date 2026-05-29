import './ResaultQuiz.scss'

function ResaultQuiz({ score, total, onRestart }) {
  const percentage = Math.round((score / total) * 100)
  
  // Calculate SVG dash offset for circular progress ring
  // Circumference = 2 * PI * r. For r = 40, Circumference = 251.2
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  let feedbackMessage = ''
  let feedbackSubText = ''
  
  if (percentage === 100) {
    feedbackMessage = 'Flawless Victory! 🏆'
    feedbackSubText = 'You answered every single question correctly. You are an absolute master!'
  } else if (percentage >= 80) {
    feedbackMessage = 'Outstanding! 🌟'
    feedbackSubText = 'Excellent knowledge! You got almost all of them correct.'
  } else if (percentage >= 50) {
    feedbackMessage = 'Good Job! 👍'
    feedbackSubText = 'Great effort! With a little more practice, you will get a perfect score.'
  } else {
    feedbackMessage = 'Keep Practicing! 📚'
    feedbackSubText = 'Don\'t give up! Try again to improve your score and learn new facts.'
  }

  return (
    <section className="resault-quiz" aria-live="polite">
      <div className="resault-quiz__card">
        <h2 className="resault-quiz__title">Quiz Results</h2>
        
        <div className="resault-quiz__visual">
          <svg className="resault-quiz__ring" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5b21b6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            {/* Background circle */}
            <circle
              className="resault-quiz__ring-bg"
              cx="50"
              cy="50"
              r={radius}
            />
            {/* Foreground progress circle */}
            <circle
              className="resault-quiz__ring-fg"
              cx="50"
              cy="50"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="resault-quiz__score-box">
            <span className="resault-quiz__score-num">{score}</span>
            <span className="resault-quiz__score-total">/ {total}</span>
          </div>
        </div>

        <div className="resault-quiz__feedback">
          <h3 className="resault-quiz__feedback-msg">{feedbackMessage}</h3>
          <p className="resault-quiz__feedback-sub">{feedbackSubText}</p>
        </div>

        <div className="resault-quiz__stats">
          <div className="resault-quiz__stat-item">
            <span className="resault-quiz__stat-label">Accuracy</span>
            <span className="resault-quiz__stat-val">{percentage}%</span>
          </div>
          <div className="resault-quiz__stat-item">
            <span className="resault-quiz__stat-label">Correct</span>
            <span className="resault-quiz__stat-val resault-quiz__stat-val--correct">{score}</span>
          </div>
          <div className="resault-quiz__stat-item">
            <span className="resault-quiz__stat-label">Missed</span>
            <span className="resault-quiz__stat-val resault-quiz__stat-val--wrong">{total - score}</span>
          </div>
          
        </div>

   

        <button 
          type="button" 
          className="resault-quiz__restart-btn"
          onClick={onRestart}
        >
          <svg 
            className="resault-quiz__restart-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          Try Again
        </button>
      </div>
    </section>
  )
}

export default ResaultQuiz
