import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Squares, Circles, Triangles, AllShapes
} from '../screens'

const Tab = createBottomTabNavigator()

const MainTab = () => (
  <Tab.Navigator
    initialRouteName="All"
    tabBarOptions={{
      activeBackgroundColor: '#e91e63',
      activeTintColor: '#ffffff',
    }}
  >
    <Tab.Screen
      name="Squares"
      component={Squares}
      options={{
        tabBarLabel: 'Squares',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="square-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Circles"
      component={Circles}
      options={{
        tabBarLabel: 'Circles',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="circle-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Triangles"
      component={Triangles}
      options={{
        tabBarLabel: 'Triangles',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="triangle-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen

      name="All"
      component={AllShapes}
      options={{
        tabBarLabel: 'All',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="all-inclusive" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default MainTab
