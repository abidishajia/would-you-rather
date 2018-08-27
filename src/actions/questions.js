import {RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from './index'

export function receiveQuestions (polls) {
  return {
    type: RECEIVE_QUESTIONS,
    polls,
  }
}

export function addQuestion (poll) {
  return {
    type: ADD_QUESTION,
    poll,
  }
}


export function saveAnswer (authedUser, qid, answer) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  }
}