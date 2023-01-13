import styles from './Button.module.scss'

type ButtonProps = {
  text: String
  callback?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  inactive?: boolean
  id?: string
  type?: 'button' | 'submit' | undefined
  disabled?: boolean
  form?: string
}

const Button = ({
  text,
  callback,
  inactive = false,
  id,
  type = 'button',
  disabled = false,
  form,
}: ButtonProps) => {
  return (
    <button
      id={id}
      form={form}
      className={`
        ${styles.btn}
        ${disabled ? styles.disabled : ''}
        ${inactive ? styles.inactive : ''}
      `}
      type={type}
      onClick={(e) => {
        if (e) {
          e.preventDefault()
          e.stopPropagation()
        }
        if (!disabled && callback) callback(e)
      }}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
