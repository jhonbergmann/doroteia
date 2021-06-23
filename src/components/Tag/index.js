import React from 'react'

import {
  TagContainer,
  CategoryContainer,
  TouchableOpacity,
  NameText,
  TitleText,
  TagIcon,
} from './styles'

export function Tag({
  // prop-name | Recebe o nome da tag;
  // prop-typeTag | Recebe o tipo da tag ('tag-selected' | 'tag-null');

  name,
  onPress,
  typeTag,
  activeOpacity,
}) {
  return (
    <TagContainer>
      <TouchableOpacity
        onPress={onPress}
        typeTag={typeTag}
        activeOpacity={activeOpacity}
      >
        <NameText>{name}</NameText>
      </TouchableOpacity>
    </TagContainer>
  )
}

export function CategoryTitle({
  // prop-title | Recebe o nome da categoria de filtro;

  title,
}) {
  return (
    <CategoryContainer>
      <TagIcon />
      <TitleText>{title}</TitleText>
    </CategoryContainer>
  )
}
