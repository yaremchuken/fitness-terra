import styles from './TilesSelector.module.scss'

type TilesSelectorProps = {
  title: string
  values: { type: string; img: string }[]
  onSelect: (value: string) => void
  selected: string[]
}

const TilesSelector = ({ title, values, onSelect, selected = [] }: TilesSelectorProps) => {
  const selectionStr =
    selected.length > 0
      ? ` - ${selected.slice(0, Math.min(4, selected.length)).join(', ')}${
          selected.length > 4 ? ', ...' : ''
        }`
      : ''

  return (
    <div className={styles.tilesSelector}>
      <p className={styles.title}>
        {title}
        {selectionStr}
      </p>
      <ul className={styles.tiles}>
        {values.map((value) => (
          <li
            key={value.type}
            className={`${styles.tile} ${selected.includes(value.type) ? styles.selected : ''}`}
            onClick={() => onSelect(value.type)}
          >
            <img src={value.img} alt={value.type} />
            <p className={styles.tileName}>
              {value.type.length <= 6 ? value.type : value.type.substring(0, 7)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TilesSelector
