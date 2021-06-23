import styled from 'styled-components/native'

import { H1Headline, H2Headline } from '../../components/Typography'
import { colors } from '../../themes'

export const BackgroundContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`

export const ContactsContainer = styled.View`
  width: 95%;
  border-radius: 30px;
  justify-content: space-between;
  align-items: center;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 20px 0px;
  background-color: ${(props) => props.theme.lightPattern};
`

export const TitleContainer = styled.View`
  width: 100%;
  height: 60px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  justify-content: flex-end;
  align-items: center;
  background-color: ${colors.primary};
`

export const TitleText = styled(H1Headline)`
  font-size: 18px;
  color: ${colors.lightPattern};
  margin: 18px;
`

export const AttributesContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin: 10px 0px 0px 0px;
`

export const LeftAttibuteContainer = styled.View`
  width: 35%;
`

export const ContactText = styled(H2Headline)`
  font-size: 16px;
  margin: 5px 0px 5px 20px;
`

export const ContactButton = styled.TouchableOpacity`
  width: 60%;
`

export const ContactLink = styled(H1Headline)`
  margin: 5px 0px 5px 0px;
  font-size: 15px;
  color: ${colors.primary};
`
