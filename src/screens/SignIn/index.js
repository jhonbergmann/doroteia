import React, { useState } from 'react'
import { Keyboard } from 'react-native'
// import { Creators as StacksActions } from '../../store/ducks/stacks'
// import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  TopContainer,
  CenteredContainer,
  BottomContainer,
  BottomContent,
  Bold,
  SemiBold,
  EnterIcon,
  EnterContainer,
  Line,
  ForgetButton,
  SmallBold,
} from './styles'

import { WrapperLogo, Button, GenericInput } from '../../components'
import { strings } from '../../helpers/constants'
import { useUser, useKeyboardStatus } from '../../hooks'

export default SignIn = () => {
  const navigation = useNavigation()
  // const dispatch = useDispatch()
  // const { loginStack } = StacksActions

  const [feedbackError] = useState('')
  const [keyboardIsOpen] = useKeyboardStatus()
  const [loading, setLoading] = useState(false)

  const { userLogin, userSendVerification, userId, userEmailVerified } = useUser()

  let typeOfInput = 'emailSignIn'
  const {
    typeInput: typeInputEmail,
    setTypeInput: setTypeInputEmail,
    inputData: inputDataEmail,
    setInputData: setInputDataEmail,
    placeholder: placeholderEmail,
    editable: editableEmail,
    showingInputData: showingInputDataEmail,
    onChangeShowingInputData: onChangeShowingInputDataEmail,
    onEndEditing: onEndEditingEmail,
    feedback: feedbackEmail,
    autoCompleteType: autoCompleteTypeEmail,
    autoCorrect: autoCorrectEmail,
    maxLength: maxLengthEmail,
    setFeedbackNegative: setFeedbackNegativeEmail,
  } = useInput({ typeOfInput })

  typeOfInput = 'passwordSignIn'
  const {
    typeInput: typeInputPassword,
    setTypeInput: setTypeInputPassword,
    inputData: inputDataPassword,
    setInputData: setInputDataPassword,
    placeholder: placeholderPassword,
    editable: editablePassword,
    showingInputData: showingInputDataPassword,
    onChangeShowingInputData: onChangeShowingInputDataPassword,
    onEndEditing: onEndEditingPassword,
    feedback: feedbackPassword,
    autoCompleteType: autoCompleteTypePassword,
    autoCorrect: autoCorrectPassword,
    maxLength: maxLengthPassword,
    setFeedbackNegative: setFeedbackNegativePassword,
  } = useInput({ typeOfInput, feedbackError })

  function handleForgetPassword() {
    console.warn(strings.forgotPassword)
  }

  function handleClearData() {
    setInputDataEmail('')
    setInputDataPassword('')
    setFeedbackNegativeEmail('')
    setFeedbackNegativePassword('')
    setTypeInputEmail('field')
    setTypeInputPassword('password')
  }

  function handleTreatError() {
    setInputDataPassword('')
    setFeedbackNegativePassword(strings.feedbackSignInError)
  }

  async function handleSendEmailVerification() {
    userSendVerification()
      .then(() => {
        // sucesso
      })
      .catch(() => {
        const errorMessage = 'Tivemos um problema em enviar o e-mail de validação.'
        navigation.navigate('RegistrationGenericFail', { errorMessage })
      })
  }

  async function signIn() {
    userLogin(inputDataEmail, inputDataPassword)
      .then(() => {
        // dispatch(loginStack(Math.random()))
        if (userId() && userEmailVerified()) {
          navigation.navigate('Home')
        } else if (userId() && !userEmailVerified()) {
          handleSendEmailVerification()
          currentBarProgress = 0.4
          navigation.navigate('RegisterVerification', { currentBarProgress })
        }
        setLoading(false)
        handleClearData()
      })
      .catch(() => {
        handleTreatError()
        setLoading(false)
      })
  }

  async function handleSignIn() {
    setLoading(true)
    await signIn()
  }

  function handleNavigationToSignUp() {
    navigation.navigate('StackScreens')
  }

  return (
    <Container>
      <TopContainer keyboardIsOpen={keyboardIsOpen}>
        <WrapperLogo />
        <Bold>{strings.signInWelcome}</Bold>
        {keyboardIsOpen ? null : (
          <>
            <EnterContainer>
              <EnterIcon />
              <SemiBold>{strings.login}</SemiBold>
            </EnterContainer>
            <Line />
          </>
        )}
      </TopContainer>

      <CenteredContainer>
        <GenericInput
          typeInput={typeInputEmail}
          title={strings.titleEmail}
          value={inputDataEmail}
          onChangeText={setInputDataEmail}
          placeholder={placeholderEmail}
          editable={editableEmail}
          onEndEditing={onEndEditingEmail}
          secureTextEntry={!showingInputDataEmail}
          feedback={feedbackEmail}
          onClickEye={onChangeShowingInputDataEmail}
          showingPassword={showingInputDataEmail}
          autoCompleteType={autoCompleteTypeEmail}
          autoCorrect={autoCorrectEmail}
          onSubmitEditing={Keyboard.dismiss}
          maxLength={maxLengthEmail}
        />
        <GenericInput
          typeInput={typeInputPassword}
          title={strings.titlePassword}
          value={inputDataPassword}
          onChangeText={setInputDataPassword}
          placeholder={placeholderPassword}
          editable={editablePassword}
          onEndEditing={onEndEditingPassword}
          secureTextEntry={!showingInputDataPassword}
          feedback={feedbackPassword}
          onClickEye={onChangeShowingInputDataPassword}
          showingPassword={showingInputDataPassword}
          autoCompleteType={autoCompleteTypePassword}
          autoCorrect={autoCorrectPassword}
          onSubmitEditing={Keyboard.dismiss}
          maxLength={maxLengthPassword}
          setFeedbackNegative={setFeedbackNegativePassword}
        />
        <ForgetButton onPress={() => handleForgetPassword()}>
          <SmallBold>{strings.forgotPassword}</SmallBold>
        </ForgetButton>
      </CenteredContainer>

      <BottomContainer>
        {keyboardIsOpen ? null : (
          <BottomContent>
            <Button
              disabled={false}
              name={strings.signUpButton}
              onPress={() => handleNavigationToSignUp()}
            />
            <Button
              disabled={
                typeInputEmail === 'check' &&
                typeInputPassword === 'password-check'
                  ? false
                  : true
              }
              name={strings.signInButton}
              type={loading ? 'loading' : 'primary'}
              onPress={() => handleSignIn()}
            />
          </BottomContent>
        )}
      </BottomContainer>
    </Container>
  )
}
