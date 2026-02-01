import { useState, useRef } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: 'grok' | 'drb' | 'crypto' | 'meme'
}

const questions: Question[] = [
  {
    id: 1,
    question: "Who created Grok AI?",
    options: ["OpenAI", "xAI (Elon Musk)", "Google DeepMind", "Anthropic"],
    correctAnswer: 1,
    category: 'grok'
  },
  {
    id: 2,
    question: "What is Grok named after?",
    options: ["A Norse god", "A programming term", "Stranger in a Strange Land (Heinlein)", "A crypto meme"],
    correctAnswer: 2,
    category: 'grok'
  },
  {
    id: 3,
    question: "What makes Grok different from other AI chatbots?",
    options: ["It can code better", "It has real-time X (Twitter) access & wit", "It's free for everyone", "It runs on quantum computers"],
    correctAnswer: 1,
    category: 'grok'
  },
  {
    id: 4,
    question: "What does 'WAGMI' mean in crypto culture?",
    options: ["We All Gonna Make It", "Wallet And Gateway Mining Interface", "Web3 Automated Global Market Index", "When All Gains Meet Infinity"],
    correctAnswer: 0,
    category: 'crypto'
  },
  {
    id: 5,
    question: "What is 'diamond hands' in crypto slang?",
    options: ["Expensive jewelry NFTs", "Holding assets despite volatility", "A mining technique", "Premium wallet security"],
    correctAnswer: 1,
    category: 'crypto'
  },
  {
    id: 6,
    question: "What blockchain is $DRB typically associated with?",
    options: ["Bitcoin", "Ethereum/Solana meme coins", "Cardano", "Polkadot"],
    correctAnswer: 1,
    category: 'drb'
  },
  {
    id: 7,
    question: "What does 'HODL' originally come from?",
    options: ["Hold On for Dear Life", "A typo of 'hold' in a Bitcoin forum", "High Output Digital Ledger", "A trading algorithm name"],
    correctAnswer: 1,
    category: 'crypto'
  },
  {
    id: 8,
    question: "Grok has a 'fun mode' - what does it do?",
    options: ["Plays games", "Adds humor and sarcasm to responses", "Generates memes", "Speaks in emojis only"],
    correctAnswer: 1,
    category: 'grok'
  },
  {
    id: 9,
    question: "What is 'rug pull' in crypto?",
    options: ["A cleaning NFT", "When devs abandon project & take funds", "A bullish indicator", "Staking rewards"],
    correctAnswer: 1,
    category: 'crypto'
  },
  {
    id: 10,
    question: "What's the meaning of 'gm' in crypto Twitter?",
    options: ["General Manager", "Good Morning (community greeting)", "Gains Multiplier", "Gas Money"],
    correctAnswer: 1,
    category: 'meme'
  }
]

type QuizState = 'start' | 'playing' | 'result'

function App() {
  const [quizState, setQuizState] = useState<QuizState>('start')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers] = useState<boolean[]>([])
  const resultCardRef = useRef<HTMLDivElement>(null)

  const startQuiz = () => {
    setQuizState('playing')
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setAnswers([])
  }

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return
    
    setSelectedAnswer(answerIndex)
    setShowFeedback(true)
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(prev => prev + 1)
    }
    setAnswers(prev => [...prev, isCorrect])

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        setQuizState('result')
      }
    }, 1500)
  }

  const getResultTitle = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return "LEGENDARY DEGEN"
    if (percentage >= 70) return "CRYPTO CHAD"
    if (percentage >= 50) return "DIAMOND HANDS"
    if (percentage >= 30) return "PAPER HANDS"
    return "NGMI"
  }

  const getResultEmoji = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return "👑"
    if (percentage >= 70) return "💎"
    if (percentage >= 50) return "🚀"
    if (percentage >= 30) return "📄"
    return "💀"
  }

  const shareResult = async () => {
    const text = `🤖 GROK x $DRB QUIZ RESULTS 🤖\n\n${getResultEmoji()} ${getResultTitle()}\n📊 Score: ${score}/${questions.length} (${Math.round((score/questions.length)*100)}%)\n\nThink you can beat me? Take the quiz! 👇`
    
    if (navigator.share) {
      try {
        await navigator.share({ text })
      } catch {
        copyToClipboard(text)
      }
    } else {
      copyToClipboard(text)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Results copied to clipboard! 📋')
  }

  return (
    <div className="min-h-screen matrix-bg grid-overlay relative flex flex-col">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <main className="flex-1 relative z-10 flex items-center justify-center p-4">
        {quizState === 'start' && (
          <div className="fade-in text-center max-w-2xl mx-auto">
            {/* Logo/Title */}
            <div className="mb-8">
              <div className="glitch inline-block">
                <h1 className="font-orbitron text-4xl md:text-6xl font-black text-cyan-400 neon-text mb-2">
                  GROK x $DRB
                </h1>
              </div>
              <p className="text-fuchsia-400 neon-text-pink font-orbitron text-xl md:text-2xl tracking-widest">
                KNOWLEDGE PROTOCOL
              </p>
            </div>

            {/* Terminal box */}
            <div className="scanlines bg-[#12121a] border border-cyan-500/30 neon-border rounded-lg p-6 md:p-8 mb-8">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-cyan-500/20">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-cyan-400/60 text-sm">quiz_protocol.exe</span>
              </div>
              
              <div className="text-left space-y-2 text-sm md:text-base">
                <p className="text-green-400">
                  <span className="text-cyan-400">$</span> initializing quiz protocol...
                </p>
                <p className="text-gray-400">
                  <span className="text-cyan-400">&gt;</span> 10 questions loaded
                </p>
                <p className="text-gray-400">
                  <span className="text-cyan-400">&gt;</span> topics: [GROK_AI, $DRB, CRYPTO_CULTURE, MEMES]
                </p>
                <p className="text-fuchsia-400">
                  <span className="text-cyan-400">&gt;</span> shareable result card: ENABLED
                </p>
                <p className="text-green-400 mt-4">
                  <span className="text-cyan-400">$</span> ready to test your degen knowledge?
                  <span className="terminal-cursor ml-1">▌</span>
                </p>
              </div>
            </div>

            {/* Start button */}
            <button
              onClick={startQuiz}
              className="pulse-glow font-orbitron text-lg md:text-xl px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              [ INITIALIZE QUIZ ]
            </button>
          </div>
        )}

        {quizState === 'playing' && (
          <div className="fade-in w-full max-w-2xl mx-auto">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-cyan-400 font-orbitron">
                  QUESTION {currentQuestion + 1}/{questions.length}
                </span>
                <span className="text-fuchsia-400">
                  SCORE: {score}
                </span>
              </div>
              <div className="h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
                <div 
                  className="progress-bar h-full transition-all duration-500 rounded-full"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question card */}
            <div className="scanlines bg-[#12121a] border border-cyan-500/30 neon-border rounded-lg p-6 md:p-8">
              {/* Category badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-orbitron uppercase tracking-wider bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 rounded">
                  {questions[currentQuestion].category}
                </span>
              </div>

              {/* Question */}
              <h2 className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                <span className="text-cyan-400">&gt;</span> {questions[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => {
                  let buttonClass = "option-btn w-full text-left p-4 border border-[#2a2a3a] rounded-lg text-gray-300 hover:text-white transition-all"
                  
                  if (showFeedback) {
                    if (index === questions[currentQuestion].correctAnswer) {
                      buttonClass += " correct-answer text-green-400"
                    } else if (index === selectedAnswer && index !== questions[currentQuestion].correctAnswer) {
                      buttonClass += " wrong-answer text-red-400"
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showFeedback}
                      className={buttonClass}
                    >
                      <span className="text-cyan-400 mr-3 font-orbitron">[{String.fromCharCode(65 + index)}]</span>
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {quizState === 'result' && (
          <div className="fade-in w-full max-w-lg mx-auto">
            {/* Shareable Result Card */}
            <div 
              ref={resultCardRef}
              className="share-card scanlines border-2 border-cyan-500/50 rounded-xl p-6 md:p-8 mb-6"
              style={{
                boxShadow: '0 0 30px rgba(0, 245, 255, 0.2), 0 0 60px rgba(255, 0, 255, 0.1)'
              }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
                  <span className="text-cyan-400 text-xs font-orbitron tracking-widest">QUIZ COMPLETE</span>
                </div>
                <div className="glitch">
                  <h1 className="font-orbitron text-2xl md:text-3xl font-black text-cyan-400 neon-text">
                    GROK x $DRB
                  </h1>
                </div>
              </div>

              {/* Score display */}
              <div className="text-center mb-6">
                <div className="text-6xl md:text-7xl mb-2">{getResultEmoji()}</div>
                <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-fuchsia-400 neon-text-pink mb-2">
                  {getResultTitle()}
                </h2>
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-orbitron text-white">{score}</div>
                    <div className="text-xs uppercase tracking-wider">Correct</div>
                  </div>
                  <div className="text-2xl text-cyan-400">/</div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-orbitron text-white">{questions.length}</div>
                    <div className="text-xs uppercase tracking-wider">Total</div>
                  </div>
                </div>
              </div>

              {/* Answer breakdown */}
              <div className="flex justify-center gap-1 mb-6">
                {answers.map((correct, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center text-xs font-bold ${
                      correct 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/50'
                    }`}
                  >
                    {correct ? '✓' : '✗'}
                  </div>
                ))}
              </div>

              {/* Percentage bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-cyan-400 font-orbitron">{Math.round((score/questions.length)*100)}%</span>
                </div>
                <div className="h-3 bg-[#1e1e2e] rounded-full overflow-hidden">
                  <div 
                    className="progress-bar h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(score/questions.length)*100}%` }}
                  />
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-center text-gray-500 text-xs font-mono">
                {new Date().toLocaleDateString()} • grok-drb-quiz.vercel.app
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={shareResult}
                className="flex-1 pulse-glow font-orbitron px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-all hover:scale-105 active:scale-95"
              >
                📤 SHARE RESULTS
              </button>
              <button
                onClick={startQuiz}
                className="flex-1 font-orbitron px-6 py-3 bg-transparent border border-fuchsia-400 text-fuchsia-400 rounded-lg hover:bg-fuchsia-400/10 transition-all hover:scale-105 active:scale-95"
              >
                🔄 RETRY QUIZ
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center">
        <p className="text-gray-600 text-xs">
          Requested by <a href="https://twitter.com/DebtReliefGod" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">@DebtReliefGod</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-fuchsia-400 transition-colors">@clonkbot</a>
        </p>
      </footer>
    </div>
  )
}

export default App