import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

const getShapeSize = () => {
  // A shape should not be more than 45% the width or height of the screen size and should never be less than 10% the width or height.
  const min = Math.ceil(0.1 * width)
  const max = Math.floor(0.45 * width)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export {
  getShapeSize
}
