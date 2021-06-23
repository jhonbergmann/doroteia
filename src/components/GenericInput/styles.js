import styled from 'styled-components/native'

import { colors, fonts } from '../../themes'

import {
  HighLightOffIcon as HighLightOff,
  CheckCircleOutlineIcon as CheckCircleOutline,
  ElEyeCloseIcon as ElEyeClose,
  RemoveRedEyeIcon as RemoveRedEye,
  ClearIcon as Clear,
} from '../../../assets/icons'

function handleBorder(typeInput) {
  switch (typeInput) {
    case 'field':
      return `
      border-color: ${colors.lightShade};
      padding: 0px 15px 0px 15px;
      `
    case 'search':
      return `
      border-color: ${colors.lightShade};
      padding: 0px 15px 0px 15px;
      `
    case 'error':
      return `
      border-color: ${colors.negative};
      border-width: 2px;
      padding: 0px 45px 0px 15px;
      `
    case 'check':
      return `
      border-color: ${colors.positive};
      border-width: 2px;
      padding: 0px 45px 0px 15px;
      `
    case 'password':
      return `
      padding: 0px 45px 0px 15px;
      `
    case 'password-confirm':
      return `
      padding: 0px 45px 0px 15px;
      `
    case 'password-error':
      return `
      border-color: ${colors.negative};
      border-width: 2px;
      padding: 0px 45px 0px 15px;
      `
    case 'password-check':
      return `
      border-color: ${colors.positive};
      border-width: 2px;
      padding: 0px 45px 0px 15px;
      `
    case 'password-confirm-error':
      return `
        border-color: ${colors.negative};
        border-width: 2px;
        padding: 0px 45px 0px 15px;
        `
    case 'password-confirm-check':
      return `
        border-color: ${colors.positive};
        border-width: 2px;
        padding: 0px 45px 0px 15px;
        `
  }
}

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`

export const Input = styled.TextInput`
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  height: 48px;
  background: ${colors.lightShade};
  ${({ typeInput }) => handleBorder(typeInput)};
`

export const IconContent = styled.View`
  position: absolute;
  right: 15px;
`

export const Button = styled.TouchableOpacity``

export const Feedback = styled.Text`
  font-size: 14px;
  font-family: ${fonts.openSans.regular};
  position: absolute;
  bottom: 5px;
  left: 0;
`
export const HighLightOffIcon = styled(HighLightOff)`
  width: 25px;
  height: 25px;
  color: ${colors.negative};
`

export const CheckCircleOutlineIcon = styled(CheckCircleOutline)`
  width: 25px;
  height: 25px;
  color: ${colors.positive};
`

export const ElEyeCloseIcon = styled(ElEyeClose)`
  width: 25px;
  height: 25px;
  color: ${colors.strongPattern};
`

export const RemoveRedEyeIcon = styled(RemoveRedEye)`
  width: 25px;
  height: 25px;
  color: ${colors.strongPattern};
`
export const ClearIcon = styled(Clear)`
  width: 25px;
  height: 25px;
  color: ${colors.strongPattern};
`
