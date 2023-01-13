import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import LoginForm from './login-form/LoginForm'
import styles from './WelcomePage.module.scss'

type WelcomePageProps = {}

const WelcomePage = (props: WelcomePageProps) => {
  const auth = useContext(AuthContext)

  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh-unit', `${vh}px`)

  return (
    <div className={styles.welcome}>
      {auth.isAuthenticated ? <div className={styles.holder}>Welcome</div> : <LoginForm />}
    </div>
  )
}

export default WelcomePage
