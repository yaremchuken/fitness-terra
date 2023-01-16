import styles from './KeyAmount.module.scss'

type KeyAmountProps = {
  key: string
  img: string
  amount: number
  measurement: string
  onChange: (key: string, amount: number) => void
}

const KeyAmount = ({ key, amount, measurement, onChange }: KeyAmountProps) => {
  return (
    <li key={key} className={styles.keyAmount}>
      {key}
    </li>
  )
}

export default KeyAmount
