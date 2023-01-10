import { PayloadedAction } from '../actions/Action'
import { ActionType } from '../actions/ActionType'
import { Message } from '../components/message-popup/MessagePopup'

export type State = {
  messages: Message[]
}

const initialState = {
  messages: [],
}

const reducer = (state: State = initialState, action: PayloadedAction) => {
  switch (action.type) {
    case ActionType.CLEAR_STORES:
      return { ...initialState }

    case ActionType.SHOW_MESSAGE_POPUP:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }

    case ActionType.DISMISS_MESSAGE_POPUP:
      return {
        ...state,
        messages: [...state.messages.filter((m) => m.id !== action.payload)],
      }

    default:
      return state
  }
}

export default reducer
