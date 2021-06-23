import styled from 'styled-components/native'

import { colors } from '../../themes'
import { ArrowBackIcon as ArrowBack } from '../../../assets/icons'

export const Container = styled.View`
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  height: 100px;
`

export const DropdownContent = styled.View`
  border-radius: 5px;
  width: 100%;
  height: 48px;
  background: ${colors.lightShade};
`

export const ArrowBackIcon = styled(ArrowBack).attrs({
  position: 'absolute',
  right: 13.6,
  top: 38,
  transform: [{ rotate: '-90deg' }],
})`
  color: ${colors.fullShade};
  width: 20px;
  height: 20px;
`
