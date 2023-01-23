import { ExercisePreview } from '../../../../models/exercise/Exercise'
import styles from './ExercisePreviewCard.module.scss'

type ExercisePreviewCardProps = {
  preview?: ExercisePreview
  callback: (preview?: ExercisePreview) => void
}

const ExercisePreviewCard = ({ preview, callback }: ExercisePreviewCardProps) => {
  return (
    <li
      className={styles.card}
      onClick={() => callback(preview)}
      style={{
        backgroundImage: preview?.preview
          ? `url(${URL.createObjectURL(preview.preview)})`
          : undefined,
      }}
    >
      {preview ? (
        <div className={styles.inner}>
          <p className={styles.title}>{preview.title}</p>
          <img
            className={styles.activity}
            src={`${process.env.PUBLIC_URL}/assets/images/activity-type/${preview.type}.jpg`}
            alt={preview.type}
          />
          <div className={styles.muscles}>
            {preview.muscleGroups
              .filter((_, idx) => idx < 3)
              .map((group) => (
                <img
                  key={group}
                  className={styles.muscleGroup}
                  src={`${process.env.PUBLIC_URL}/assets/images/muscle-groups/${group}.jpg`}
                  alt={group}
                ></img>
              ))}
          </div>
        </div>
      ) : (
        <div className={styles.add}></div>
      )}
    </li>
  )
}

export default ExercisePreviewCard
