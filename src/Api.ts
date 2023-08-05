import { arrayShuffle } from "./utiles";

export type Questions = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState =Questions & {
    answers: string[];
}

export enum Difficulty{
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}


export const fetchQuizQuestions = async (amount: number, difficulty: string ) => {
    const endPoint=`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data =await (await fetch(endPoint)).json();
    return data.results.map((ques: Questions) => (
        {
        ...ques,
            answers: arrayShuffle([...ques.incorrect_answers, ques.correct_answer])
    }
    ))
}