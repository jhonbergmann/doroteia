import React, { useState, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, DrawerActions } from '@react-navigation/native'

import {
  Container,
  Header,
  InputContainer,
  Button,
  HomeIcon,
  SearchIcon,
  FilterIcon,
  LineHomeHeader,
  LineModalHeader,
  Modal,
  ContentScroll,
  HeaderModal,
  HeaderModalTitle,
  TagsContainer,
  TagsContent,
  CreatePostButton,
  ContentButton,
  ActivityIndicator,
} from './styles'

import {
  GenericInput,
  Card,
  WrapperLogo,
  Tag,
  CategoryTitle,
} from '../../components'

import { dark as darkColors, colors as lightColors } from '../../themes'
import { useFilter } from '../../hooks'
import api from '../../services/api'
import { Creators as StacksActions } from '../../store/ducks/stacks'

export default Home = () => {
  const dispatch = useDispatch()
  const { currentPostStack } = StacksActions

  const stacks = useSelector((state) => state.stacks)
  const { dark } = stacks

  const [inputData, setInputData] = useState('')
  const [searching, setSearching] = useState(false)

  const {
    insertOrDeleteTechnology,
    insertOrDeleteAreas,
    insertOrDeleteStartups,
    setSearch,
    dataTechnologies,
    dataAreas,
    dataStartups,
    filteredPosts,
    setPosts,
  } = useFilter()

  useEffect(() => {
    fetchData()
  }, [])

  let isCancelled = false
  const errorMessage = 'Falha no carregamento de posts'

  async function fetchData() {
    try {
      if (!isCancelled) {
        const res = await api.get(`/posts.json?alt=media`)
        setPosts(res.data)
        isCancelled = true
      }
    } catch (e) {
      console.log(e)
      if (!isCancelled) {
        navigation.navigate('FailureScreen', { errorMessage, fetchData })
      }
    }
  }

  const [opacity] = useState(new Animated.Value(0))
  const [scale] = useState(new Animated.Value(0))
  const modalizeRef = useRef(null)
  const navigation = useNavigation()

  useEffect(() => {
    handleAnimated()
  }, [searching])

  function handleAnimated() {
    if (searching) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 250,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }

  useEffect(() => {
    setSearch(inputData)
  }, [inputData])

  function handleNavigateToCreatePost() {
    navigation.navigate('CreatePost')
  }

  function handleNavigateToPost(id) {
    dispatch(currentPostStack(id))
    navigation.navigate('Post')
  }

  function handleDrawerMenu() {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  function handleSearchOpen() {
    setSearching(true)
  }

  function handleSearchClose() {
    setSearching(false)
  }

  function handleFilterPost() {
    modalizeRef.current?.open()
  }

  if (dataTechnologies) {
    return (
      <Container>
        <Header>
          <Button onPress={() => handleDrawerMenu()}>
            <HomeIcon />
          </Button>

          {searching ? (
            <Button onPress={() => handleFilterPost()}>
              <FilterIcon />
            </Button>
          ) : null}

          {searching ? null : <WrapperLogo />}

          {searching ? (
            <InputContainer
              style={{
                opacity: opacity,
                transform: [{ translateX: scale }],
              }}
            >
              <GenericInput
                typeInput={'search'}
                onClose={() => handleSearchClose()}
                value={inputData}
                onChangeText={setInputData}
                placeholder={'Pesquisar...'}
                maxLength={30}
              />
            </InputContainer>
          ) : null}

          {searching ? null : (
            <Button onPress={() => handleSearchOpen()}>
              <SearchIcon />
            </Button>
          )}
        </Header>

        <LineHomeHeader />

        <ContentScroll>
          {filteredPosts?.map((item, id) => {
            return (
              <Card
                key={item.id}
                typeCard={item.typeCard}
                onPress={() => handleNavigateToPost(id)}
                title={item.title}
                creator={item.creator}
                description={item.description}
                creationDate={item.creationDate}
                endData={item.endDate}
              />
            )
          })}
        </ContentScroll>

        <Modal
          childrenStyle={{
            backgroundColor: dark
              ? darkColors.lightPattern
              : lightColors.lightPattern,
          }}
          ref={modalizeRef}
          HeaderComponent={
            <>
              <HeaderModal>
                <HeaderModalTitle>Filtrar por categoria</HeaderModalTitle>
                <FilterIcon />
              </HeaderModal>
              <LineModalHeader />
            </>
          }
        >
          <CategoryTitle title={'Tecnologia'} />
          <TagsContainer>
            {dataTechnologies.map((item) => {
              return (
                <TagsContent key={item.id}>
                  <Tag
                    name={item.label}
                    typeTag={item.typeTag}
                    activeOpacity={0.08}
                    onPress={() => insertOrDeleteTechnology(item.label)}
                  />
                </TagsContent>
              )
            })}
          </TagsContainer>

          <CategoryTitle title={'Startup'} />
          <TagsContainer>
            {dataStartups.map((item) => {
              return (
                <TagsContent key={item.idvalue}>
                  <Tag
                    name={item.label}
                    typeTag={item.typeTag}
                    activeOpacity={0.8}
                    onPress={() => insertOrDeleteStartups(item.label)}
                  />
                </TagsContent>
              )
            })}
          </TagsContainer>

          <CategoryTitle title={'Área'} />
          <TagsContainer>
            {dataAreas.map((item) => {
              return (
                <TagsContent key={item.value}>
                  <Tag
                    name={item.label}
                    typeTag={item.typeTag}
                    activeOpacity={0.8}
                    onPress={() => insertOrDeleteAreas(item.label)}
                  />
                </TagsContent>
              )
            })}
          </TagsContainer>
        </Modal>
        <CreatePostButton onPress={() => handleNavigateToCreatePost()}>
          <ContentButton>+</ContentButton>
        </CreatePostButton>
      </Container>
    )
  } else {
    return <ActivityIndicator />
  }
}
