import { ChangeEvent } from 'react'
import { WorkoutPreview } from '../../../models/workout/Workout'

type WorkoutBlockProps = {
  workout: WorkoutPreview
  onChangeExercise?: (index: number, type: string, value: number) => void
  onRemove?: () => void
}

const WorkoutBlock = ({ workout, onChangeExercise, onRemove }: WorkoutBlockProps) => {
  const changeListener = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeExercise) {
      onChangeExercise(
        index,
        e.currentTarget.name,
        +e.currentTarget.value * (e.currentTarget.name === 'equipment' ? 1000 : 1)
      )
    }
  }

  return <div></div>
  //   return (
  //     <div
  //       className={styles.block}
  //       style={{
  //         backgroundImage: exercise.preview
  //           ? `url(${URL.createObjectURL(exercise.preview)})`
  //           : undefined,
  //       }}
  //     >
  //       {onRemove && <ImgButton callback={onRemove} position={Position.LEFT_TOP} size={Size.SMALL} />}
  //       <p className={styles.title}>{exercise.title}</p>
  //       <div className={styles.form}>
  //         {exercise.repeats ? (
  //           <div className={styles.inputBlock}>
  //             reps:{' '}
  //             <input
  //               name='repeats'
  //               className={styles.input}
  //               value={exercise.repeats}
  //               type='number'
  //               onChange={changeListener}
  //               disabled={onChange === undefined}
  //             />
  //           </div>
  //         ) : (
  //           <div className={styles.inputBlock}>
  //             dur:{' '}
  //             <input
  //               name='duration'
  //               className={styles.input}
  //               value={exercise.duration}
  //               type='number'
  //               onChange={changeListener}
  //               disabled={onChange === undefined}
  //             />
  //           </div>
  //         )}
  //         <div className={styles.inputBlock}>
  //           cals:{' '}
  //           <input
  //             name='calories'
  //             className={styles.input}
  //             value={exercise.calories}
  //             type='number'
  //             onChange={changeListener}
  //             disabled={onChange === undefined}
  //           />
  //         </div>
  //         <div className={styles.inputBlock}>
  //           {exercise.equipment
  //             .filter((_, idx) => idx === 0)
  //             .map((eq) => (
  //               <div className={styles.equipment} key={eq.type}>
  //                 <img
  //                   src={`${process.env.PUBLIC_URL}/assets/images/equipment/${eq.type}.jpg`}
  //                   alt={eq.type}
  //                 />
  //                 <input
  //                   name='equipment'
  //                   className={styles.input}
  //                   value={eq.weight * 0.001}
  //                   type='number'
  //                   onChange={changeListener}
  //                   disabled={onChange === undefined}
  //                 />
  //               </div>
  //             ))}
  //         </div>
  //       </div>
  //     </div>
  //   )
}

export default WorkoutBlock
