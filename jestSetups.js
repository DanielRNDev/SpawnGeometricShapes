import React from 'react'
import 'react-native'
import {
  NativeModules,
} from 'react-native';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import renderer from 'react-test-renderer'
import App from './App';

Enzyme.configure({ adapter: new Adapter() })
global.fetch = jest.fn(() => new Promise(resolve => resolve()))

Object.assign(NativeModules, {
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {}
  },
  PlatformConstants: {
    forceTouchAvailable: false,
  }}
);

NativeModules.RNGestureHandlerModule = {}

