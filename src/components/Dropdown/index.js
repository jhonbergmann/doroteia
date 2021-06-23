import React from 'react'
import { Picker } from '@react-native-picker/picker'

import { Container, DropdownContent, ArrowBackIcon } from './styles'
import { DropdownTitle } from '../../components/Typography'
import { colors } from '../../themes'

export default function Dropdown({
  // prop-selectedValue | Recebe o valor do label/item selecionado;
  // prop-onValueChangeSelected | Muda o valor do label/item selecionado;
  // prop-data | Recebe os dados;
  // prop-firstLabelDisable | Primeiro label, desabilitado, funciona de um placeholder para o dropdown;
  // prop-title | Titulo do dropdown, fica acima do dropdown;

  selectedValue,
  onValueChangeSelected,
  data,
  firstLabelDisable,
  title,
}) {
  return (
    <Container>
      <DropdownTitle>{title}</DropdownTitle>
      <DropdownContent>
        <Picker
          dropdownIconColor={colors.lightShade}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChangeSelected(itemValue)}
        >
          <Picker.Item
            color={colors.mediumTone}
            label={firstLabelDisable}
            enabled={true}
          />

          {data.map((item, id) => {
            return (
              <Picker.Item
                color={colors.mediumTone}
                label={item.label}
                value={item.label}
                key={item.id || item.idvalue || item.value || id}
              />
            )
          })}
        </Picker>
      </DropdownContent>
      <ArrowBackIcon />
    </Container>
  )
}
