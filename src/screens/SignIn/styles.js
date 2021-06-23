import styled from 'styled-components/native'

import { colors, fonts } from '../../themes'
import { H1Headline } from '../../components/Typography'
import { LoginIcon } from '../../../assets/icons'

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 35,
  },
})`
  flex: 1;
  height: 100%;
  background-color: ${(props) => props.theme.lightPattern};
`

export const TopContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  margin: 0px 16px 30px 16px;
  ${({ keyboardIsOpen }) =>
    keyboardIsOpen ? 'height: 100px;' : 'height: 200px;'};
`

export const CenteredContainer = styled.View`
  align-items: center;
  padding: 0px 16px 0px 16px;
`

export const BottomContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
export const BottomContent = styled.View`
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  align-items: center;
`

export const EnterContainer = styled.View`
  flex-direction: row;
  align-self: flex-start;
`

export const Line = styled.View.attrs({
  borderBottomWidth: 2,
})`
  width: 100%;
  border-color: ${(props) => props.theme.lightShade};
`

export const Bold = styled(H1Headline)`
  font-size: 18px;
  color: ${(props) => props.theme.leadItau};
`
export const SemiBold = styled.Text`
  font-size: 20px;
  font-family: ${fonts.openSans.semiBold};
  color: ${(props) => props.theme.strong};
`
export const EnterIcon = styled(LoginIcon)`
  color: ${(props) => props.theme.strong};
  margin-right: 10px;
`

export const ForgetButton = styled.TouchableOpacity``

export const SmallBold = styled(H1Headline)`
  color: ${colors.primary};
  font-size: 10px;
  text-decoration: underline;
`
