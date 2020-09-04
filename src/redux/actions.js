import { SET_POINT, SET_SCORE }from './constants'

export const setScore = int => ({ type: SET_SCORE, int})
export const setPointRedux = int => ({ type: SET_POINT, int})