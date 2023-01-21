import { ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { saveTemplate } from '../../../actions/exercise/ExerciseAction'
import Button from '../../../components/form/button/Button'
import Input from '../../../components/form/input/Input'
import TilesSelector from '../../../components/form/tiles-selector/TilesSelector'
import { MessageTone } from '../../../components/message-popup/MessagePopup'
import { useDisplayMessage } from '../../../hooks/UseDisplayMessage'
import Exercise from '../../../models/exercise/Exercise'
import { ActivityType } from '../../../models/exercise/ActivityType'
import styles from './ExerciseForm.module.scss'
import { MuscleGroup } from '../../../models/exercise/MuscleGroup'
import { EquipmentType } from '../../../models/exercise/EquipmentType'
import KeyAmountBlock from '../../../components/form/key-amount-block/KeyAmountBlock'
import MediaUpload from '../../../components/form/media-upload/MediaUpload'
import Loader from '../../../components/loader/Loader'

const maxDuration = 3600

type ExerciseFormProps = {
  template: Exercise
  save: (template: Exercise) => Promise<any>
  close: () => void
}

const ExerciseForm = ({ template, save, close }: ExerciseFormProps) => {
  const displayMessage = useDisplayMessage()

  const [loader, setLoader] = useState<string | undefined>()
  const [templateData, setTemplateData] = useState<Exercise>(template)
  const [inProcess, setInProcess] = useState(false)
  const [showEquipmentMenu, setShowEquipmentMenu] = useState(false)

  const formatTime = (seconds: number) => {
    if (seconds > maxDuration) seconds = maxDuration
    const mins = Math.floor(seconds / 60)
    const secs = seconds - mins * 60
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // TODO: Drop down menu for repeats and duration
  // TODO: Possibility to remove exercise template

  const toSecs = (time: string, onEmpty: number = 0) => {
    if (/^\d+$/.test(time)) return +time
    if (time.includes(':')) {
      const tm = time.split(':')
      if (Number.isNaN(+tm[0]) || Number.isNaN(+tm[1])) return onEmpty
      return Math.min(maxDuration, +tm[1] + +tm[0] * 60)
    }

    return onEmpty
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let value: string | number = event.target.value
    if (event.target.name === 'duration') {
      value = toSecs(value, templateData.duration)
    }
    setTemplateData({ ...templateData, [event.target.name]: value })
  }

  const selectActivityHandler = (type: ActivityType) => {
    setTemplateData({ ...templateData, type })
  }

  const selectMuscleGroupHandler = (group: MuscleGroup) => {
    setTemplateData({
      ...templateData,
      muscleGroups: templateData.muscleGroups.includes(group)
        ? templateData.muscleGroups.filter((g) => g !== group)
        : [...templateData.muscleGroups, group],
    })
  }

  const equipmentAddHandler = (type: EquipmentType) => {
    setTemplateData({
      ...templateData,
      equipment: [...templateData.equipment, { type, weight: 0 }],
    })
  }

  const equipmentChangeHandler = (type: EquipmentType, weight: number) => {
    let sanitized = Math.min(999.9, Math.max(0, weight))
    sanitized = +sanitized.toFixed(1)

    setTemplateData({
      ...templateData,
      equipment: [
        ...templateData.equipment.filter((eq) => eq.type !== type),
        { type, weight: sanitized * 1000 },
      ],
    })
  }

  const equipmentRemovedHandler = (type: EquipmentType) => {
    setTemplateData({
      ...templateData,
      equipment: templateData.equipment.filter((eq) => eq.type !== type),
    })
  }

  const onSubmit = () => {
    setInProcess(true)
    setLoader('Uploading Exercise Data')
    save(templateData)
      .then(() => {
        displayMessage('Exercise successfuly saved')
        close()
      })
      .catch(() => displayMessage('Unable to save exercise!', MessageTone.ERROR))
      .finally(() => {
        setInProcess(false)
        setLoader(undefined)
      })
  }

  const availableEquipment = () => {
    return Object.keys(EquipmentType).filter(
      (type) => !templateData.equipment.find((eq) => eq.type === type)
    )
  }

  const previewChosen = (preview?: File) => {
    setTemplateData({ ...templateData, preview })
  }

  const mediaChosen = (media?: File) => {
    setTemplateData({ ...templateData, media })
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {loader && <Loader message={loader} />}
      <Input
        title='Title'
        name='title'
        value={templateData.title}
        onChange={changeHandler}
        required
        disabled={inProcess}
      />
      <TilesSelector
        title='Activity type'
        values={Object.keys(ActivityType).map((type) => {
          return {
            type,
            img: `${process.env.PUBLIC_URL}/assets/images/activity-type/${type}.jpg`,
          }
        })}
        selected={[templateData.type]}
        onSelect={(value: string) => {
          selectActivityHandler(value as ActivityType)
        }}
        padded
        disabled={inProcess}
      />
      <TilesSelector
        title='Muscle Groups'
        values={Object.keys(MuscleGroup).map((type) => {
          return {
            type: type,
            img: `${process.env.PUBLIC_URL}/assets/images/muscle-groups/${type}.jpg`,
          }
        })}
        selected={templateData.muscleGroups}
        onSelect={(value: string) => {
          selectMuscleGroupHandler(value as MuscleGroup)
        }}
        padded
        disabled={inProcess}
      />
      <div className={styles.twoInRow}>
        <MediaUpload
          title='Exercise Preview'
          onUpload={previewChosen}
          maxSize={1024}
          media={templateData.preview}
          disabled={inProcess}
          onClear={() => previewChosen()}
        />
        <MediaUpload
          title='Exercise Visualization'
          onUpload={mediaChosen}
          maxSize={5120}
          media={templateData.media}
          disabled={inProcess}
          onClear={() => mediaChosen()}
        />
      </div>
      <div className={styles.twoInRow}>
        <Input
          title='Repeats'
          name='repeats'
          type='number'
          value={templateData.repeats === 0 ? '' : templateData.repeats}
          onChange={changeHandler}
          disabled={templateData.duration > 0 || inProcess}
        />
        <p>OR</p>
        <Input
          title='Duration'
          name='duration'
          value={templateData.repeats > 0 ? '--:--' : formatTime(templateData.duration)}
          onChange={changeHandler}
          disabled={templateData.repeats > 0 || inProcess}
        />
      </div>
      <div className={styles.equipment}>
        <KeyAmountBlock
          title='Equipment'
          onChange={(type, amount) => equipmentChangeHandler(type as EquipmentType, amount)}
          onRemove={(type) => equipmentRemovedHandler(type as EquipmentType)}
          elements={templateData.equipment.map((eq) => {
            return {
              type: eq.type,
              amount: eq.weight * 0.001,
              suffix: 'KG',
              img: `${process.env.PUBLIC_URL}/assets/images/equipment/${eq.type}.jpg`,
            }
          })}
          disabled={inProcess}
        />
        <div className={styles.addEquipmentMenu}>
          {showEquipmentMenu ? (
            <TilesSelector
              values={availableEquipment().map((type) => {
                return {
                  type,
                  img: `${process.env.PUBLIC_URL}/assets/images/equipment/${type}.jpg`,
                }
              })}
              onSelect={(value) => {
                equipmentAddHandler(value as EquipmentType)
                setShowEquipmentMenu(false)
              }}
              onCancel={() => setShowEquipmentMenu(false)}
              disabled={inProcess}
            />
          ) : (
            availableEquipment().length > 0 && (
              <div
                className={styles.addBtn}
                onClick={() => {
                  if (!inProcess) setShowEquipmentMenu(true)
                }}
              ></div>
            )
          )}
        </div>
      </div>
      <Input
        title='Calories burned'
        name='calories'
        type='number'
        value={templateData.calories === 0 ? '' : templateData.calories}
        onChange={changeHandler}
        disabled={inProcess}
      />

      <div className={styles.controls}>
        <Button text='SAVE' disabled={inProcess} callback={onSubmit} />
        <Button text='CANCEL' disabled={inProcess} callback={close} />
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    save: (exercise: Exercise) => saveTemplate(exercise)(dispatch),
  }
}

export default connect(null, mapDispatchToProps)(ExerciseForm)
