import styled from 'styled-components/native'
import { ActivityIndicator as Activity } from 'react-native'

import {
  DoorOpenedIcon as DoorOpened,
  DoorClosedIcon as DoorClosed,
  QueryBuilderIcon as QueryBuilder,
  CheckCircleOutlineIcon as CheckCircleOutline,
} from '../../../assets/icons'

import { colors } from '../../themes'
import { H1Headline, H2Headline } from '../../components/Typography'

function handleType(typeCard) {
  switch (typeCard) {
    case 'opened':
      return `
      border: 1px;
      border-color: ${colors.primary};
      `
    case 'closed':
      return `
      border: 1px;
      border-color: ${colors.secondary};
      `
  }
}

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
})`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.lightPattern};
`

export const PostContainer = styled.View`
  width: 100%;
  border-radius: 8px;
  margin-top: 10px;
  padding: 10px;
  justify-content: center;
  background-color: ${(props) => props.theme.lightestShade};
  /*  ${({ typeCard }) => handleType(typeCard)}; DESATIVAR CORES NAS BORDAS */
`
export const DoorOpenedIcon = styled(DoorOpened).attrs({
  width: 24,
  height: 24,
})`
  color: ${colors.primary};
  position: absolute;
  right: 10px;
`

export const DoorClosedIcon = styled(DoorClosed).attrs({
  width: 24,
  height: 24,
})`
  color: ${colors.secondary};
  position: absolute;
  right: 10px;
`

export const QueryBuilderIcon = styled(QueryBuilder).attrs({
  width: 20,
  height: 20,
})`
  color: ${(props) => props.theme.strongPattern};
`
export const CheckCircleOutlineIcon = styled(CheckCircleOutline).attrs({
  width: 20,
  height: 20,
})`
  color: ${(props) => props.theme.strongPattern};
`

export const ContentTopContainer = styled.View``

export const TitleText = styled(H1Headline)`
  font-size: 18px;
  margin: 0px 25px 0px 15px;
  width: 83%;
`

export const AttributesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 5% 0px 5%;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0px 10px 0px;
`

export const CardCreatorText = styled(H2Headline)`
  font-size: 13px;
`

export const ContactButton = styled.TouchableOpacity``

export const ContactLink = styled(H1Headline)`
  font-size: 15px;
  color: ${colors.primary};
  text-decoration: underline;
`

export const LeftAttibuteContainer = styled.View``

export const AttributeText = styled(H2Headline)`
  font-size: 13px;
`

export const RightAttibuteContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const DataText = styled(H2Headline)`
  font-weight: bold;
  font-size: 11px;
`

export const Line = styled.View`
  width: 95%;
  height: 2px;
  margin: 10px;
  background-color: ${colors.lightShade};
`

export const DescriptionTitle = styled(H2Headline)`
  font-weight: bold;
  font-size: 13px;
  margin: 5px;
`

export const ColleagueText = styled(H2Headline)`
  font-size: 13px;
  margin: 5px;
`

export const DescriptionText = styled(H2Headline)`
  font-size: 13px;
  margin: 5px;
`

export const ActivityIndicator = styled(Activity).attrs({
  color: colors.primary,
  size: 'large',
})`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.lightPattern};
`
