import KeyAmount from '../key-amount/KeyAmount'
import styles from './KeyAmountBlock.module.scss'

type KeyAmountBlockProps = {
  title: string
  elements: { type: string; img: string; amount: number; suffix: string }[]
  onChange: (type: string, amount: number) => void
  onRemove: (type: string) => void
}

const KeyAmountBlock = ({ title, elements, onChange, onRemove }: KeyAmountBlockProps) => {
  return (
    <div className={styles.block}>
      <p className={styles.title}>{title}</p>
      <ul className={styles.keyAmounts}>
        {elements.map((el) => (
          <KeyAmount
            key={el.type}
            type={el.type}
            img={el.img}
            amount={el.amount}
            suffix={el.suffix}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  )
}

export default KeyAmountBlock
