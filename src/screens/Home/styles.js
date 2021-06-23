import styled from 'styled-components/native'
import { Animated, ActivityIndicator as Activity } from 'react-native'
import { Modalize } from 'react-native-modalize'

import { colors } from '../../themes'
import { BodyLarge, Body } from '../../components/Typography'
import {
  ReorderIcon as Home,
  SearchIcon as Search,
  FilterIcon as Filter,
} from '../../../assets/icons'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.lightPattern};
`

export const Header = styled.View.attrs({
  paddingHorizontal: 10,
})`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 85px;
  position: absolute;
  top: 0px;
`

export const InputContainer = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  width: 75%;
  margin-top: 15px;
`

export const Button = styled.TouchableOpacity``

export const HomeIcon = styled(Home).attrs({
  width: 30,
  height: 30,
})`
  color: ${(props) => props.theme.strongPattern};
`

export const SearchIcon = styled(Search).attrs({
  width: 30,
  height: 30,
})`
  color: ${(props) => props.theme.strongPattern};
`

export const FilterIcon = styled(Filter).attrs({
  width: 25,
  height: 25,
})`
  color: ${(props) => props.theme.strongPattern};
`

export const LineHomeHeader = styled.View.attrs({
  borderBottomWidth: 2,
  width: '95%',
})`
  align-self: center;
  position: absolute;
  top: 80px;
  border-color: ${(props) => props.theme.barBack};
`

export const LineModalHeader = styled.View.attrs({
  borderBottomWidth: 2,
  width: '100%',
})`
  align-self: center;
  border-color: ${(props) => props.theme.barBack};
`

export const ContentScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
})`
  flex: 1;
  width: 100%;
  margin-top: 85px;
  background-color: ${(props) => props.theme.lightPattern};
`

export const Modal = styled(Modalize).attrs({
  scrollViewProps: { showsVerticalScrollIndicator: true },
  modalStyle: { margin: 10 },
  snapPoint: 250,
})``

export const TagsContainer = styled.View.attrs({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
})``

export const TagsContent = styled.View.attrs({
  alignItems: 'center',
  justifyContent: 'center',
  height: 30,
  margin: 5,
})``

export const HeaderModal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 15px 15px;
  background-color: ${(props) => props.theme.lightPattern};
`

export const HeaderModalTitle = styled(Body)`
  font-weight: bold;
  font-size: 20px;
`

export const CreatePostButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: ${colors.primary};
  position: absolute;
  bottom: 35px;
  right: 35px;
`

export const ContentButton = styled(BodyLarge)`
  font-size: 45px;
  color: ${colors.lightPattern};
`

export const ActivityIndicator = styled(Activity).attrs({
  color: colors.primary,
  size: 'large',
})`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.lightPattern};
`
