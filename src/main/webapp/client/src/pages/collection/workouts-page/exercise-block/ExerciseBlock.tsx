import Input from '../../../../components/form/input/Input'
import ImgButton, { Position, Size } from '../../../../components/img-button/ImgButton'
import { EquipmentType } from '../../../../models/workout/EquipmentType'
import { ExercisePreview } from '../../../../models/workout/Exercise'
import styles from './ExerciseBlock.module.scss'

export type IndexedExercise = ExercisePreview & {
  index: number
}

type ExerciseBlockProps = {
  exercise: IndexedExercise
  onChange: (type: 'repeats' | 'calories' | 'duration' | 'equipment', value: number) => void
  onRemove: () => void
}

const ExerciseBlock = ({ exercise, onChange, onRemove }: ExerciseBlockProps) => {
  return (
    <div
      className={styles.block}
      style={{
        backgroundImage: exercise.preview
          ? `url(${URL.createObjectURL(exercise.preview)})`
          : undefined,
      }}
    >
      <ImgButton callback={onRemove} position={Position.LEFT_TOP} size={Size.SMALL} />
      <p className={styles.title}>{exercise.title}</p>
      <div className={styles.form}>
        {exercise.repeats ? (
          <div className={styles.inputBlock}>
            reps:{' '}
            <input
              className={styles.input}
              value={exercise.repeats}
              type='number'
              onChange={(e) => onChange('repeats', +e.currentTarget.value)}
            />
          </div>
        ) : (
          <div className={styles.inputBlock}>
            dur:{' '}
            <input
              className={styles.input}
              value={exercise.duration}
              type='number'
              onChange={(e) => onChange('duration', +e.currentTarget.value)}
            />
          </div>
        )}
        <div className={styles.inputBlock}>
          cals:{' '}
          <input
            className={styles.input}
            value={exercise.calories}
            type='number'
            onChange={(e) => onChange('calories', +e.currentTarget.value)}
          />
        </div>
        <div className={styles.inputBlock}>
          {exercise.equipment
            .filter((_, idx) => idx === 0)
            .map((eq) => (
              <div className={styles.equipment} key={eq.type}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/equipment/${eq.type}.jpg`}
                  alt={eq.type}
                />
                <input
                  className={styles.input}
                  value={eq.weight * 0.001}
                  type='number'
                  onChange={(e) => onChange('equipment', +e.currentTarget.value * 1000)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ExerciseBlock
