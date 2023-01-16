import KeyAmount from '../key-amount/KeyAmount'
import styles from './KeyAmountBlock.module.scss'

type KeyAmountBlockProps = {
  title: string
  elements: { key: string; img: string; amount: number; measurement: string }[]
  onChange: (key: string, amount: number) => void
}

const KeyAmountBlock = ({ title, elements, onChange }: KeyAmountBlockProps) => {
  return (
    <div className={styles.KeyAmountBlock}>
      <p className={styles.title}>{title}</p>
      <ul className={styles.keyAmounts}>
        {elements.map((el, idx) => (
          <KeyAmount
            key={el.key}
            img={el.img}
            amount={el.amount}
            measurement={el.measurement}
            onChange={onChange}
          />
        ))}
        <li className={styles.addBtn}>+</li>
      </ul>
    </div>
  )
}

export default KeyAmountBlock
