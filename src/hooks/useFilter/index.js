import { useState, useEffect } from 'react'

import api from '../../services/api'

import { useNavigation } from '@react-navigation/native'

export default function useFilter() {
  const navigation = useNavigation()

  const [posts, setPosts] = useState(null)

  const [search, setSearch] = useState(null)
  const [dataTechnologies, setDataTechnologies] = useState(null)
  const [dataAreas, setDataAreas] = useState(null)
  const [dataStartups, setDataStartups] = useState(null)

  const [technologies, setTechnologies] = useState(new Set())
  const [areas, setAreas] = useState(new Set())
  const [startups, setStartups] = useState(new Set())

  const [filteredPosts, setFilteredPosts] = useState(posts)

  useEffect(() => {
    fetchData()
  }, [])

  let isCancelled = false
  const errorMessage = 'Falha no carregamento das opções de filtro'

  async function fetchData() {
    try {
      if (!isCancelled) {
        const resCompanies = await api.get(`/companies.json?alt=media`)
        const resAreas = await api.get(`/work-areas.json?alt=media`)
        const resSkills = await api.get(`/skills.json?alt=media`)
        const newCompanies = insertTagNull(resCompanies.data)
        const newAreas = insertTagNull(resAreas.data)
        const newSkills = insertTagNull(resSkills.data)
        setDataStartups(newCompanies)
        setDataAreas(newAreas)
        setDataTechnologies(newSkills)
        isCancelled = true
      }
    } catch (e) {
      console.log(e)
      if (!isCancelled) {
        navigation.navigate('FailureScreen', { errorMessage, fetchData })
      }
    }
  }

  function insertTagNull(array) {
    array.map(function (item) {
      item.typeTag = 'tag-null'
    })
    return array
  }

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
    if (dataAreas) {
      const newAreas = JSON.parse(JSON.stringify(dataAreas))
      newAreas.map(function (area) {
        if (areas.has(area.label)) {
          area.typeTag = 'tag-selected'
        } else {
          area.typeTag = 'tag-null'
        }
      })
      setDataAreas(newAreas)
    }
  }, [areas])

  useEffect(() => {
    if (dataStartups) {
      const newStartups = JSON.parse(JSON.stringify(dataStartups))
      newStartups.map(function (startup) {
        if (startups.has(startup.label)) {
          startup.typeTag = 'tag-selected'
        } else {
          startup.typeTag = 'tag-null'
        }
      })
      setDataStartups(newStartups)
    }
  }, [startups])

  useEffect(() => {
    let newPosts = JSON.parse(JSON.stringify(posts))
    if (search) {
      newPosts = newPosts.filter((post) => {
        return (
          post.creator.toLowerCase().includes(search.toLowerCase()) ||
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.description.toLowerCase().includes(search.toLowerCase())
        )
      })
    }
    if (technologies.size > 0) {
      newPosts = newPosts.filter((post) => {
        return technologies.has(post.technology)
      })
    }
    if (areas.size > 0) {
      newPosts = newPosts.filter((post) => {
        return areas.has(post.area)
      })
    }
    if (startups.size > 0) {
      newPosts = newPosts.filter((post) => {
        return startups.has(post.startup)
      })
    }
    setFilteredPosts(newPosts)
  }, [search, technologies, areas, startups, posts])

  function insertOrDeleteTechnology(technology) {
    const newTechnologies = new Set(technologies)
    if (!newTechnologies.has(technology)) {
      setTechnologies(newTechnologies.add(technology))
    } else {
      newTechnologies.delete(technology)
      setTechnologies(newTechnologies)
    }
  }

  function insertOrDeleteAreas(area) {
    const newAreas = new Set(areas)
    if (!newAreas.has(area)) {
      setAreas(newAreas.add(area))
    } else {
      newAreas.delete(area)
      setAreas(newAreas)
    }
  }

  function insertOrDeleteStartups(startup) {
    const newStartups = new Set(startups)
    if (!newStartups.has(startup)) {
      setStartups(newStartups.add(startup))
    } else {
      newStartups.delete(startup)
      setStartups(newStartups)
    }
  }

  return {
    insertOrDeleteTechnology,
    insertOrDeleteAreas,
    insertOrDeleteStartups,
    setSearch,
    dataTechnologies,
    dataAreas,
    dataStartups,
    filteredPosts,
    posts,
    setPosts,
  }
}
