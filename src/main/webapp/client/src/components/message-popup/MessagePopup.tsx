import React from 'react'
import styles from './MessagePopup.module.scss'

export type Message = {
  id: string
  firedAt: number
  message: string
}

type MessagePopupProps = {
  message: Message
  onDismiss: (id: string) => void
}

const MessagePopup = ({ message, onDismiss }: MessagePopupProps) => {
  return (
    <div className={styles.messagePopup} onClick={() => onDismiss(message.id)}>
      <div className={styles.messagePopupText}>{message.message}</div>
    </div>
  )
}

export default MessagePopup
