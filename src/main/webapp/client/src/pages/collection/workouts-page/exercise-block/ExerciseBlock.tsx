import styles from './ExerciseBlock.module.scss'

export type ExerciseInfo = {
  templateId: number
  order: number
}

type ExerciseBlockProps = {
  info: ExerciseInfo
}

const ExerciseBlock = ({ info }: ExerciseBlockProps) => {
  return <div className={styles.block}></div>
}

export default ExerciseBlock
