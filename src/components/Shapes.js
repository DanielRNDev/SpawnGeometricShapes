import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import Svg, {
  Circle,
  Rect,
  Image
} from 'react-native-svg'
import * as Animatable from 'react-native-animatable'
import { SQUARE, CIRCLE, TRIANGLE } from '../constants'

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  triangleCornerTopLeft: {
    width: 0,
    height: 0,
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
  },
  triangleCornerTopRight: {
    width: 0,
    height: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderTopColor: '#fff',
  },
  shapeWrapper: {
    position: 'absolute'
  }
})
const AnimatableView = Animatable.createAnimatableComponent(View)

export default class Shapes extends Component {
  renderSquare = () => {
    const { image, size, color, positionX, positionY } = this.props

    return (
      <View style={[styles.shapeWrapper, { top: positionY, left: positionX }]}>
        <Svg width={size} height={size}>
          {
            image
              ? <Image
                width={size}
                height={size}
                preserveAspectRatio="xMidYMid slice"
                href={{ uri: image }}
              />
              : <Rect
                width={size}
                height={size}
                fill={color}
              />
          }
        </Svg>
      </View>
    )
  }

  renderCircle = () => {
    const { size, color, positionX, positionY } = this.props
    const r = size / 2

    return (
      <View style={[styles.shapeWrapper, { top: positionY, left: positionX }]}>
        <Svg height={size} width={size}>
          <Circle cx={r} cy={r} r={r} fill={color} />
        </Svg>
      </View>
    )
  }

  renderTriangle = () => {
    const { image, size, color, positionX, positionY } = this.props
    const triangleSize = size % 2 == 0 ? size : size + 1 // Convert the size to even so triangle image will not wrong absolute position

    if (image) {
      return (
        <View style={[styles.shapeWrapper, { width: triangleSize, height: triangleSize, top: positionY, left: positionX }]}>
          <ImageBackground
            style={{ width: triangleSize, height: triangleSize }}
            source={{uri: image}}
          >
            <View style={[
              styles.triangleCornerTopLeft,
              {
                borderRightWidth: triangleSize / 2,
                borderTopWidth: triangleSize,
              }
            ]} />
            <View style={[
              styles.triangleCornerTopRight,
              {
                borderLeftWidth: triangleSize / 2,
                borderTopWidth: triangleSize,
              }
            ]} />
          </ImageBackground>
        </View>
      )
    }

    return (
      <View
        style={[
          styles.shapeWrapper,
          styles.triangle,
          {
            borderLeftWidth: triangleSize,
            borderRightWidth: triangleSize,
            borderBottomWidth: triangleSize * 2,
            borderBottomColor: color,
            top: positionY,
            left: positionX
          }
        ]}
      />
    )
  }

  renderShape = () => {
    const { type } = this.props

    switch (type) {
      case SQUARE:
        return this.renderSquare()

      case CIRCLE:
        return this.renderCircle()

      case TRIANGLE:
        return this.renderTriangle()

      default:
        return null
    }
  }

  render() {
    return (
      <AnimatableView animation="bounceIn">
        {this.renderShape()}
      </AnimatableView>
    )
  }
}
