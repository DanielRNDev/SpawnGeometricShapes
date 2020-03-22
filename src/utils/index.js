import { Dimensions } from 'react-native'
import _ from 'lodash'
const { width } = Dimensions.get('window')

const getShapeSize = () => {
  // A shape should not be more than 45% the width or height of the screen size and should never be less than 10% the width or height.
  const min = Math.ceil(0.1 * width)
  const max = Math.floor(0.45 * width)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

const debounceEventHandler = (...args) => {
  const debounced = _.debounce(...args)
  return function(e) {
    e.persist()
    return debounced(e)
  }
}

const getTrianglePoint = (size) => {
  const min = Math.ceil(size / 2)
  const max = Math.floor(size) // Sometimes the triangle edge is not a straight line
  const randomAx = Math.floor(Math.random() * Math.floor(size))
  const randomBx = Math.floor(Math.random() * Math.floor(size / 2))
  const randomBy = Math.floor(Math.random() * (max - min + 1)) + min
  const randomCy = Math.floor(Math.random() * (max - min + 1)) + min
  const pointA = `${randomAx},0`
  const pointB = `${randomBx},${randomBy}`
  const pointC = `${randomCy},${randomCy}`

  return `${pointA} ${pointB} ${pointC}`
}

export {
  getShapeSize,
  debounceEventHandler,
  getTrianglePoint
}
