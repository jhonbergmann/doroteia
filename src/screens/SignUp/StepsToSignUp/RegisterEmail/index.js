import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'

import {
  Container,
  TopContainer,
  CenteredContainer,
  BottomContainer,
  TopTextContainer,
  BottomTextContainer,
  Image,
} from './styles'

import { Button, StepsProgressBar, GenericInput } from '../../../../components'
import { StepTitle, StepText } from '../../../../components/Typography'
import { rafiki } from '../../../../../assets/imgs/register'
import { TotalSteps, steps, strings } from '../../../../helpers/constants'
import { useKeyboardStatus, useInput } from '../../../../hooks'
import { Creators as StacksActions } from '../../../../store/ducks/stacks'

export default function RegisterEmail() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { emailStack } = StacksActions

  const route = useRoute()
  const params = route.params
  const previousProgress = params.currentBarProgress

  const [currentBarProgress, setCurrentBarProgress] = useState(previousProgress)
  const [keyboardIsOpen] = useKeyboardStatus()
  const typeOfInput = 'email'
  const {
    typeInput,
    inputData,
    setInputData,
    placeholder,
    editable,
    showingInputData,
    onChangeShowingInputData,
    onEndEditing,
    feedback,
    autoCompleteType,
    autoCorrect,
    maxLength,
    autoCapitalize,
  } = useInput({ typeOfInput })

  useEffect(() => {
    setTimeout(() => {
      setCurrentBarProgress(2 / TotalSteps)
    }, 300)
  }, [])

  function handleNavigationNextStep() {
    dispatch(emailStack(inputData))
    navigation.navigate('RegisterPassword', { currentBarProgress })
  }

  return (
    <Container keyboardIsOpen={keyboardIsOpen}>
      <TopContainer>
        <TopTextContainer>
          <StepTitle>{steps.SecondStepRegisterEmail.title}</StepTitle>
        </TopTextContainer>
        <BottomTextContainer>
          <StepText>{steps.SecondStepRegisterEmail.text}</StepText>
        </BottomTextContainer>

        <GenericInput
          typeInput={typeInput}
          title={strings.titleCoorporativeEmail}
          value={inputData}
          onChangeText={setInputData}
          placeholder={placeholder}
          editable={editable}
          onEndEditing={onEndEditing}
          secureTextEntry={!showingInputData}
          feedback={feedback}
          onClickEye={onChangeShowingInputData}
          showingPassword={showingInputData}
          autoCompleteType={autoCompleteType}
          autoCorrect={autoCorrect}
          onSubmitEditing={Keyboard.dismiss}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
        />
      </TopContainer>

      <CenteredContainer>
        {keyboardIsOpen ? null : <Image source={rafiki} />}
      </CenteredContainer>

      <BottomContainer>
        <StepsProgressBar progress={currentBarProgress} />
        <Button
          disabled={typeInput === 'check' ? false : true}
          name={strings.nextButton}
          type="primary"
          onPress={() => handleNavigationNextStep()}
        />
      </BottomContainer>
    </Container>
  )
}
