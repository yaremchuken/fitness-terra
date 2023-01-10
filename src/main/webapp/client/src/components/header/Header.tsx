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

  const onLogout = () => {
    displayMessage(`До скорой встречи!`)
    logout(store)
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.title}>Fitness Terra</div>
      {isAuthenticated && (
        <button className={`${styles.btn} ${styles.btnLogout}`} onClick={onLogout}>
          logout
        </button>
      )}
    </header>
  )
}

export default Header
