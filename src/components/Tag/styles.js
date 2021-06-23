import styled from 'styled-components/native'

import colors from '../../themes/colors'
import { Body as BodyTypography } from '../../components/Typography'
import { TagIcon as Tag } from '../../../assets/icons'

function handleType(typeTag) {
  switch (typeTag) {
    case 'tag-selected':
      return `
      background-color: ${colors.primary};
      `
    case 'tag-null':
      return `
      background-color: ${colors.disable};
      `
  }
}

export const TagContainer = styled.View`
  flex: 1;
  flex-direction: column;
`

export const CategoryContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin: 8px 0px 15px 0px;
`

export const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 30px;
  padding: 0px 10px 0px 10px;
  ${({ typeTag }) => handleType(typeTag)};
`

export const NameText = styled(BodyTypography)`
  font-weight: bold;
  color: ${(props) => props.theme.lightPattern};
  font-size: 15px;
`

export const TitleText = styled(BodyTypography)`
  font-size: 13px;
  margin-left: 10px;
`

export const TagIcon = styled(Tag).attrs({
  width: 14,
  height: 14,
})`
  color: ${(props) => props.theme.mediumTone};
  margin-left: 18px;
`
