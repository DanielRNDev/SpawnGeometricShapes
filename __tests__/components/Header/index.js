import 'react-native';
import React from 'react'
import Header from '../../../src/components/Header'
import renderer from 'react-test-renderer'

describe('Header Components', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header title="Header" rightComponent={{ icon: 'home', color: '#fff' }} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
