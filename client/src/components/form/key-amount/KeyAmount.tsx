import styles from './KeyAmount.module.scss'

type KeyAmountProps = {
  type: string
  img: string
  amount: number
  suffix: string
  disabled?: boolean
  onChange: (type: string, amount: number) => void
  onRemove: (type: string) => void
}

const KeyAmount = ({ type, img, amount, suffix, disabled, onChange, onRemove }: KeyAmountProps) => {
  return (
    <li className={styles.keyAmount}>
      <p className={styles.title}>{type.length <= 6 ? type : type.substring(0, 7)}</p>
      <div className={styles.imgContainer}>
        <img src={img} alt={type} />
      </div>
      <input
        className={styles.amount}
        type='number'
        value={amount}
        onChange={(e) => {
          if (!disabled) onChange(type, +e.target.value)
        }}
        disabled={disabled}
      />
      <p className={styles.suffix}>{suffix}</p>
      <button
        type='button'
        className={styles.removeBtn}
        onClick={() => {
          if (!disabled) onRemove(type)
        }}
        disabled={disabled}
      ></button>
    </li>
  )
}

export default KeyAmount
