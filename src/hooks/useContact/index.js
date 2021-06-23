import { useState, useEffect, useRef } from 'react'

import { regexps, strings } from '../../helpers/constants'
import useKeyboardStatus from '../useKeyboardStatus'

export default function useContact() {
  const inputRef = useRef()

  const [keyboardIsOpen, setKeyboardStatus] = useKeyboardStatus(false)

  const [typeInput, setTypeInput] = useState('')

  const [typeCheckboxWhatsapp, setTypeCheckboxWhatsapp] = useState('large-null')
  const [typeCheckboxTeams, setTypeCheckboxTeams] = useState('large-null')
  const [typeCheckboxTelegram, setTypeCheckboxTelegram] = useState('large-null')
  const [typeCheckboxDiscord, setTypeCheckboxDiscord] = useState('large-null')

  const [valueWhatsapp, setValueWhatsapp] = useState('')
  const [valueTeams, setValueTeams] = useState('')
  const [valueTelegram, setValueTelegram] = useState('')
  const [valueDiscord, setValueDiscord] = useState('')

  const [placeholderText, setPlaceholderText] = useState('')

  const [feedbackWhatsapp, setFeedbackWhatsapp] = useState('field')
  const [feedbackTeams, setFeedbackTeams] = useState('field')
  const [feedbackTelegram, setFeedbackTelegram] = useState('field')
  const [feedbackDiscord, setFeedbackDiscord] = useState('field')

  const [firstEditingWhatsapp, setFirstEditingWhatsapp] = useState(true)
  const [firstEditingTeams, setFirstEditingTeams] = useState(true)
  const [firstEditingTelegram, setFirstEditingTelegram] = useState(true)
  const [firstEditingDiscord, setFirstEditingDiscord] = useState(true)

  const useRegexPhone = regexps.phone
  const useRegexTelegram = regexps.telegram
  const useRegexEMail = regexps.email
  const useRegexDiscord = regexps.discord

  useEffect(() => {
    if (useRegexPhone) {
      if (useRegexPhone.test(valueWhatsapp)) {
        setTypeCheckboxWhatsapp('large-check')
        setFeedbackWhatsapp('check')
        setFirstEditingWhatsapp(false)
      } else {
        if (!firstEditingWhatsapp) {
          setTypeCheckboxWhatsapp('large-selected')
          setFeedbackWhatsapp('error')
          setFirstEditingWhatsapp(true)
        }
      }
    }
  }, [{ valueWhatsapp }])

  useEffect(() => {
    if (useRegexEMail) {
      if (useRegexEMail.test(valueTeams)) {
        setTypeCheckboxTeams('large-check')
        setFeedbackTeams('check')
        setFirstEditingTeams(false)
      } else {
        if (!firstEditingTeams) {
          setTypeCheckboxTeams('large-selected')
          setFeedbackTeams('error')
          setFirstEditingTeams(true)
        }
      }
    }
  }, [{ valueTeams }])

  useEffect(() => {
    if (useRegexTelegram) {
      if (useRegexTelegram.test(valueTelegram)) {
        setTypeCheckboxTelegram('large-check')
        setFeedbackTelegram('check')
        setFirstEditingTelegram(false)
      } else {
        if (!firstEditingTelegram) {
          setTypeCheckboxTelegram('large-selected')
          setFeedbackTelegram('error')
          setFirstEditingTelegram(true)
        }
      }
    }
  }, [{ valueTelegram }])

  useEffect(() => {
    if (useRegexDiscord) {
      if (useRegexDiscord.test(valueDiscord)) {
        setTypeCheckboxDiscord('large-check')
        setFeedbackDiscord('check')
        setFirstEditingDiscord(false)
      } else {
        if (!firstEditingDiscord) {
          setTypeCheckboxDiscord('large-selected')
          setFeedbackDiscord('error')
          setFirstEditingDiscord(true)
        }
      }
    }
  }, [{ valueDiscord }])

  useEffect(() => {
    if (keyboardIsOpen === false) {
      if (typeCheckboxWhatsapp !== 'large-check') {
        setTypeCheckboxWhatsapp('large-null')
      }

      if (typeCheckboxTeams !== 'large-check') {
        setTypeCheckboxTeams('large-null')
      }

      if (typeCheckboxTelegram !== 'large-check') {
        setTypeCheckboxTelegram('large-null')
      }

      if (typeCheckboxDiscord !== 'large-check') {
        setTypeCheckboxDiscord('large-null')
      }
    }
  }, [keyboardIsOpen])

  function handleWhatsappContactIsSelected() {
    if (keyboardIsOpen === false && typeCheckboxWhatsapp !== 'large-check') {
      setTypeCheckboxWhatsapp('large-selected')
      keyboardIsOpen ? setKeyboardStatus(false) : setKeyboardStatus(true)
      setPlaceholderText(strings.placeholderWhatsapp)
      setTypeInput('whatsapp')
      inputRef?.current?.focus()
    }
  }

  function handleTeamsContactIsSelected() {
    if (keyboardIsOpen === false && typeCheckboxTeams !== 'large-check') {
      setTypeCheckboxTeams('large-selected')
      keyboardIsOpen ? setKeyboardStatus(false) : setKeyboardStatus(true)
      setPlaceholderText(strings.placeholderEmailTeams)
      setTypeInput('teams')
      inputRef?.current?.focus()
    }
  }

  function handleTelegramContactIsSelected() {
    if (keyboardIsOpen === false && typeCheckboxTelegram !== 'large-check') {
      setTypeCheckboxTelegram('large-selected')
      setPlaceholderText(strings.placeholderTelegram)
      keyboardIsOpen ? setKeyboardStatus(false) : setKeyboardStatus(true)
      setTypeInput('telegram')
      inputRef?.current?.focus()
    }
  }

  function handleDiscordContactIsSelected() {
    if (keyboardIsOpen === false && typeCheckboxDiscord !== 'large-check') {
      setTypeCheckboxDiscord('large-selected')
      setPlaceholderText(strings.placeholderIdDiscord)
      keyboardIsOpen ? setKeyboardStatus(false) : setKeyboardStatus(true)
      setTypeInput('discord')
      inputRef?.current?.focus()
    }
  }

  function onClickCheck() {
    setKeyboardStatus(false)
  }

  function handleMultiInput() {
    switch (typeInput) {
      case 'whatsapp':
        return (text) => {
          setValueWhatsapp(text, valueWhatsapp)
        }

      case 'teams':
        return (text) => {
          setValueTeams(text, valueTeams)
        }

      case 'telegram':
        return (text) => {
          setValueTelegram(text, valueTelegram)
        }

      case 'discord':
        return (text) => {
          setValueDiscord(text, valueDiscord)
        }
    }
  }

  function handleMultiValue() {
    switch (typeInput) {
      case 'whatsapp':
        valueWhatsapp

      case 'teams':
        valueTeams

      case 'telegram':
        valueTelegram

      case 'discord':
        valueDiscord
    }
  }

  function handleMultiOnEndEditing() {
    switch (typeInput) {
      case 'whatsapp':
        firstEditingWhatsapp

      case 'teams':
        firstEditingTeams

      case 'telegram':
        firstEditingTelegram

      case 'discord':
        firstEditingDiscord
    }
  }

  function handleMultiFeedback() {
    switch (typeInput) {
      case 'whatsapp':
        return feedbackWhatsapp

      case 'teams':
        return feedbackTeams

      case 'telegram':
        return feedbackTelegram

      case 'discord':
        return feedbackDiscord
    }
  }

  function handleMultiAutoCapitalize() {
    switch (typeInput) {
      case 'whatsapp':
        return 'none'

      case 'teams':
        return 'none'

      case 'telegram':
        return 'none'

      case 'discord':
        return 'none'
    }
  }

  return {
    inputRef,
    keyboardIsOpen,
    typeInput,
    typeCheckboxWhatsapp,
    typeCheckboxTeams,
    typeCheckboxTelegram,
    typeCheckboxDiscord,
    valueWhatsapp,
    valueTeams,
    valueTelegram,
    valueDiscord,
    placeholderText,
    handleWhatsappContactIsSelected,
    handleTeamsContactIsSelected,
    handleTelegramContactIsSelected,
    handleDiscordContactIsSelected,
    onClickCheck,
    handleMultiInput,
    handleMultiValue,
    handleMultiOnEndEditing,
    handleMultiFeedback,
    handleMultiAutoCapitalize,
  }
}
