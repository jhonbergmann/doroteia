import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'

import {
  Container,
  TopContainer,
  CenteredContainer,
  BottomContainer,
  TopTextContainer,
  BottomTextContainer,
} from './styles'

import { Button, StepsProgressBar, GenericInput } from '../../../../components'
import { StepTitle, StepText } from '../../../../components/Typography'
import { TotalSteps, steps, strings } from '../../../../helpers/constants'
import { useUser, useKeyboardStatus, useInput } from '../../../../hooks'
import { Creators as StacksActions } from '../../../../store/ducks/stacks'

export default function RegisterPassword() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { passwordStack } = StacksActions
  const stacks = useSelector((state) => state.stacks)
  const { email, name } = stacks

  const route = useRoute()
  const params = route.params
  const previousProgress = params.currentBarProgress

  const [currentBarProgress, setCurrentBarProgress] = useState(previousProgress)
  const [loading, setLoading] = useState(false)

  const { auth, userRegister, userSendVerification } = useUser()
  const [keyboardIsOpen] = useKeyboardStatus()

  let typeOfInput = 'password'
  const {
    typeInput: typeInputPassword,
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
    autoCapitalize: autoCapitalizePassword,
  } = useInput({ typeOfInput })

  typeOfInput = 'password-confirm'
  const {
    typeInput: typeInputConfirm,
    inputData: inputDataConfirm,
    setInputData: setInputDataConfirm,
    placeholder: placeholderConfirm,
    editable: editableConfirm,
    showingInputData: showingInputDataConfirm,
    onChangeShowingInputData: onChangeShowingInputDataConfirm,
    onEndEditing: onEndEditingConfirm,
    feedback: feedbackConfirm,
    autoCompleteType: autoCompleteTypeConfirm,
    autoCorrect: autoCorrectConfirm,
    maxLength: maxLengthConfirm,
    autoCapitalize: autoCapitalizeConfirm,
    setRegex: setRegexConfirm,
  } = useInput({ typeOfInput })

  useEffect(() => {
    if (!inputDataPassword) {
      setRegexConfirm(new RegExp(`temp`))
    } else {
      setRegexConfirm(new RegExp(`^${inputDataPassword}$`))
    }
  }, [inputDataPassword])

  useEffect(() => {
    setTimeout(() => {
      setCurrentBarProgress(3 / TotalSteps)
    }, 300)
  }, [])

  function checkProgress() {
    if (
      typeInputPassword === 'password-check' &&
      typeInputConfirm === 'password-confirm-check'
    ) {
      return false
    } else {
      return true
    }
  }

  function handleTreatError(error) {
    if (error.code === 'auth/invalid-email') {
      const errorMessage = 'Esse endereço de e-mail é inválido!'
      navigation.navigate('RegistrationGenericFail', { errorMessage })
    } else if (error.code === 'auth/email-already-in-use') {
      const errorMessage = 'Esse endereço de email já esta em uso!'
      navigation.navigate('RegistrationEmailUseFail', { errorMessage })
    } else {
      const errorMessage = 'Tivemos um problema em realizar o seu cadastro.'
      navigation.navigate('RegistrationGenericFail', { errorMessage })
    }
  }

  async function handleSendEmailVerification() {
    await userSendVerification()
      .then(() => {
        // sucesso
      })
      .catch(() => {
        const errorMessage = 'Tivemos um problema em enviar o e-mail de validação.'
        navigation.navigate('RegistrationGenericFail', { errorMessage })
      })
  }

  async function signUpFirebase() {
    await userRegister(email, inputDataPassword)
      .then(() => {
        auth().currentUser.updateProfile({
          displayName: name,
        })
        handleSendEmailVerification()
        navigation.navigate('RegisterVerification', { currentBarProgress })
        setLoading(false)
      })
      .catch((error) => {
        handleTreatError(error)
        setLoading(false)
      })
  }

  async function handleNavigationNextStep() {
    dispatch(passwordStack(inputDataPassword))
    setLoading(true)
    await signUpFirebase()
  }

  return (
    <Container>
      <TopContainer>
        <TopTextContainer>
          <StepTitle>{steps.SeventhStepRegisterPassword.title}</StepTitle>
        </TopTextContainer>
        <BottomTextContainer>
          <StepText>{steps.SeventhStepRegisterPassword.text}</StepText>
        </BottomTextContainer>
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
          autoCapitalize={autoCapitalizePassword}
        />

        <GenericInput
          typeInput={typeInputConfirm}
          title={strings.titleConfirmPassword}
          value={inputDataConfirm}
          onChangeText={setInputDataConfirm}
          placeholder={placeholderConfirm}
          editable={editableConfirm}
          onEndEditing={onEndEditingConfirm}
          secureTextEntry={!showingInputDataConfirm}
          feedback={feedbackConfirm}
          onClickEye={onChangeShowingInputDataConfirm}
          showingPassword={showingInputDataConfirm}
          autoCompleteType={autoCompleteTypeConfirm}
          autoCorrect={autoCorrectConfirm}
          onSubmitEditing={Keyboard.dismiss}
          maxLength={maxLengthConfirm}
          autoCapitalize={autoCapitalizeConfirm}
        />
      </TopContainer>

      <CenteredContainer />

      <BottomContainer>
        {keyboardIsOpen ? null : (
          <>
            <StepsProgressBar progress={currentBarProgress} />
            <Button
              disabled={checkProgress()}
              name={strings.nextButton}
              type={loading ? 'loading' : 'primary'}
              onPress={() => handleNavigationNextStep()}
            />
          </>
        )}
      </BottomContainer>
    </Container>
  )
}
