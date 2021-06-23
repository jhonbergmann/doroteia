import React, { useState } from 'react'

import {
  Cards,
  DoorClosedIcon,
  DoorOpenedIcon,
  QueryBuilderIcon,
  CheckCircleOutlineIcon,
  ContentTopContainer,
  TitleText,
  CreatorText,
  DescriptionContainer,
  DescriptionText,
  DataContainer,
  DataText,
} from './styles'

export default function Card({
  // prop-typeCard | Recebe o tipo do card: ('opened' || 'closed');
  // prop-title | Recebe o titulo do post;
  // prop-creator | Recebe o nome do autor do post;
  // prop-description | Recebe a descricao do post;
  // prop-creationDate | Recebe a data de inicio do post;
  // prop-endData | Recebe a data de solucao post;

  typeCard,
  onPress,
  title,
  creator,
  description,
  creationDate,
  endData,
}) {
  const [DescriptionTextSize, SetDescriptionTextSize] = useState(4)

  function renderDoorClosedIcon() {
    return <DoorClosedIcon />
  }

  function renderDoorOpenedIcon() {
    return <DoorOpenedIcon />
  }

  function renderTypes() {
    switch (typeCard) {
      case 'opened':
        return renderDoorOpenedIcon()

      case 'closed':
        return renderDoorClosedIcon()
    }
  }

  const shadownCustom = {
    elevation: 8,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  }

  const changeTextSize = () =>
    DescriptionTextSize === 4
      ? SetDescriptionTextSize(10)
      : SetDescriptionTextSize(4)

  return (
    <Cards
      typeCard={typeCard}
      activeOpacity={0.8}
      style={shadownCustom}
      onPress={onPress}
    >
      <ContentTopContainer>
        <TitleText numberOfLines={2}>{title}</TitleText>
        {renderTypes()}
      </ContentTopContainer>

      <CreatorText>{creator}</CreatorText>

      <DescriptionContainer onPress={() => changeTextSize()}>
        <DescriptionText numberOfLines={DescriptionTextSize}>
          {description}
        </DescriptionText>
      </DescriptionContainer>

      <DataContainer>
        <QueryBuilderIcon />
        <DataText>{creationDate}</DataText>
        {endData === '' ? null : <CheckCircleOutlineIcon />}
        <DataText>{endData}</DataText>
      </DataContainer>
    </Cards>
  )
}
