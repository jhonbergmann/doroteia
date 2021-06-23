import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  AreaInputContent,
  Title,
  AreaInput,
  ViewTitle,
  TagContainer,
  TagContent,
  ActivityIndicator,
} from './styles'

import { Card, GenericInput, Dropdown, Button, Tag } from '../../components'
import api from '../../services/api'

export default function CreatePost() {
  const navigation = useNavigation()

  const [areas, setAreas] = useState(null)
  const [dataTechnologies, setDataTechnologies] = useState(null)

  const [loading, setLoading] = useState(false)

  const [inputTitleData, setInputTitleData] = useState('')
  const [inputDescriptionData, setInputDescriptionData] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [technologies, setTechnologies] = useState(new Set())

  useEffect(() => {
    if (dataTechnologies) {
      const newTechnologies = JSON.parse(JSON.stringify(dataTechnologies))
      newTechnologies.map(function (tech) {
        if (technologies.has(tech.label)) {
          tech.typeTag = 'tag-selected'
        } else {
          tech.typeTag = 'tag-null'
        }
      })
      setDataTechnologies(newTechnologies)
    }
  }, [technologies])

  useEffect(() => {
    fetchData()
  }, [])

  let isCancelled = false

  async function fetchData() {
    try {
      if (!isCancelled) {
        const resTechnologies = await api.get(`/skills.json?alt=media`)
        const resAreas = await api.get(`/work-areas.json?alt=media`)
        const newTechnologies = insertTagNull(resTechnologies.data)
        setAreas(resAreas.data)
        setDataTechnologies(newTechnologies)
        isCancelled = true
      }
    } catch (e) {
      console.log(e)
      if (!isCancelled) {
        const errorMessage = 'Falha no carregamento...'
        navigation.navigate('FailureScreen', {
          errorMessage,
          fetchData,
        })
      }
    }
  }

  function insertTagNull(array) {
    array.map(function (item) {
      item.typeTag = 'tag-null'
    })
    return array
  }

  function insertOrDeleteTechnology(technology) {
    const newTechnologies = new Set(technologies)
    if (!newTechnologies.has(technology)) {
      setTechnologies(newTechnologies.add(technology))
    } else {
      newTechnologies.delete(technology)
      setTechnologies(newTechnologies)
    }
  }

  function clearData() {
    setInputTitleData('')
    setInputDescriptionData('')
    setSelectedArea('')
    setTechnologies(new Set())
  }

  async function sendBackend() {
    clearData()
    navigation.navigate('Home')
    alert('Enviou com sucesso')
    setLoading(false)
  }

  async function handleCreatePost() {
    setLoading(true)
    console.log(inputTitleData)
    console.log(inputDescriptionData)
    console.log(selectedArea)
    console.log(technologies)
    await sendBackend()
  }
  if (areas && dataTechnologies) {
    return (
      <Container>
        <Card
          typeCard={'opened'}
          // onPress={() => {}}
          title={
            inputTitleData == ''
              ? 'Título da sua publicação...'
              : inputTitleData
          }
          creator={null}
          description={
            inputDescriptionData == ''
              ? `Descrição da sua publicação. ${'\n'} ${'\n'}Lembre-se de fazer uma boa descrição. Após preencher todos os campos, basta clicar em publicar.`
              : inputDescriptionData
          }
          creationDate={'07/06/2021'} // DATA ATUAL
          endData={''}
        />

        <GenericInput
          typeInput="field"
          title="Título"
          value={inputTitleData}
          onChangeText={setInputTitleData}
        />

        <AreaInputContent>
          <Title>Descrição</Title>
          <AreaInput
            multiline
            value={inputDescriptionData}
            onChangeText={setInputDescriptionData}
          />
        </AreaInputContent>

        <Dropdown
          firstLabelDisable={'Selecione a área que você atua'}
          title={'Área'}
          data={areas}
          selectedValue={selectedArea}
          onValueChangeSelected={setSelectedArea}
        />

        <ViewTitle>
          <Title style={{ textAlign: 'left' }}>Tecnologia</Title>
        </ViewTitle>

        <TagContainer>
          {dataTechnologies.map((item, id) => {
            return (
              <TagContent key={item.id}>
                <Tag
                  name={item.label}
                  typeTag={item.typeTag}
                  activeOpacity={0.08}
                  onPress={() => insertOrDeleteTechnology(item.label)}
                />
              </TagContent>
            )
          })}
        </TagContainer>

        <Button
          disabled={
            inputTitleData !== '' &&
            inputDescriptionData !== '' &&
            selectedArea !== '' // &&
              ? // technologies !== ''
                false
              : true
          }
          name={'Publicar'}
          type={loading ? 'loading' : 'primary'}
          onPress={() => handleCreatePost()}
        />
      </Container>
    )
  } else {
    return <ActivityIndicator />
  }
}
