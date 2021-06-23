import styled from 'styled-components/native'

import { colors, fonts } from '../../themes'
import { CheckCircleIcon as CheckCircle } from '../../../assets/icons'

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 58px;
  border-top-right-radius: 21px;
  border-top-left-radius: 21px;
  position: absolute;
  bottom: 0px;
  ${({ feedback }) => handleFeedback(feedback)};
`

export const RowContent = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  padding: 0px 18px 0px 17px;
`

export const Button = styled.TouchableOpacity`
  align-items: center;
`

export const AboveKeyboardInput = styled.TextInput`
  height: 32px;
  width: 85%;
  border-width: 1px;
  border-color: ${colors.lightPattern};
  border-radius: 15px;
  padding: 1px 21px 1px 21px;
  font-family: ${fonts.openSans.bold};
  font-size: 15px;
  color: ${colors.lightPattern};
`

export const CheckCircleIcon = styled(CheckCircle)`
  color: ${colors.lightPattern};
  width: 25px;
  height: 25px;
`

function handleFeedback(feedback) {
  switch (feedback) {
    case 'field':
      return `
      background-color: ${colors.barColor}
      `
    case 'check':
      return `
      background-color: ${colors.secondary}
      `
    case 'error':
      return `
      background-color: ${colors.negative}
      `
  }
}
