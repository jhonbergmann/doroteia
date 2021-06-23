import styled from 'styled-components/native'

import { colors } from '../../themes'
import { ArrowBackIcon as ArrowBack } from '../../../assets/icons'

export const Container = styled.View`
  background-color: ${(props) => props.theme.lightPattern};
  height: 85px;
  justify-content: center;
`

export const Button = styled.TouchableOpacity``

export const ArrowBackIcon = styled(ArrowBack).attrs({
  width: 25,
  height: 25,
})`
  color: ${(props) => props.theme.strongPattern};
  left: 10px;
`

export const Line = styled.View.attrs({
  borderBottomWidth: 2,
  borderBottomColor: colors.barBack,
  width: '95%',
})`
  align-self: center;
  position: absolute;
  bottom: 3px;
`
