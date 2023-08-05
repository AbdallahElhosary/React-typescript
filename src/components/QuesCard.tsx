import React from 'react'
import { AnswerObj } from '../App';
import { ButtonWrapper } from './QuesCard.style';

type Props = {
  question: string;
  answers: string[];
  callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObj | undefined;
  questionNr: number;
  totalQuestions: number;
}
const QuesCard: React.FC<Props> = ({ question, answers, callBack, userAnswer, questionNr, totalQuestions }) => {
  return (
    <div className='QuesCard'>
      <p className='questionNum'>
        Questions No : {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} className='questionText' />
      <div className='buttons'>
        {
          answers.map((answer: string) => {
            return (
              <ButtonWrapper
                key={answer}
                correct={userAnswer?.correctAnswer === answer}
                userclicked={userAnswer?.answer === answer}
              >
                <button disabled={userAnswer ? true : false} value={answer} onClick={callBack}>
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </ButtonWrapper>

            )
          })
        }
      </div>
    </div>
  )
}

export default QuesCard