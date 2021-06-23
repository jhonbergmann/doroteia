import React from 'react'
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

import { Button } from '../../components'
import { cuate } from '../../../assets/imgs/register'
import { steps, strings } from '../../helpers/constants'

export default function FailureScreen() {
  const navigation = useNavigation()

  const route = useRoute()
  const params = route.params
  const errorMessage = params.errorMessage
  const fetchData = params.fetchData

  function handleNavigationToHome() {
    navigation.navigate('Home')
  }

  function handleTryAgain() {
    if (errorMessage && fetchData) {
      fetchData()
      navigation.goBack()
    } else if (errorMessage) {
      navigation.goBack()
    } else {
      navigation.goBack()
    }
  }

  return (
    <Container>
      <TopContainer>
        <TopTextContainer>
          <Title>{steps.RegistrationFail.title}</Title>
        </TopTextContainer>
        <BottomTextContainer>
          <Text>
            {errorMessage !== '' ? errorMessage : 'Tivemos um problema, tente novamente!'}
          </Text>
        </BottomTextContainer>
      </TopContainer>

      <CenteredContainer>
        <Image source={cuate} />
      </CenteredContainer>

      <BottomContainer>
        <Button
          name={strings.restartButton}
          type="secondary"
          onPress={() => handleNavigationToHome()}
        />
        <Button
          name={strings.retryButton}
          type="primary"
          onPress={() => handleTryAgain()}
        />
      </BottomContainer>
    </Container>
  )
}
