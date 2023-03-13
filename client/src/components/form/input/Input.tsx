import { ChangeEvent } from 'react'
import styles from './Input.module.scss'

type InputProps = {
  title: string
  value: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onTextareaChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  type?: string
  name?: string
  placeholder?: string
  pattern?: string
  required?: boolean
  disabled?: boolean
  min?: number
}

const Input = ({
  title,
  value,
  type = 'text',
  name,
  placeholder,
  required = false,
  disabled = false,
  pattern,
  onChange,
  onTextareaChange,
}: InputProps) => {
  return (
    <div className={styles.block}>
      <p className={`${styles.title} ${disabled ? styles.titleDisabled : ''}`}>{title}</p>
      {type === 'textarea' ? (
        <textarea
          className={`${styles.input} ${styles.textarea} ${disabled ? styles.disabled : ''}`}
          placeholder={placeholder}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          onChange={(e) => {
            if (onTextareaChange) onTextareaChange(e)
          }}
        />
      ) : (
        <input
          className={`${styles.input} ${disabled ? styles.disabled : ''}`}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          pattern={pattern}
          required={required}
          disabled={disabled}
          min={type === 'number' ? 0 : undefined}
          onChange={(e) => {
            if (onChange) onChange(e)
          }}
        />
      )}
    </div>
  )
}

export default Input
