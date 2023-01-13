import { useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Store } from 'redux'
import { useDisplayMessage } from '../../hooks/UseDisplayMessage'
import styles from './Header.module.scss'

type HeaderProps = {
  isAuthenticated: boolean
  logout: (store?: Store) => void
}

const Header = ({ isAuthenticated, logout }: HeaderProps) => {
  const displayMessage = useDisplayMessage()
  const store = useStore()
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  const gotoCollection = () => {
    navigate('/collection')
  }

  const onLogout = () => {
    displayMessage(`See you later!`)
    logout(store)
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.title} onClick={goHome}>
          Fitness Terra
        </div>
        {isAuthenticated && (
          <nav className={styles.navbar}>
            <button className={`${styles.btn} ${styles.btnLogout}`} onClick={gotoCollection}>
              collection
            </button>
            <button className={`${styles.btn} ${styles.btnLogout}`} onClick={onLogout}>
              logout
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
