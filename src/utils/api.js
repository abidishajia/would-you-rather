import { _getUsers, _getQuestions } from './_DATA'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
    return (dispatch) => {
      dispatch(showLoading())
      return Promise.all([_getUsers(), _getQuestions()])
        .then(([ users, polls ]) => {
          dispatch(receiveUsers(users))
          dispatch(receiveQuestions(polls))
          dispatch(hideLoading())
        })
    }
}

