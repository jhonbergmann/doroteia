import React from 'react'
import { Dimensions } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'

import { colors } from '../../themes'

const { width } = Dimensions.get('window')
const size = width * 0.9

export default function StepsProgressBar({ progress }) {
  return (
    <ProgressBar
      animated={true}
      progress={progress}
      color={colors.barColor}
      unfilledColor={colors.barBack}
      borderWidth={0}
      width={size}
      height={5}
    />
  )
}
