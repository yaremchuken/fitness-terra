import { v4 } from 'uuid'
import { useCallback } from 'react'
import { useStore } from 'react-redux'
import { PayloadedAction } from '../actions/Action'
import { ActionType } from '../actions/ActionType'
import { MessageTone } from '../components/message-popup/MessagePopup'

export const useDisplayMessage = () => {
  const store = useStore()
  return useCallback(
    (message: string, tone: MessageTone = MessageTone.SUCCESS) => {
      if (message) {
        store.dispatch<PayloadedAction>({
          type: ActionType.SHOW_MESSAGE_POPUP,
          payload: { id: v4(), firedAt: new Date().getTime(), message: message, tone },
        })
      }
    },
    [store]
  )
}

export const useDismissMessage = () => {
  const store = useStore()
  return useCallback(
    (id: string) => {
      if (id) {
        store.dispatch<PayloadedAction>({
          type: ActionType.DISMISS_MESSAGE_POPUP,
          payload: id,
        })
      }
    },
    [store]
  )
}
