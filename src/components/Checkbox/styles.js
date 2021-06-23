import styled from 'styled-components/native'

import colors from '../../themes/colors'
import { Body as BodyTypography } from '../../components/Typography'
import { CheckCircleOutlineIcon as CheckCircleOutline } from '../../../assets/icons'

function handleType(typeCheckbox) {
  switch (typeCheckbox) {
    case 'large-selected':
      return `
      background-color: ${colors.primary};
      `
    case 'small-selected':
      return `
      background-color: ${colors.green};
      `
    case 'large-null':
      return `
      background-color: ${colors.disable};
      `
    case 'large-check':
      return `
      background-color: ${colors.secondary};
      `
    case 'small-null':
      return `
      background-color: ${colors.lightShade};
      `
    case 'small-check':
      return `
      background-color: ${colors.secondary};
      `
  }
}

export const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  border-radius: 30px;
  ${({ typeCheckbox }) => handleType(typeCheckbox)};
`
export const CheckCircleOutlineIcon = styled(CheckCircleOutline).attrs({
  color: colors.lightPattern,
  width: 25,
  height: 25,
})`
  position: absolute;
  right: 14px;
`

export const Body = styled(BodyTypography)`
  font-weight: bold;
  color: ${(props) => props.theme.lightPattern};
`
