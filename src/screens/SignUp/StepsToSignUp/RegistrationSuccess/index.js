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
  Title,
  Text,
} from './styles'

import { Button, StepsProgressBar } from '../../../../components'
import { pana } from '../../../../../assets/imgs/register'
import { TotalSteps, steps, strings } from '../../../../helpers/constants'
import { useUser } from '../../../../hooks'

export default function RegistrationSuccess() {
  const navigation = useNavigation()

  const route = useRoute()
  const params = route.params
  const previousProgress = params.currentBarProgress

  const [currentBarProgress, setCurrentBarProgress] = useState(previousProgress)
  const [loading, setLoading] = useState(false)

  const { user, userEmailVerified } = useUser()

  useEffect(() => {
    setTimeout(() => {
      setCurrentBarProgress(9 / TotalSteps)
    }, 300)
  }, [])

  async function handleNavigationToSignInOrHome() {
    if (user && userEmailVerified()) {
      navigation.navigate('Home')
    } else {
      navigation.navigate('SignIn')
    }
    setLoading(false)
  }

  return (
    <Container>
      <TopContainer>
        <TopTextContainer>
          <Title>{steps.RegistrationSuccess.title}</Title>
        </TopTextContainer>
        <BottomTextContainer>
          <Text>{steps.RegistrationSuccess.text}</Text>
        </BottomTextContainer>
      </TopContainer>

      <CenteredContainer>
        <Image source={pana} />
      </CenteredContainer>

      <BottomContainer>
        <StepsProgressBar progress={currentBarProgress} />
        <Button
          name={strings.nextButton}
          type="primary"
          type={loading ? 'loading' : 'primary'}
          onPress={() => handleNavigationToSignInOrHome()}
        />
      </BottomContainer>
    </Container>
  )
}
