import React, { useState } from 'react'
import { Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

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

export default function RegisterName() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { nameStack } = StacksActions

  const [currentBarProgress] = useState(1 / TotalSteps)
  const [keyboardIsOpen] = useKeyboardStatus()
  const typeOfInput = 'name'
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

  function handleNavigationNextStep() {
    dispatch(nameStack(inputData))
    navigation.navigate('RegisterEmail', { currentBarProgress })
  }

  return (
    <Container keyboardIsOpen={keyboardIsOpen}>
      <TopContainer>
        <TopTextContainer>
          <StepTitle>{steps.FirstSetpRegisterName.title}</StepTitle>
        </TopTextContainer>
        <BottomTextContainer>
          <StepText>{steps.FirstSetpRegisterName.text}</StepText>
        </BottomTextContainer>

        <GenericInput
          typeInput={typeInput}
          title={strings.titleName}
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
