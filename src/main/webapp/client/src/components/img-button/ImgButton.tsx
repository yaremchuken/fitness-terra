import iconRemove from '../../img/icon_remove.jpg'
import styles from './ImgButton.module.scss'

export enum Position {
  LEFT_TOP = 'leftTop',
  RIGHT_TOP = 'rightTop',
  RIGHT_BOTTOM = 'rightBottom',
  LEFT_BOTTOM = 'leftBottom',
}

export enum Size {
  SMALL = 'sizeSmall',
  DEFAULT = 'sizeDefault',
}

type ImgButtonProps = {
  callback: () => void
  type?: string
  position?: Position
  size?: Size
}

const ImgButton = ({
  callback,
  position = Position.RIGHT_TOP,
  type = 'remove',
  size = Size.DEFAULT,
}: ImgButtonProps) => {
  return (
    <button
      className={`${styles.imgButton} ${styles[position]} ${styles[size]}`}
      type='button'
      style={{ backgroundImage: type === 'remove' ? `url(${iconRemove})` : undefined }}
      onClick={callback}
    ></button>
  )
}

export default ImgButton
