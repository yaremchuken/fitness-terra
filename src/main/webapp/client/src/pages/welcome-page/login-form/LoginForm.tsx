import React, { ChangeEvent, useContext, useState } from 'react'
import AuthContext from '../../../contexts/AuthContext'
import LoginData from '../../../models/LoginData'
import { login, register } from '../../../services/AuthService'
import styles from './LoginForm.module.scss'
import { useDisplayMessage } from '../../../hooks/UseDisplayMessage'
import { MessageTone } from '../../../components/message-popup/MessagePopup'

const LoginForm = () => {
  const auth = useContext(AuthContext)
  const displayMessage = useDisplayMessage()

  const [registerMode, setRegisterMode] = useState(false)
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' })
  const [inProcess, setInProcess] = useState(false)

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'repeat-password') setRepeatedPassword(event.target.value)
    else setLoginData({ ...loginData, [event.target.name]: event.target.value })
  }

  const loginRegisterHandler = async (
    event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (inProcess) {
      return
    }

    const btnPressed =
      event.currentTarget.id === 'login_btn' || event.currentTarget.id === 'register_btn'
    const enterPressed = 'code' in event && (event.code === 'Enter' || event.code === 'NumpadEnter')

    if (btnPressed || enterPressed) {
      if (registerMode) performRegister()
      else performLogin()
    }
  }

  const performRegister = async () => {
    setInProcess(true)

    if (loginData.password !== repeatedPassword) {
      displayMessage('Passwords does not matches!', MessageTone.ERROR)
      setInProcess(false)
    } else {
      register({ ...loginData })
        .then((data) => auth.storeTokens(data.uid, data.accessToken, data.refreshToken))
        .then(() => performLogin())
        .catch((err) => {
          displayMessage(err.message, MessageTone.ERROR)
          setInProcess(false)
        })
        .finally(() => setInProcess(false))
    }
  }

  const performLogin = async () => {
    setInProcess(true)
    login({ ...loginData })
      .then((data) => {
        auth.login(data.uid, data.accessToken, data.refreshToken)
      })
      .catch((err) => {
        displayMessage(err.response.data, MessageTone.ERROR)
      })
      .finally(() => setInProcess(false))
  }

  return (
    <>
      <div className={styles.loginMenu}>
        <button
          id='to_login_btn'
          className={`${styles.menuBtn} ${inProcess ? styles.disabled : ''} ${
            registerMode ? '' : styles.menuBtnSelected
          }`}
          type='button'
          onClick={() => setRegisterMode(false)}
          disabled={inProcess}
        >
          login
        </button>
        <button
          id='to_register_btn'
          className={`${styles.menuBtn} ${inProcess ? styles.disabled : ''} ${
            registerMode ? styles.menuBtnSelected : ''
          }`}
          type='button'
          onClick={() => setRegisterMode(true)}
          disabled={inProcess}
        >
          register
        </button>
      </div>

      <div className={styles.loginForm} onKeyPress={loginRegisterHandler}>
        <form>
          <input
            className={styles.input}
            placeholder='Username'
            type='text'
            name='username'
            value={loginData.username}
            onChange={changeHandler}
            required
          />
          <input
            className={styles.input}
            placeholder='Password'
            type='password'
            name='password'
            value={loginData.password}
            onChange={changeHandler}
            required
          />
          {registerMode && (
            <input
              className={styles.input}
              placeholder='Repeat Password'
              type='password'
              name='repeat-password'
              onChange={changeHandler}
              required
            />
          )}
          {registerMode ? (
            <button
              id='register_btn'
              className={`${styles.btn} ${inProcess ? styles.disabled : ''}`}
              type='button'
              onClick={loginRegisterHandler}
              disabled={inProcess}
            >
              REGISTER
            </button>
          ) : (
            <button
              id='login_btn'
              className={`${styles.btn} ${inProcess ? styles.disabled : ''}`}
              type='button'
              onClick={loginRegisterHandler}
              disabled={inProcess}
            >
              LOGIN
            </button>
          )}
        </form>
      </div>
    </>
  )
}

export default LoginForm
