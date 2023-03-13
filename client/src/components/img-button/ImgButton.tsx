import styles from './ImgButton.module.scss'

export enum Position {
  LEFT_TOP = 'leftTop',
  RIGHT_TOP = 'rightTop',
  RIGHT_BOTTOM = 'rightBottom',
  LEFT_BOTTOM = 'leftBottom',

  LEFT_TOP_NP = 'leftTopNP',
  RIGHT_TOP_NP = 'rightTopNP',
  RIGHT_BOTTOM_NP = 'rightBottomNP',
  LEFT_BOTTOM_NP = 'leftBottomNP',
}

export enum Size {
  X_SMALL = 'sizeXSmall',
  SMALL = 'sizeSmall',
  DEFAULT = 'sizeDefault',
}

type ImgButtonProps = {
  callback: () => void
  type?: string
  position?: Position
  size?: Size
  disabled?: boolean
}

const ImgButton = ({
  callback,
  position = Position.RIGHT_TOP,
  type = 'remove',
  size = Size.DEFAULT,
  disabled = false,
}: ImgButtonProps) => {
  return (
    <button
      className={`${styles.imgButton} ${styles[position]} ${styles[size]} ${styles[type]}`}
      type='button'
      onClick={callback}
      disabled={disabled}
    ></button>
  )
}

export default ImgButton
