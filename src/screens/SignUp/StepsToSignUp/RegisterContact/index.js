import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'

import {
  Container,
  TopContainer,
  BottomContainer,
  TopTextContainer,
  BottomTextContainer,
  CheckboxContainer,
  CheckboxItem,
} from './styles'

import {
  StepsProgressBar,
  Checkbox,
  AboveKeyboardInput,
  Button,
} from '../../../../components'

import { StepTitle, StepText } from '../../../../components/Typography'
import { TotalSteps, steps, strings } from '../../../../helpers/constants'
import { colors } from '../../../../themes'
import { useContact, useUser } from '../../../../hooks'
import { Creators as StacksActions } from '../../../../store/ducks/stacks'

export default function RegisterContact() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { whatsappStack, teamsStack, telegramStack, discordStack } = StacksActions

  const stacks = useSelector((state) => state.stacks)
  const { email, password } = stacks

  const route = useRoute()
  const params = route.params
  const previousProgress = params.currentBarProgress

  const [currentBarProgress, setCurrentBarProgress] = useState(previousProgress)
  const [loading, setLoading] = useState(false)

  const { userLogin } = useUser()

  const {
    inputRef,
    keyboardIsOpen,
    typeInput,
    typeCheckboxWhatsapp,
    typeCheckboxTeams,
    typeCheckboxTelegram,
    typeCheckboxDiscord,
    valueWhatsapp,
    valueTeams,
    valueTelegram,
    valueDiscord,
    placeholderText,
    handleWhatsappContactIsSelected,
    handleTeamsContactIsSelected,
    handleTelegramContactIsSelected,
    handleDiscordContactIsSelected,
    onClickCheck,
    handleMultiInput,
    handleMultiValue,
    handleMultiOnEndEditing,
    handleMultiFeedback,
    handleMultiAutoCapitalize,
  } = useContact()

  useEffect(() => {
    setTimeout(() => {
      setCurrentBarProgress(8 / TotalSteps)
    }, 300)
  }, [])

  async function hiddenSignIn() {
    setLoading(true)
    await userLogin(email, password)
      .then(() => {
        navigation.navigate('RegistrationSuccess', { currentBarProgress })
        setLoading(false)
      })
      .catch(() => {
        const errorMessage = 'Tivemos um problema em efetuar seu login!'
        navigation.navigate('RegistrationHiddenLoginFail', { errorMessage })
        setLoading(false)
      })
  }

  async function handleSendRegistersToBackend() {
    /*  if ('TUDO OK COM O ENVIO DO CADASTRO PARA O BACKEND') {
      // SUCESSO ->
      await hiddenSignIn()
    } else {
      // TELA DE ERRO ->
      const errorMessage = 'Tivemos problemas ao tentar seu cadastro!'
      navigation.navigate('RegistrationBackendSendFail', { errorMessage })
      // NA TELA DE ERRO PODERÀ TENTAR NOVAMENTE OU VOLTAR PARA A ->
      // TELA DE REGISTRO (RegisterStartup), REGRA JÁ NA (RegistrationBackendSendFail).
    } */

    await hiddenSignIn()
  }

  function handleNavigationNextStep() {
    dispatch(whatsappStack(valueWhatsapp))
    dispatch(teamsStack(valueTeams))
    dispatch(telegramStack(valueTelegram))
    dispatch(discordStack(valueDiscord))
    handleSendRegistersToBackend() // ENVIAR AO BACKEND
  }

  return (
    <Container keyboardIsOpen={keyboardIsOpen}>
      <TopContainer>
        <TopTextContainer>
          <StepTitle>{steps.SixthStepRegisterContact.title}</StepTitle>
        </TopTextContainer>
        <BottomTextContainer>
          <StepText>{steps.SixthStepRegisterContact.text}</StepText>
        </BottomTextContainer>

        <CheckboxContainer>
          <CheckboxItem>
            <Checkbox
              name={strings.whatsapp}
              typeCheckbox={typeCheckboxWhatsapp}
              onPress={() => handleWhatsappContactIsSelected()}
            />
          </CheckboxItem>

          <CheckboxItem>
            <Checkbox
              name={strings.teams}
              typeCheckbox={typeCheckboxTeams}
              onPress={() => handleTeamsContactIsSelected()}
            />
          </CheckboxItem>

          <CheckboxItem>
            <Checkbox
              name={strings.telegram}
              typeCheckbox={typeCheckboxTelegram}
              onPress={() => handleTelegramContactIsSelected()}
            />
          </CheckboxItem>

          <CheckboxItem>
            <Checkbox
              name={strings.discord}
              typeCheckbox={typeCheckboxDiscord}
              onPress={() => handleDiscordContactIsSelected()}
            />
          </CheckboxItem>
        </CheckboxContainer>
      </TopContainer>

      {keyboardIsOpen ? (
        <AboveKeyboardInput
          typeInput={typeInput}
          inputRef={inputRef}
          autoFocus={true}
          placeholder={placeholderText}
          placeholderTextColor={colors.lightPattern}
          onClickCheck={() => onClickCheck()}
          value={handleMultiValue()}
          onChangeText={handleMultiInput()}
          onEndEditing={handleMultiOnEndEditing()}
          feedback={handleMultiFeedback()}
          autoCapitalize={handleMultiAutoCapitalize()}
        />
      ) : (
        <BottomContainer>
          <StepsProgressBar progress={currentBarProgress} />
          <Button
            disabled={
              typeCheckboxWhatsapp === 'large-check' ||
              typeCheckboxTeams === 'large-check' ||
              typeCheckboxTelegram === 'large-check' ||
              typeCheckboxDiscord === 'large-check'
                ? false
                : true
            }
            name={strings.nextButton}
            type={loading ? 'loading' : 'primary'}
            onPress={() => handleNavigationNextStep()}
          />
        </BottomContainer>
      )}
    </Container>
  )
}
