import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import axios from 'axios'
import RNShake from 'react-native-shake';
import { Header, Shapes } from '../../components'
import { getShapeSize, debounceEventHandler } from '../../utils'
import { CIRCLE, COLORS_API } from '../../constants'
import styles from './styles'

export default class Circles extends Component {
  state = {
    itemSpawned: 0,
    shapes: []
  }

  componentDidMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      this.resetShapes()
    })
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
  }

  resetShapes = () => this.setState({ itemSpawned: 0, shapes: [] })

  updateShapeValue = (position, index) => {
    const { shapes } = this.state

    shapes[index] = {...shapes[index], ...position}
    this.setState({ shapes })
  }

  onPressToSpawn = async (e) => {
    const { shapes } = this.state
    const randomColor = Math.floor(Math.random()*16777215).toString(16)
    const { data } = await axios.get(COLORS_API)
    const { hex } = data[0] || { hex: randomColor } // set random color in case no api response
    const size = getShapeSize()

    if (!e.nativeEvent) {
      return
    }

    shapes.push({
      color: `#${hex}`,
      type: CIRCLE,
      size,
      positionX: e.nativeEvent ? e.nativeEvent.locationX - size / 2 : 0,
      positionY: e.nativeEvent ? e.nativeEvent.locationY - size / 2 : 0
    })

    this.setState({ shapes, itemSpawned: shapes.length })
  }

  renderShapes = () => {
    const { shapes } = this.state

    return (
      <View style={styles.shapeWrapper}>
        {
          shapes.map((data, index) => (
            <Shapes key={`${shapes}-${index}`} {...data} updateShapeValue={(position) => this.updateShapeValue(position, index)} />
          ))
        }
      </View>
    )
  }

  render() {
    const { itemSpawned } = this.state

    return (
      <View style={styles.container}>
        <Header
          title="Circles"
          rightComponent={{ icon: 'eraser', color: '#fff', type: 'material-community', onPress: this.resetShapes }}
        />
        <TouchableWithoutFeedback style={styles.innerContainer} onPress={debounceEventHandler(this.onPressToSpawn, 200) }>
          {
            itemSpawned > 0 ? (
              <View style={styles.innerContainer}>
                {this.renderShapes()}
              </View>
            ) : (
              <View style={styles.centerContainer}>
                <Text style={styles.spawnText}>{"Let's spawn some circles"}</Text>
                <Text>{"(Click anywhere on the screen)"}</Text>
              </View>
            )
          }
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
