import React, { Component } from 'react'
import {
  View,
  PanResponder,
  StyleSheet,
} from 'react-native'
import Svg, {
  Circle,
  Rect,
  Image,
  Defs,
  ClipPath,
  Polygon
} from 'react-native-svg'
import * as Animatable from 'react-native-animatable'
import { SQUARE, CIRCLE, TRIANGLE } from '../constants'

const styles = StyleSheet.create({
  shapeWrapper: {
    position: 'absolute'
  }
})
const AnimatableView = Animatable.createAnimatableComponent(View)

export default class Shapes extends Component {
  constructor(props) {
    super(props)
    const { positionX, positionY } = this.props

    this.state = {
      left: positionX,
      top: positionY,
      pressed: false,
    }

    this.previousLeft = positionX
    this.previousTop = positionY
  }

  handleStartShouldSetPanResponder = (event) => {
    event && event.preventDefault && event.preventDefault()
    return true
  }

  handleMoveShouldSetPanResponder = (event) => {
    event && event.preventDefault && event.preventDefault()
    return true
  }

  handlePanResponderGrant = () => {
    this.setState({
      pressed: true,
    })
  }

  handlePanResponderMove = (event, gestureState) => {
    this.setState({
      left: this.previousLeft + gestureState.dx,
      top: this.previousTop + gestureState.dy,
    })
  }

  handlePanResponderEnd = (event, gestureState) => {
    const { updateShapeValue } = this.props

    this.setState({
      pressed: false,
    })
    this.previousLeft += gestureState.dx
    this.previousTop += gestureState.dy

    updateShapeValue({
      positionX: this.previousLeft,
      positionY: this.previousTop
    })
  }

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
    onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
    onPanResponderGrant: this.handlePanResponderGrant,
    onPanResponderMove: this.handlePanResponderMove,
    onPanResponderRelease: this.handlePanResponderEnd,
    onPanResponderTerminate: this.handlePanResponderEnd,
  })

  renderSquare = () => {
    const { image, size, color } = this.props

    return (
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
    )
  }

  renderCircle = () => {
    const { size, color } = this.props
    const r = size / 2

    return (
      <Svg height={size} width={size}>
        <Circle cx={r} cy={r} r={r} fill={color} />
      </Svg>
    )
  }

  renderTriangle = () => {
    const { image, size, color, points } = this.props

    if (image) {
      return (
        <Svg height={size} width={size}>
          <Defs>
            <ClipPath id="clip">
              <Polygon points={points} />
            </ClipPath>
          </Defs>
          <Image
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid slice"
            href={{ uri: image }}
            clipPath="url(#clip)"
          />
        </Svg>
      )
    }

    return (
      <Svg height={size} width={size}>
        <Polygon points={points} fill={color} />
      </Svg>
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
      <AnimatableView
        animation="bounceIn"
        {...this.panResponder.panHandlers}
        style={[
          styles.shapeWrapper,
          {
            left: this.state.left,
            top: this.state.top,
          }
        ]}
      >
        {this.renderShape()}
      </AnimatableView>
    )
  }
}
