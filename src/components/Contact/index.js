import React from 'react'
import { Linking, Modal } from 'react-native'

import {
  BackgroundContainer,
  ContactsContainer,
  TitleContainer,
  TitleText,
  AttributesContainer,
  LeftAttibuteContainer,
  ContactText,
  ContactButton,
  ContactLink,
} from './styles'

import Button from '../Button'
import { strings } from '../../helpers/constants'

export default function ContactModal({
  whatsapp,
  teams,
  telegram,
  discord,
  cardTitle,
  isVisible,
  onCancel,
}) {
  const message = `Olá, visualizei sua dúvida <<< ${cardTitle} >>>, no Doroteia, e gostaria de te ajudar.`

  function handleShowContact(contact) {
    return (
      <AttributesContainer>
        <LeftAttibuteContainer>
          <ContactText>{renderSwitchItem(contact)}</ContactText>
        </LeftAttibuteContainer>
        <ContactButton
          onPress={() => {
            Linking.openURL(renderSwitchLinking(contact))
          }}
        >
          <ContactLink>{renderSwitchContact(contact)}</ContactLink>
        </ContactButton>
      </AttributesContainer>
    )
  }

  function renderSwitchItem(contact) {
    switch (contact) {
      case 'whatsapp':
        return strings.colonWhatsapp
      case 'teams':
        return strings.colonTeams
      case 'telegram':
        return strings.colonTelegram
      default:
        return strings.colonDiscord
    }
  }

  function renderSwitchContact(contact) {
    switch (contact) {
      case 'whatsapp':
        return whatsapp
      case 'teams':
        return teams
      case 'telegram':
        return telegram
      default:
        return discord
    }
  }

  function renderSwitchLinking(contact) {
    switch (contact) {
      case 'whatsapp':
        return `whatsapp://send?phone=${renderSwitchContact(
          contact,
        )}&text=${message}`
      case 'teams':
        return teams
      case 'telegram':
        return `tg://msg?text=${message}&to=${renderSwitchContact(contact)}`
      default:
        return discord
    }
  }

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
      animationType="slide"
    >
      <BackgroundContainer>
        <ContactsContainer>
          <TitleContainer>
            <TitleText>{strings.contacts}</TitleText>
          </TitleContainer>

          {whatsapp ? handleShowContact('whatsapp') : null}
          {teams ? handleShowContact('teams') : null}
          {telegram ? handleShowContact('telegram') : null}
          {discord ? handleShowContact('discord') : null}

          <Button name={strings.close} onPress={onCancel} type="primary" />
        </ContactsContainer>
      </BackgroundContainer>
    </Modal>
  )
}
