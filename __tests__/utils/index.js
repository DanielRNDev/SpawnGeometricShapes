import * as Utils from '../../src/utils'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

describe('Utils', () => {
  it('get shapes resolution', () => {
    // A shape should not be more than 45% the width or height of the screen size and should never be less than 10% the width or height.
    const min = Math.ceil(0.1 * width)
    const max = Math.floor(0.45 * width)
    const shapeSize = Utils.getShapeSize()

    expect(shapeSize).toBeGreaterThanOrEqual(min)
    expect(shapeSize).toBeLessThanOrEqual(max)
  })
})
