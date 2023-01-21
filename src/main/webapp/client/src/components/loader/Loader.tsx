import styles from './Loader.module.scss'

type LoaderProps = {
  message: string
  progress?: string
}

const Loader = ({ message, progress }: LoaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinnerWidgets}>
        <div className={styles.spinner}>
          <div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.message}>{message}</div>
      {progress && <div className={styles.progress}></div>}
    </div>
  )
}

export default Loader
