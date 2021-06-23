import styled from 'styled-components/native'

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

export const Cards = styled.TouchableOpacity`
  width: 100%;
  border-radius: 8px;
  margin: 10px;
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

export const ContentTopContainer = styled.View`
  flex-direction: row;
`

export const TitleText = styled(H1Headline)`
  font-size: 18px;
  margin: 0px 25px 0px 15px;
  width: 83%;
  color: ${(props) => props.theme.mediumTone};
`

export const CreatorText = styled(H2Headline)`
  font-size: 11px;
  margin: 5px 0px 0px 20px;
  color: ${(props) => props.theme.mediumTone};
`

export const DescriptionContainer = styled.TouchableOpacity``

export const DescriptionText = styled(H2Headline)`
  font-size: 13px;
  margin: 5px 0px 0px 15px;
  color: ${(props) => props.theme.mediumTone};
`

export const DataContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0px 0px 15px;
  color: ${(props) => props.theme.mediumTone};
`

export const DataText = styled(H2Headline)`
  font-weight: bold;
  font-size: 11px;
  margin: 0px 5px 0px 3px;
  color: ${(props) => props.theme.mediumTone};
`
