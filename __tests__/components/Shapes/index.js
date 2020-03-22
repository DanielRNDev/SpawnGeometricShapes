import 'react-native';
import React from 'react'
import Shapes from '../../../src/components/Shapes'
import renderer from 'react-test-renderer'

describe('Shapes Components', () => {
  it('renders triangle without image correctly', () => {
    const data = {
      type: 'TRIANGLE',
      size: 150,
      positionX: 50,
      positionY: 100,
      color: `#FFFFFF`,
    }
    const tree = renderer.create(<Shapes {...data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
