import { useDrop } from 'react-dnd'
import styles from './DropBox.module.scss'

type DropBoxProps = {
  text: string
  type: string
  callback: (id: number) => void
}

const DropBox = ({ text, type, callback }: DropBoxProps) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: type,
    drop(entity: any) {
      callback(entity.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div className={`${styles.dropBox} ${isOver ? styles.hovered : ''}`} ref={dropRef}>
      {text}
    </div>
  )
}

export default DropBox
