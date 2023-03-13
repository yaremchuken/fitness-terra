import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useDismissMessage } from '../../hooks/UseDisplayMessage'
import { StoreState } from '../../reducers/RootReducer'
import styles from './MessagePopupContainer.module.scss'
import MessagePopup, { Message } from './MessagePopup'

type MessagePopupContainerProps = {
  messages: Message[]
}

const MessagePopupContainer = ({ messages }: MessagePopupContainerProps) => {
  const dismiss = useDismissMessage()

  const checkOldMessages = () => {
    for (const message of messages) {
      if (message.firedAt + 5000 < new Date().getTime()) {
        dismiss(message.id)
        return
      }
    }
  }

  useEffect(() => {
    const timer = setInterval(() => checkOldMessages(), 1000)
    return () => clearInterval(timer)
  })

  if (!messages) {
    return null
  }

  const messageRender = (message: Message) => {
    return (
      <li key={message.id}>
        <MessagePopup message={message} onDismiss={dismiss} />
      </li>
    )
  }

  return (
    <div className={styles.messagePopupContainer}>
      <ul>{messages.map((m) => messageRender(m))}</ul>
    </div>
  )
}

const mapStateToProps = ({ reducer }: StoreState) => ({ messages: reducer.messages })

export default connect(mapStateToProps)(MessagePopupContainer)
