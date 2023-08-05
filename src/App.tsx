import './App.scss';
import QuesCard from './components/QuesCard';
import { useState } from 'react';
import { Difficulty, QuestionState, fetchQuizQuestions } from './Api';

const TOTAL_QUESTIONS = 10;

export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswer, setUserAnswer] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)


  
  
  // Start Quiz Function To Start
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false)
  }
  // Fun To Chect If The Answer IS True Or Not
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User Answer
      const answer = e.currentTarget.value;
      // Get Correct Answer
      const correct = questions[number].correct_answer === answer;
      // Chect The Truth 
      if (correct) {
        setScore(prev => prev + 1);
      }
      // Save Answer In Array of answers

      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswer((prev) => Array.from(new Set([...prev, answerObj])));
    }
  }

  // Fun To handle the next Question or Skip
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion);
    }
  }
  return (
    <div className="App container">
      <h1>React Quiz</h1>

      {gameOver || userAnswer.length === TOTAL_QUESTIONS ?
        (
          <div className='btnParent'>
            <button className='startBtn' onClick={startQuiz} >


              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
              </svg>


              <div className="text">
                Start
              </div>

            </button>
          </div>
        )
        : null
      }
      {!gameOver ? <p className='score'>Score: {score}</p> : null}

      {loading && (
        <div className="ring">Loading
          <span></span>
        </div>
      )}
      {!loading && !gameOver && (
        <QuesCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callBack={checkAnswer}
        />
      )}
      <div className="btns">
        {!loading && !gameOver && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='nextBtn' onClick={nextQuestion}>
            Skip
            <div className="arrow-wrapper">
              <div className="arrow"></div>

            </div>
          </button>
        )
          : null
        }
        {!loading && !gameOver && userAnswer.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='nextBtn' onClick={nextQuestion}>
            Next
            <div className="arrow-wrapper">
              <div className="arrow"></div>
            </div>
          </button>
        )
          : null
        }
      </div>
    </div>
  );
}

export default App;
