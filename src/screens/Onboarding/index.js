import React from 'react'
import { useDispatch } from 'react-redux'
import { Creators as StacksActions } from '../../store/ducks/stacks'
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Image,
  Title,
  Text,
  StepsButton,
  StepsButtonText,
  ArrowForward,
  ArrowBack,
  IntroSlider,
} from './styles'

import { Button } from '../../components'
import { onboarding, strings } from '../../helpers/constants'

export default Onboarding = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { onboardingStack } = StacksActions

  function handleNavigationToSignIn() {
    dispatch(onboardingStack())
    navigation.navigate('SignIn')
  }

  function renderSlides({ item }) {
    return (
      <Container>
        <Image source={item.image} />
        <Title>{item.title}</Title>
        <Text>{item.text}</Text>
        {item.done ? renderDoneButton() : null}
      </Container>
    )
  }

  function renderNextButton() {
    return (
      <StepsButton>
        <StepsButtonText>{strings.next}</StepsButtonText>
        <ArrowForward />
      </StepsButton>
    )
  }

  function renderPrevButton() {
    return (
      <StepsButton>
        <ArrowBack />
        <StepsButtonText>{strings.previous}</StepsButtonText>
      </StepsButton>
    )
  }

  function renderDoneButton() {
    return (
      <Button
        disabled={false}
        name={strings.startButton}
        type="primary"
        onPress={() => handleNavigationToSignIn()}
      />
    )
  }

  return (
    <IntroSlider
      renderItem={renderSlides}
      data={onboarding}
      showNextButton={true}
      showPrevButton={true}
      dotClickEnabled={true}
      renderNextButton={() => renderNextButton()}
      renderPrevButton={() => renderPrevButton()}
      renderDoneButton={() => null}
    />
  )
}
