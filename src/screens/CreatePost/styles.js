import styled from 'styled-components/native'
import { ActivityIndicator as Activity } from 'react-native'

import { colors, fonts } from '../../themes'

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 20,
    alignItems: 'center',
  },
})`
  flex: 1;
  height: 100%;
  background-color: ${(props) => props.theme.lightPattern};
`

export const AreaInputContent = styled.View`
  height: 200px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 25px;
`

export const Title = styled.Text`
  font-size: 13px;
  font-family: ${fonts.openSans.bold};
  color: ${(props) => props.theme.mediumTone};
  text-align: left;
  width: 100%;
`

export const AreaInput = styled.TextInput.attrs({ textAlignVertical: 'top' })`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  background: ${colors.lightShade};
  margin-top: 3px;
  padding: 15px 15px 0px 15px;
`

export const ViewTitle = styled.View`
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 100%;
`

export const TagContainer = styled.View.attrs({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
})``

export const TagContent = styled.View.attrs({
  alignItems: 'center',
  justifyContent: 'center',
  height: 30,
  margin: 5,
})``

export const ActivityIndicator = styled(Activity).attrs({
  color: colors.primary,
  size: 'large',
})`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.lightPattern};
`
