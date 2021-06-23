import styled from 'styled-components/native'
import { Switch } from 'react-native'
import { ActivityIndicator as Activity } from 'react-native'

import { dark as darkColors, colors as lightColors } from '../../themes'
import {
  LevelIcon as Level,
  HomeIcon as Home,
  DoorOpenedIcon as DoorOpened,
  DoorClosedIcon as DoorClosed,
  NewIcon as New,
  ShareIcon as Share,
  InfoIcon as Info,
} from '../../../assets/icons'
import {
  H4Headline as H4,
  Subheading as Sub,
} from '../../components/Typography'

export const Container = styled.View`
  flex: 1;
  padding: 10% 0px 10% 0px;
  background-color: ${(props) => props.theme.lightPattern};
`

export const TopDrawerContainer = styled.View`
  align-items: center;
  flex-direction: column;
  width: 100%;
`

export const ProfileContent = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
`

export const AddAvatar = styled.TouchableOpacity``

export const Avatar = styled.Image`
  border-radius: 50px;
  width: 85px;
  height: 85px;
`

export const UserContainer = styled.View`
  flex-direction: column;
  max-width: 70%;
`

export const LevelContainer = styled.View`
  align-items: center;
  flex-direction: row;
`

export const LevelIcon = styled(Level).attrs({
  width: 18,
  height: 18,
})`
  margin-right: 3px;
  color: ${(props) => props.theme.mediumTone};
`

export const HomeIcon = styled(Home).attrs({
  width: 25,
  height: 25,
})`
  color: ${lightColors.primary};
`

export const CreatePostIcon = styled.View`
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background-color: ${(props) => props.theme.mediumShade};
`

export const TitleCreatePostIcon = styled.Text`
  color: ${(props) => props.theme.lightPattern};
`

export const NewIcon = styled(New).attrs({
  width: 23,
  height: 23,
})`
  ${({ allCardsIsSelected, dark }) =>
    allCardsIsSelected
      ? `color: ${lightColors.primary}`
      : dark
      ? `color: ${darkColors.mediumShade}`
      : `color: ${lightColors.mediumShade}`};
`

export const DoorOpenedIcon = styled(DoorOpened).attrs({
  width: 23,
  height: 23,
})`
  ${({ openedCardsIsSelected, dark }) =>
    openedCardsIsSelected
      ? `color: ${lightColors.primary}`
      : dark
      ? `color: ${darkColors.mediumShade}`
      : `color: ${lightColors.mediumShade}`};
`

export const DoorClosedIcon = styled(DoorClosed).attrs({
  width: 23,
  height: 23,
})`
  ${({ closedCardsIsSelected, dark }) =>
    closedCardsIsSelected
      ? `color: ${lightColors.primary}`
      : dark
      ? `color: ${darkColors.mediumShade}`
      : `color: ${lightColors.mediumShade}`};
`

export const SwitchTheme = styled(Switch).attrs({})``

export const ShareIcon = styled(Share).attrs({
  width: 23,
  height: 23,
})`
  color: ${(props) => props.theme.mediumShade};
`

export const InfoIcon = styled(Info).attrs({
  width: 23,
  height: 23,
})`
  color: ${(props) => props.theme.mediumShade};
`

export const ProgressContainer = styled.View`
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
`

export const XPContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const H4Headline = styled(H4)``

export const Subheading = styled(Sub)`
  font-size: 11px;
`

export const BottomContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const Line = styled.View.attrs({
  borderBottomWidth: 2,
  width: '95%',
})`
  align-self: center;
  border-color: ${(props) => props.theme.barBack};
`

export const TitleMenu = styled(H4Headline)`
  font-size: 15px;
  color: ${(props) => props.theme.mediumShade};
  margin: 10px 0px 0px 10px;
`

export const ActivityIndicator = styled(Activity).attrs({
  color: lightColors.primary,
  size: 'large',
})`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.lightPattern};
`
