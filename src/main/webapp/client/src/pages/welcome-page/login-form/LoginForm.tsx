import React, { ChangeEvent, useContext, useState } from 'react'
import AuthContext from '../../../contexts/AuthContext'
import LoginData from '../../../models/LoginData'
import { login, register } from '../../../services/AuthService'
import styles from './LoginForm.module.scss'
import { useDisplayMessage } from '../../../hooks/UseDisplayMessage'
import { MessageTone } from '../../../components/message-popup/MessagePopup'
import Button from '../../../components/form/button/Button'
import Input from '../../../components/form/input/Input'

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

  const submitHandler = async () => {
    if (inProcess) {
      return
    }

    if (registerMode) performRegister()
    else performLogin()
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
        <Button
          text='LOGIN'
          callback={() => setRegisterMode(false)}
          disabled={inProcess}
          inactive={registerMode}
        />
        <Button
          text='REGISTER'
          callback={() => setRegisterMode(true)}
          disabled={inProcess}
          inactive={!registerMode}
        />
      </div>

      <form className={styles.loginForm} onSubmit={submitHandler}>
        <Input
          title='Username'
          name='username'
          value={loginData.username}
          onChange={changeHandler}
          required
        />
        <Input
          title='Password'
          name='password'
          type='password'
          value={loginData.password}
          onChange={changeHandler}
          required
        />
        {registerMode && (
          <Input
            title='Repeat password'
            name='repeat-password'
            type='password'
            value=''
            onChange={changeHandler}
          />
        )}
        {registerMode ? (
          <Button text='REGISTER' callback={submitHandler} disabled={inProcess} />
        ) : (
          <Button text='LOGIN' callback={submitHandler} disabled={inProcess} />
        )}
      </form>
    </>
  )
}

export default LoginForm
