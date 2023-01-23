import { useState } from 'react'
import { useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Store } from 'redux'
import { useDisplayMessage } from '../../hooks/UseDisplayMessage'
import styles from './Header.module.scss'

type HeaderProps = {
  isAuthenticated: boolean
  logout: (store?: Store) => void
}

// NEXT: Dropdown menu to choose between exercise or workout collections

const Header = ({ isAuthenticated, logout }: HeaderProps) => {
  const displayMessage = useDisplayMessage()
  const store = useStore()
  const navigate = useNavigate()

  const [dropMenu, setDropMenu] = useState(false)

  const goHome = () => {
    navigate('/')
  }

  const gotoExercises = () => {
    setDropMenu(false)
    navigate('/exercises')
  }

  const gotoWorkouts = () => {
    setDropMenu(false)
    navigate('/workouts')
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
            <div className={styles.collectionBar}>
              <button
                className={`${styles.btn} ${styles.btnLogout}`}
                onClick={() => setDropMenu(!dropMenu)}
              >
                {dropMenu ? '\u2303' : '\u2304'}collection
              </button>
              {dropMenu && (
                <div className={styles.dropMenu}>
                  <button className={`${styles.btn} ${styles.navBtn}`} onClick={gotoExercises}>
                    exercises
                  </button>
                  <button className={`${styles.btn} ${styles.navBtn}`} onClick={gotoWorkouts}>
                    workouts
                  </button>
                </div>
              )}
            </div>
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
