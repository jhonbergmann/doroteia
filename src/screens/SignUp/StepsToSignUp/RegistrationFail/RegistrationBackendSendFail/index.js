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

export default function RegistrationBackendSendFail() {
  const navigation = useNavigation()

  const route = useRoute()
  const params = route.params
  const errorMessage = params.errorMessage

  function handleNavigationToFirstButton() {
    navigation.navigate('RegisterStartup')
  }

  function handleNavigationLastButton() {
    navigation.goBack()
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
          onPress={() => handleNavigationToFirstButton()}
        />
        <Button
          name={strings.retryButton}
          type="primary"
          onPress={() => handleNavigationLastButton()}
        />
      </BottomContainer>
    </Container>
  )
}
