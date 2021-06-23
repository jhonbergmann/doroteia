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

import { Button } from '../../../../../components'
import { cuate } from '../../../../../../assets/imgs/register'
import { steps, strings } from '../../../../../helpers/constants'

export default function RegistrationGenericFail() {
  const navigation = useNavigation()

  const route = useRoute()
  const params = route.params
  const errorMessage = params.errorMessage
  const fetchData = params.fetchData

  function handleNavigationToTheBeggining() {
    navigation.navigate('RegisterName')
  }

  function handleNavigationToSignIn() {
    if (errorMessage && fetchData) {
      fetchData()
      navigation.goBack()
    } else if (errorMessage) {
      navigation.goBack()
    } else {
      navigation.navigate('SignIn')
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
            {errorMessage !== '' ? errorMessage : steps.RegistrationFail.text}
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
          onPress={() => handleNavigationToTheBeggining()}
        />
        <Button
          name={strings.retryButton}
          type="primary"
          onPress={() => handleNavigationToSignIn()}
        />
      </BottomContainer>
    </Container>
  )
}
