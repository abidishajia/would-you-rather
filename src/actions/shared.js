import {_saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { addUserAnswer, addUserQuestion } from '../actions/users'
import { saveAnswer, addQuestion } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleSaveAnswer (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
    .then(() => {
      dispatch(saveAnswer(authedUser, qid, answer))
      dispatch(addUserAnswer(authedUser, qid, answer))
    })
    .then(() => dispatch(hideLoading()))
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
    .then((formatedQuestion) => {
      dispatch(addQuestion(formatedQuestion))
      dispatch(addUserQuestion(authedUser, formatedQuestion.id))
    })
    .then(() => dispatch(hideLoading()))
  }
}