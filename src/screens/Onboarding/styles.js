import styled from 'styled-components/native'
import AppIntroSlider from 'react-native-app-intro-slider'

import { H1Headline, Body } from '../../components/Typography'
import { ArrowForwardIcon, ArrowBackIcon } from '../../../assets/icons'
import { colors } from '../../themes'

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
})`
  flex: 1;
  background-color: ${colors.lightPattern};
  padding-bottom: 50px;
`

export const IntroSlider = styled(AppIntroSlider).attrs({
  activeDotStyle: {
    backgroundColor: colors.primary,
  },
  dotStyle: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
})``

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})``

export const Title = styled(H1Headline)`
  text-align: center;
  line-height: 38px;
  padding: 50px 25px 15px 25px;
  letter-spacing: -0.3px;
  color: ${colors.mediumTone};
`

export const Text = styled(Body)`
  text-align: center;
  line-height: 22px;
  padding: 0px 50px 10px 50px;
  color: ${colors.mediumTone};
`

export const StepsButton = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0px 0px 0px;
`

export const StepsButtonText = styled(Body)`
  font-size: 14px;
  color: ${colors.leadItau};
`

export const ArrowForward = styled(ArrowForwardIcon)`
  color: ${colors.primary};
  height: 20px;
  width: 20px;
`

export const ArrowBack = styled(ArrowBackIcon)`
  color: ${colors.primary};
  height: 20px;
  width: 20px;
`
