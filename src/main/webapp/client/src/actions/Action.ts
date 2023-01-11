import { Action } from 'redux'
import { ActionType } from './ActionType'
import { Message } from '../components/message-popup/MessagePopup'

export interface PayloadedAction extends Action<ActionType> {
  payload?: any
}

/** All reducers must have CLEAR_STORE action */
export const clearStores = () => {
  return {
    type: ActionType.CLEAR_STORES,
  }
}

export const showMessagePopup = (message: Message) => {
  return {
    type: ActionType.SHOW_MESSAGE_POPUP,
    payload: message,
  }
}

export const dismissMessagePopup = (id: number) => {
  return {
    type: ActionType.DISMISS_MESSAGE_POPUP,
    payload: id,
  }
}
