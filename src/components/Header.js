import React from 'react'
import { Header } from 'react-native-elements'

const CustomHeader = ({ title, rightComponent }) => (
  <Header
    barStyle="light-content"
    centerComponent={{ text: title.toUpperCase(), style: { color: '#fff', fontWeight: 'bold' } }}
    containerStyle={{
      backgroundColor: '#e91e63',
      justifyContent: 'space-around',
    }}
    rightComponent={rightComponent}
  />
)

export default CustomHeader
