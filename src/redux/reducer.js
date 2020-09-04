import { SET_POINT, SET_SCORE } from './constants'

import { loadState } from './localStorage'
import { withReduxStateSync } from 'redux-state-sync'

const mainReducer = (state = loadState(), action) => {
    switch (action.e) {
        case SET_SCORE:
            {
                const { int } = action
                return { ...state, currentScore: int }
            }
        case SET_POINT:
            {
                const { int } = action
                return { ...state, currentPoint: int }
            }
        default:
            return { ...state }
    }

}

export default withReduxStateSync(mainReducer)