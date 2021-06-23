import React, { useEffect, useState } from 'react'
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

import { Button, StepsProgressBar } from '../../../../components'
import { StepTitle, StepText } from '../../../../components/Typography'
import { amico } from '../../../../../assets/imgs/register'
import { useUser, useCountDown } from '../../../../hooks'
import { TotalSteps, steps, strings } from '../../../../helpers/constants'

export default function RegisterVerification() {
  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params
  const previousProgress = params.currentBarProgress

  const { user, auth, userSendVerification, userEmailVerified, userReload } = useUser()

  const {
    resendCooldownActive,
    setResendCooldownActive,
    timerCount,
    setTimer,
  } = useCountDown()

  const [currentBarProgress, setCurrentBarProgress] = useState(previousProgress)
  const [loadingResend, setLoadingResend] = useState(false)
  const [loadingValidation, setLoadingValidation] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setCurrentBarProgress(4 / TotalSteps)
    }, 300)
  }, [])

  async function resendEmailVerification() {
    await userSendVerification()
      .then(() => {
        // sucesso
        setLoadingResend(false)
      })
      .catch(() => {
        const errorMessage = 'Tivemos um problema em reenviar o e-mail de validação.'
        navigation.navigate('RegistrationGenericFail', { errorMessage })
        setLoadingResend(false)
        setResendCooldownActive(false)
        setTimer(60)
      })
  }

  async function handleResendCode() {
    setLoadingResend(true)
    await resendEmailVerification()
    setResendCooldownActive(true)
  }

  async function handleValidating() {
    await userReload()
    await user.getIdToken(true)
    setLoadingValidation(false)

    auth().onAuthStateChanged((user) => {
      if (user && userEmailVerified()) {
        navigation.navigate('RegisterStartup', { currentBarProgress })
      } else if (user && !userEmailVerified()) {
        const errorMessage = 'Seu endereço de e-mail ainda não foi validado, consulte sua caixa de e-mail!'
        navigation.navigate('RegistrationGenericFail', { errorMessage })
      }
    })
  }

  async function handleNavigationNextStep() {
    setLoadingValidation(true)
    await handleValidating()
  }

  return (
    <Container>
      <TopContainer>
        <TopTextContainer>
          <StepTitle>{steps.EighthStepRegisterVerification.title}</StepTitle>
        </TopTextContainer>
        <BottomTextContainer>
          <StepText>{steps.EighthStepRegisterVerification.text}</StepText>
        </BottomTextContainer>
      </TopContainer>

      <CenteredContainer>
        <Image source={amico} />
      </CenteredContainer>

      <BottomContainer>
        <StepsProgressBar progress={currentBarProgress} />

        <Button
          disabled={resendCooldownActive}
          name={
            resendCooldownActive
              ? `${strings.resendCode} 00:${
                  timerCount > 9 ? '' : '0'
                }${timerCount}`
              : strings.resendCodeButton
          }
          type={
            loadingResend
              ? 'loading'
              : resendCooldownActive
              ? 'time-charger'
              : null
          }
          onPress={() => handleResendCode()}
        />

        <Button
          disabled={false}
          name={strings.validateButton}
          type={loadingValidation ? 'loading' : 'primary'}
          onPress={() => handleNavigationNextStep()}
        />
      </BottomContainer>
    </Container>
  )
}
