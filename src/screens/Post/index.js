import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  Container,
  ContentTopContainer,
  PostContainer,
  TitleText,
  CardCreatorText,
  AttributesContainer,
  LeftAttibuteContainer,
  AttributeText,
  RightAttibuteContainer,
  DataText,
  Line,
  DescriptionTitle,
  ColleagueText,
  DescriptionText,
  ContactButton,
  ContactLink,
  CheckCircleOutlineIcon,
  DoorClosedIcon,
  DoorOpenedIcon,
  QueryBuilderIcon,
  ActivityIndicator,
} from './styles'

import { Contact } from '../../components'
import { strings } from '../../helpers/constants'
import api from '../../services/api'

export default function Post() {
  const stacks = useSelector((state) => state.stacks)
  const { currentPost } = stacks

  const [post, setPost] = useState(null)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    fetchData()
  }, [currentPost])

  let isCancelled = false
  const errorMessage = 'Falha no carregamento de posts'

  async function fetchData() {
    try {
      if (!isCancelled) {
        const res = await api.get(`/posts.json?alt=media`)
        const newPost = res.data.find((e) => e.id === currentPost)
        setPost(newPost)
        isCancelled = true
      }
    } catch (e) {
      console.log(e)
      if (!isCancelled) {
        navigation.navigate('FailureScreen', { errorMessage, fetchData })
      }
    }
  }

  function renderDoorClosedIcon() {
    return <DoorClosedIcon />
  }

  function renderDoorOpenedIcon() {
    return <DoorOpenedIcon />
  }

  function renderTypes() {
    switch (post.typeCard) {
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

  if (post) {
    return (
      <Container>
        <Contact
          discord={'bianca.alves#1234'}
          teams={'bianca@4all.com'}
          telegram={'51999999999'}
          whatsapp={'51999999999'}
          cardTitle={post.title}
          isVisible={showContact}
          onCancel={() => setShowContact(false)}
        />
        <PostContainer
          typeCard={post.typeCard}
          activeOpacity={0.8}
          style={shadownCustom}
        >
          <ContentTopContainer>
            <TitleText>{post.title}</TitleText>
            {renderTypes()}

            <AttributesContainer>
              <LeftAttibuteContainer>
                <CardCreatorText>
                  {strings.colonAuthor}
                  {post.creator}
                </CardCreatorText>
              </LeftAttibuteContainer>
              {post.endDate ? null : (
                <ContactButton onPress={() => setShowContact(true)}>
                  <ContactLink>{strings.toAnswer}</ContactLink>
                </ContactButton>
              )}
            </AttributesContainer>
          </ContentTopContainer>

          <AttributesContainer>
            <LeftAttibuteContainer>
              <AttributeText>
                {strings.colonStartup}
                {post.startup}
              </AttributeText>
            </LeftAttibuteContainer>
          </AttributesContainer>

          <AttributesContainer>
            <LeftAttibuteContainer>
              <AttributeText>
                {strings.colonArea}
                {post.area}
              </AttributeText>
            </LeftAttibuteContainer>
            <RightAttibuteContainer>
              <QueryBuilderIcon />
              <DataText>{post.creationDate}</DataText>
            </RightAttibuteContainer>
          </AttributesContainer>

          <AttributesContainer>
            <LeftAttibuteContainer>
              <AttributeText>
                {strings.colonTecnology}
                {post.technology}
              </AttributeText>
            </LeftAttibuteContainer>
            <RightAttibuteContainer>
              <CheckCircleOutlineIcon />
              <DataText>{post.endDate || '--/--/----'}</DataText>
            </RightAttibuteContainer>
          </AttributesContainer>

          <Line />

          <DescriptionTitle>{strings.description}</DescriptionTitle>
          <DescriptionText>{post.description}</DescriptionText>

          {post.solution.description ? <Line /> : null}
          {post.solution.description ? (
            <DescriptionTitle>{strings.solution}</DescriptionTitle>
          ) : null}
          {post.solution.description ? (
            <ColleagueText>{post.solution.creator}</ColleagueText>
          ) : null}
          {post.solution.description ? (
            <DescriptionText>{post.solution.description}</DescriptionText>
          ) : null}
        </PostContainer>
      </Container>
    )
  } else {
    return <ActivityIndicator />
  }
}
